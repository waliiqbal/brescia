import Image from "next/image";
import type { Sponsor } from "@/modules/sponsors/sponsor.types";
import { Card } from "@/components/ui/Card";

export function SponsorsRow({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {sponsors.map((sponsor) => {
        const content = sponsor.logo ? (
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={140}
            height={56}
            className="h-auto max-h-12 w-auto object-contain"
          />
        ) : (
          <span className="text-center text-xs font-bold uppercase tracking-widest text-cream/80">
            {sponsor.name}
          </span>
        );

        return (
          <li key={sponsor.id}>
            <Card className="flex h-24 items-center justify-center px-4">
              {sponsor.url ? (
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-full items-center justify-center"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
