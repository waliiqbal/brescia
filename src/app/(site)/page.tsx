import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AboutSection } from "@/components/site/AboutSection";
import { HeroSlider } from "@/components/site/HeroSlider";
import { MatchCard } from "@/components/site/MatchCard";
import { NewsCard } from "@/components/site/NewsCard";
import { PhotoMosaic } from "@/components/site/PhotoMosaic";
import { PlayerCard } from "@/components/site/PlayerCard";
import { ScrollRow } from "@/components/site/ScrollRow";
import { Section } from "@/components/site/Section";
import { SponsorsRow } from "@/components/site/SponsorsRow";
import { getAbout } from "@/modules/about/about.service";
import { getLatestArticles } from "@/modules/articles/article.service";
import { getActiveBanners } from "@/modules/banners/banner.service";
import { getLatestGalleryItems } from "@/modules/gallery/gallery.service";
import { getUpcomingMatches } from "@/modules/matches/match.service";
import { getPlayers } from "@/modules/players/player.service";
import { getSponsors } from "@/modules/sponsors/sponsor.service";
import { JsonLd } from "@/components/site/JsonLd";
import { LOGO_SRC, SITE_URL, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [banners, matches, articles, about, players, gallery, sponsors] =
    await Promise.all([
      getActiveBanners(),
      getUpcomingMatches(3),
      getLatestArticles(3),
      getAbout(),
      getPlayers(),
      getLatestGalleryItems(5),
      getSponsors(),
    ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SportsTeam",
          name: siteConfig.name,
          sport: "Cricket",
          slogan: siteConfig.tagline,
          url: SITE_URL,
          logo: `${SITE_URL}${LOGO_SRC}`,
          location: {
            "@type": "Place",
            address: siteConfig.contact.address,
          },
        }}
      />
      <HeroSlider slides={banners} />

      <Section>
        <SectionHeading
          white="Upcoming"
          gold="Fixtures"
          subtitle="Next matches of the Brescia Lions"
        />
        {matches.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <p className="text-cream/70">No upcoming matches right now.</p>
        )}
        <div className="mt-10 text-center">
          <ButtonLink href="/fixtures" variant="outline">
            View All Fixtures
          </ButtonLink>
        </div>
      </Section>

      <Section className="bg-black/20">
        <SectionHeading
          white="Latest"
          gold="News"
          subtitle="Stories from the den"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/news" variant="outline">
            View All News
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <AboutSection about={about} />
      </Section>

      <Section className="bg-black/20">
        <SectionHeading
          white="Meet the"
          gold="Squad"
          subtitle="The pride of Brescia"
        />
        <ScrollRow>
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              className="w-52 shrink-0 snap-start sm:w-60"
            />
          ))}
        </ScrollRow>
        <div className="mt-6 text-center">
          <ButtonLink href="/squad" variant="outline">
            View Full Squad
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <SectionHeading
          white="Photo"
          gold="Gallery"
          subtitle="Moments from the field"
        />
        <PhotoMosaic items={gallery} />
        <div className="mt-10 text-center">
          <ButtonLink href="/gallery" variant="outline">
            View Gallery
          </ButtonLink>
        </div>
      </Section>

      <Section className="bg-black/20">
        <SectionHeading
          white="Our"
          gold="Sponsors"
          subtitle="Proud partners of the Lions"
        />
        <SponsorsRow sponsors={sponsors} />
      </Section>
    </>
  );
}
