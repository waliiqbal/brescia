import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { AdminHeader } from "@/components/admin/ui";
import { getArticleForAdmin } from "@/modules/articles/article.service";

export const metadata: Metadata = { title: "Edit article" };

export default async function EditArticlePage({
  params,
}: PageProps<"/admin/news/[id]">) {
  const { id } = await params;
  const article = await getArticleForAdmin(id);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-6xl">
      <AdminHeader
        eyebrow="News"
        title="Edit article"
        action={
          <DeleteButton
            endpoint={`/api/articles/${article.id}`}
            itemName="this story"
            message="The story will be removed from the website and its cover image deleted."
            redirectTo="/admin/news"
          />
        }
      />
      <ArticleForm article={article} />
    </div>
  );
}
