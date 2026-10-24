import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Small building blocks for the light admin panel.

export function AdminHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-card">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 font-heading text-3xl font-bold text-green-dark sm:text-4xl">
          {title}
        </h1>
        {description && <p className="mt-2 max-w-2xl text-ink/70">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-green-dark/15 bg-white p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}

export const fieldClass =
  "w-full rounded-lg border border-green-dark/25 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-green-card focus:outline-2 focus:outline-green-card/30 disabled:bg-paper disabled:opacity-70";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink/70"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-flag-red">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-ink/50">{hint}</p>
      )}
    </div>
  );
}

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={cn(fieldClass, props.className)} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(fieldClass, "resize-y", props.className)} />;
}

export function Select(props: ComponentProps<"select">) {
  return <select {...props} className={cn(fieldClass, props.className)} />;
}

export function Checkbox({
  label,
  hint,
  ...props
}: ComponentProps<"input"> & { label: string; hint?: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        {...props}
        className="mt-0.5 size-5 shrink-0 accent-green-card"
      />
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="block text-xs text-ink/55">{hint}</span>}
      </span>
    </label>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: "green" | "gold" | "gray";
  children: ReactNode;
}) {
  const tones = {
    green: "bg-flag-green/15 text-flag-green",
    gold: "bg-gold/25 text-[#7a5a05]",
    gray: "bg-ink/10 text-ink/60",
  };
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Notice({
  tone = "success",
  children,
}: {
  tone?: "success" | "error";
  children: ReactNode;
}) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "mb-6 rounded-lg border px-4 py-3 text-sm font-semibold",
        tone === "success"
          ? "border-flag-green/40 bg-flag-green/10 text-flag-green"
          : "border-flag-red/40 bg-flag-red/10 text-flag-red",
      )}
    >
      {children}
    </p>
  );
}

export function EmptyState({
  title,
  text,
  href,
  actionLabel,
}: {
  title: string;
  text: string;
  href?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-xl border-2 border-dashed border-green-dark/20 bg-white px-6 py-14 text-center">
      <p className="font-heading text-xl font-bold text-green-dark">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">{text}</p>
      {href && actionLabel && (
        <Link
          href={href}
          className="mt-5 inline-flex rounded-full bg-green-dark px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-green-card"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
