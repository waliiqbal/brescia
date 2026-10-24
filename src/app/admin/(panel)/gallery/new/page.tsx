import type { Metadata } from "next";
import { AlbumCreateForm } from "@/components/admin/AlbumCreateForm";
import { AdminHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "New album" };

export default function NewAlbumPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <AdminHeader eyebrow="Gallery" title="New album" />
      <AlbumCreateForm />
    </div>
  );
}
