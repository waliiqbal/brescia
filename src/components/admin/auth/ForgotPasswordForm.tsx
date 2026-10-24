"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { sendJson } from "@/lib/client-api";
import {
  FormMessage,
  OtpField,
  PasswordField,
  PasswordRules,
  TextField,
  passwordProblem,
  useCountdown,
} from "./AuthFields";

const RESEND_SECONDS = 60;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useCountdown();

  async function requestCode(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);
    const result = await sendJson("/api/auth/forgot", { email });
    setLoading(false);

    if (!result.ok) {
      setFieldErrors(result.fields ?? {});
      setError(result.fields ? "Please fix the highlighted fields below." : result.message);
      return;
    }
    setStep("reset");
    setOtp("");
    setWait(RESEND_SECONDS);
  }

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    const confirm = String(new FormData(event.currentTarget).get("confirm") ?? "");
    const problem = passwordProblem(password);
    if (problem) {
      setFieldErrors({ password: [problem] });
      setError("Please fix the highlighted fields below.");
      return;
    }
    if (confirm !== password) {
      setFieldErrors({ confirm: ["The two passwords do not match."] });
      setError("Please fix the highlighted fields below.");
      return;
    }

    setLoading(true);
    const result = await sendJson("/api/auth/reset", { email, otp, password });
    setLoading(false);

    if (!result.ok) {
      setFieldErrors(result.fields ?? {});
      setError(result.fields ? "Please fix the highlighted fields below." : result.message);
      return;
    }
    router.replace("/admin/login?reset=1");
  }

  if (step === "reset") {
    return (
      <form onSubmit={resetPassword} className="space-y-5" noValidate>
        <FormMessage tone="success">
          If {email} is the admin email, a 6-digit code is on its way. It
          expires in 10 minutes.
        </FormMessage>
        <OtpField value={otp} onChange={setOtp} error={fieldErrors.otp?.[0]} />
        <PasswordField
          label="New password"
          name="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password?.[0]}
        />
        <PasswordRules value={password} />
        <PasswordField
          label="Confirm new password"
          name="confirm"
          autoComplete="new-password"
          required
          error={fieldErrors.confirm?.[0]}
        />
        <FormMessage tone="error">{error}</FormMessage>
        <Button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="w-full"
        >
          {loading ? "Saving..." : "Set new password"}
        </Button>
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => setStep("email")}
            className="text-gold-light underline-offset-4 hover:underline"
          >
            Use a different email
          </button>
          <button
            type="button"
            disabled={wait > 0 || loading}
            onClick={() => requestCode()}
            className="text-gold-light underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
          >
            {wait > 0 ? `Resend code in ${wait}s` : "Resend code"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={requestCode} className="space-y-5" noValidate>
      <TextField
        label="Admin email"
        name="email"
        type="email"
        autoComplete="email"
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email?.[0]}
      />
      <FormMessage tone="error">{error}</FormMessage>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Send reset code"}
      </Button>
      <p className="text-center text-sm">
        <Link
          href="/admin/login"
          className="text-gold-light underline-offset-4 hover:underline"
        >
          Back to login
        </Link>
      </p>
    </form>
  );
}
