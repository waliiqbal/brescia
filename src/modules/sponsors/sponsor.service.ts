import { sponsors } from "@/data/sponsors";

export async function getSponsors() {
  return [...sponsors].sort((a, b) => a.order - b.order);
}
