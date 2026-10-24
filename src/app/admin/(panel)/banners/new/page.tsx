import type { Metadata } from "next";
import { BannerForm } from "@/components/admin/BannerForm";
import { AdminHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Add banner" };

export default function NewBannerPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <AdminHeader eyebrow="Main banner" title="Add banner" />
      <BannerForm />
    </div>
  );
}
