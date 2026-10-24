import Link from "next/link";
import type {
  MatchWithTeams,
  StandingRow,
} from "@/modules/matches/match.types";
import { cn } from "@/lib/utils";
import { ComingSoonCard } from "./ComingSoonCard";
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

type FixturesViewProps = {
  tab: FixturesTab;
  matches: MatchWithTeams[];
  standings: StandingRow[];
};

// Shared by /fixtures (All, Upcoming) and /results.
export function FixturesView({ tab, matches, standings }: FixturesViewProps) {
  const hasUpcoming = matches.some((m) => m.status === "upcoming");
  const hasResults = matches.some((m) => m.status === "completed");
  const noMatches = matches.length === 0;

  return (
    <>
      <PageHeader
        eyebrow="Italia T10 · 2026"
        white="Fixtures &"
        gold="Results"
        subtitle="Every match of the season, with scores and the league table."
      />

      <Section>
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

        <div
          className={cn(
            "grid gap-8 lg:grid-cols-[1fr_22rem]",
            // With no matches the card and the table are the same height.
            noMatches ? "lg:items-stretch" : "lg:items-start",
          )}
        >
          <div>
            {tab !== "results" && !hasUpcoming && (
              <ComingSoonCard className={cn(noMatches ? "h-full" : "mb-4")} />
            )}
            {tab === "results" && !hasResults && (
              <ComingSoonCard
                title="Results Coming Soon"
                text="The league has not started yet. Match results and scores will appear here after the first match."
                className={cn(noMatches && "h-full")}
              />
            )}

            {matches.length > 0 && (
              <ul className="space-y-4">
                {matches.map((match) => (
                  <li key={match.id}>
                    <MatchRow match={match} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={cn(noMatches ? "lg:h-full" : "lg:sticky lg:top-28")}>
            <PointsTable rows={standings} />
          </div>
        </div>
      </Section>
    </>
  );
}
