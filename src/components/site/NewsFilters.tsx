import Link from "next/link";
import { ARTICLE_CATEGORIES } from "@/modules/articles/article.types";
import { cn } from "@/lib/utils";

type NewsFiltersProps = {
  category?: string;
  query?: string;
};

function newsHref(category?: string, query?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (query) params.set("q", query);
  const qs = params.toString();
  return qs ? `/news?${qs}` : "/news";
}

// Plain links + a GET form, so filtering works without client JavaScript.
export function NewsFilters({ category, query }: NewsFiltersProps) {
  const chips = [{ label: "All", value: undefined }, ...ARTICLE_CATEGORIES.map((c) => ({ label: c, value: c as string | undefined }))];

  return (
    <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <nav aria-label="Filter news by category" className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          const active = (chip.value ?? "") === (category ?? "");
          return (
            <Link
              key={chip.label}
              href={newsHref(chip.value, query)}
              aria-current={active ? "true" : undefined}
              className={cn(
                "rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors",
                active
                  ? "border-gold bg-gold text-green-deep"
                  : "border-gold/40 text-gold-light hover:border-gold hover:bg-gold/10",
              )}
            >
              {chip.label}
            </Link>
          );
        })}
      </nav>

      <form
        action="/news"
        role="search"
        className="flex w-full overflow-hidden rounded-full border border-gold/40 bg-green-dark lg:max-w-sm"
      >
        {category && <input type="hidden" name="category" value={category} />}
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search news..."
          aria-label="Search news"
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-linear-to-b from-gold-light to-gold px-5 text-xs font-bold uppercase tracking-wider text-green-deep hover:brightness-110"
        >
          Search
        </button>
      </form>
    </div>
  );
}
