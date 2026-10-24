import crypto from "node:crypto";
import { getSecret } from "@/lib/session-token";
import type { OtpPurpose } from "./admin.schema";

export const OTP_TTL_MS = 10 * 60 * 1000;
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;

export function generateOtp() {
  return String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
}

export function hashOtp(otp: string, email: string, purpose: OtpPurpose) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(`${purpose}:${email}:${otp}`)
    .digest("hex");
}

export function otpMatches(
  storedHash: string,
  otp: string,
  email: string,
  purpose: OtpPurpose,
) {
  const a = Buffer.from(storedHash, "hex");
  const b = Buffer.from(hashOtp(otp, email, purpose), "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
