import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/admin/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/admin/auth/ForgotPasswordForm";
import { getCurrentAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Reset admin password" };

export default async function ForgotPasswordPage() {
  if (await getCurrentAdmin()) redirect("/admin");

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the admin email. We will send a 6-digit code to it, then you can choose a new password."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
