import { banners } from "@/data/banners";
import type { Banner } from "./banner.types";

// Phase 2: returns sample data. Phase 8 swaps the body for a MongoDB query.
export async function getActiveBanners(): Promise<Banner[]> {
  return banners.filter((b) => b.active).sort((a, b) => a.order - b.order);
}
