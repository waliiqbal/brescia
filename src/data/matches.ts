import type {
  Match,
  Standing,
  Team,
} from "@/modules/matches/match.types";
import { relativeDate } from "./helpers";

export const teams: Team[] = [
  { id: "brescia", name: "Brescia Lions", short: "BL", color: "#0b3d22", isLions: true },
  { id: "milano", name: "Milano XI", short: "ML", color: "#1e4fa0" },
  { id: "roma", name: "Roma Strikers", short: "RM", color: "#8a1c24" },
  { id: "torino", name: "Torino Kings", short: "TO", color: "#5b2d8e" },
  { id: "napoli", name: "Napoli Royals", short: "NA", color: "#0f7a8a" },
];

const HOME_GROUND = "Brescia Cricket Ground";

/**
 * The new season's schedule has not been announced yet, so the sample
 * fixtures are switched off and the website shows "Coming soon" cards.
 * Set to true to bring the sample upcoming matches back.
 */
const SCHEDULE_ANNOUNCED = false;

/**
 * The league has not started yet: no results exist and every team is on zero.
 * Set to true to bring the sample results and the sample table back.
 */
const LEAGUE_STARTED = false;

const upcomingMatches: Match[] = [
  {
    id: "m-1",
    homeTeamId: "brescia",
    awayTeamId: "milano",
    date: relativeDate(4, 15, 0),
    ground: HOME_GROUND,
    status: "upcoming",
  },
  {
    id: "m-2",
    homeTeamId: "roma",
    awayTeamId: "brescia",
    date: relativeDate(7, 18, 0),
    ground: "Roma Stadium",
    status: "upcoming",
  },
  {
    id: "m-3",
    homeTeamId: "brescia",
    awayTeamId: "torino",
    date: relativeDate(12, 14, 30),
    ground: HOME_GROUND,
    status: "upcoming",
  },
  {
    id: "m-4",
    homeTeamId: "napoli",
    awayTeamId: "brescia",
    date: relativeDate(16, 16, 0),
    ground: "Napoli Cricket Park",
    status: "upcoming",
  },
];

const resultMatches: Match[] = [
  {
    id: "m-5",
    homeTeamId: "brescia",
    awayTeamId: "milano",
    date: relativeDate(-8, 16, 0),
    ground: HOME_GROUND,
    status: "completed",
    homeScore: "112/4",
    awayScore: "108/7",
    result: "won",
  },
  {
    id: "m-6",
    homeTeamId: "roma",
    awayTeamId: "brescia",
    date: relativeDate(-12, 18, 0),
    ground: "Roma Stadium",
    status: "completed",
    homeScore: "121/5",
    awayScore: "115/8",
    result: "lost",
  },
  {
    id: "m-7",
    homeTeamId: "brescia",
    awayTeamId: "torino",
    date: relativeDate(-17, 14, 30),
    ground: HOME_GROUND,
    status: "completed",
    homeScore: "98/2",
    awayScore: "95/9",
    result: "won",
  },
  {
    id: "m-8",
    homeTeamId: "napoli",
    awayTeamId: "brescia",
    date: relativeDate(-22, 15, 0),
    ground: "Napoli Cricket Park",
    status: "completed",
    homeScore: "87/9",
    awayScore: "88/3",
    result: "won",
  },
  {
    id: "m-9",
    homeTeamId: "brescia",
    awayTeamId: "roma",
    date: relativeDate(-27, 17, 0),
    ground: HOME_GROUND,
    status: "completed",
    homeScore: "104/5",
    awayScore: "99/6",
    result: "won",
  },
  {
    id: "m-10",
    homeTeamId: "torino",
    awayTeamId: "brescia",
    date: relativeDate(-32, 14, 0),
    ground: "Torino Oval",
    status: "completed",
    homeScore: "90/8",
    awayScore: "91/4",
    result: "won",
  },
];

export const matches: Match[] = [
  ...(SCHEDULE_ANNOUNCED ? upcomingMatches : []),
  ...(LEAGUE_STARTED ? resultMatches : []),
];

const sampleStandings: Standing[] = [
  { teamId: "brescia", played: 6, won: 5, lost: 1, points: 10 },
  { teamId: "roma", played: 6, won: 4, lost: 2, points: 8 },
  { teamId: "milano", played: 6, won: 3, lost: 3, points: 6 },
  { teamId: "torino", played: 6, won: 2, lost: 4, points: 4 },
  { teamId: "napoli", played: 6, won: 1, lost: 5, points: 2 },
];

/**
 * The other teams of the league are not announced yet, so until the league
 * starts the table shows only the Lions on zero. Set TEAMS_ANNOUNCED to true to
 * list every team on zero.
 */
const TEAMS_ANNOUNCED = false;

const zeroStandings: Standing[] = sampleStandings
  .filter((row) => TEAMS_ANNOUNCED || row.teamId === "brescia")
  .map((row) => ({
    teamId: row.teamId,
    played: 0,
    won: 0,
    lost: 0,
    points: 0,
  }));

export const standings: Standing[] = LEAGUE_STARTED
  ? sampleStandings
  : zeroStandings;
