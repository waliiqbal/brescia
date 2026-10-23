import type { MatchWithTeams, Team } from "@/modules/matches/match.types";
import { formatMatchDate } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { TeamBadge } from "./TeamBadge";

function TeamColumn({ team }: { team: Team }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <TeamBadge team={team} />
      <span className="text-[11px] font-bold uppercase tracking-wide">
        {team.name}
      </span>
    </div>
  );
}

export function MatchCard({ match }: { match: MatchWithTeams }) {
  return (
    <Card className="p-5 text-center">
      <p className="text-[11px] font-bold uppercase tracking-widest text-gold-light">
        {formatMatchDate(match.date)}
      </p>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-start gap-2">
        <TeamColumn team={match.home} />
        <span className="mt-4 font-heading text-xl text-gold">VS</span>
        <TeamColumn team={match.away} />
      </div>

      <p className="mt-5 text-xs text-cream/60">
        <span aria-hidden="true">📍 </span>
        {match.ground}
      </p>
    </Card>
  );
}
