import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { NewsCard } from "@/components/site/NewsCard";
import { NewsFilters } from "@/components/site/NewsFilters";
import { Pagination } from "@/components/site/Pagination";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import {
  getArticlesPage,
  isArticleCategory,
} from "@/modules/articles/article.service";

export const metadata: Metadata = {
  title: "News",
  description:
    "Match reports, announcements and stories from the Brescia Lions.",
};

export default async function NewsPage({ searchParams }: PageProps<"/news">) {
  const params = await searchParams;
  const rawCategory = typeof params.category === "string" ? params.category : "";
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const category = isArticleCategory(rawCategory) ? rawCategory : undefined;

  const rawPage = typeof params.page === "string" ? Number(params.page) : 1;
  const { articles, page, pageCount } = await getArticlesPage({
    category,
    query,
    page: rawPage,
  });

  const pageHref = (target: number) => {
    const qs = new URLSearchParams();
    if (category) qs.set("category", category);
    if (query) qs.set("q", query);
    if (target > 1) qs.set("page", String(target));
    const text = qs.toString();
    return text ? `/news?${text}` : "/news";
  };

  return (
    <>
      <PageHeader
        eyebrow="Stories from the den"
        gold="News"
        subtitle="Match reports, announcements and everything happening at the Brescia Lions."
      />

      <Section>
        <NewsFilters category={category} query={query} />

        {articles.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <NewsCard key={article.id} article={article} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gold/25 bg-green-dark/60 px-6 py-16 text-center">
            <p className="font-heading text-xl text-gold-light">
              No stories found
            </p>
            <p className="mt-2 text-sm text-cream/70">
              Try a different search or category.
            </p>
            <ButtonLink href="/news" variant="outline" className="mt-6">
              Clear filters
            </ButtonLink>
          </div>
        )}

        <Pagination page={page} pageCount={pageCount} hrefFor={pageHref} />
      </Section>
    </>
  );
}
