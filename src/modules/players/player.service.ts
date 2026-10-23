import { about } from "@/data/about";
import { players } from "@/data/players";
import { PLAYER_ROLES, type Player, type PlayerRole } from "./player.types";

export function isPlayerRole(value: unknown): value is PlayerRole {
  return PLAYER_ROLES.includes(value as PlayerRole);
}

export async function getPlayers(role?: PlayerRole): Promise<Player[]> {
  return role ? players.filter((p) => p.role === role) : players;
}

export async function getPlayerBySlug(slug: string) {
  return players.find((p) => p.slug === slug) ?? null;
}

export async function getPlayerSlugs() {
  return players.map((p) => p.slug);
}

/** Players with the same role first, then the rest of the squad. */
export async function getRelatedPlayers(player: Player, limit = 4) {
  const others = players.filter((p) => p.id !== player.id);
  const sameRole = others.filter((p) => p.role === player.role);
  const rest = others.filter((p) => p.role !== player.role);
  return [...sameRole, ...rest].slice(0, limit);
}

/** Coaching and support staff shown under the squad. */
export async function getSupportStaff() {
  return about.coaching;
}
