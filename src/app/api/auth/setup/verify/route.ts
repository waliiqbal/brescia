import type { NextRequest } from "next/server";
import { authFailure, ok, parseBody } from "@/lib/api";
import { verifySetupDto } from "@/modules/auth/auth.dto";
import { verifySetup } from "@/modules/auth/auth.service";

// Step 2 of first-time setup: confirms the code and activates the account.
// The admin is NOT logged in here; they are sent to the login screen. Setup
// is closed for good after this.
export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, verifySetupDto);
  if (parsed.response) return parsed.response;

  const result = await verifySetup(parsed.data);
  if (!result.ok) return authFailure(result);
  return ok();
}
