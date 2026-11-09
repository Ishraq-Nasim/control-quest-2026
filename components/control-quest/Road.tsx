/**
 * The drawn motif: the dashed centre line of the Road to Green, taken from
 * the logo and the background. Decorative.
 */
export function RoadLine({ className = "", vertical = false }: { className?: string; vertical?: boolean }) {
  return vertical ? (
    <svg className={className} viewBox="0 0 6 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <line
        x1="3"
        y1="0"
        x2="3"
        y2="100"
        stroke="var(--cq-faint)"
        strokeWidth="4"
        strokeDasharray="10 9"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <line
        x1="0"
        y1="4"
        x2="100"
        y2="4"
        stroke="var(--cq-accent)"
        strokeWidth="4"
        strokeDasharray="28 20"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
