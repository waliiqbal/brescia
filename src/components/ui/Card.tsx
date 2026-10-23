import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gold/30 bg-linear-to-br from-green-card to-green-dark shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-card-hover",
        className,
      )}
      {...props}
    />
  );
}
