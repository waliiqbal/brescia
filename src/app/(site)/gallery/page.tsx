import type { Metadata } from "next";
import { AlbumCard } from "@/components/site/AlbumCard";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { getAlbums } from "@/modules/gallery/gallery.service";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo albums from Brescia Lions matches, training, fans and celebrations.",
};

export default async function GalleryPage() {
  const albums = await getAlbums();

  return (
    <>
      <PageHeader
        eyebrow="Moments from the field"
        white="Photo"
        gold="Gallery"
        subtitle="Match days, training, fans and celebrations. Open an album to see every photo."
      />

      <Section>
        {albums.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album, i) => (
              <li key={album.id}>
                <AlbumCard album={album} priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-gold/25 bg-green-dark/60 px-6 py-14 text-center text-cream/70">
            No albums yet. Check back soon.
          </p>
        )}
      </Section>
    </>
  );
}
