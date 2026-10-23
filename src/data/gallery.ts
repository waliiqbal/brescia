import type { Album } from "@/modules/gallery/gallery.types";
import { relativeDate, sample } from "./helpers";

function album(
  slug: string,
  title: string,
  daysAgo: number,
  photoIds: string[],
): Album {
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
export const albums: Album[] = [
  album("match-day-vs-milano", "Match Day · vs Milano", 8, [
    "36741130",
    "31852382",
    "30678437",
    "28759001",
    "29047136",
    "37145698",
    "32945758",
  ]),
  album("training", "Training", 10, [
    "37144719",
    "31712541",
    "27907317",
    "36676877",
    "9559761",
    "30497236",
  ]),
  album("fans", "Fans", 12, [
    "3892912",
    "36950379",
    "2799556",
    "31852382",
    "29949985",
  ]),
  album("celebrations", "Celebrations", 14, [
    "7680896",
    "11204756",
    "35887609",
    "28759011",
    "17628715",
  ]),
  album("crest-launch", "Crest Launch", 20, [
    "35801175",
    "35801173",
    "35801176",
    "35801174",
    "35801178",
  ]),
];
