"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gallery } from "./content";
import { icons, ICON_STROKE } from "./icons";
import { Label } from "./Label";
import type { Photo } from "./photos";

/**
 * A strip of event photos that drifts slowly sideways, with a Pause control
 * (moving content that runs past five seconds must be pausable). Hovering or
 * focusing a photo also holds it still. With reduced motion the strip stands
 * still and scrolls by hand. Each photo opens in a <dialog> viewer.
 */
export function Filmstrip({ photos, heading }: { photos: Photo[]; heading: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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

  const toggle = paused ? gallery.play : gallery.pause;
  const current = photos[index];

  const set = (copy: boolean) => (
    <ul className="cq-strip-set" aria-hidden={copy || undefined} inert={copy || undefined}>
      {photos.map((p, i) => (
        <li key={p.src} className="cq-strip-item">
          <button
            type="button"
            className="cq-thumb"
            onClick={() => open(i)}
            aria-label={copy ? undefined : `Open photo: ${p.alt}`}
            tabIndex={copy ? -1 : undefined}
          >
            <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 560px, 80vw" loading="lazy" />
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="cq-wrap flex flex-wrap items-end justify-between gap-6">
        <div className="cq-rv">{heading}</div>
        <button
          type="button"
          className="cq-btn cq-strip-toggle cq-rv"
          style={{ "--i": 1 } as React.CSSProperties}
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
        >
          <Label icon={toggle.icon}>{toggle.text}</Label>
        </button>
      </div>

      <div className="cq-strip cq-rv mt-10 lg:mt-14" style={{ "--i": 2 } as React.CSSProperties} role="region" aria-label={gallery.stripLabel} data-paused={paused || undefined}>
        <div className="cq-strip-track">
          {set(false)}
          {set(true)}
        </div>
      </div>

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
