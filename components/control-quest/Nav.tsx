"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "./content";
import { Label } from "./Label";

type Item = (typeof nav.items)[number];

/**
 * A plain bar that stays at the top: the name on the left, the sections on
 * the right. On narrower screens the sections fold into a Menu button.
 * The link for the section being read is marked as the current one.
 */
export function Nav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // White text over green sections, green text over white and mint ones.
  const [tone, setTone] = useState<"dark" | "light">("dark");
  // The bar takes the colour of the section beneath it, so it never reads as a band.
  const [surface, setSurface] = useState<"hero" | "forest" | "white" | "mint">("hero");
  // The bar slides away while reading down and returns on the way up.
  const [hidden, setHidden] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".cq-hero, .cq-theme-forest, .cq-theme-white, .cq-theme-mint"),
    );
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const probe = (bar.current?.offsetHeight ?? 64) / 2;
      const under = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= probe && r.bottom > probe;
      });
      const light = !!under && (under.classList.contains("cq-theme-white") || under.classList.contains("cq-theme-mint"));
      setTone(light ? "light" : "dark");
      setSurface(
        !under || under.classList.contains("cq-hero")
          ? "hero"
          : under.classList.contains("cq-theme-white")
            ? "white"
            : under.classList.contains("cq-theme-mint")
              ? "mint"
              : "forest",
      );

      if (!openRef.current) {
        if (y < 80 || y < lastY - 4) setHidden(false);
        else if (y > lastY + 4) setHidden(true);
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Which section is being read: the one crossing a line 40% down the screen.
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (typeof IntersectionObserver === "undefined" || sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    // Above the first section (in the hero) nothing is current.
    const hero = document.querySelector(".cq-hero");
    const heroIo = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(null);
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    if (hero) heroIo.observe(hero);
    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, [items]);

  // Close the menu with Escape or a click outside the bar.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const links = (inMenu: boolean) => (
    <ul className={inMenu ? "cq-menu-list" : "cq-nav-list"}>
      {items.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            className="cq-nav-link"
            aria-current={active === i.id ? "true" : undefined}
            onClick={() => setOpen(false)}
          >
            <Label icon={i.icon}>{i.text}</Label>
          </a>
        </li>
      ))}
    </ul>
  );

  const button = open ? nav.close : nav.menu;

  return (
    <nav
      ref={bar}
      className="cq-nav"
      aria-label={nav.label}
      data-tone={tone}
      data-surface={surface}
      data-hidden={hidden && !open ? "" : undefined}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="cq-wrap cq-nav-inner">
        <a href="#cq-top" className="cq-nav-home" onClick={() => setOpen(false)}>
          {nav.home}
        </a>
        {links(false)}
        <button
          ref={toggle}
          type="button"
          className="cq-btn cq-menu-btn"
          aria-expanded={open}
          aria-controls="cq-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Label icon={button.icon}>{button.text}</Label>
        </button>
      </div>
      <div id="cq-menu" className="cq-menu" data-open={open || undefined} hidden={!open}>
        <div className="cq-wrap">{links(true)}</div>
      </div>
    </nav>
  );
}
