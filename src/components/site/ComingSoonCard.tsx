import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Logo } from "./Logo";

type ComingSoonCardProps = {
  title?: string;
  text?: string;
  className?: string;
};

// Shown instead of match cards while the season schedule is not announced.
export function ComingSoonCard({
  title = "Fixtures Coming Soon",
  text = "The schedule for the new season has not been announced yet. Match dates, times and grounds will appear here as soon as they are confirmed.",
  className,
}: ComingSoonCardProps) {
  return (
    <Card
      className={`flex flex-col items-center gap-6 p-8 text-center hover:translate-y-0 sm:flex-row sm:p-10 sm:text-left ${className ?? ""}`}
    >
      <Logo size={96} className="shrink-0" />
      <div className="flex-1">
        <p className="inline-block rounded-full border border-gold/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-light">
          Coming Soon
        </p>
        <h3 className="mt-3 font-heading text-2xl font-bold uppercase text-cream sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 max-w-2xl text-cream/75">{text}</p>
      </div>
      <ButtonLink href="/news" variant="outline" className="shrink-0">
        Latest News
      </ButtonLink>
    </Card>
  );
}
