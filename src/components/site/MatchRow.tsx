import type {
  MatchResult,
  MatchWithTeams,
  Team,
} from "@/modules/matches/match.types";
import { matchDateParts } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TeamBadge } from "./TeamBadge";

const resultBadge: Record<
  MatchResult,
  { label: string; tone: "green" | "red" | "muted" }
> = {
  won: { label: "Won", tone: "green" },
  lost: { label: "Lost", tone: "red" },
  tie: { label: "Tie", tone: "muted" },
  "no-result": { label: "No result", tone: "muted" },
};

function TeamColumn({ team }: { team: Team }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <TeamBadge team={team} size={44} />
      <span className="text-[11px] font-bold uppercase leading-tight tracking-wide sm:text-xs">
        {team.name}
      </span>
    </div>
  );
}

export function MatchRow({ match }: { match: MatchWithTeams }) {
  const date = matchDateParts(match.date);
  const completed = match.status === "completed";
  const status = completed && match.result ? resultBadge[match.result] : null;

  return (
    <Card className="p-4 hover:translate-y-0 sm:p-5">
      <div className="grid items-center gap-4 sm:grid-cols-[6.5rem_1fr_7rem] sm:gap-6">
        <div className="flex items-baseline justify-center gap-2 sm:block sm:text-left">
          <p className="whitespace-nowrap font-heading text-2xl font-bold leading-none text-gold-light">
            {date.day} <span className="text-lg">{date.month}</span>
          </p>
          <p className="whitespace-nowrap text-[11px] font-bold uppercase tracking-widest text-cream/60 sm:mt-1">
            {date.weekday} · {date.time}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <TeamColumn team={match.home} />
          {completed ? (
            <p className="whitespace-nowrap text-center font-heading text-base font-bold text-gold-light sm:text-xl">
              {match.homeScore} – {match.awayScore}
            </p>
          ) : (
            <span className="font-heading text-xl text-gold">VS</span>
          )}
          <TeamColumn team={match.away} />
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end">
          {status ? (
            <Badge tone={status.tone} className="px-3 py-1 text-[11px]">
              {status.label}
            </Badge>
          ) : (
            <Badge className="px-3 py-1 text-[11px]">Upcoming</Badge>
          )}
          <p className="text-center text-xs text-cream/60 sm:text-right">
            <span aria-hidden="true">📍 </span>
            {match.ground}
          </p>
        </div>
      </div>
    </Card>
  );
}
