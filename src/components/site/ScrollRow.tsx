"use client";

import { useRef, type ReactNode } from "react";

export function ScrollRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-6 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {(["prev", "next"] as const).map((dir) => (
        <button
          key={dir}
          type="button"
          aria-label={dir === "prev" ? "Scroll left" : "Scroll right"}
          onClick={() => scroll(dir === "prev" ? -1 : 1)}
          className={`absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-green-deep/80 text-2xl text-gold-light shadow-lg backdrop-blur transition-colors hover:bg-gold hover:text-green-deep md:flex ${dir === "prev" ? "-left-5" : "-right-5"}`}
        >
          {dir === "prev" ? "‹" : "›"}
        </button>
      ))}
    </div>
  );
}
