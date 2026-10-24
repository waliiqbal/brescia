import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlbumManager } from "@/components/admin/AlbumManager";
import { AdminHeader } from "@/components/admin/ui";
import { getAlbumForAdmin } from "@/modules/gallery/gallery.service";

export const metadata: Metadata = { title: "Album" };

export default async function AlbumAdminPage({
  params,
}: PageProps<"/admin/gallery/[id]">) {
  const { id } = await params;
  const album = await getAlbumForAdmin(id);
  if (!album) notFound();

  return (
    <div className="mx-auto max-w-6xl">
      <Link href="/admin/gallery" className="text-sm font-semibold text-green-card hover:underline">
        ← All albums
      </Link>
      <div className="mt-4">
        <AdminHeader eyebrow="Gallery" title={album.title} />
      </div>
      <AlbumManager album={album} />
    </div>
  );
}
