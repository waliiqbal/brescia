import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FormMessage } from "@/components/admin/auth/AuthFields";
import { AuthShell } from "@/components/admin/auth/AuthShell";
import { LoginForm } from "@/components/admin/auth/LoginForm";
import { getCurrentAdmin } from "@/lib/auth";
import { isSetupOpen } from "@/modules/auth/auth.service";

export const metadata: Metadata = { title: "Admin login" };

const notices: Record<string, string> = {
  created: "Your admin account is ready. Log in with your email and password.",
  reset: "Your password was changed. Log in with the new password.",
};

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  if (await getCurrentAdmin()) redirect("/admin");
  const setupOpen = await isSetupOpen();

  const params = await searchParams;
  const notice = Object.keys(notices).find((key) => params[key] === "1");

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to manage the Brescia Lions website."
      footer={
        setupOpen && (
          <>
            First time here?{" "}
            <Link
              href="/admin/setup"
              className="font-semibold text-gold-light underline-offset-4 hover:underline"
            >
              Create the admin account
            </Link>
          </>
        )
      }
    >
      {notice && (
        <div className="mb-5">
          <FormMessage tone="success">{notices[notice]}</FormMessage>
        </div>
      )}
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
