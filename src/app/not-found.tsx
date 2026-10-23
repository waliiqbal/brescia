import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { NotFoundContent } from "@/components/site/NotFoundContent";

export const metadata: Metadata = { title: "Page not found" };

// Used for URLs that match no route at all. Pages inside (site) that call
// notFound() use (site)/not-found.tsx, which already has the site layout.
export default function GlobalNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
