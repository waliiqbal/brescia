import { ButtonLink } from "@/components/ui/Button";

export function NotFoundContent() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="font-heading text-7xl font-bold text-gold-light">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold uppercase text-cream">
        Page not found
      </h1>
      <p className="mt-2 text-cream/70">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/news" variant="outline">
          Latest News
        </ButtonLink>
      </div>
    </section>
  );
}
