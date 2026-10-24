import type { NextRequest } from "next/server";
import { authFailure, ok, parseBody } from "@/lib/api";
import { resetDto } from "@/modules/auth/auth.dto";
import { finishReset } from "@/modules/auth/auth.service";

// Checks the emailed code and sets the new password. The admin is not logged
// in automatically; they log in with the new password.
export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, resetDto);
  if (parsed.response) return parsed.response;

  const result = await finishReset(parsed.data);
  if (!result.ok) return authFailure(result);
  return ok();
}
