import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/admin/auth/AuthShell";
import { SetupForm } from "@/components/admin/auth/SetupForm";
import { getCurrentAdmin } from "@/lib/auth";
import { adminExists, allowedAdminEmail } from "@/modules/auth/auth.service";

export const metadata: Metadata = { title: "Create admin account" };

export default async function SetupPage() {
  if (await getCurrentAdmin()) redirect("/admin");
  // Setup is a one-time step: once the admin exists, this page is gone.
  if (await adminExists()) redirect("/admin/login");

  return (
    <AuthShell
      title="Create the admin account"
      subtitle="This is a one-time step. Enter your email and choose a password, then confirm your email with the code we send you."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/admin/login"
            className="font-semibold text-gold-light underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <SetupForm restricted={Boolean(allowedAdminEmail())} />
    </AuthShell>
  );
}
