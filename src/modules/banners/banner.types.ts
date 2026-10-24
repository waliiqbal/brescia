export interface BannerButton {
  label: string;
  href: string;
  variant?: "gold" | "outline";
}

export interface Banner {
  id: string;
  eyebrow?: string;
  title: string;
  text: string;
  /** Without an image the slide shows the crest layout. */
  image?: string;
  /** Cloudinary id of the image (not set for demo images). */
  imagePublicId?: string;
  buttons: BannerButton[];
  order: number;
  active: boolean;
  isDemo: boolean;
}
