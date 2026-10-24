import { ok, parseBody, serviceFailure } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import { revalidateSite } from "@/lib/cache";
import { addPhotosDto } from "@/modules/gallery/gallery.dto";
import { addPhotos } from "@/modules/gallery/gallery.service";

type Ctx = RouteContext<"/api/gallery/[id]/photos">;

// POST { photos: [{ url, publicId }] }: attaches photos that were already
// uploaded through /api/upload.
export const POST = withAdmin<Ctx>(async (req, { params }) => {
  const { id } = await params;
  const parsed = await parseBody(req, addPhotosDto);
  if (parsed.response) return parsed.response;

  const result = await addPhotos(id, parsed.data);
  if (!result.ok) return serviceFailure(result);

  revalidateSite();
  return ok({ album: result.album }, { status: 201 });
});
