"use client";

import { Button, ButtonLink } from "@/components/ui/Button";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section
      role="alert"
      className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center"
    >
      <p className="font-heading text-6xl font-bold text-gold-light">Oops</p>
      <h1 className="mt-4 font-heading text-2xl font-bold uppercase text-cream">
        Something went wrong
      </h1>
      <p className="mt-2 text-cream/70">
        We could not load this page. Please try again in a moment.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="outline">
          Back to Home
        </ButtonLink>
      </div>
    </section>
  );
}
