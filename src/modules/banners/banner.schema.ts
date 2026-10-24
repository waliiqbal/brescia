import mongoose, { Schema, type Model } from "mongoose";

export interface BannerDoc {
  _id: mongoose.Types.ObjectId;
  eyebrow?: string;
  title: string;
  text: string;
  image?: { url: string; publicId?: string } | null;
  buttons: { label: string; href: string; variant: "gold" | "outline" }[];
  order: number;
  active: boolean;
  isDemo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const buttonSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    variant: { type: String, enum: ["gold", "outline"], default: "gold" },
  },
  { _id: false },
);

const bannerSchema = new Schema<BannerDoc>(
  {
    eyebrow: { type: String, trim: true, default: "" },
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    image: {
      type: new Schema({ url: String, publicId: String }, { _id: false }),
      default: null,
    },
    buttons: { type: [buttonSchema], default: [] },
    order: { type: Number, default: 0, index: true },
    active: { type: Boolean, default: true },
    isDemo: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const BannerModel: Model<BannerDoc> =
  (mongoose.models.Banner as Model<BannerDoc> | undefined) ??
  mongoose.model<BannerDoc>("Banner", bannerSchema);
