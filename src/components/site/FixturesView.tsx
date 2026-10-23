import Link from "next/link";
import type {
  MatchWithTeams,
  StandingRow,
} from "@/modules/matches/match.types";
import { cn } from "@/lib/utils";
import { MatchRow } from "./MatchRow";
import { PageHeader } from "./PageHeader";
import { PointsTable } from "./PointsTable";
import { Section } from "./Section";

export type FixturesTab = "all" | "upcoming" | "results";

const tabs: { id: FixturesTab; label: string; href: string }[] = [
  { id: "all", label: "All", href: "/fixtures" },
  { id: "upcoming", label: "Upcoming", href: "/fixtures?tab=upcoming" },
  { id: "results", label: "Results", href: "/results" },
];

const emptyText: Record<FixturesTab, string> = {
  all: "No matches have been added yet.",
  upcoming: "No upcoming matches right now. Check back soon.",
  results: "No results yet.",
};

type FixturesViewProps = {
  tab: FixturesTab;
  matches: MatchWithTeams[];
  standings: StandingRow[];
};

// Shared by /fixtures (All, Upcoming) and /results.
export function FixturesView({ tab, matches, standings }: FixturesViewProps) {
  return (
    <>
      <PageHeader
        eyebrow="Italia T10 · 2026"
        white="Fixtures &"
        gold="Results"
        subtitle="Every match of the season, with scores and the league table."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <nav aria-label="Match filter" className="mb-6 flex flex-wrap gap-2">
              {tabs.map((t) => (
                <Link
                  key={t.id}
                  href={t.href}
                  aria-current={t.id === tab ? "page" : undefined}
                  className={cn(
                    "rounded-full border px-5 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors",
                    t.id === tab
                      ? "border-gold bg-gold text-green-deep"
                      : "border-gold/40 text-gold-light hover:border-gold hover:bg-gold/10",
                  )}
                >
                  {t.label}
                </Link>
              ))}
            </nav>

            {matches.length > 0 ? (
              <ul className="space-y-4">
                {matches.map((match) => (
                  <li key={match.id}>
                    <MatchRow match={match} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-xl border border-gold/25 bg-green-dark/60 px-6 py-14 text-center text-cream/70">
                {emptyText[tab]}
              </p>
            )}
          </div>

          <div className="lg:sticky lg:top-28">
            <PointsTable rows={standings} />
          </div>
        </div>
      </Section>
    </>
  );
}
