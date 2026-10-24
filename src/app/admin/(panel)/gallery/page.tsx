import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdminHeader, EmptyState } from "@/components/admin/ui";
import { ButtonLink } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { listAlbumsForAdmin } from "@/modules/gallery/gallery.service";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryAdminPage() {
  const albums = await listAlbumsForAdmin();

  return (
    <div className="mx-auto max-w-6xl">
      <AdminHeader
        eyebrow="Gallery"
        title="Photo albums"
        description="Group photos into albums like “Match Day” or “Training”. The first photo of an album is its cover."
        action={
          <ButtonLink href="/admin/gallery/new" variant="dark">
            + New album
          </ButtonLink>
        }
      />

      {albums.length === 0 ? (
        <EmptyState
          title="No albums yet"
          text="Create an album, then upload many photos at once."
          href="/admin/gallery/new"
          actionLabel="New album"
        />
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => {
            const cover = album.photos[0];
            return (
              <li key={album.id}>
                <Link
                  href={`/admin/gallery/${album.id}`}
                  className="group block overflow-hidden rounded-xl border border-green-dark/15 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-paper">
                    {cover ? (
                      <Image src={cover.src} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <p className="absolute inset-0 flex items-center justify-center text-sm text-ink/45">
                        No photos yet
                      </p>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-ink">{album.title}</p>
                    <p className="mt-1 text-xs text-ink/55">
                      {album.photos.length} photo{album.photos.length === 1 ? "" : "s"} · {formatDate(album.createdAt)}
                      {album.isDemo && " · Demo"}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
