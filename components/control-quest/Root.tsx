"use client";

import { useEffect, useRef } from "react";

/**
 * Section root. Marks script as ready and runs one IntersectionObserver for
 * every [data-reveal] group, which reveals its parts once, in order.
 */
export function Root({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.classList.add("cq-js", "cq-ready");

    const groups = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const showAll = () => groups.forEach((g) => g.setAttribute("data-in", ""));

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      showAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    groups.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} suppressHydrationWarning>
      {children}
    </div>
  );
}
