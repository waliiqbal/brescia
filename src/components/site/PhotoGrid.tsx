"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Photo } from "@/modules/gallery/gallery.types";
import { Lightbox } from "./Lightbox";

export function PhotoGrid({
  photos,
  albumTitle,
}: {
  photos: Photo[];
  albumTitle: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const count = photos.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo ${i + 1} of ${count}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-gold/25 shadow-card"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={i < 4}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Lightbox
          items={photos.map((photo) => ({
            src: photo.src,
            alt: photo.alt,
            caption: albumTitle,
          }))}
          index={open}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  );
}
