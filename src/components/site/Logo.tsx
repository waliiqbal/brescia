import Image from "next/image";
import { LOGO_SRC, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = { size?: number; className?: string };

export function Logo({ size = 44, className }: LogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt={`${siteConfig.name} crest`}
      width={size}
      height={Math.round(size * (909 / 900))}
      className={cn("h-auto drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]", className)}
      priority
    />
  );
}
