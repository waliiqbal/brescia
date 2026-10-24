import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { sendMail } from "@/lib/mail";
import { Admin, type AdminDoc, type OtpPurpose } from "./admin.schema";
import { otpEmail } from "./auth.mail";
import type {
  LoginInput,
  ResetInput,
  SetupInput,
  VerifySetupInput,
} from "./auth.dto";
import {
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN_MS,
  OTP_TTL_MS,
  generateOtp,
  hashOtp,
  otpMatches,
} from "./otp";

const BCRYPT_COST = 12;
const MAX_LOGIN_FAILURES = 5;
const LOGIN_LOCK_MS = 15 * 60 * 1000;

// Used so a login for an unknown email takes as long as a real one.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", BCRYPT_COST);

export type AuthErrorCode =
  | "not_configured"
  | "not_allowed"
  | "closed"
  | "cooldown"
  | "invalid_code"
  | "invalid_credentials"
  | "locked"
  | "mail_failed";

export type AuthResult<T = object> =
  | ({ ok: true } & T)
  | {
      ok: false;
      code: AuthErrorCode;
      message: string;
      retryAfter?: number;
    };

const fail = (
  code: AuthErrorCode,
  message: string,
  retryAfter?: number,
): AuthResult<never> => ({ ok: false, code, message, retryAfter });

export interface AdminUser {
  id: string;
  email: string;
  sessionVersion: number;
}

export const toAdminUser = (admin: AdminDoc): AdminUser => ({
  id: String(admin._id),
  email: admin.email,
  sessionVersion: admin.sessionVersion,
});

/**
 * Optional lock: when ADMIN_EMAIL is set, only that email can create the admin
 * account. When it is empty, the first person to finish setup (confirming
 * their email with the code we send) becomes the admin.
 */
export function allowedAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() || null;
}

/** First-time setup is open only until the admin has verified their email. */
export async function isSetupOpen() {
  await connectDB();
  return !(await Admin.exists({ verified: true }));
}

export async function adminExists() {
  await connectDB();
  return Boolean(await Admin.exists({ verified: true }));
}

export async function getAdminById(id: string) {
  await connectDB();
  const admin = await Admin.findById(id).lean<AdminDoc>();
  return admin?.verified ? admin : null;
}

function otpSecondsLeft(sentAt?: Date) {
  if (!sentAt) return 0;
  const left = OTP_RESEND_COOLDOWN_MS - (Date.now() - sentAt.getTime());
  return left > 0 ? Math.ceil(left / 1000) : 0;
}

function newOtpRecord(email: string, purpose: OtpPurpose) {
  const code = generateOtp();
  return {
    code,
    record: {
      hash: hashOtp(code, email, purpose),
      purpose,
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
      attempts: 0,
      sentAt: new Date(),
    },
  };
}

async function sendOtp(email: string, code: string, purpose: OtpPurpose) {
  const { subject, text, html } = otpEmail(code, purpose);
  await sendMail({ to: email, subject, text, html });
}

/**
 * Atomically counts an attempt, then checks the code. Counting first means
 * parallel guesses cannot exceed the attempt limit.
 */
async function checkOtp(
  filter: Record<string, unknown>,
  email: string,
  otp: string,
  purpose: OtpPurpose,
) {
  const admin = await Admin.findOneAndUpdate(
    { ...filter, email, "otp.purpose": purpose },
    { $inc: { "otp.attempts": 1 } },
    { new: true },
  ).lean<AdminDoc>();

  const record = admin?.otp;
  if (!admin || !record) return null;
  if (record.attempts > OTP_MAX_ATTEMPTS) return null;
  if (record.expiresAt.getTime() < Date.now()) return null;
  if (!otpMatches(record.hash, otp, email, purpose)) return null;
  return admin;
}

const INVALID_CODE = "That code is wrong or has expired. Request a new one.";

// ---------------------------------------------------------------- setup

export async function startSetup({
  email,
  password,
}: SetupInput): Promise<AuthResult> {
  const allowed = allowedAdminEmail();

  await connectDB();
  if (await Admin.exists({ verified: true })) {
    return fail("closed", "The admin account already exists. Please log in.");
  }
  if (allowed && email !== allowed) {
    return fail(
      "not_allowed",
      "This email is not allowed to create the admin account.",
    );
  }

  const pending = await Admin.findOne({ verified: false }).lean<AdminDoc>();
  const wait = otpSecondsLeft(pending?.otp?.sentAt);
  if (wait > 0) {
    return fail("cooldown", `Please wait ${wait}s before asking for a new code.`, wait);
  }

  const { code, record } = newOtpRecord(email, "setup");
  const passwordHash = await bcrypt.hash(password, BCRYPT_COST);

  await Admin.findOneAndUpdate(
    { singleton: "admin", verified: false },
    { $set: { email, passwordHash, verified: false, otp: record } },
    { upsert: true },
  );

  try {
    await sendOtp(email, code, "setup");
  } catch (error) {
    console.error("[auth] could not send setup code:", error);
    return fail(
      "mail_failed",
      "We could not send the email. Check the email settings and try again.",
    );
  }
  return { ok: true };
}

export async function verifySetup({
  email,
  otp,
}: VerifySetupInput): Promise<AuthResult<{ admin: AdminUser }>> {
  await connectDB();
  const admin = await checkOtp({ verified: false }, email, otp, "setup");
  if (!admin) return fail("invalid_code", INVALID_CODE);

  const updated = await Admin.findOneAndUpdate(
    { _id: admin._id, verified: false },
    { $set: { verified: true }, $unset: { otp: 1 } },
    { new: true },
  ).lean<AdminDoc>();
  if (!updated) return fail("invalid_code", INVALID_CODE);

  return { ok: true, admin: toAdminUser(updated) };
}

// ---------------------------------------------------------------- login

export async function login({
  email,
  password,
}: LoginInput): Promise<AuthResult<{ admin: AdminUser }>> {
  await connectDB();
  const admin = await Admin.findOne({ verified: true, email }).lean<AdminDoc>();

  if (admin?.lockedUntil && admin.lockedUntil.getTime() > Date.now()) {
    const minutes = Math.ceil((admin.lockedUntil.getTime() - Date.now()) / 60000);
    return fail(
      "locked",
      `Too many failed attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
      minutes * 60,
    );
  }

  const valid = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);
  if (!admin || !valid) {
    if (admin) {
      const failures = admin.failedLogins + 1;
      await Admin.updateOne(
        { _id: admin._id },
        failures >= MAX_LOGIN_FAILURES
          ? {
              $set: {
                failedLogins: 0,
                lockedUntil: new Date(Date.now() + LOGIN_LOCK_MS),
              },
            }
          : { $set: { failedLogins: failures } },
      );
    }
    return fail("invalid_credentials", "Invalid email or password.");
  }

  await Admin.updateOne(
    { _id: admin._id },
    { $set: { failedLogins: 0, lockedUntil: null } },
  );
  return { ok: true, admin: toAdminUser(admin) };
}

// ---------------------------------------------------------- password reset

/**
 * Sends a reset code if the email belongs to the admin. It never reports
 * whether the email matched, so the caller always shows the same message.
 */
export async function startReset(email: string) {
  await connectDB();
  const admin = await Admin.findOne({ verified: true, email }).lean<AdminDoc>();
  if (!admin) return;
  if (otpSecondsLeft(admin.otp?.sentAt) > 0) return;

  const { code, record } = newOtpRecord(email, "reset");
  await Admin.updateOne({ _id: admin._id }, { $set: { otp: record } });
  try {
    await sendOtp(email, code, "reset");
  } catch (error) {
    console.error("[auth] could not send reset code:", error);
  }
}

export async function finishReset({
  email,
  otp,
  password,
}: ResetInput): Promise<AuthResult> {
  await connectDB();
  const admin = await checkOtp({ verified: true }, email, otp, "reset");
  if (!admin) return fail("invalid_code", INVALID_CODE);

  const passwordHash = await bcrypt.hash(password, BCRYPT_COST);
  await Admin.updateOne(
    { _id: admin._id },
    {
      $set: { passwordHash, failedLogins: 0, lockedUntil: null },
      $inc: { sessionVersion: 1 },
      $unset: { otp: 1 },
    },
  );
  return { ok: true };
}
