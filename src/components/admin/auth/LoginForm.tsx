"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { safeAdminPath, sendJson } from "@/lib/client-api";
import { FormMessage, PasswordField, TextField } from "./AuthFields";

export function LoginForm() {
  const router = useRouter();
  const next = safeAdminPath(useSearchParams().get("next"));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError("");
    setLoading(true);

    const result = await sendJson("/api/auth/login", {
      email: form.get("email"),
      password: form.get("password"),
    });

    if (!result.ok) {
      setError(result.message);
      setLoading(false);
      return;
    }
    router.replace(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        autoFocus
      />
      <PasswordField
        label="Password"
        name="password"
        autoComplete="current-password"
        required
      />
      <FormMessage tone="error">{error}</FormMessage>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Log in"}
      </Button>
      <p className="text-center text-sm">
        <Link
          href="/admin/forgot-password"
          className="text-gold-light underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
      </p>
    </form>
  );
}
