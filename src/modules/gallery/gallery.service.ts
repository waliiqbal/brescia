import { albums } from "@/data/gallery";
import type { Album, GalleryItem } from "./gallery.types";

function newestFirst(): Album[] {
  return [...albums]
    .filter((album) => album.photos.length > 0)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

/** The first photo of each of the newest albums, for the home page gallery. */
export async function getLatestGalleryItems(limit = 5): Promise<GalleryItem[]> {
  return newestFirst()
    .slice(0, limit)
    .map((album) => ({
      ...album.photos[0],
      albumTitle: album.title,
      albumSlug: album.slug,
    }));
}

export async function getAlbums() {
  return newestFirst();
}

export async function getAlbumBySlug(slug: string) {
  return newestFirst().find((a) => a.slug === slug) ?? null;
}

export async function getAlbumSlugs() {
  return newestFirst().map((a) => a.slug);
}
