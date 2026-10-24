"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Banner } from "@/modules/banners/banner.types";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

const AUTOPLAY_MS = 5000;

export function HeroSlider({ slides }: { slides: Banner[] }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
    // `index` restarts the timer after a manual change, so a slide the visitor
    // picked is never skipped straight away.
  }, [count, index]);

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative overflow-hidden border-b border-gold/20"
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStart.current;
        touchStart.current = null;
        if (Math.abs(diff) > 50) go(index + (diff < 0 ? 1 : -1));
      }}
    >
      <div className="grid">
        {slides.map((slide, i) => {
          const active = i === index;
          const Title = i === 0 ? "h1" : "h2";
          return (
            <div
              key={slide.id}
              inert={!active}
              aria-hidden={!active}
              className={cn(
                "relative col-start-1 row-start-1 transition-opacity duration-700",
                active ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0",
              )}
            >
              {slide.image ? (
                <>
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={i === 1}
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-green-deep/95 via-green-deep/55 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-t from-green-deep/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-green-deep/60 md:hidden" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,var(--color-green-card),var(--color-green-dark)_45%,var(--color-green-deep)_80%)]" />
              )}

              <div
                className={cn(
                  "relative mx-auto flex min-h-[34rem] max-w-7xl px-4 pb-16 pt-12 sm:px-6 md:min-h-[36rem]",
                  slide.image
                    ? "items-center"
                    : "flex-col-reverse items-center gap-8 md:flex-row",
                )}
              >
                <div
                  className={cn(
                    "text-center md:text-left",
                    slide.image ? "max-w-xl" : "flex-1",
                  )}
                >
                  {slide.eyebrow && (
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                      {slide.eyebrow}
                    </p>
                  )}
                  <Title className="mt-3 font-heading text-5xl font-bold uppercase leading-tight text-gold-light sm:text-6xl">
                    {slide.title}
                  </Title>
                  <p className="mt-4 max-w-md text-cream/85 max-md:mx-auto">
                    {slide.text}
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                    {slide.buttons.map((button) => (
                      <ButtonLink
                        key={button.label}
                        href={button.href}
                        variant={button.variant}
                      >
                        {button.label}
                      </ButtonLink>
                    ))}
                  </div>
                </div>

                {!slide.image && (
                  <Logo
                    size={480}
                    className="w-64 shrink-0 sm:w-80 md:mr-10 md:w-96 lg:mr-24 lg:w-[26rem]"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 sm:px-6 md:justify-between">
            <div className="flex gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index
                      ? "w-8 bg-gold"
                      : "w-5 bg-cream/30 hover:bg-cream/60",
                  )}
                />
              ))}
            </div>

            <div className="hidden gap-2 md:flex">
              {(["prev", "next"] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
                  onClick={() => go(index + (dir === "prev" ? -1 : 1))}
                  className="flex size-9 items-center justify-center rounded-full border border-gold/60 bg-green-deep/60 text-xl leading-none text-gold-light backdrop-blur transition-colors hover:bg-gold hover:text-green-deep"
                >
                  {dir === "prev" ? "‹" : "›"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
