// Static site defaults. Contact details and social links move to the
// admin Settings module in Phase 3 and override these values.

export const LOGO_SRC = "/images/logo.png";
export const HASHTAG_SRC = "/images/hashtag.png";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Search engines may index the site only when this is explicitly turned on. */
export const ALLOW_INDEXING = process.env.ALLOW_INDEXING === "true";

export const siteConfig = {
  name: "Brescia Lions",
  tagline: "Un simbolo, una città, una famiglia",
  motto: "One City. One Identity.",
  hashtag: "#OrgoglioDiBrescia",
  contact: {
    address: "Brescia, Lombardia, Italia",
    email: "info@brescialions.it",
    phone: "+39 000 000 000",
  },
  socials: [
    { label: "Instagram", short: "IG", href: "#" },
    { label: "Facebook", short: "FB", href: "#" },
    { label: "X", short: "X", href: "#" },
    { label: "YouTube", short: "YT", href: "#" },
    { label: "TikTok", short: "TT", href: "#" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Squad", href: "/squad" },
  { label: "Fixtures", href: "/fixtures" },
  { label: "Results", href: "/results" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
