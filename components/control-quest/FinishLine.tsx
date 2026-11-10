/**
 * The finish-line band from the Control Quest brand guideline (p. 36):
 * equal squares, Forest and White, starting top-left with Forest, two rows,
 * full bleed. It marks an edge of the layout and never carries text.
 */
export function FinishLine({ id }: { id: string }) {
  const patternId = `cq-chequer-${id}`;
  return (
    <svg className="cq-finish" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <defs>
        <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#ffffff" />
          <rect width="12" height="12" fill="#0b3d24" />
          <rect x="12" y="12" width="12" height="12" fill="#0b3d24" />
        </pattern>
      </defs>
      <rect width="100%" height="24" fill={`url(#${patternId})`} />
    </svg>
  );
}
