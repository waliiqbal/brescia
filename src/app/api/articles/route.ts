import { ok, parseBody, serviceFailure } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import { revalidateSite } from "@/lib/cache";
import { createArticleDto } from "@/modules/articles/article.dto";
import {
  createArticle,
  listArticlesForAdmin,
  type ArticleStatusFilter,
} from "@/modules/articles/article.service";

// GET /api/articles?q=&status=all|published|draft  (admin: includes drafts)
export const GET = withAdmin(async (req) => {
  const params = req.nextUrl.searchParams;
  const status = params.get("status");
  const articles = await listArticlesForAdmin({
    query: params.get("q") ?? undefined,
    status: (["published", "draft"].includes(status ?? "") ? status : "all") as ArticleStatusFilter,
  });
  return ok({ articles });
});

export const POST = withAdmin(async (req) => {
  const parsed = await parseBody(req, createArticleDto);
  if (parsed.response) return parsed.response;

  const result = await createArticle(parsed.data);
  if (!result.ok) return serviceFailure(result);

  revalidateSite();
  return ok({ article: result.article }, { status: 201 });
});
