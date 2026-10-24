import { ok, parseBody, serviceFailure } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import { revalidateSite } from "@/lib/cache";
import { createAlbumDto } from "@/modules/gallery/gallery.dto";
import { createAlbum, listAlbumsForAdmin } from "@/modules/gallery/gallery.service";

export const GET = withAdmin(async () => {
  return ok({ albums: await listAlbumsForAdmin() });
});

export const POST = withAdmin(async (req) => {
  const parsed = await parseBody(req, createAlbumDto);
  if (parsed.response) return parsed.response;

  const result = await createAlbum(parsed.data);
  if (!result.ok) return serviceFailure(result);

  revalidateSite();
  return ok({ album: result.album }, { status: 201 });
});
