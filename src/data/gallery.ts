import type { Album } from "@/modules/gallery/gallery.types";
import { relativeDate, sample } from "./helpers";

// Demo albums used by "Load demo content" in the admin dashboard.
export type SeedAlbum = Omit<Album, "isDemo">;

function album(
  slug: string,
  title: string,
  daysAgo: number,
  photoIds: string[],
): SeedAlbum {
  const id = `album-${slug}`;
  return {
    id,
    slug,
    title,
    createdAt: relativeDate(-daysAgo, 12, 0),
    photos: photoIds.map((photoId, i) => ({
      id: `${id}-${i + 1}`,
      albumId: id,
      src: sample(photoId),
      alt: `${title} photo ${i + 1}`,
    })),
  };
}

// Newest album first.
export const albums: SeedAlbum[] = [
  // The ceremony took place on 8 October 2026.
  album("mou-signing-ceremony", "MOU Signing Ceremony", 16, [
    "mou-01",
    "mou-02",
    "mou-03",
    "mou-04",
    "mou-05",
    "mou-06",
    "mou-07",
    "mou-08",
    "mou-09",
    "mou-10",
    "mou-11",
    "mou-12",
  ]),
];
