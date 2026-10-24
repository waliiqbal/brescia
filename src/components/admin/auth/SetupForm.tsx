"use client";

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

export function SetupForm({ restricted = false }: { restricted?: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "verify">("details");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useCountdown();

  async function sendCode(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setError("");
    setInfo("");
    setFieldErrors({});

    if (step === "details") {
      const form = event && new FormData(event.currentTarget);
      const confirm = String(form?.get("confirm") ?? "");
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
    }

    setLoading(true);
    const result = await sendJson("/api/auth/setup", { email, password });
    setLoading(false);

    if (!result.ok) {
      setFieldErrors(result.fields ?? {});
      setError(result.fields ? "Please fix the highlighted fields below." : result.message);
      if (result.retryAfter) setWait(result.retryAfter);
      return;
    }
    setStep("verify");
    setOtp("");
    setWait(RESEND_SECONDS);
    setInfo("We sent a 6-digit code to your email.");
  }

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const result = await sendJson("/api/auth/setup/verify", { email, otp });
    if (!result.ok) {
      setError(result.message);
      setLoading(false);
      return;
    }
    router.replace("/admin/login?created=1");
  }

  if (step === "verify") {
    return (
      <form onSubmit={verify} className="space-y-5" noValidate>
        <FormMessage tone="success">
          {info || `Enter the code we sent to ${email}.`}
        </FormMessage>
        <OtpField value={otp} onChange={setOtp} />
        <FormMessage tone="error">{error}</FormMessage>
        <Button type="submit" disabled={loading || otp.length !== 6} className="w-full">
          {loading ? "Verifying..." : "Verify and create account"}
        </Button>
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => {
              setStep("details");
              setError("");
              setInfo("");
            }}
            className="text-gold-light underline-offset-4 hover:underline"
          >
            Change details
          </button>
          <button
            type="button"
            disabled={wait > 0 || loading}
            onClick={() => sendCode()}
            className="text-gold-light underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
          >
            {wait > 0 ? `Resend code in ${wait}s` : "Resend code"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={sendCode} className="space-y-5" noValidate>
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
        hint={
          restricted
            ? "Must be the admin email set for this website."
            : "We send the verification code to this email."
        }
      />
      <PasswordField
        label="Password"
        name="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password?.[0]}
      />
      <PasswordRules value={password} />
      <PasswordField
        label="Confirm password"
        name="confirm"
        autoComplete="new-password"
        required
        error={fieldErrors.confirm?.[0]}
      />
      <FormMessage tone="error">{error}</FormMessage>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending code..." : "Send verification code"}
      </Button>
    </form>
  );
}
