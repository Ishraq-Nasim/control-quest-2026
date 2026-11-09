import fs from "node:fs";
import path from "node:path";
import { gallery } from "./content";
import { Label } from "./Label";
import { Lightbox, type Photo } from "./Lightbox";

const PHOTO_DIR = path.join(process.cwd(), "public", "control-quest", "photos");
const PHOTO_EXT = /\.(jpe?g|png|webp|avif)$/i;

/** Reads the photos folder when the page is built. Missing folder = no photos. */
function findPhotos(): Photo[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(PHOTO_DIR).filter((f) => PHOTO_EXT.test(f));
  } catch {
    return [];
  }
  return files
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .slice(0, gallery.max)
    .map((file, i) => ({
      src: `/control-quest/photos/${encodeURIComponent(file)}`,
      alt: gallery.alt[file] ?? gallery.fallbackAlt(i + 1),
    }));
}

/** "From The Event". Renders nothing at all until photos exist. */
export function Gallery() {
  const photos = findPhotos();
  if (photos.length === 0) return null;

  return (
    <section aria-labelledby="cq-gallery-title" className="cq-section" style={{ background: "var(--cq-field-1)" }}>
      <div className="cq-wrap" data-reveal>
        <h2 id="cq-gallery-title" className="cq-h2 cq-rv">
          <Label icon={gallery.heading.icon}>{gallery.heading.text}</Label>
        </h2>
        <div className="cq-rv mt-12 lg:mt-16" style={{ "--i": 1 } as React.CSSProperties}>
          <Lightbox photos={photos} />
        </div>
      </div>
    </section>
  );
}
