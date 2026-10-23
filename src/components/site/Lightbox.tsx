"use client";

import Image from "next/image";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
}

type LightboxProps = {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
};

export function Lightbox({ items, index, onClose, onStep }: LightboxProps) {
  const current = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onStep]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4 text-cream">
        <p className="text-sm font-bold">
          {current.caption}{" "}
          <span className="text-cream/50">
            {index + 1} / {items.length}
          </span>
        </p>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="rounded-full p-2 text-2xl leading-none text-gold-light hover:text-cream"
        >
          ✕
        </button>
      </div>

      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="100vw"
          className="object-contain px-2 pb-6 sm:px-16"
        />
      </div>

      {items.length > 1 &&
        (["prev", "next"] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            aria-label={dir === "prev" ? "Previous photo" : "Next photo"}
            onClick={(e) => {
              e.stopPropagation();
              onStep(dir === "prev" ? -1 : 1);
            }}
            className={cn(
              "absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-black/60 text-2xl text-gold-light hover:bg-gold hover:text-green-deep",
              dir === "prev" ? "left-2 sm:left-4" : "right-2 sm:right-4",
            )}
          >
            {dir === "prev" ? "‹" : "›"}
          </button>
        ))}
    </div>
  );
}
