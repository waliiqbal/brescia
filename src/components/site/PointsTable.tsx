import type { StandingRow } from "@/modules/matches/match.types";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { TeamBadge } from "./TeamBadge";

export function PointsTable({ rows }: { rows: StandingRow[] }) {
  return (
    <Card className="overflow-hidden hover:translate-y-0">
      <h2 className="px-5 pt-5 font-heading text-2xl font-bold uppercase tracking-wide text-cream">
        Points <span className="text-gold-light">Table</span>
      </h2>

      <table className="mt-4 w-full text-sm">
        <caption className="sr-only">League points table</caption>
        <thead>
          <tr className="text-[10px] uppercase tracking-widest text-gold">
            <th scope="col" className="px-3 py-2 text-left font-bold">
              #
            </th>
            <th scope="col" className="px-2 py-2 text-left font-bold">
              Team
            </th>
            {(["P", "W", "L", "Pts"] as const).map((h) => (
              <th key={h} scope="col" className="px-2 py-2 text-center font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.teamId}
              className={cn(
                "border-t border-gold/15",
                row.team.isLions
                  ? "bg-gold/15 font-bold text-gold-light"
                  : "text-cream/90",
              )}
            >
              <td className="px-3 py-3">{row.position}</td>
              <td className="px-2 py-3">
                <span className="flex items-center gap-2">
                  <TeamBadge team={row.team} size={26} />
                  <span className="leading-tight">{row.team.name}</span>
                </span>
              </td>
              <td className="px-2 py-3 text-center">{row.played}</td>
              <td className="px-2 py-3 text-center">{row.won}</td>
              <td className="px-2 py-3 text-center">{row.lost}</td>
              <td className="px-2 py-3 text-center font-bold">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
