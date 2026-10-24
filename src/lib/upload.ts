import { v2 as cloudinary } from "cloudinary";

export const UPLOAD_FOLDERS = [
  "banners",
  "news",
  "players",
  "staff",
  "gallery",
  "sponsors",
  "about",
  "misc",
] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

// Vercel functions accept request bodies up to 4.5 MB.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

const ROOT_FOLDER = "brescia";

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

function configure() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/** Checks the real file signature, not just the name or declared type. */
export function detectImageType(buffer: Buffer): "jpeg" | "png" | "webp" | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "jpeg";
  if (
    buffer[0] === 0x89 &&
    buffer.toString("ascii", 1, 4) === "PNG"
  ) {
    return "png";
  }
  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "webp";
  }
  return null;
}

export interface UploadedImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

export async function uploadImage(
  buffer: Buffer,
  folder: UploadFolder,
): Promise<UploadedImage> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured.");
  }
  configure();

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `${ROOT_FOLDER}/${folder}`,
          resource_type: "image",
          // Keep the stored original web-sized: at most 2400px, auto quality.
          transformation: [
            { width: 2400, height: 2400, crop: "limit", quality: "auto" },
          ],
        },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error("Upload failed"));
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
          });
        },
      )
      .end(buffer);
  });
}

/** Only files inside our own folder can be deleted. */
export function isOwnPublicId(publicId: string) {
  return (
    publicId.startsWith(`${ROOT_FOLDER}/`) &&
    !publicId.includes("..") &&
    /^[\w\-./]+$/.test(publicId)
  );
}

export async function deleteImage(publicId: string) {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured.");
  }
  if (!isOwnPublicId(publicId)) throw new Error("Invalid image id.");
  configure();
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });
  return result.result === "ok" || result.result === "not found";
}
