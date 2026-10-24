import { articles } from "@/data/articles";
import { banners } from "@/data/banners";
import { albums } from "@/data/gallery";
import { connectDB } from "@/lib/db";
import { ArticleModel } from "@/modules/articles/article.schema";
import { BannerModel } from "@/modules/banners/banner.schema";
import { AlbumModel } from "@/modules/gallery/gallery.schema";

/**
 * Demo content lets the website look complete before the club adds its own.
 * Every demo record is flagged `isDemo`, so "Remove demo content" deletes
 * only those and never anything the admin wrote.
 */

export async function countDemoContent() {
  await connectDB();
  const [articleCount, bannerCount, albumCount] = await Promise.all([
    ArticleModel.countDocuments({ isDemo: true }),
    BannerModel.countDocuments({ isDemo: true }),
    AlbumModel.countDocuments({ isDemo: true }),
  ]);
  return { articles: articleCount, banners: bannerCount, albums: albumCount };
}

/** Adds the demo content for each section that has nothing in it yet. */
export async function loadDemoContent() {
  await connectDB();
  const added = { articles: 0, banners: 0, albums: 0 };

  if ((await ArticleModel.estimatedDocumentCount()) === 0) {
    const docs = await ArticleModel.insertMany(
      articles.map((a) => ({
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        content: a.content,
        category: a.category,
        image: a.image ? { url: a.image } : null,
        publishedAt: new Date(a.publishedAt),
        published: a.published,
        featured: a.featured,
        isDemo: false, // real story, kept by "Remove demo content"
      })),
    );
    added.articles = docs.length;
  }

  if ((await BannerModel.estimatedDocumentCount()) === 0) {
    const docs = await BannerModel.insertMany(
      banners.map((b) => ({
        eyebrow: b.eyebrow ?? "",
        title: b.title,
        text: b.text,
        image: b.image ? { url: b.image } : null,
        buttons: b.buttons.map((button) => ({
          label: button.label,
          href: button.href,
          variant: button.variant ?? "gold",
        })),
        order: b.order,
        active: b.active,
        isDemo: false, // the crest banner is real, kept by "Remove demo content"
      })),
    );
    added.banners = docs.length;
  }

  if ((await AlbumModel.estimatedDocumentCount()) === 0) {
    const docs = await AlbumModel.insertMany(
      albums.map((a) => ({
        title: a.title,
        slug: a.slug,
        createdAt: new Date(a.createdAt),
        photos: a.photos.map((p) => ({ url: p.src, alt: p.alt })),
        isDemo: false, // real MOU photos, kept by "Remove demo content"
      })),
    );
    added.albums = docs.length;
  }

  return added;
}

export async function removeDemoContent() {
  await connectDB();
  const [a, b, c] = await Promise.all([
    ArticleModel.deleteMany({ isDemo: true }),
    BannerModel.deleteMany({ isDemo: true }),
    AlbumModel.deleteMany({ isDemo: true }),
  ]);
  return { articles: a.deletedCount, banners: b.deletedCount, albums: c.deletedCount };
}
