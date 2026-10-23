import Image from "next/image";
import Link from "next/link";
import { HASHTAG_SRC, navLinks, siteConfig } from "@/lib/site";
import { Logo } from "./Logo";
import { SubscribeForm } from "./SubscribeForm";

const quickLinks = navLinks.filter((l) => l.href !== "/");

export function Footer() {
  const { contact, socials } = siteConfig;

  return (
    <footer className="mt-auto border-t-2 border-gold bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo size={110} />
          <p className="mt-4 text-sm text-cream/80">{siteConfig.tagline}.</p>
          <Image
            src={HASHTAG_SRC}
            alt={siteConfig.hashtag}
            width={180}
            height={75}
            className="mt-2 h-auto w-44"
          />
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-cream/80">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>{contact.address}</li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-gold-light">
                {contact.email}
              </a>
            </li>
            <li>{contact.phone}</li>
          </ul>
        </div>

        <div id="follow" className="scroll-mt-24">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">
            Follow the Lions
          </h3>
          <div className="mb-6 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-gold text-[10px] font-bold text-gold-light transition-colors hover:bg-gold hover:text-green-deep"
              >
                {s.short}
              </a>
            ))}
          </div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">
            Subscribe
          </h3>
          <SubscribeForm />
        </div>
      </div>

      <div className="border-t border-gold/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-cream/50 sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Privacy Policy · Terms</p>
        </div>
      </div>
    </footer>
  );
}
