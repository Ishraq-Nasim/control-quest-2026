import { gallery } from "./content";
import { Label } from "./Label";
import { Filmstrip } from "./Lightbox";
import { listPhotos } from "./photos";

/** "From The Event". Renders nothing at all until photos exist. */
export function Gallery() {
  const photos = listPhotos();
  if (photos.length === 0) return null;

  return (
    <section aria-labelledby="cq-gallery-title" className="cq-section" style={{ background: "var(--cq-field-1)" }}>
      <div data-reveal>
        <Filmstrip
          photos={photos}
          heading={
            <h2 id="cq-gallery-title" className="cq-h2">
              <Label icon={gallery.heading.icon}>{gallery.heading.text}</Label>
            </h2>
          }
        />
      </div>
    </section>
  );
}
