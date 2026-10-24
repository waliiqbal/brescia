import Link from "next/link";
import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  pageCount: number;
  /** Address of a page, keeping the active filters. */
  hrefFor: (page: number) => string;
};

/** Page numbers to show: first, last, and two on each side of the current one. */
function visiblePages(page: number, pageCount: number) {
  const pages: (number | "gap")[] = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "gap") {
      pages.push("gap");
    }
  }
  return pages;
}

const base =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[11px] font-bold uppercase tracking-wider transition-colors";

// Plain links, so paging works without client JavaScript.
export function Pagination({ page, pageCount, hrefFor }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label="News pages"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link
          href={hrefFor(page - 1)}
          rel="prev"
          className={cn(base, "border-gold/40 text-gold-light hover:border-gold hover:bg-gold/10")}
        >
          ← Prev
        </Link>
      )}

      {visiblePages(page, pageCount).map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} aria-hidden className="px-1 text-gold-light/60">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={hrefFor(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
            className={cn(
              base,
              p === page
                ? "border-gold bg-gold text-green-deep"
                : "border-gold/40 text-gold-light hover:border-gold hover:bg-gold/10",
            )}
          >
            {p}
          </Link>
        ),
      )}

      {page < pageCount && (
        <Link
          href={hrefFor(page + 1)}
          rel="next"
          className={cn(base, "border-gold/40 text-gold-light hover:border-gold hover:bg-gold/10")}
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
