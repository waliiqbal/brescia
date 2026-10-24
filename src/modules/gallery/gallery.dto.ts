import { z } from "zod";
import { imageDto } from "@/lib/images";
import { SLUG_PATTERN } from "@/lib/slug";

const albumFields = z.object({
  title: z.string().trim().min(2, "Write the album name.").max(80),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(100)
    .regex(SLUG_PATTERN, "Use only lowercase letters, numbers and dashes.")
    .optional(),
});

export const createAlbumDto = albumFields;
export const updateAlbumDto = albumFields.partial();

/** Photos are uploaded one by one first, then attached to the album together. */
export const addPhotosDto = z.object({
  photos: z.array(imageDto).min(1).max(30),
});

export const coverDto = z.object({ cover: z.literal(true) });

export type CreateAlbumInput = z.infer<typeof createAlbumDto>;
export type UpdateAlbumInput = z.infer<typeof updateAlbumDto>;
export type AddPhotosInput = z.infer<typeof addPhotosDto>;
