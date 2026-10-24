"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { sendJson } from "@/lib/client-api";
import { LOGO_SRC } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Banner } from "@/modules/banners/banner.types";
import { DeleteButton } from "./DeleteButton";
import { Notice, StatusPill } from "./ui";

export function BannerList({ banners }: { banners: Banner[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run(request: Promise<{ ok: boolean; message?: string }>) {
    setBusy(true);
    setError("");
    const result = await request;
    setBusy(false);
    if (!result.ok) {
      setError(result.message ?? "Something went wrong.");
      return;
    }
    router.refresh();
  }

  function move(index: number, direction: -1 | 1) {
    const ids = banners.map((b) => b.id);
    const target = index + direction;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    run(sendJson("/api/banners/reorder", { ids }));
  }

  function toggle(banner: Banner) {
    run(sendJson(`/api/banners/${banner.id}`, { active: !banner.active }, "PATCH"));
  }

  return (
    <>
      {error && <Notice tone="error">{error}</Notice>}
      <ol className="space-y-3">
        {banners.map((banner, index) => (
          <li
            key={banner.id}
            className={cn(
              "flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center",
              banner.active ? "border-green-dark/15" : "border-green-dark/10 opacity-75",
            )}
          >
            <div className="flex items-center gap-3 md:w-12 md:flex-col md:gap-1">
              <button
                type="button"
                aria-label={`Move “${banner.title}” up`}
                disabled={busy || index === 0}
                onClick={() => move(index, -1)}
                className="rounded border border-green-dark/25 px-2 py-0.5 text-sm text-green-dark hover:bg-green-dark/10 disabled:opacity-30"
              >
                ▲
              </button>
              <span className="w-6 text-center text-sm font-bold text-ink/60">{index + 1}</span>
              <button
                type="button"
                aria-label={`Move “${banner.title}” down`}
                disabled={busy || index === banners.length - 1}
                onClick={() => move(index, 1)}
                className="rounded border border-green-dark/25 px-2 py-0.5 text-sm text-green-dark hover:bg-green-dark/10 disabled:opacity-30"
              >
                ▼
              </button>
            </div>

            <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-green-dark md:h-20 md:w-40">
              {banner.image ? (
                <Image src={banner.image} alt="" fill sizes="160px" className="object-cover" />
              ) : (
                <Image src={LOGO_SRC} alt="" fill sizes="160px" className="object-contain p-2" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              {banner.eyebrow && (
                <p className="text-[11px] font-bold uppercase tracking-widest text-green-card">{banner.eyebrow}</p>
              )}
              <p className="truncate font-semibold text-ink">{banner.title}</p>
              <p className="mt-0.5 line-clamp-2 text-sm text-ink/60">{banner.text}</p>
              {banner.isDemo && <p className="mt-1 text-xs text-ink/45">Demo content</p>}
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={banner.active}
              aria-label={`${banner.active ? "Hide" : "Show"} “${banner.title}” on the website`}
              disabled={busy}
              onClick={() => toggle(banner)}
              className="flex items-center gap-2"
            >
              <span
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  banner.active ? "bg-flag-green" : "bg-ink/25",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all",
                    banner.active ? "left-[1.375rem]" : "left-0.5",
                  )}
                />
              </span>
              <StatusPill tone={banner.active ? "green" : "gray"}>
                {banner.active ? "Live" : "Hidden"}
              </StatusPill>
            </button>

            <div className="flex gap-2">
              <ButtonLink href={`/admin/banners/${banner.id}`} variant="outlineDark" className="px-4 py-2">
                Edit
              </ButtonLink>
              <DeleteButton
                endpoint={`/api/banners/${banner.id}`}
                itemName="this banner"
                message={`"${banner.title}" will be removed from the home page slider.`}
              />
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
