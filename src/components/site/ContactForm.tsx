"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

const fieldClass =
  "w-full rounded-lg border border-gold/30 bg-green-deep/70 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";

// Visual only for now: nothing is sent. It is connected to /api/messages
// (saved in the admin panel + emailed to the club) in Phase 10.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="py-10 text-center">
        <p className="font-heading text-2xl font-bold text-gold-light">
          Thank you!
        </p>
        <p className="mt-2 text-cream/80">
          Your message has been received. We will get back to you soon.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSent(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gold"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={fieldClass}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gold"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gold"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="How can we help?"
          className={`${fieldClass} resize-y`}
        />
      </div>
      <Button type="submit">Send Message</Button>
    </form>
  );
}
