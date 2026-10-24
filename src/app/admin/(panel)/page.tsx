import type { Metadata } from "next";
import Link from "next/link";
import { DemoContentCard } from "@/components/admin/DemoContentCard";
import { AdminHeader, Panel } from "@/components/admin/ui";
import { requireAdminPage } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { isMailConfigured } from "@/lib/mail";
import { ALLOW_INDEXING } from "@/lib/site";
import { isCloudinaryConfigured } from "@/lib/upload";
import { countArticles } from "@/modules/articles/article.service";
import { countBanners } from "@/modules/banners/banner.service";
import { countAlbums } from "@/modules/gallery/gallery.service";
import { countDemoContent } from "@/modules/seed/seed.service";

export const metadata: Metadata = { title: "Dashboard" };

async function checkDatabase() {
  try {
    const mongoose = await connectDB();
    return mongoose.connection.readyState === 1
      ? { ok: true, detail: `Connected (${mongoose.connection.name})` }
      : { ok: false, detail: "Not connected" };
  } catch {
    return { ok: false, detail: "Could not connect" };
  }
}

function Row({ label, ok, detail }: { label: string; ok: boolean; detail: string }) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <span className="flex items-center gap-3 text-sm font-semibold">
        <span
          aria-hidden="true"
          className={`size-2.5 rounded-full ${ok ? "bg-flag-green" : "bg-flag-red"}`}
        />
        {label}
      </span>
      <span className="text-right text-sm text-ink/60">{detail}</span>
    </li>
  );
}

function Stat({
  label,
  value,
  note,
  href,
}: {
  label: string;
  value: number;
  note: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-green-dark/15 border-l-4 border-l-gold bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <p className="font-heading text-4xl font-bold text-green-dark">{value}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{label}</p>
      <p className="text-xs text-ink/55">{note}</p>
    </Link>
  );
}

export default async function DashboardPage() {
  const admin = await requireAdminPage();
  const database = await checkDatabase();

  const [articles, banners, gallery, demo] = database.ok
    ? await Promise.all([
        countArticles(),
        countBanners(),
        countAlbums(),
        countDemoContent(),
      ])
    : [
        { published: 0, drafts: 0 },
        { total: 0, active: 0 },
        { albums: 0, photos: 0 },
        { articles: 0, banners: 0, albums: 0 },
      ];

  const anyEmpty =
    articles.published + articles.drafts === 0 ||
    banners.total === 0 ||
    gallery.albums === 0;

  return (
    <div className="mx-auto max-w-6xl">
      <AdminHeader
        eyebrow="Dashboard"
        title="Welcome back"
        description={`Logged in as ${admin.email}. Matches, squad and the other sections appear in the menu as they are added.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Published stories" value={articles.published} note={`${articles.drafts} draft${articles.drafts === 1 ? "" : "s"}`} href="/admin/news" />
        <Stat label="Live banners" value={banners.active} note={`${banners.total} in total`} href="/admin/banners" />
        <Stat label="Photo albums" value={gallery.albums} note="On the gallery page" href="/admin/gallery" />
        <Stat label="Photos" value={gallery.photos} note="Across all albums" href="/admin/gallery" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-heading text-xl font-bold text-green-dark">System status</h2>
          <ul className="mt-3 divide-y divide-green-dark/10">
            <Row label="Database" ok={database.ok} detail={database.detail} />
            <Row label="Email (OTP codes)" ok={isMailConfigured()} detail={isMailConfigured() ? "Configured" : "Not configured"} />
            <Row label="Image storage" ok={isCloudinaryConfigured()} detail={isCloudinaryConfigured() ? "Cloudinary ready" : "Not configured"} />
            <Row label="Admin account" ok detail={admin.email} />
            <Row label="Search engines" ok detail={ALLOW_INDEXING ? "Site can be indexed" : "Hidden (demo mode)"} />
          </ul>
        </Panel>

        <DemoContentCard demo={demo} canLoad={anyEmpty} />
      </div>
    </div>
  );
}
