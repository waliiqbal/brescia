import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { removeStoredImage } from "@/lib/images";
import type { CreateBannerInput, UpdateBannerInput } from "./banner.dto";
import { BannerModel, type BannerDoc } from "./banner.schema";
import type { Banner } from "./banner.types";

export function toBanner(doc: BannerDoc): Banner {
  return {
    id: String(doc._id),
    eyebrow: doc.eyebrow || undefined,
    title: doc.title,
    text: doc.text,
    image: doc.image?.url || undefined,
    imagePublicId: doc.image?.publicId || undefined,
    buttons: doc.buttons.map((b) => ({
      label: b.label,
      href: b.href,
      variant: b.variant,
    })),
    order: doc.order,
    active: doc.active,
    isDemo: doc.isDemo,
  };
}

// ------------------------------------------------------------ public site

export async function getActiveBanners(): Promise<Banner[]> {
  await connectDB();
  const docs = await BannerModel.find({ active: true })
    .sort({ order: 1, createdAt: 1 })
    .lean<BannerDoc[]>();
  return docs.map(toBanner);
}

// ------------------------------------------------------------ admin panel

export async function listBannersForAdmin(): Promise<Banner[]> {
  await connectDB();
  const docs = await BannerModel.find()
    .sort({ order: 1, createdAt: 1 })
    .lean<BannerDoc[]>();
  return docs.map(toBanner);
}

export async function countBanners() {
  await connectDB();
  const [total, active] = await Promise.all([
    BannerModel.countDocuments(),
    BannerModel.countDocuments({ active: true }),
  ]);
  return { total, active };
}

export async function getBannerForAdmin(id: string) {
  if (!mongoose.isValidObjectId(id)) return null;
  await connectDB();
  const doc = await BannerModel.findById(id).lean<BannerDoc>();
  return doc ? toBanner(doc) : null;
}

export async function createBanner(input: CreateBannerInput) {
  await connectDB();
  const last = await BannerModel.findOne().sort({ order: -1 }).lean<BannerDoc>();

  const doc = await BannerModel.create({
    eyebrow: input.eyebrow ?? "",
    title: input.title,
    text: input.text,
    image: input.image ?? null,
    buttons: input.buttons ?? [],
    active: input.active ?? true,
    order: (last?.order ?? 0) + 1,
  });
  return toBanner(doc.toObject());
}

export async function updateBanner(id: string, input: UpdateBannerInput) {
  if (!mongoose.isValidObjectId(id)) return null;
  await connectDB();
  const current = await BannerModel.findById(id).lean<BannerDoc>();
  if (!current) return null;

  const update: Record<string, unknown> = {};
  for (const key of ["eyebrow", "title", "text", "buttons", "active"] as const) {
    if (input[key] !== undefined) update[key] = input[key];
  }
  if (input.image !== undefined) update.image = input.image;

  const saved = await BannerModel.findByIdAndUpdate(id, { $set: update }, { new: true }).lean<BannerDoc>();

  // The old picture is no longer used: free it on Cloudinary.
  if (input.image !== undefined && current.image?.publicId && current.image.publicId !== input.image?.publicId) {
    await removeStoredImage(current.image);
  }
  return toBanner(saved!);
}

export async function deleteBanner(id: string) {
  if (!mongoose.isValidObjectId(id)) return false;
  await connectDB();
  const doc = await BannerModel.findByIdAndDelete(id).lean<BannerDoc>();
  if (!doc) return false;
  await removeStoredImage(doc.image);
  return true;
}

/** `ids` is the new order, first to last. */
export async function reorderBanners(ids: string[]) {
  await connectDB();
  await BannerModel.bulkWrite(
    ids
      .filter((id) => mongoose.isValidObjectId(id))
      .map((id, index) => ({
        updateOne: { filter: { _id: id }, update: { $set: { order: index + 1 } } },
      })),
  );
}
