import { SignJWT, jwtVerify } from "jose";

// Pure JWT helpers (no next/headers), shared by lib/auth.ts and proxy.ts.

export const SESSION_COOKIE = "brescia_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set and at least 32 characters long.");
  }
  return secret;
}

const key = () => new TextEncoder().encode(getSecret());

export interface SessionPayload {
  /** Admin id. */
  sub: string;
  /** Session version; bumped on password reset to log out old sessions. */
  sv: number;
}

export async function signSessionToken(payload: SessionPayload) {
  return new SignJWT({ sv: payload.sv })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(key());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key(), {
      algorithms: ["HS256"],
    });
    if (typeof payload.sub !== "string" || typeof payload.sv !== "number") {
      return null;
    }
    return { sub: payload.sub, sv: payload.sv };
  } catch {
    return null;
  }
}
