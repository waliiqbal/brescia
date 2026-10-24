import type { NextRequest } from "next/server";
import { authFailure, ok, parseBody } from "@/lib/api";
import { createSession } from "@/lib/auth";
import { loginDto } from "@/modules/auth/auth.dto";
import { login } from "@/modules/auth/auth.service";

export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, loginDto);
  if (parsed.response) return parsed.response;

  const result = await login(parsed.data);
  if (!result.ok) return authFailure(result);

  await createSession(result.admin);
  return ok();
}
