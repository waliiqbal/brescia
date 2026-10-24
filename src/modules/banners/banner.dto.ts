import { z } from "zod";
import { imageDto } from "@/lib/images";

const link = z
  .string()
  .trim()
  .max(300)
  .refine(
    (href) => (href.startsWith("/") && !href.startsWith("//")) || /^https:\/\//.test(href),
    "Use a page like /news or a full link starting with https://",
  );

const buttonDto = z.object({
  label: z.string().trim().min(1, "Write the button text.").max(30),
  href: link,
  variant: z.enum(["gold", "outline"]),
});

const bannerFields = z.object({
  eyebrow: z.string().trim().max(40).optional(),
  title: z.string().trim().min(2, "Write a title.").max(80),
  text: z.string().trim().min(5, "Write a short line of text.").max(240),
  image: imageDto.nullable().optional(),
  buttons: z.array(buttonDto).max(2).optional(),
  // No defaults here: an update that omits `active` must not reset it.
  active: z.boolean().optional(),
});

export const createBannerDto = bannerFields;
export const updateBannerDto = bannerFields.partial();
export const reorderBannersDto = z.object({
  ids: z.array(z.string().length(24)).min(1).max(100),
});

export type CreateBannerInput = z.infer<typeof createBannerDto>;
export type UpdateBannerInput = z.infer<typeof updateBannerDto>;
