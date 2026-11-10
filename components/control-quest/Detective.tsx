import Image from "next/image";
import detective from "@/public/control-quest/detective.webp";

/**
 * The watercolor detective (supplied by the site owner), with the white paper
 * removed so it floats on the page. A pale light behind him makes the dark
 * figure read as a silhouette and fades into the section green at the edges.
 */
export function Detective({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`cq-noir ${className}`}>
      <div className="cq-noir-glow" aria-hidden="true" />
      <div className="cq-noir-figure">
        <Image src={detective} alt={label} sizes="(min-width: 1024px) 32vw, 90vw" placeholder="empty" />
      </div>
    </div>
  );
}
