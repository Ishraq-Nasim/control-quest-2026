"use client";

import { useEffect, useRef, useState } from "react";
import type { Labelled, Stop } from "./content";
import { Label } from "./Label";
import { RoadLine } from "./Road";
import { FieldDots } from "./FieldDots";

type Props = {
  idPrefix: string;
  stops: Stop[];
  pickerLabel: string;
  topicsLabel?: Labelled;
  /** Team names, for the finale's dot picture */
  teams?: string[];
};

/**
 * The live thing: stops on the road. Without script every stop is shown,
 * stacked. With script the visitor picks one stop at a time (WAI-ARIA tabs,
 * automatic activation, arrow keys, Home and End). Switching is instant:
 * it is keyboard-driven and repeated, so it does not animate.
 */
export function RouteStops({ idPrefix, stops, pickerLabel, topicsLabel, teams = [] }: Props) {
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  // Keyboard switching is instant; a click gets a short fade-in.
  const [viaKey, setViaKey] = useState(true);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setEnhanced(true), []);

  const select = (i: number, focus = false) => {
    const next = (i + stops.length) % stops.length;
    setViaKey(focus);
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => select(active + 1, true),
      ArrowRight: () => select(active + 1, true),
      ArrowUp: () => select(active - 1, true),
      ArrowLeft: () => select(active - 1, true),
      Home: () => select(0, true),
      End: () => select(stops.length - 1, true),
    };
    const fn = keys[e.key];
    if (fn) {
      e.preventDefault();
      fn();
    }
  };

  return (
    <div className="cq-grid gap-y-10 lg:gap-y-0">
      {/* Picker: right on desktop, above the stop on a phone */}
      <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
        <div
          role={enhanced ? "tablist" : undefined}
          aria-label={pickerLabel}
          aria-orientation={enhanced ? "vertical" : undefined}
          className="cq-tablist"
          onKeyDown={onKeyDown}
        >
          <RoadLine className="cq-road cq-tab-road" vertical />
          {stops.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role={enhanced ? "tab" : undefined}
                id={`${idPrefix}-tab-${s.id}`}
                aria-selected={enhanced ? selected : undefined}
                aria-controls={`${idPrefix}-panel-${s.id}`}
                tabIndex={selected ? 0 : -1}
                className="cq-tab"
                onClick={() => select(i)}
              >
                <span className="cq-tab-dot" aria-hidden="true" />
                <span className="cq-tab-text">
                  <span className="cq-tab-marker">{s.marker}</span>
                  <span className="cq-tab-title">
                    <Label icon={s.icon}>{s.title}</Label>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The stop itself */}
      <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
        {stops.map((s, i) => (
          <div
            key={s.id}
            id={`${idPrefix}-panel-${s.id}`}
            role={enhanced ? "tabpanel" : undefined}
            aria-labelledby={enhanced ? `${idPrefix}-tab-${s.id}` : undefined}
            tabIndex={enhanced ? 0 : undefined}
            data-active={i === active ? "" : undefined}
            data-instant={viaKey || undefined}
            className="cq-panel cq-card"
          >
            <p className="cq-panel-marker">{s.marker}</p>
            <h3 className="cq-panel-title">
              <Label icon={s.icon}>{s.title}</Label>
            </h3>
            <p className="cq-lead mt-3 max-w-[34ch]">{s.summary}</p>
            {s.field && <FieldDots stage={s.field} teams={teams} />}
            {s.figure && (
              <p className="cq-panel-figure">
                <span className="cq-panel-figure-value">{s.figure.value}</span>
                <span className="cq-panel-figure-caption">{s.figure.caption}</span>
              </p>
            )}
            {s.topics && topicsLabel && (
              <div className="mt-8">
                <p className="cq-muted">
                  <Label icon={topicsLabel.icon} tone="accent">
                    {topicsLabel.text}
                  </Label>
                </p>
                <ul className="cq-topics mt-4">
                  {s.topics.map((t) => (
                    <li key={t.text} className="cq-topic">
                      <Label icon={t.icon} tone="accent">
                        {t.text}
                      </Label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
