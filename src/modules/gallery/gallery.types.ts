export interface Photo {
  id: string;
  albumId: string;
  src: string;
  alt: string;
  /** Cloudinary id (not set for demo photos). */
  publicId?: string;
}

export interface Album {
  id: string;
  slug: string;
  title: string;
  /** ISO date string. */
  createdAt: string;
  photos: Photo[];
  isDemo: boolean;
}

/** One photo with its album, as shown on the home page gallery. */
export interface GalleryItem extends Photo {
  albumTitle: string;
  albumSlug: string;
}
