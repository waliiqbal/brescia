import type { Metadata } from "next";
import { BannerList } from "@/components/admin/BannerList";
import { AdminHeader, EmptyState, Notice } from "@/components/admin/ui";
import { ButtonLink } from "@/components/ui/Button";
import { listBannersForAdmin } from "@/modules/banners/banner.service";

export const metadata: Metadata = { title: "Main banner" };

const notices: Record<string, string> = {
  created: "Banner added to the home page slider.",
  updated: "Banner updated.",
};

export default async function BannersAdminPage({
  searchParams,
}: PageProps<"/admin/banners">) {
  const params = await searchParams;
  const notice = typeof params.notice === "string" ? notices[params.notice] : undefined;
  const banners = await listBannersForAdmin();

  return (
    <div className="mx-auto max-w-5xl">
      <AdminHeader
        eyebrow="Home page"
        title="Main banner"
        description="The slides at the top of the home page. They change on their own every few seconds, in the order below."
        action={
          <ButtonLink href="/admin/banners/new" variant="dark">
            + Add banner
          </ButtonLink>
        }
      />

      {notice && <Notice>{notice}</Notice>}

      {banners.length === 0 ? (
        <EmptyState
          title="No banners yet"
          text="Until you add one, the home page shows the default Brescia Lions crest slide."
          href="/admin/banners/new"
          actionLabel="Add banner"
        />
      ) : (
        <BannerList banners={banners} />
      )}
    </div>
  );
}
