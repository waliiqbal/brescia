import { articles } from "@/data/articles";
import { ARTICLE_CATEGORIES, type Article, type ArticleCategory } from "./article.types";

function published(): Article[] {
  return articles
    .filter((a) => a.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function isArticleCategory(value: unknown): value is ArticleCategory {
  return ARTICLE_CATEGORIES.includes(value as ArticleCategory);
}

export async function getLatestArticles(limit = 3) {
  return published().slice(0, limit);
}

interface ArticleFilters {
  category?: ArticleCategory;
  query?: string;
}

export async function getArticles({ category, query }: ArticleFilters = {}) {
  const needle = query?.trim().toLowerCase();
  return published().filter((article) => {
    if (category && article.category !== category) return false;
    if (!needle) return true;
    return [article.title, article.excerpt, article.category]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });
}

/** Drafts are never returned, so a draft slug is a 404 on the public site. */
export async function getArticleBySlug(slug: string) {
  return published().find((a) => a.slug === slug) ?? null;
}

export async function getArticleSlugs() {
  return published().map((a) => a.slug);
}

/** Same category first, then the newest stories. */
export async function getRelatedArticles(article: Article, limit = 3) {
  const others = published().filter((a) => a.id !== article.id);
  const sameCategory = others.filter((a) => a.category === article.category);
  const rest = others.filter((a) => a.category !== article.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
