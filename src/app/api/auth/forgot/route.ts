import { after, type NextRequest } from "next/server";
import { ok, parseBody } from "@/lib/api";
import { forgotDto } from "@/modules/auth/auth.dto";
import { startReset } from "@/modules/auth/auth.service";

// Always answers the same way, whether or not the email is the admin's, and
// sends the code after the response so the timing gives nothing away either.
export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, forgotDto);
  if (parsed.response) return parsed.response;

  after(() => startReset(parsed.data.email));
  return ok();
}
