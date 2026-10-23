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

export const matches: Match[] = [
  // Upcoming
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
  // Results
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

export const standings: Standing[] = [
  { teamId: "brescia", played: 6, won: 5, lost: 1, points: 10 },
  { teamId: "roma", played: 6, won: 4, lost: 2, points: 8 },
  { teamId: "milano", played: 6, won: 3, lost: 3, points: 6 },
  { teamId: "torino", played: 6, won: 2, lost: 4, points: 4 },
  { teamId: "napoli", played: 6, won: 1, lost: 5, points: 2 },
];
