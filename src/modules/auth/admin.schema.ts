import mongoose, { Schema, type Model } from "mongoose";

export type OtpPurpose = "setup" | "reset";

export interface AdminOtp {
  /** HMAC of the 6-digit code. The code itself is never stored. */
  hash: string;
  purpose: OtpPurpose;
  expiresAt: Date;
  attempts: number;
  sentAt: Date;
}

export interface AdminDoc {
  _id: mongoose.Types.ObjectId;
  /** Always "admin" with a unique index: the database can hold only one admin. */
  singleton: "admin";
  email: string;
  passwordHash: string;
  /** false until the email is confirmed with the setup OTP. */
  verified: boolean;
  /** Bumped on password reset; older session cookies stop working. */
  sessionVersion: number;
  failedLogins: number;
  lockedUntil?: Date | null;
  otp?: AdminOtp | null;
  createdAt: Date;
  updatedAt: Date;
}

const otpSchema = new Schema<AdminOtp>(
  {
    hash: { type: String, required: true },
    purpose: { type: String, enum: ["setup", "reset"], required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
    sentAt: { type: Date, required: true },
  },
  { _id: false },
);

const adminSchema = new Schema<AdminDoc>(
  {
    singleton: {
      type: String,
      default: "admin",
      unique: true,
      immutable: true,
    },
    email: { type: String, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    verified: { type: Boolean, default: false },
    sessionVersion: { type: Number, default: 0 },
    failedLogins: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
    otp: { type: otpSchema, default: null },
  },
  { timestamps: true },
);

export const Admin: Model<AdminDoc> =
  (mongoose.models.Admin as Model<AdminDoc> | undefined) ??
  mongoose.model<AdminDoc>("Admin", adminSchema);
