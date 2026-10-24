import type { Banner } from "@/modules/banners/banner.types";

// Demo banners used by "Load demo content" in the admin dashboard.
export type SeedBanner = Omit<Banner, "isDemo" | "imagePublicId">;

export const banners: SeedBanner[] = [
  {
    id: "banner-1",
    eyebrow: "Italia T10 · Season 2026",
    title: "Brescia Lions",
    text: "One City. One Identity. The Lion of Brescia is here to roar — follow every match, every moment.",
    buttons: [
      { label: "View Fixtures", href: "/fixtures" },
      { label: "Latest News", href: "/news", variant: "outline" },
    ],
    order: 1,
    active: true,
  },
];
