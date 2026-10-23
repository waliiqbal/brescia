export const ARTICLE_CATEGORIES = [
  "Match Report",
  "Announcement",
  "Squad",
  "Preview",
  "Community",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** HTML. */
  content: string;
  category: ArticleCategory;
  image: string;
  /** ISO date string. */
  publishedAt: string;
  /** Drafts are never shown on the public site. */
  published: boolean;
  featured: boolean;
}
