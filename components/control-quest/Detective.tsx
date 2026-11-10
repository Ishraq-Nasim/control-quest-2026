/**
 * A detective in a fedora and trench coat, holding up a magnifying glass.
 * Flat fills in the palette's own greens, lime on the lens and belt buckle.
 * The figure floats gently above a patch of ground.
 */
export function Detective({ label, className = "" }: { label: string; className?: string }) {
  const body = "#25603e";
  const shade = "#1a4a2f";
  const ink = "#eef3ea";
  const lime = "#a3e635";
  return (
    <svg className={`cq-detective ${className}`} viewBox="0 0 380 540" role="img" aria-label={label}>
      {/* the ground beneath him */}
      <ellipse className="cq-detective-ground" cx="178" cy="522" rx="118" ry="11" fill="#0b2015" />
      <g className="cq-detective-figure">
        {/* coat */}
        <path d="M92 236 C96 210 120 196 150 194 L204 194 C236 196 256 212 262 240 L290 506 L64 506 Z" fill={body} />
        {/* raised arm */}
        <path d="M238 220 C264 220 284 200 298 172 L320 184 C304 226 278 252 246 258 Z" fill={body} />
        {/* collar and lapels */}
        <path d="M128 200 L152 180 L166 242 Z" fill={shade} />
        <path d="M226 200 L202 180 L190 242 Z" fill={shade} />
        <path d="M154 196 L177 306 L200 196 Z" fill={shade} />
        {/* belt and buckle */}
        <path d="M80 356 L274 356 L277 380 L77 380 Z" fill={shade} />
        <rect x="162" y="352" width="32" height="32" fill="none" stroke={lime} strokeWidth="5" />
        {/* coat seam */}
        <path d="M178 384 L184 506" stroke={shade} strokeWidth="5" />
        {/* neck and head */}
        <path d="M158 168 L198 168 L200 198 L156 198 Z" fill={body} />
        <ellipse cx="178" cy="140" rx="34" ry="40" fill={body} />
        <path d="M208 136 L220 152 L208 158 Z" fill={body} />
        {/* fedora */}
        <path d="M130 114 C132 72 160 56 182 56 C208 56 228 74 230 112 Z" fill={shade} />
        <path d="M152 72 Q180 86 208 72" fill="none" stroke={body} strokeWidth="5" strokeLinecap="round" />
        <path d="M131 100 L229 100 L230 114 L130 114 Z" fill={body} />
        <path
          d="M96 120 C130 106 228 104 266 116 C274 120 266 128 256 128 C222 122 142 124 106 132 C92 134 88 124 96 120 Z"
          fill={shade}
        />
        {/* hand and magnifying glass */}
        <circle cx="308" cy="172" r="13" fill={body} />
        <path d="M308 172 L326 132" stroke={ink} strokeWidth="11" strokeLinecap="round" />
        <circle cx="340" cy="98" r="33" fill={lime} fillOpacity="0.16" stroke={ink} strokeWidth="10" />
        <path d="M322 86 A20 20 0 0 1 340 76" fill="none" stroke={lime} strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
