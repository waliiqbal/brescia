"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { GalleryItem } from "@/modules/gallery/gallery.types";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

export function PhotoMosaic({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const count = items.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:h-[30rem] md:grid-cols-4 md:grid-rows-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo: ${item.albumTitle}`}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-gold/25 shadow-card",
              i === 0
                ? "col-span-2 aspect-[4/3] md:aspect-auto md:row-span-2"
                : "aspect-square md:aspect-auto",
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={
                i === 0
                  ? "(min-width: 768px) 50vw, 100vw"
                  : "(min-width: 768px) 25vw, 50vw"
              }
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-cream">
              {item.albumTitle}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          items={items.map((item) => ({
            src: item.src,
            alt: item.alt,
            caption: item.albumTitle,
          }))}
          index={open}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  );
}
