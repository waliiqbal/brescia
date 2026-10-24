import { z } from "zod";
import { deleteImage, isOwnPublicId } from "@/lib/upload";

/** An uploaded image as stored in the database. */
export interface StoredImage {
  url: string;
  /** Cloudinary id. Missing for demo images that ship with the website. */
  publicId?: string;
}

function isCloudinaryUrl(url: string) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  return Boolean(cloud) && url.startsWith(`https://res.cloudinary.com/${cloud}/`);
}

/**
 * Image sent by the admin forms. Only files we uploaded to our own Cloudinary
 * folder are accepted, so no outside image address can be saved.
 */
export const imageDto = z.object({
  url: z.url().refine(isCloudinaryUrl, "Use an image uploaded from this panel."),
  publicId: z.string().refine(isOwnPublicId, "Invalid image id."),
});

/** Deletes an image from Cloudinary; a failure is logged, never thrown. */
export async function removeStoredImage(image?: StoredImage | null) {
  if (!image?.publicId) return;
  try {
    await deleteImage(image.publicId);
  } catch (error) {
    console.error("[images] could not delete", image.publicId, error);
  }
}
