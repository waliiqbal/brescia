import Link from "next/link";
import { cn } from "@/lib/utils";

type FilterChipsProps = {
  label: string;
  items: { label: string; href: string; active: boolean }[];
};

export function FilterChips({ label, items }: FilterChipsProps) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-current={item.active ? "true" : undefined}
          className={cn(
            "rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors",
            item.active
              ? "border-gold bg-gold text-green-deep"
              : "border-gold/40 text-gold-light hover:border-gold hover:bg-gold/10",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
