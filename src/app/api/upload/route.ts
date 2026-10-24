import { z } from "zod";
import { apiError, ok } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import {
  MAX_UPLOAD_BYTES,
  UPLOAD_FOLDERS,
  deleteImage,
  detectImageType,
  isOwnPublicId,
  uploadImage,
} from "@/lib/upload";

const folderSchema = z.enum(UPLOAD_FOLDERS);
const deleteSchema = z.object({ publicId: z.string().min(1).max(300) });

// POST multipart form: `file` (jpg, png or webp, up to 4 MB) and `folder`.
export const POST = withAdmin(async (req) => {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return apiError("bad_request", "Send the image as a form upload.");
  }

  const file = form.get("file");
  const folder = folderSchema.safeParse(form.get("folder") ?? "misc");
  if (!(file instanceof File) || file.size === 0) {
    return apiError("validation", "Choose an image to upload.", 422);
  }
  if (!folder.success) {
    return apiError("validation", "Unknown upload folder.", 422);
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return apiError("too_large", "The image must be smaller than 4 MB.", 413);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!detectImageType(buffer)) {
    return apiError("validation", "Only JPG, PNG or WEBP images are allowed.", 415);
  }

  try {
    const image = await uploadImage(buffer, folder.data);
    return ok({ image });
  } catch (error) {
    console.error("[upload] failed:", error);
    return apiError("upload_failed", "The image could not be uploaded. Try again.", 502);
  }
});

// DELETE JSON: { publicId } removes an image from Cloudinary.
export const DELETE = withAdmin(async (req) => {
  const parsed = deleteSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !isOwnPublicId(parsed.data.publicId)) {
    return apiError("validation", "Invalid image id.", 422);
  }

  try {
    await deleteImage(parsed.data.publicId);
    return ok();
  } catch (error) {
    console.error("[upload] delete failed:", error);
    return apiError("delete_failed", "The image could not be deleted.", 502);
  }
});
