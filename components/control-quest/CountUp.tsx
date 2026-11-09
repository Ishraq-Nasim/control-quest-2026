"use client";

import { useEffect, useRef } from "react";

const DURATION = 1400;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts up once when it enters the viewport. The server renders the final
 * value, so without script (or with reduced motion) the number is simply there.
 * Screen readers get the final value only.
 */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    let started = false;
    const rect = el.getBoundingClientRect();
    // Only reset numbers the visitor has not seen yet.
    if (rect.top > window.innerHeight) el.textContent = "0";
    else return;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        el.textContent = String(Math.round(easeOut(t) * value));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          io.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(value);
    };
  }, [value]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
