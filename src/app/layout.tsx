import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import { ALLOW_INDEXING, SITE_URL, siteConfig } from "@/lib/site";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const description =
  "Official website of Brescia Lions. Fixtures, results, news, squad and photos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.name} — ${siteConfig.motto}`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  keywords: [
    "Brescia Lions",
    "cricket",
    "Brescia",
    "Italia T10",
    "Lombardia",
    "cricket club",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_GB",
    title: `${siteConfig.name} — ${siteConfig.motto}`,
    description,
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} crest`,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  // The site stays hidden from Google until ALLOW_INDEXING=true is set.
  robots: ALLOW_INDEXING ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#062a17",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-dvh flex-col antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
