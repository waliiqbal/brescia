"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-gold/30 bg-green-deep/70 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none disabled:opacity-60";
const errorBorder = "border-red-400 focus:border-red-300";

type FieldProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextField({ label, error, hint, id, className, ...props }: FieldProps) {
  const fieldId = id ?? props.name ?? label;
  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gold"
      >
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        className={cn(inputClass, error && errorBorder, className)}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="mt-1.5 text-sm font-semibold text-red-300">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${fieldId}-hint`} className="mt-1.5 text-xs text-cream/50">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export function PasswordField({ label, error, hint, id, ...props }: FieldProps) {
  const [visible, setVisible] = useState(false);
  const fieldId = id ?? props.name ?? label;
  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gold"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={fieldId}
          type={visible ? "text" : "password"}
          aria-invalid={error ? true : undefined}
          className={cn(inputClass, "pr-16", error && errorBorder)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold uppercase tracking-wider text-gold-light hover:text-cream"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {error ? (
        <p className="mt-1.5 text-sm font-semibold text-red-300">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-cream/50">{hint}</p>
      )}
    </div>
  );
}

export function OtpField({
  error,
  value,
  onChange,
}: {
  error?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor="otp"
        className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gold"
      >
        6-digit code
      </label>
      <input
        id="otp"
        name="otp"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        required
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        placeholder="••••••"
        aria-invalid={error ? true : undefined}
        className={cn(inputClass, "text-center text-2xl font-bold tracking-[0.5em]")}
      />
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  );
}

export function FormMessage({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: React.ReactNode;
}) {
  if (!children) return null;
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        tone === "error"
          ? "border-red-400/40 bg-red-500/10 text-red-200"
          : "border-flag-green/50 bg-flag-green/15 text-cream",
      )}
    >
      {children}
    </p>
  );
}

/** Counts down from `seconds`; used for the "resend code" button. */
export function useCountdown() {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (left <= 0) return;
    const timer = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [left]);

  return [left, setLeft] as const;
}

/** The password rules the server enforces, checked live while typing. */
export function passwordProblem(password: string) {
  if (password.length < 10) return "Use at least 10 characters.";
  if (!/[A-Za-z]/.test(password)) return "Include at least one letter.";
  if (!/\d/.test(password)) return "Include at least one number.";
  return "";
}

export function PasswordRules({ value }: { value: string }) {
  const rules = [
    { ok: value.length >= 10, text: "At least 10 characters" },
    { ok: /[A-Za-z]/.test(value), text: "A letter" },
    { ok: /\d/.test(value), text: "A number" },
  ];
  return (
    <ul aria-label="Password rules" className="-mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
      {rules.map((rule) => (
        <li key={rule.text} className={rule.ok ? "text-green-300" : "text-cream/55"}>
          <span aria-hidden="true">{rule.ok ? "✓" : "○"}</span> {rule.text}
        </li>
      ))}
    </ul>
  );
}
