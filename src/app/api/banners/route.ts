import { ok, parseBody } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import { revalidateSite } from "@/lib/cache";
import { createBannerDto } from "@/modules/banners/banner.dto";
import {
  createBanner,
  listBannersForAdmin,
} from "@/modules/banners/banner.service";

export const GET = withAdmin(async () => {
  return ok({ banners: await listBannersForAdmin() });
});

export const POST = withAdmin(async (req) => {
  const parsed = await parseBody(req, createBannerDto);
  if (parsed.response) return parsed.response;

  const banner = await createBanner(parsed.data);
  revalidateSite();
  return ok({ banner }, { status: 201 });
});
