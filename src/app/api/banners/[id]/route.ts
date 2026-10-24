import { apiError, ok, parseBody } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import { revalidateSite } from "@/lib/cache";
import { updateBannerDto } from "@/modules/banners/banner.dto";
import {
  deleteBanner,
  getBannerForAdmin,
  updateBanner,
} from "@/modules/banners/banner.service";

type Ctx = RouteContext<"/api/banners/[id]">;

export const GET = withAdmin<Ctx>(async (_req, { params }) => {
  const { id } = await params;
  const banner = await getBannerForAdmin(id);
  return banner ? ok({ banner }) : apiError("not_found", "Banner not found.", 404);
});

export const PATCH = withAdmin<Ctx>(async (req, { params }) => {
  const { id } = await params;
  const parsed = await parseBody(req, updateBannerDto);
  if (parsed.response) return parsed.response;

  const banner = await updateBanner(id, parsed.data);
  if (!banner) return apiError("not_found", "Banner not found.", 404);

  revalidateSite();
  return ok({ banner });
});

export const DELETE = withAdmin<Ctx>(async (_req, { params }) => {
  const { id } = await params;
  if (!(await deleteBanner(id))) {
    return apiError("not_found", "Banner not found.", 404);
  }
  revalidateSite();
  return ok();
});
