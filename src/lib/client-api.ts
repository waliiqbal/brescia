// Browser-side helper for calling our JSON API routes.

export type ApiResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      message: string;
      fields?: Record<string, string[]>;
      code?: string;
      retryAfter?: number;
    };

export async function sendJson<T = Record<string, unknown>>(
  url: string,
  body: unknown,
  method: "POST" | "PATCH" | "DELETE" = "POST",
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    if (res.ok && json?.ok) return { ok: true, data: json as T };
    return {
      ok: false,
      message: json?.error?.message ?? "Something went wrong. Please try again.",
      fields: json?.error?.fields,
      code: json?.error?.code,
      retryAfter: json?.error?.retryAfter,
    };
  } catch {
    return {
      ok: false,
      message: "Network error. Check your connection and try again.",
    };
  }
}

/** Only allows redirects back into the admin area. */
export function safeAdminPath(next: string | null | undefined) {
  if (next && next.startsWith("/admin") && !next.startsWith("//")) return next;
  return "/admin";
}
