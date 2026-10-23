import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Logo } from "@/components/site/Logo";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { StaffCard } from "@/components/site/StaffCard";
import { StatsList } from "@/components/site/StatsList";
import { getAbout } from "@/modules/about/about.service";
import { HASHTAG_SRC, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of the Brescia Lions: our history, the meaning of our crest, our mission and the people behind the club.",
};

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <>
      <PageHeader
        eyebrow={siteConfig.tagline}
        white="About"
        gold="Us"
        subtitle="One city. One identity. Meet the club, the people and the story behind the crest."
      />

      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <SectionHeading white="Our" gold="Story" className="mb-5" />
            <div className="space-y-4 text-cream/80">
              {about.history.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <StatsList stats={about.stats} />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gold/40 shadow-card">
            <Image
              src={about.historyImage}
              alt="Brescia Cricket Ground"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-green-deep/50 to-transparent" />
          </div>
        </div>
      </Section>

      <Section className="bg-black/20">
        <SectionHeading
          white="The Story Behind"
          gold="The Crest"
          subtitle={siteConfig.tagline}
        />
        <div className="grid items-center gap-10 lg:grid-cols-[22rem_1fr] lg:gap-14">
          <div className="flex flex-col items-center gap-4">
            <Logo size={420} className="w-72 sm:w-80 lg:w-full" />
            <Image
              src={HASHTAG_SRC}
              alt={siteConfig.hashtag}
              width={220}
              height={92}
              className="h-auto w-48"
            />
          </div>
          <div>
            <p className="mb-6 text-lg text-cream/80">{about.crestIntro}</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {about.crestElements.map((item) => (
                <li key={item.title}>
                  <Card className="h-full p-5 hover:translate-y-0">
                    <h3 className="font-heading text-lg font-bold text-gold-light">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">
                      {item.text}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-7 hover:translate-y-0">
            <h2 className="font-heading text-3xl font-bold uppercase text-cream">
              Our <span className="text-gold-light">Mission</span>
            </h2>
            <p className="mt-4 leading-relaxed text-cream/80">{about.mission}</p>
          </Card>
          <Card className="p-7 hover:translate-y-0">
            <h2 className="font-heading text-3xl font-bold uppercase text-cream">
              Our <span className="text-gold-light">Vision</span>
            </h2>
            <p className="mt-4 leading-relaxed text-cream/80">{about.vision}</p>
          </Card>
        </div>
      </Section>

      <Section className="bg-black/20">
        <SectionHeading
          white="Owners &"
          gold="Management"
          subtitle="The people who run the club"
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {about.management.map((member) => (
            <li key={member.id}>
              <StaffCard member={member} />
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          white="Coaching"
          gold="Staff"
          subtitle="The team behind the team"
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.coaching.map((member) => (
            <li key={member.id}>
              <StaffCard member={member} />
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <ButtonLink href="/squad">Meet The Squad</ButtonLink>
        </div>
      </Section>
    </>
  );
}
