export interface Team {
  id: string;
  name: string;
  /** 2-letter code shown inside the badge. */
  short: string;
  /** Badge colour. */
  color: string;
  isLions?: boolean;
}

export type MatchStatus = "upcoming" | "completed";
export type MatchResult = "won" | "lost" | "tie" | "no-result";

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  /** ISO date string. */
  date: string;
  ground: string;
  status: MatchStatus;
  homeScore?: string;
  awayScore?: string;
  /** Result from the Lions' point of view. */
  result?: MatchResult;
}

export interface MatchWithTeams extends Match {
  home: Team;
  away: Team;
}

export interface Standing {
  teamId: string;
  played: number;
  won: number;
  lost: number;
  points: number;
}

export interface StandingRow extends Standing {
  position: number;
  team: Team;
}
