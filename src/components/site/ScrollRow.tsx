"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRowProps = {
  children: ReactNode;
  /** Show a thin gold scrollbar under the row (default: hidden). */
  scrollbar?: boolean;
  /** Gap classes between the cards. */
  gap?: string;
  /** No side padding, so the first card lines up with the page grid above. */
  flush?: boolean;
};

export function ScrollRow({
  children,
  scrollbar = false,
  gap = "gap-4",
  flush = false,
}: ScrollRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Arrows only show when there is something to scroll to.
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={update}
        className={cn(
          "flex snap-x snap-mandatory overflow-x-auto scroll-smooth pt-1",
          gap,
          !flush && "px-1",
          scrollbar
            ? "scroll-row-bar pb-4"
            : "pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {children}
      </div>
      {(["prev", "next"] as const).map((dir) => {
        const enabled = dir === "prev" ? canPrev : canNext;
        if (!enabled) return null;
        return (
          <button
            key={dir}
            type="button"
            aria-label={dir === "prev" ? "Scroll left" : "Scroll right"}
            onClick={() => scroll(dir === "prev" ? -1 : 1)}
            className={cn(
              "absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-green-deep/80 text-2xl text-gold-light shadow-lg backdrop-blur transition-colors hover:bg-gold hover:text-green-deep md:flex",
              dir === "prev" ? "-left-5" : "-right-5",
            )}
          >
            {dir === "prev" ? "‹" : "›"}
          </button>
        );
      })}
    </div>
  );
}
