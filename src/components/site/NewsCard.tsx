import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/modules/articles/article.types";
import { formatDate } from "@/lib/utils";
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
          <Image
            src={article.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-green-deep/70 to-transparent" />
          <Badge className="absolute left-3 top-3">{article.category}</Badge>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
            {formatDate(article.publishedAt)}
          </p>
          <h3 className="mt-2 line-clamp-2 font-semibold leading-snug text-cream">
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
