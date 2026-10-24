import type { NextRequest } from "next/server";
import { authFailure, ok, parseBody } from "@/lib/api";
import { setupDto } from "@/modules/auth/auth.dto";
import { startSetup } from "@/modules/auth/auth.service";

// Step 1 of first-time setup: checks the email, stores the pending account
// and emails a 6-digit code. Only works while no admin exists.
export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, setupDto);
  if (parsed.response) return parsed.response;

  const result = await startSetup(parsed.data);
  if (!result.ok) return authFailure(result);
  return ok();
}
