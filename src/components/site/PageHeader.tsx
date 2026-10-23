type PageHeaderProps = {
  eyebrow?: string;
  white?: string;
  gold: string;
  subtitle?: string;
};

// Title band at the top of every inner page (News, Contact, Fixtures...).
export function PageHeader({ eyebrow, white, gold, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b border-gold/20 bg-[radial-gradient(ellipse_at_80%_0%,var(--color-green-card),var(--color-green-dark)_50%,var(--color-green-deep)_90%)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-heading text-4xl font-bold uppercase tracking-wide text-cream sm:text-5xl">
          {white && <>{white} </>}
          <span className="text-gold-light">{gold}</span>
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-cream/70">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
