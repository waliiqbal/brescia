import type { AboutStat } from "@/modules/about/about.types";

export function StatsList({ stats }: { stats: AboutStat[] }) {
  return (
    <dl className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dd className="font-heading text-3xl font-bold text-gold-light">
            {stat.value}
          </dd>
          <dt className="mt-1 text-[10px] font-bold uppercase tracking-widest text-cream/60">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
