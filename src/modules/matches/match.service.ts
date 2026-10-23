import { matches, standings, teams } from "@/data/matches";
import type {
  MatchWithTeams,
  StandingRow,
} from "./match.types";

function withTeams(): MatchWithTeams[] {
  return matches.map((match) => ({
    ...match,
    home: teams.find((t) => t.id === match.homeTeamId)!,
    away: teams.find((t) => t.id === match.awayTeamId)!,
  }));
}

const time = (m: MatchWithTeams) => new Date(m.date).getTime();

/** Soonest first. */
export async function getUpcomingMatches(limit?: number) {
  const now = Date.now();
  const upcoming = withTeams()
    .filter((m) => m.status === "upcoming" && time(m) >= now)
    .sort((a, b) => time(a) - time(b));
  return limit ? upcoming.slice(0, limit) : upcoming;
}

/** Latest first. */
export async function getResults(limit?: number) {
  const results = withTeams()
    .filter((m) => m.status === "completed")
    .sort((a, b) => time(b) - time(a));
  return limit ? results.slice(0, limit) : results;
}

/** Upcoming matches (soonest first) followed by results (latest first). */
export async function getAllMatches() {
  const [upcoming, results] = await Promise.all([
    getUpcomingMatches(),
    getResults(),
  ]);
  return [...upcoming, ...results];
}

export async function getStandings(): Promise<StandingRow[]> {
  return [...standings]
    .sort((a, b) => b.points - a.points || b.won - a.won)
    .map((row, i) => ({
      ...row,
      position: i + 1,
      team: teams.find((t) => t.id === row.teamId)!,
    }));
}
