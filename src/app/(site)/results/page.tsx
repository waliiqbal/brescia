import type { Metadata } from "next";
import { FixturesView } from "@/components/site/FixturesView";
import { getResults, getStandings } from "@/modules/matches/match.service";

export const metadata: Metadata = {
  title: "Results",
  description: "Match results and the league table for the Brescia Lions.",
};

export default async function ResultsPage() {
  const [matches, standings] = await Promise.all([
    getResults(),
    getStandings(),
  ]);

  return <FixturesView tab="results" matches={matches} standings={standings} />;
}
