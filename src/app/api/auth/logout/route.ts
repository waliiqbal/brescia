import type { NextRequest } from "next/server";
import { apiError, isSameOrigin, ok } from "@/lib/api";
import { destroySession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return apiError("forbidden", "Cross-site request blocked.", 403);
  }
  await destroySession();
  return ok();
}
