export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="animate-pulse">
      <div className="border-b border-gold/20 bg-green-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="h-3 w-40 rounded bg-gold/30" />
          <div className="mt-4 h-10 w-72 max-w-full rounded bg-cream/15" />
          <div className="mt-4 h-4 w-96 max-w-full rounded bg-cream/10" />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-72 rounded-xl border border-gold/20 bg-green-card/40"
          />
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
