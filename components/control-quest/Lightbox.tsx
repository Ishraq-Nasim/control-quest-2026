"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gallery } from "./content";
import { icons, ICON_STROKE } from "./icons";

export type Photo = { src: string; alt: string };

/**
 * Square-cropped grid and a keyboard-accessible viewer built on <dialog>
 * (focus is held inside while open and returns to the photo on close).
 */
export function Lightbox({ photos }: { photos: Photo[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const Prev = icons.ChevronLeft;
  const Next = icons.ChevronRight;
  const Close = icons.X;

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i + d + photos.length) % photos.length);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const current = photos[index];

  return (
    <>
      <ul className="cq-gallery">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button type="button" className="cq-thumb" onClick={() => open(i)} aria-label={`Open: ${p.alt}`}>
              <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="cq-lightbox"
        aria-label={gallery.dialogLabel}
        onKeyDown={onKeyDown}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="cq-lightbox-frame">
          <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" />
        </div>
        <div className="cq-lightbox-bar">
          <div className="flex gap-2">
            {photos.length > 1 && (
              <>
                <button type="button" className="cq-btn" onClick={() => step(-1)} aria-label={gallery.prevLabel}>
                  <Prev aria-hidden="true" strokeWidth={ICON_STROKE} size={22} />
                </button>
                <button type="button" className="cq-btn" onClick={() => step(1)} aria-label={gallery.nextLabel}>
                  <Next aria-hidden="true" strokeWidth={ICON_STROKE} size={22} />
                </button>
              </>
            )}
          </div>
          <p className="cq-small cq-muted" aria-live="polite">
            {index + 1} / {photos.length}
          </p>
          <button
            type="button"
            className="cq-btn"
            onClick={() => dialog.current?.close()}
            aria-label={gallery.closeLabel}
            autoFocus
          >
            <Close aria-hidden="true" strokeWidth={ICON_STROKE} size={22} />
          </button>
        </div>
      </dialog>
    </>
  );
}
