import Image from "next/image";
import "./control-quest.css";
import { about, days, finale, flow, hero, numbers, outcomes, role } from "./content";
import { CountUp } from "./CountUp";
import { display, text } from "./fonts";
import { Gallery } from "./Gallery";
import { Label } from "./Label";
import { MagnifierMotif, RoadLine } from "./Road";
import { Root } from "./Root";
import { RouteStops } from "./RouteStops";
import bg from "@/public/control-quest/bg.webp";
import logo from "@/public/control-quest/logo.webp";

/** Stagger index for an entrance part: heading 0, text 1, visual 2… */
const at = (i: number) => ({ "--i": i }) as React.CSSProperties;
const field = (v: string) => ({ background: `var(${v})` }) as React.CSSProperties;

function Hero() {
  return (
    <header className="cq-hero">
      <div className="cq-hero-media">
        <Image src={bg} alt={hero.backgroundAlt} fill priority sizes="100vw" placeholder="blur" />
      </div>
      <div className="cq-hero-scrim" aria-hidden="true" />
      <div className="cq-hero-inner cq-wrap">
        <Image
          src={logo}
          alt={hero.logoAlt}
          className="cq-hero-logo cq-hero-in"
          style={at(0)}
          sizes="(min-width: 1024px) 230px, 150px"
          priority
        />
        <h1 className="cq-h1 cq-hero-title cq-hero-in" style={at(1)}>
          {hero.title}
        </h1>
        <p className="cq-hero-sub cq-hero-in" style={at(2)}>
          <Label icon={hero.subtitle.icon} tone="accent">
            {hero.subtitle.text}
          </Label>
        </p>
        <p className="cq-hero-support cq-hero-in" style={at(3)}>
          {hero.support}
        </p>
      </div>
      <a href="#cq-what" className="cq-scroll-cue">
        <Label icon={hero.scrollCue.icon}>{hero.scrollCue.text}</Label>
      </a>
    </header>
  );
}

function WhatIs() {
  return (
    <section id="cq-what" aria-labelledby="cq-what-title" className="cq-section" style={field("--cq-field-1")}>
      <div className="cq-wrap cq-grid gap-y-12 lg:gap-y-24" data-reveal>
        <h2 id="cq-what-title" className="cq-h2 cq-rv lg:col-span-5">
          <Label icon={about.heading.icon}>{about.heading.text}</Label>
        </h2>
        <div className="cq-rv lg:col-span-7 lg:col-start-6 lg:pt-3" style={at(1)}>
          {about.paragraphs.map((p) => (
            <p key={p} className="cq-lead cq-intro-para">
              {p}
            </p>
          ))}
        </div>
        <div className="cq-rv max-w-[420px] lg:col-span-4 lg:max-w-none" style={at(2)}>
          <MagnifierMotif className="cq-motif" />
        </div>
        <blockquote className="cq-quote cq-rv lg:col-span-6 lg:col-start-7 lg:self-end" style={at(3)}>
          <p>{about.quote}</p>
        </blockquote>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section aria-labelledby="cq-numbers-title" className="cq-section" style={field("--cq-field-2")}>
      <div className="cq-wrap cq-grid gap-y-12" data-reveal>
        <div className="lg:col-span-5">
          <div className="cq-sticky">
            <h2 id="cq-numbers-title" className="cq-h2 cq-rv">
              <Label icon={numbers.heading.icon}>{numbers.heading.text}</Label>
            </h2>
            <p className="cq-muted cq-rv mt-5" style={at(1)}>
              {numbers.note}
            </p>
          </div>
        </div>
        <dl className="cq-ledger md:grid-cols-2 md:gap-x-8 lg:col-span-6 lg:col-start-7 lg:grid-cols-1">
          {numbers.stats.map((s, i) => (
            <div key={s.label} className="cq-ledger-row cq-rv" style={at(Math.min(i + 1, 6))}>
              <dt className="cq-ledger-cap order-3">
                <Label icon={s.icon}>{s.label}</Label>
              </dt>
              <dd className="cq-ledger-fig order-1">
                <CountUp value={s.value} />
              </dd>
              <dd className="cq-ledger-suffix order-2" aria-label={s.suffix ? "or more" : undefined}>
                {s.suffix ?? ""}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Flow() {
  return (
    <section aria-labelledby="cq-flow-title" className="cq-section" style={field("--cq-field-3")}>
      <div className="cq-wrap" data-reveal>
        <div className="cq-flow-stage">
          <h2 id="cq-flow-title" className="cq-h2 cq-flow-heading cq-rv mb-10 lg:mb-0">
            <Label icon={flow.heading.icon}>{flow.heading.text}</Label>
          </h2>
          <ol className="cq-flow">
            {flow.steps.map((s, i) => (
              <li key={s.title} className="cq-tile cq-rv" style={at(i + 1)}>
                <h3 className="cq-h3">
                  <Label icon={s.icon}>{s.title}</Label>
                </h3>
                <p className="cq-muted-on-tile max-w-[24ch]">{s.text}</p>
              </li>
            ))}
            <RoadLine className="cq-road cq-flow-road" />
          </ol>
        </div>
      </div>
    </section>
  );
}

function FiveDays() {
  return (
    <section aria-labelledby="cq-days-title" className="cq-section" style={field("--cq-field-1")}>
      <div className="cq-wrap" data-reveal>
        <h2 id="cq-days-title" className="cq-h2 cq-rv lg:pl-[3vw]">
          <Label icon={days.heading.icon}>{days.heading.text}</Label>
        </h2>
        <div className="cq-rv mt-12 lg:mt-24" style={at(1)}>
          <RouteStops
            idPrefix="cq-day"
            stops={days.stops}
            pickerLabel={days.pickerLabel}
            topicsLabel={days.topicsLabel}
          />
        </div>
      </div>
    </section>
  );
}

function Finale() {
  return (
    <section aria-labelledby="cq-finale-title" className="cq-section" style={field("--cq-field-2")}>
      <div className="cq-wrap" data-reveal>
        <div className="cq-grid gap-y-5">
          <h2 id="cq-finale-title" className="cq-h2 cq-rv lg:col-span-6 lg:pl-[3vw]">
            <Label icon={finale.heading.icon}>{finale.heading.text}</Label>
          </h2>
          <p className="cq-lead cq-rv lg:col-span-5 lg:col-start-8 lg:self-end" style={at(1)}>
            {finale.intro}
          </p>
        </div>
        <div className="cq-rv mt-12 lg:mt-24" style={at(2)}>
          <RouteStops idPrefix="cq-finale" stops={finale.stops} pickerLabel={finale.pickerLabel} />
        </div>
        <div className="cq-rv mt-20 lg:mt-28" style={at(3)}>
          <h3 className="cq-muted">
            <Label icon={finale.teamsLabel.icon}>{finale.teamsLabel.text}</Label>
          </h3>
          <ul className="cq-teams cq-lead mt-4">
            {finale.teams.map((t) => (
              <li key={t}>
                <Label icon="HatGlasses">{t}</Label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section aria-labelledby="cq-why-title" className="cq-section" style={field("--cq-field-4")}>
      <div className="cq-wrap cq-grid gap-y-14" data-reveal>
        <div className="lg:col-span-5">
          <div className="cq-sticky">
            <h2 id="cq-why-title" className="cq-h2 cq-rv">
              <Label icon={outcomes.heading.icon}>{outcomes.heading.text}</Label>
            </h2>
            <p className="cq-muted cq-rv mt-5" style={at(1)}>
              <Label icon={outcomes.note.icon}>{outcomes.note.text}</Label>
            </p>
          </div>
        </div>
        <ul className="grid gap-14 lg:col-span-6 lg:col-start-7 lg:gap-28 lg:pt-4">
          {outcomes.items.map((o, i) => (
            <li key={o.title} className="cq-rv" style={at(i + 1)}>
              <h3 className="cq-h3">
                <Label icon={o.icon}>{o.title}</Label>
              </h3>
              <ul className="cq-points cq-lead mt-4">
                {o.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Role() {
  return (
    <section aria-labelledby="cq-role-title" className="cq-section" style={field("--cq-field-3")}>
      <div className="cq-wrap cq-grid gap-y-14" data-reveal>
        <div className="lg:col-span-4">
          <h2 id="cq-role-title" className="cq-h2 cq-rv">
            <Label icon={role.heading.icon}>{role.heading.text}</Label>
          </h2>
          <p className="cq-h3 cq-rv mt-4" style={at(1)}>
            {role.name}
          </p>
          <p className="cq-rv mt-4 max-w-[34ch]" style={at(2)}>
            <Label icon={role.line.icon}>{role.line.text}</Label>
          </p>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:pt-4">
          {role.groups.map((g, i) => (
            <div key={g.label.text} className="cq-rv" style={at(i + 2)}>
              <h3 className="cq-h3">
                <Label icon={g.label.icon} tone="accent">
                  {g.label.text}
                </Label>
              </h3>
              <ul className="cq-role-list cq-lead mt-6">
                {g.items.map((it) => (
                  <li key={it.text}>
                    <Label icon={it.icon}>{it.text}</Label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Control Quest 2026: one self-contained, scrolling showcase section.
 * Ends after its last block, by design: no footer.
 */
export default function ControlQuestSection() {
  return (
    <Root className={`cq ${display.variable} ${text.variable}`}>
      <Hero />
      <WhatIs />
      <Numbers />
      <Flow />
      <FiveDays />
      <Finale />
      <Outcomes />
      <Role />
      <Gallery />
    </Root>
  );
}
