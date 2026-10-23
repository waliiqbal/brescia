"use client";

import { Button } from "@/components/ui/Button";

// Visual only for now. It is connected to /api/subscribe in Phase 9.
export function SubscribeForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-sm overflow-hidden rounded-full border border-gold/30 bg-green-dark"
    >
      <input
        type="email"
        required
        placeholder="Your email"
        aria-label="Your email"
        className="min-w-0 flex-1 bg-transparent px-4 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
      />
      <Button type="submit" className="rounded-none">
        Subscribe
      </Button>
    </form>
  );
}
