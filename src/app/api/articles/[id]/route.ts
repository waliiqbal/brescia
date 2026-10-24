import { apiError, ok, parseBody, serviceFailure } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import { revalidateSite } from "@/lib/cache";
import { updateArticleDto } from "@/modules/articles/article.dto";
import {
  deleteArticle,
  getArticleForAdmin,
  updateArticle,
} from "@/modules/articles/article.service";

type Ctx = RouteContext<"/api/articles/[id]">;

export const GET = withAdmin<Ctx>(async (_req, { params }) => {
  const { id } = await params;
  const article = await getArticleForAdmin(id);
  return article ? ok({ article }) : apiError("not_found", "Story not found.", 404);
});

export const PATCH = withAdmin<Ctx>(async (req, { params }) => {
  const { id } = await params;
  const parsed = await parseBody(req, updateArticleDto);
  if (parsed.response) return parsed.response;

  const result = await updateArticle(id, parsed.data);
  if (!result.ok) return serviceFailure(result);

  revalidateSite();
  return ok({ article: result.article });
});

export const DELETE = withAdmin<Ctx>(async (_req, { params }) => {
  const { id } = await params;
  if (!(await deleteArticle(id))) {
    return apiError("not_found", "Story not found.", 404);
  }
  revalidateSite();
  return ok();
});
