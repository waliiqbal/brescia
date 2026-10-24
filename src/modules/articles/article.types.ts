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
  /** HTML, cleaned on save. */
  content: string;
  category: ArticleCategory;
  /** Cover image address. Empty for a draft that has no cover yet. */
  image: string;
  /** Cloudinary id of the cover (not set for demo images). */
  imagePublicId?: string;
  /** ISO date string. */
  publishedAt: string;
  /** Drafts are never shown on the public site. */
  published: boolean;
  /** "Show on homepage". */
  featured: boolean;
  isDemo: boolean;
}
