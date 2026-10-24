// Browser-side image helpers shared by the admin forms.

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const MAX_SIDE = 2400;
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export interface UploadedImage {
  url: string;
  publicId?: string;
}

export type UploadFolderName =
  | "banners"
  | "news"
  | "players"
  | "staff"
  | "gallery"
  | "sponsors"
  | "about"
  | "misc";

/** Shrinks big photos in the browser so they fit the upload limit. */
export async function prepareImage(file: File): Promise<File> {
  if (file.size <= 1.5 * 1024 * 1024) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  for (const quality of [0.86, 0.72, 0.6]) {
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", quality),
    );
    if (blob && blob.size <= MAX_UPLOAD_BYTES) {
      return new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", {
        type: "image/webp",
      });
    }
  }
  return file;
}

export type UploadResult =
  | { ok: true; image: { url: string; publicId: string } }
  | { ok: false; message: string };

/** Resizes (if needed) and uploads one image through /api/upload. */
export async function uploadImageFile(
  file: File,
  folder: UploadFolderName,
): Promise<UploadResult> {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return { ok: false, message: "Choose a JPG, PNG or WEBP image." };
  }

  try {
    const ready = await prepareImage(file);
    if (ready.size > MAX_UPLOAD_BYTES) {
      return { ok: false, message: "This image is too large. Try a smaller one." };
    }

    const body = new FormData();
    body.append("folder", folder);
    body.append("file", ready);
    const res = await fetch("/api/upload", { method: "POST", body });
    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.ok) {
      return {
        ok: false,
        message: json?.error?.message ?? "The image could not be uploaded.",
      };
    }
    return { ok: true, image: json.image };
  } catch {
    return { ok: false, message: "The image could not be processed. Try another file." };
  }
}
