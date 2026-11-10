/**
 * A detective in profile: fedora, raised coat collar, a magnifying glass held
 * up to the face. He stands dark against a green backlight, with mist
 * drifting behind and in front of him. Original drawing, made for this page.
 */
export function Detective({ label, className = "" }: { label: string; className?: string }) {
  const dark = "#020604";
  return (
    <div className={`cq-noir ${className}`} role="img" aria-label={label}>
      <div className="cq-noir-glow" aria-hidden="true" />
      <div className="cq-noir-fog cq-noir-fog--back" aria-hidden="true" />
      <svg className="cq-noir-figure" viewBox="0 0 500 600" aria-hidden="true" focusable="false">
        <defs>
          {/* light coming through the lens from behind (taste-skill-ignore: requested backlit look) */}
          <radialGradient id="cq-lens-light" cx="45%" cy="40%" r="65%">
            <stop offset="0" stopColor="#f6fff2" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#cfe9c3" stopOpacity="0.72" />
            <stop offset="1" stopColor="#5f9b74" stopOpacity="0.45" />
          </radialGradient>
        </defs>

        {/* coat and shoulders, collar turned up */}
        <path
          d="M200 252 C170 258 122 276 96 312 C68 352 58 440 50 600 L362 600 C354 520 346 440 332 382 C324 346 304 304 266 270 Z"
          fill={dark}
        />
        <path d="M184 244 L218 232 L246 276 L200 300 Z" fill={dark} />

        {/* head in profile, bowed towards the glass */}
        <path
          d="M188 168 C182 196 184 222 196 242 L206 278 L256 278 C256 262 262 252 272 248 C282 246 288 240 286 233 C283 229 285 225 290 223 C286 219 287 215 286 212 C292 211 298 208 301 205 C294 196 285 186 279 172 Z"
          fill={dark}
        />

        {/* fedora: crown with a pinched top, wide brim dipping to the front */}
        <path d="M164 158 C160 120 174 90 198 82 C208 91 226 93 238 84 C264 88 284 114 288 154 C256 148 200 150 164 158 Z" fill={dark} />
        <path
          d="M110 162 C158 142 294 142 342 178 C348 184 338 188 328 184 C294 170 238 166 198 168 C162 170 132 174 120 172 C106 170 102 166 110 162 Z"
          fill={dark}
        />

        {/* raised arm and hand */}
        <path
          d="M300 328 C312 380 330 406 354 400 C374 394 382 362 384 334 L362 326 C358 350 352 366 344 368 C334 370 324 350 318 322 Z"
          fill={dark}
        />
        <path d="M356 300 C370 294 388 302 388 318 C388 336 374 344 362 340 C350 336 348 312 356 300 Z" fill={dark} />

        {/* the magnifying glass */}
        <path d="M372 304 L384 290" stroke={dark} strokeWidth="10" strokeLinecap="round" />
        <g className="cq-noir-lens">
          <circle cx="390" cy="244" r="44" fill="url(#cq-lens-light)" />
          <path d="M366 226 A30 30 0 0 1 392 212" fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
        </g>
        <circle cx="390" cy="244" r="44" fill="none" stroke={dark} strokeWidth="5.5" />
      </svg>
      <div className="cq-noir-fog cq-noir-fog--front" aria-hidden="true" />
    </div>
  );
}
