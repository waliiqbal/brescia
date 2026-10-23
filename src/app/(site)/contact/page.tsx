import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Brescia Lions.",
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.contact.address,
)}&output=embed`;

export default function ContactPage() {
  const { contact, socials } = siteConfig;

  const details = [
    { icon: "📍", label: "Address", value: contact.address },
    {
      icon: "✉️",
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: "📞",
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="We would love to hear from you"
        white="Contact"
        gold="Us"
        subtitle="Questions, sponsorship, joining the club or just a message for the Lions? Write to us."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-5">
          <Card className="p-6 sm:p-8 lg:col-span-3 hover:translate-y-0">
            <h2 className="mb-6 font-heading text-2xl font-bold text-gold-light">
              Send a message
            </h2>
            <ContactForm />
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <Card className="p-6 hover:translate-y-0">
              <h2 className="mb-5 font-heading text-2xl font-bold text-gold-light">
                Club details
              </h2>
              <ul className="space-y-4">
                {details.map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span aria-hidden="true" className="text-lg">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-cream/90 hover:text-gold-light"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-cream/90">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-2 border-t border-gold/20 pt-5">
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
            </Card>

            <Card className="overflow-hidden hover:translate-y-0">
              <iframe
                title="Map of Brescia"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full border-0"
              />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
