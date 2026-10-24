import mongoose, { Schema, type Model } from "mongoose";

export interface AlbumPhotoDoc {
  _id: mongoose.Types.ObjectId;
  url: string;
  publicId?: string;
  alt?: string;
}

export interface AlbumDoc {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  /** The first photo is the album cover. */
  photos: AlbumPhotoDoc[];
  isDemo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const photoSchema = new Schema<AlbumPhotoDoc>({
  url: { type: String, required: true },
  publicId: { type: String },
  alt: { type: String, trim: true, default: "" },
});

const albumSchema = new Schema<AlbumDoc>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    photos: { type: [photoSchema], default: [] },
    isDemo: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const AlbumModel: Model<AlbumDoc> =
  (mongoose.models.Album as Model<AlbumDoc> | undefined) ??
  mongoose.model<AlbumDoc>("Album", albumSchema);
