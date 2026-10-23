import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "gold" | "green" | "red" | "muted";

const tones: Record<Tone, string> = {
  gold: "bg-gold text-green-deep",
  green: "bg-flag-green text-cream",
  red: "bg-flag-red text-cream",
  muted: "bg-cream/15 text-cream",
};

type BadgeProps = ComponentProps<"span"> & { tone?: Tone };

export function Badge({ tone = "gold", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
