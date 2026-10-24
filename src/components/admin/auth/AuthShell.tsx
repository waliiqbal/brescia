import type { ReactNode } from "react";
import { Logo } from "@/components/site/Logo";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-6 flex flex-col items-center text-center">
        <Logo size={84} />
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
          Admin Panel
        </p>
      </div>

      <div className="rounded-2xl border border-gold/40 bg-linear-to-br from-green-card to-green-dark p-6 shadow-card sm:p-8">
        <h1 className="font-heading text-2xl font-bold text-gold-light">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-cream/70">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>

      {footer && (
        <div className="mt-5 text-center text-sm text-cream/70">{footer}</div>
      )}
    </div>
  );
}
