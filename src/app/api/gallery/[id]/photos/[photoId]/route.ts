import { apiError, ok, parseBody } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import { revalidateSite } from "@/lib/cache";
import { coverDto } from "@/modules/gallery/gallery.dto";
import { removePhoto, setCover } from "@/modules/gallery/gallery.service";

type Ctx = RouteContext<"/api/gallery/[id]/photos/[photoId]">;

// PATCH { cover: true } makes this photo the album cover.
export const PATCH = withAdmin<Ctx>(async (req, { params }) => {
  const { id, photoId } = await params;
  const parsed = await parseBody(req, coverDto);
  if (parsed.response) return parsed.response;

  const album = await setCover(id, photoId);
  if (!album) return apiError("not_found", "Photo not found.", 404);

  revalidateSite();
  return ok({ album });
});

export const DELETE = withAdmin<Ctx>(async (_req, { params }) => {
  const { id, photoId } = await params;
  if (!(await removePhoto(id, photoId))) {
    return apiError("not_found", "Photo not found.", 404);
  }
  revalidateSite();
  return ok();
});
