import { z } from "zod";
import { ok, parseBody } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import { revalidateSite } from "@/lib/cache";
import {
  loadDemoContent,
  removeDemoContent,
} from "@/modules/seed/seed.service";

const seedDto = z.object({ action: z.enum(["load", "remove"]) });

// POST { action: "load" | "remove" } for the demo content on the dashboard.
export const POST = withAdmin(async (req) => {
  const parsed = await parseBody(req, seedDto);
  if (parsed.response) return parsed.response;

  const result =
    parsed.data.action === "load"
      ? await loadDemoContent()
      : await removeDemoContent();

  revalidateSite();
  return ok({ result });
});
