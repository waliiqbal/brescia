import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminAuthLayout({ children }: LayoutProps<"/admin">) {
  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center bg-[radial-gradient(ellipse_at_50%_0%,var(--color-green-card),var(--color-green-dark)_45%,var(--color-green-deep)_85%)] px-4 py-10">
      {children}
    </main>
  );
}
