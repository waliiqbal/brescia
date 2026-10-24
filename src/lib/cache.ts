import { revalidatePath } from "next/cache";

/**
 * Called after every admin change. The public pages are built ahead of time
 * for speed, so this makes them rebuild with the new content right away.
 */
export function revalidateSite() {
  revalidatePath("/", "layout");
}
