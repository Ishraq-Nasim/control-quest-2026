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

/**
 * The detective's magnifier over the winding road: the page's one drawing.
 * Flat fills in the palette's own colours.
 */
export function MagnifierMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      role="img"
      aria-label="Drawing of a detective's magnifying glass held over a winding green road"
    >
      <defs>
        <clipPath id="cq-lens">
          <circle cx="226" cy="168" r="96" />
        </clipPath>
      </defs>
      <rect width="400" height="400" fill="#0f2b1b" />
      {/* the road, winding towards the horizon */}
      <path
        d="M70 400 C 110 330, 300 300, 250 230 S 150 140, 210 70 S 300 20, 330 0"
        fill="none"
        stroke="#1d4d31"
        strokeWidth="58"
        strokeLinecap="butt"
      />
      <path
        d="M70 400 C 110 330, 300 300, 250 230 S 150 140, 210 70 S 300 20, 330 0"
        fill="none"
        stroke="#a3e635"
        strokeWidth="5"
        strokeDasharray="20 16"
      />
      {/* magnified view inside the lens */}
      <g clipPath="url(#cq-lens)">
        <rect width="400" height="400" fill="#163a26" />
        <g transform="translate(226 168) scale(1.7) translate(-226 -168)">
          <path
            d="M70 400 C 110 330, 300 300, 250 230 S 150 140, 210 70 S 300 20, 330 0"
            fill="none"
            stroke="#22583a"
            strokeWidth="58"
          />
          <path
            d="M70 400 C 110 330, 300 300, 250 230 S 150 140, 210 70 S 300 20, 330 0"
            fill="none"
            stroke="#a3e635"
            strokeWidth="5"
            strokeDasharray="20 16"
          />
        </g>
      </g>
      {/* rim and handle */}
      <circle cx="226" cy="168" r="96" fill="none" stroke="#eef3ea" strokeWidth="14" />
      <path d="M158 236 L 82 312" stroke="#eef3ea" strokeWidth="26" strokeLinecap="square" />
      <path d="M158 236 L 140 254" stroke="#a9c0ae" strokeWidth="26" strokeLinecap="butt" />
    </svg>
  );
}
