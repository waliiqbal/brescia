import type { Banner } from "./banner.types";

/** Shown when the admin has no active banner, so the home page is never empty. */
export const defaultBanner: Banner = {
  id: "default",
  eyebrow: "Italia T10 · Season 2026",
  title: "Brescia Lions",
  text: "One City. One Identity. The Lion of Brescia is here to roar — follow every match, every moment.",
  buttons: [
    { label: "View Fixtures", href: "/fixtures" },
    { label: "Latest News", href: "/news", variant: "outline" },
  ],
  order: 0,
  active: true,
  isDemo: false,
};
