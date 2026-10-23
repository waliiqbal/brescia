import type { Banner } from "@/modules/banners/banner.types";
import { sample } from "./helpers";

export const banners: Banner[] = [
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
  {
    id: "banner-2",
    eyebrow: "Match Day",
    title: "Roar With The Lions",
    text: "Packed stands, floodlights and a city behind us. Come to the Brescia Cricket Ground and be part of the pride.",
    image: sample("36230651"),
    buttons: [
      { label: "Upcoming Matches", href: "/fixtures" },
      { label: "Gallery", href: "/gallery", variant: "outline" },
    ],
    order: 2,
    active: true,
  },
  {
    id: "banner-3",
    eyebrow: "New Season",
    title: "Meet The 2026 Squad",
    text: "Fifteen players, two new signings and one goal: take the Lions to the top of Italian cricket.",
    image: sample("29949985"),
    buttons: [
      { label: "Meet The Squad", href: "/squad" },
      { label: "Read The Story", href: "/news", variant: "outline" },
    ],
    order: 3,
    active: true,
  },
  {
    id: "banner-4",
    eyebrow: "The Pride of Brescia",
    title: "Our Fans, Our Strength",
    text: "From the first ball to the last over, the Lions carry a whole city on their shoulders. Join the pride.",
    image: sample("3892912"),
    buttons: [
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Contact Us", href: "/contact", variant: "outline" },
    ],
    order: 4,
    active: true,
  },
  {
    id: "banner-5",
    eyebrow: "Victory",
    title: "Celebrate Every Win",
    text: "Five wins from six. Relive the match reports, the scores and the moments that put us at the top of the table.",
    image: sample("17628715"),
    buttons: [
      { label: "Results", href: "/results" },
      { label: "Match Reports", href: "/news", variant: "outline" },
    ],
    order: 5,
    active: true,
  },
  {
    id: "banner-6",
    eyebrow: "Match Days",
    title: "A Ground Full Of History",
    text: "Classic stands, a great atmosphere and unforgettable match days. Do not miss the next game at home.",
    image: sample("2799556"),
    buttons: [
      { label: "View Fixtures", href: "/fixtures" },
      { label: "Latest News", href: "/news", variant: "outline" },
    ],
    order: 6,
    active: true,
  },
  {
    id: "banner-7",
    eyebrow: "Our Home",
    title: "Brescia Cricket Ground",
    text: "The home of the Lions. Learn about the club, its history and the story behind the crest.",
    image: sample("31739439"),
    buttons: [
      { label: "About The Club", href: "/about" },
      { label: "Meet The Squad", href: "/squad", variant: "outline" },
    ],
    order: 7,
    active: true,
  },
];
