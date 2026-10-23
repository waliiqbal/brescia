export interface Photo {
  id: string;
  albumId: string;
  src: string;
  alt: string;
}

export interface Album {
  id: string;
  slug: string;
  title: string;
  /** ISO date string. */
  createdAt: string;
  photos: Photo[];
}

/** One photo with its album, as shown on the home page gallery. */
export interface GalleryItem extends Photo {
  albumTitle: string;
  albumSlug: string;
}
