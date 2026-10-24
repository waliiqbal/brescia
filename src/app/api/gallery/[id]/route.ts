import { apiError, ok, parseBody, serviceFailure } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import { revalidateSite } from "@/lib/cache";
import { updateAlbumDto } from "@/modules/gallery/gallery.dto";
import {
  deleteAlbum,
  getAlbumForAdmin,
  updateAlbum,
} from "@/modules/gallery/gallery.service";

type Ctx = RouteContext<"/api/gallery/[id]">;

export const GET = withAdmin<Ctx>(async (_req, { params }) => {
  const { id } = await params;
  const album = await getAlbumForAdmin(id);
  return album ? ok({ album }) : apiError("not_found", "Album not found.", 404);
});

export const PATCH = withAdmin<Ctx>(async (req, { params }) => {
  const { id } = await params;
  const parsed = await parseBody(req, updateAlbumDto);
  if (parsed.response) return parsed.response;

  const result = await updateAlbum(id, parsed.data);
  if (!result.ok) return serviceFailure(result);

  revalidateSite();
  return ok({ album: result.album });
});

// Deletes the album and all its photos.
export const DELETE = withAdmin<Ctx>(async (_req, { params }) => {
  const { id } = await params;
  if (!(await deleteAlbum(id))) {
    return apiError("not_found", "Album not found.", 404);
  }
  revalidateSite();
  return ok();
});
