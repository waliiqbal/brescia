import { z } from "zod";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address.").max(254));

export const passwordRules = z
  .string()
  .min(10, "Use at least 10 characters.")
  .max(128, "Use at most 128 characters.")
  .regex(/[A-Za-z]/, "Include at least one letter.")
  .regex(/\d/, "Include at least one number.");

const otp = z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code.");

export const setupDto = z.object({ email, password: passwordRules });
export const verifySetupDto = z.object({ email, otp });
export const loginDto = z.object({
  email,
  password: z.string().min(1, "Enter your password.").max(128),
});
export const forgotDto = z.object({ email });
export const resetDto = z.object({ email, otp, password: passwordRules });

export type SetupInput = z.infer<typeof setupDto>;
export type VerifySetupInput = z.infer<typeof verifySetupDto>;
export type LoginInput = z.infer<typeof loginDto>;
export type ForgotInput = z.infer<typeof forgotDto>;
export type ResetInput = z.infer<typeof resetDto>;
