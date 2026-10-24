import CoverImage from "@/components/site/CoverImage";
import Link from "next/link";
import type { Article } from "@/modules/articles/article.types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function NewsCard({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) {
  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden">
          {article.image ? (
            <CoverImage
              src={article.image}
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-green-card to-green-deep" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-green-deep/70 to-transparent" />
          <Badge className="absolute left-3 top-3">{article.category}</Badge>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-2 font-semibold leading-snug text-cream">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-cream/60">
            {article.excerpt}
          </p>
        </div>
      </Card>
    </Link>
  );
}
