import type { Metadata } from "next";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { AdminHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "New article" };

export default function NewArticlePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <AdminHeader eyebrow="News" title="Add new article" />
      <ArticleForm />
    </div>
  );
}
