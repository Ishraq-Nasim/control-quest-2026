import Image, { type StaticImageData } from "next/image";
import detective from "@/public/control-quest/trail/detective.webp";
import binoculars from "@/public/control-quest/trail/binoculars.webp";
import footprints from "@/public/control-quest/trail/footprints.webp";
import caseFile from "@/public/control-quest/trail/case-file.webp";
import study from "@/public/control-quest/trail/study.webp";
import board from "@/public/control-quest/trail/board.webp";
import boardTrail from "@/public/control-quest/trail/board-trail.webp";
import award from "@/public/control-quest/trail/award.webp";

type Piece = { src: StaticImageData; step: number; left: number; top: number; width: number; height: number };

/**
 * The case trail: the detective artwork (supplied by the site owner), cut into
 * the stops of its dotted trail. When the section comes into view the pieces
 * appear one after another: the detective, then observe, follow the trail,
 * examine the file, study, connect the clues, case closed. Then each floats.
 * Positions are percentages of the original 1254 x 1254 artwork.
 */
const pieces: Piece[] = [
  { src: detective, step: 0, left: 33.892, top: 22.727, width: 27.911, height: 40.67 },
  { src: binoculars, step: 1, left: 12.759, top: 10.367, width: 27.911, height: 20.893 },
  { src: footprints, step: 2, left: 9.41, top: 31.898, width: 22.089, height: 24.561 },
  { src: caseFile, step: 3, left: 6.38, top: 55.821, width: 28.708, height: 28.309 },
  { src: study, step: 4, left: 34.928, top: 63.397, width: 38.836, height: 27.113 },
  { src: board, step: 5, left: 60.207, top: 43.062, width: 36.284, height: 30.303 },
  { src: boardTrail, step: 5, left: 73.764, top: 73.365, width: 11.563, height: 10.367 },
  { src: award, step: 6, left: 61.005, top: 9.968, width: 26.316, height: 33.094 },
];

export function CaseTrail({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`cq-trail ${className}`} role="img" aria-label={label}>
      {pieces.map((p) => (
        <div
          key={p.src.src}
          className="cq-trail-step"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.width}%`,
              height: `${p.height}%`,
              "--step": p.step,
            } as React.CSSProperties
          }
        >
          <div className="cq-trail-float">
            <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 20vw, 45vw" />
          </div>
        </div>
      ))}
    </div>
  );
}
