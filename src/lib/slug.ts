import { slugify } from "@/lib/utils";

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Finds a free slug: "title", then "title-2", "title-3"...
 * `exists` is given the candidate and tells if it is already taken.
 */
export async function uniqueSlug(
  text: string,
  exists: (slug: string) => Promise<boolean>,
  fallback = "item",
) {
  const base = slugify(text).slice(0, 80) || fallback;
  let slug = base;
  for (let n = 2; await exists(slug); n++) slug = `${base}-${n}`;
  return slug;
}

export function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
