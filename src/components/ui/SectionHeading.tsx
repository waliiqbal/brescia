import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  white: string;
  gold: string;
  subtitle?: string;
  as?: "h1" | "h2";
  className?: string;
};

// Heading in the proposal style: "UPCOMING" in cream + "FIXTURES" in gold.
export function SectionHeading({
  white,
  gold,
  subtitle,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-8", className)}>
      <Tag className="font-heading text-3xl font-bold uppercase tracking-wide text-cream sm:text-4xl">
        {white} <span className="text-gold-light">{gold}</span>
      </Tag>
      {subtitle && <p className="mt-1 text-sm text-cream/60">{subtitle}</p>}
    </div>
  );
}
