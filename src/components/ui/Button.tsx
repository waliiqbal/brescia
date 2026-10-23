import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "danger";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  gold: "bg-linear-to-b from-gold-light to-gold text-green-deep hover:from-gold hover:to-gold",
  outline:
    "border border-gold text-gold-light hover:bg-gold hover:text-green-deep",
  danger: "bg-flag-red text-cream hover:bg-flag-red/80",
};

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "gold", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({
  variant = "gold",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props} />
  );
}
