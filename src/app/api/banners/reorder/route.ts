import { ok, parseBody } from "@/lib/api";
import { withAdmin } from "@/lib/auth";
import { revalidateSite } from "@/lib/cache";
import { reorderBannersDto } from "@/modules/banners/banner.dto";
import { reorderBanners } from "@/modules/banners/banner.service";

// POST { ids: [...] } with the banner ids in their new order.
export const POST = withAdmin(async (req) => {
  const parsed = await parseBody(req, reorderBannersDto);
  if (parsed.response) return parsed.response;

  await reorderBanners(parsed.data.ids);
  revalidateSite();
  return ok();
});
