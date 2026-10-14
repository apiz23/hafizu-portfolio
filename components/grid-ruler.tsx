/**
 * Faint vertical column rulers behind a section — the architectural
 * grid that gives the cream canvas structure without adding noise.
 */
export default function GridRuler({ columns = 6 }: { columns?: number }) {
  return (
    <div className="grid-ruler" aria-hidden="true">
      {Array.from({ length: columns }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
