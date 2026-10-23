import Image from "next/image";
import type { Team } from "@/modules/matches/match.types";
import { LOGO_SRC } from "@/lib/site";

export function TeamBadge({
  team,
  size = 56,
}: {
  team: Team;
  size?: number;
}) {
  if (team.isLions) {
    return (
      <Image
        src={LOGO_SRC}
        alt={team.name}
        width={size}
        height={Math.round(size * (909 / 900))}
        style={{ width: size, height: "auto" }}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label={team.name}
      style={{
        backgroundColor: team.color,
        width: size,
        height: size,
        fontSize: Math.round(size * 0.32),
      }}
      className="flex shrink-0 items-center justify-center rounded-full border border-cream/20 font-heading font-bold text-cream"
    >
      {team.short}
    </span>
  );
}
