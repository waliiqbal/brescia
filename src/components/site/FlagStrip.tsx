export function FlagStrip() {
  return (
    <div className="flex h-1" aria-hidden="true">
      <span className="flex-1 bg-flag-green" />
      <span className="flex-1 bg-cream" />
      <span className="flex-1 bg-flag-red" />
    </div>
  );
}
