import Image from "next/image";
import Link from "next/link";
import type { Album } from "@/modules/gallery/gallery.types";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export function AlbumCard({
  album,
  priority = false,
}: {
  album: Album;
  priority?: boolean;
}) {
  const cover = album.photos[0];

  return (
    <Link href={`/gallery/${album.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-green-deep/80 via-transparent to-transparent" />
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-cream">
            {album.photos.length} photos
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-heading text-lg font-bold text-cream">
            {album.title}
          </h3>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-gold">
            {formatDate(album.createdAt)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
