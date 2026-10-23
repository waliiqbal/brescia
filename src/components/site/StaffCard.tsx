import Image from "next/image";
import type { StaffMember } from "@/modules/about/about.types";
import { Card } from "@/components/ui/Card";

export function StaffCard({ member }: { member: StaffMember }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3] bg-linear-to-br from-green-card to-green-deep">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <svg
            viewBox="0 0 100 75" preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
            className="absolute inset-0 size-full text-cream/15"
          >
            <circle cx="50" cy="28" r="14" fill="currentColor" />
            <path d="M20 75c0-20 12-32 30-32s30 12 30 32z" fill="currentColor" />
          </svg>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-green-deep via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-bold text-cream">{member.name}</h3>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-gold-light">
            {member.role}
          </p>
        </div>
      </div>
      {member.bio && (
        <p className="p-4 text-sm leading-relaxed text-cream/70">{member.bio}</p>
      )}
    </Card>
  );
}
