/**
 * The road: the guideline's process line (p. 37), a solid 3 px line that
 * connects the steps of a process, left to right or top to bottom.
 * Decorative.
 */
export function RoadLine({ className = "", vertical = false }: { className?: string; vertical?: boolean }) {
  return vertical ? (
    <svg className={className} viewBox="0 0 6 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <line x1="3" y1="0" x2="3" y2="100" stroke="var(--cq-faint)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <line x1="0" y1="4" x2="100" y2="4" stroke="var(--cq-forest)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
