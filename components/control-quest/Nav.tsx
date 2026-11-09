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
  const bar = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

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
    <nav ref={bar} className="cq-nav" aria-label={nav.label}>
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
