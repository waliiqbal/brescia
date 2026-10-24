import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BannerForm } from "@/components/admin/BannerForm";
import { AdminHeader } from "@/components/admin/ui";
import { getBannerForAdmin } from "@/modules/banners/banner.service";

export const metadata: Metadata = { title: "Edit banner" };

export default async function EditBannerPage({
  params,
}: PageProps<"/admin/banners/[id]">) {
  const { id } = await params;
  const banner = await getBannerForAdmin(id);
  if (!banner) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <AdminHeader eyebrow="Main banner" title="Edit banner" />
      <BannerForm banner={banner} />
    </div>
  );
}
