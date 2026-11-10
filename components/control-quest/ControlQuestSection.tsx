import Image from "next/image";
import "./control-quest.css";
import { about, days, finale, flow, hero, nav, numbers, outcomes, role, type Labelled } from "./content";
import { CountUp } from "./CountUp";
import { Detective } from "./Detective";
import { display, text } from "./fonts";
import { Gallery } from "./Gallery";
import { Label } from "./Label";
import { Nav } from "./Nav";
import { findPhoto, listPhotos, type Photo } from "./photos";
import { RoadLine } from "./Road";
import { Root } from "./Root";
import { RouteStops } from "./RouteStops";
import bg from "@/public/control-quest/bg.webp";
import logo from "@/public/control-quest/logo.webp";

/** Stagger index for an entrance part: heading 0, text 1, visual 2… */
const at = (i: number) => ({ "--i": i }) as React.CSSProperties;
const field = (v: string) => ({ background: `var(${v})` }) as React.CSSProperties;

function Hero() {
  return (
    <header id="cq-top" className="cq-hero">
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
          sizes="(min-width: 1024px) 340px, 220px"
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

/** Section title across the top, with an optional note on the right. */
function SectionHead({ id, heading, aside }: { id: string; heading: Labelled; aside?: Labelled }) {
  return (
    <div className="cq-head-row">
      <h2 id={id} className="cq-h2 cq-rv">
        <Label icon={heading.icon}>{heading.text}</Label>
      </h2>
      {aside && (
        <p className="cq-head-aside cq-rv" style={at(1)}>
          <Label icon={aside.icon} tone="accent">
            {aside.text}
          </Label>
        </p>
      )}
    </div>
  );
}

/**
 * A photograph in a fixed frame that drifts slowly as the page scrolls past it.
 * `opening` also lets the frame widen from an inset as it comes into view.
 */
function DriftPhoto({
  photo,
  className = "",
  sizes,
  opening = false,
}: {
  photo: Photo;
  className?: string;
  sizes: string;
  opening?: boolean;
}) {
  return (
    <div className={`cq-photo ${opening ? "cq-photo--opening" : ""} ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="cq-photo-img" />
    </div>
  );
}

function WhatIs() {
  return (
    <section id="cq-what" aria-labelledby="cq-what-title" className="cq-section" style={field("--cq-field-1")}>
      <div className="cq-wrap" data-reveal>
        <SectionHead id="cq-what-title" heading={about.heading} />
        <div className="cq-grid gap-y-10">
          <div className="cq-rv order-last flex justify-center lg:order-none lg:col-span-4 lg:items-start" style={at(3)}>
            <Detective label={about.silhouetteAlt} className="w-full max-w-[420px] lg:max-w-none" />
          </div>

          <div className="grid gap-4 lg:col-span-8">
            <div className="grid gap-4 md:grid-cols-2">
              {about.facts.map((f, i) => (
                <div key={f.title} className="cq-card cq-rv" style={at(i + 1)}>
                  <h3 className="cq-h3">
                    <Label icon={f.icon} tone="accent">
                      {f.title}
                    </Label>
                  </h3>
                  <p className="cq-text-lg mt-3">{f.text}</p>
                </div>
              ))}
            </div>

            <div className="cq-card cq-rv" style={at(3)}>
              <h3 className="cq-h3">
                <Label icon={about.edition.icon} tone="accent">
                  {about.edition.text}
                </Label>
              </h3>
              <ul className="cq-swaps mt-5">
                {about.swaps.map((s) => (
                  <li key={s.from} className="cq-swap">
                    <span className="cq-swap-from">
                      <Label icon={s.icon} tone="accent">
                        {s.from}
                      </Label>
                    </span>
                    <span className="cq-swap-to">{s.to}</span>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="cq-quote cq-rv mt-6 lg:mt-10" style={at(4)}>
              <p>{about.quote}</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section id="cq-numbers" aria-labelledby="cq-numbers-title" className="cq-section" style={field("--cq-field-2")}>
      <div className="cq-wrap" data-reveal>
        <SectionHead id="cq-numbers-title" heading={numbers.heading} aside={numbers.note} />
        <dl className="cq-stats">
          {numbers.stats.map((s, i) => (
            <div key={s.label} className="cq-card cq-stat cq-rv" style={at(Math.min(i + 1, 8))} data-key={s.key || undefined}>
              <dt className="cq-stat-label">
                <Label icon={s.icon} tone="accent">
                  {s.label}
                </Label>
              </dt>
              <dd className="cq-stat-fig">
                <CountUp value={s.value} />
                {s.suffix && (
                  <span className="cq-stat-suffix" aria-label="or more">
                    {s.suffix}
                  </span>
                )}
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
    <section id="cq-flow" aria-labelledby="cq-flow-title" className="cq-section" style={field("--cq-field-3")}>
      <div className="cq-wrap" data-reveal>
        <SectionHead id="cq-flow-title" heading={flow.heading} />
        <ol className="cq-flow">
          {flow.steps.map((s, i) => (
            <li key={s.title} className="cq-tile cq-rv" style={at(i + 1)}>
              <h3 className="cq-h3 cq-tile-title">
                <Label icon={s.icon}>{s.title}</Label>
              </h3>
              <p className="cq-lead cq-muted-on-tile mt-2 max-w-[22ch]">{s.text}</p>
            </li>
          ))}
          <RoadLine className="cq-road cq-flow-road" />
        </ol>
      </div>
    </section>
  );
}

function FiveDays() {
  return (
    <section id="cq-days" aria-labelledby="cq-days-title" className="cq-section" style={field("--cq-field-1")}>
      <div className="cq-wrap" data-reveal>
        <SectionHead id="cq-days-title" heading={days.heading} />
        <div className="cq-rv" style={at(1)}>
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
  const photo = findPhoto(finale.photo);
  return (
    <section id="cq-finale" aria-labelledby="cq-finale-title" className="cq-section" style={field("--cq-field-2")}>
      <div className="cq-wrap" data-reveal>
        <SectionHead id="cq-finale-title" heading={finale.heading} />
        <div className="cq-grid gap-y-10">
          {photo && (
            <figure className="cq-rv lg:col-span-5" style={at(1)}>
              <DriftPhoto photo={photo} opening className="aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 100vw" />
              <figcaption className="cq-small cq-muted mt-3">
                <Label icon={finale.photoCaption.icon}>{finale.photoCaption.text}</Label>
              </figcaption>
            </figure>
          )}
          <div className={`flex flex-col gap-8 ${photo ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-12"}`}>
            <p className="cq-quote cq-rv" style={at(2)}>
              {finale.intro}
            </p>
            <div className="cq-card cq-rv" style={at(3)}>
              <h3 className="cq-h3">
                <Label icon={finale.teamsLabel.icon} tone="accent">
                  {finale.teamsLabel.text}
                </Label>
              </h3>
              <ul className="cq-teams cq-text-lg mt-5">
                {finale.teams.map((t) => (
                  <li key={t}>
                    <Label icon="HatGlasses">{t}</Label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="cq-rv mt-16 lg:mt-24" style={at(4)}>
          <RouteStops idPrefix="cq-finale" stops={finale.stops} pickerLabel={finale.pickerLabel} />
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section id="cq-why" aria-labelledby="cq-why-title" className="cq-section" style={field("--cq-field-4")}>
      <div className="cq-wrap" data-reveal>
        <SectionHead id="cq-why-title" heading={outcomes.heading} aside={outcomes.note} />
        <ul className="cq-outcomes">
          {outcomes.items.map((o, i) => (
            <li key={o.title} className="cq-card cq-rv" style={at(i + 1)}>
              <h3 className="cq-h3">
                <Label icon={o.icon} tone="accent">
                  {o.title}
                </Label>
              </h3>
              <ul className="cq-points cq-text-lg mt-5">
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
    <section id="cq-role" aria-labelledby="cq-role-title" className="cq-section" style={field("--cq-field-3")}>
      <div className="cq-wrap" data-reveal>
        <SectionHead id="cq-role-title" heading={role.heading} />
        <div className="cq-grid gap-y-8">
          <div className="lg:col-span-4">
            <p className="cq-name cq-rv" style={at(1)}>
              {role.name}
            </p>
            <p className="cq-lead cq-rv mt-4" style={at(2)}>
              <Label icon={role.line.icon} tone="accent">
                {role.line.text}
              </Label>
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {/* One gap value between the label and every item, so the rhythm is even */}
            {role.groups.map((g, i) => (
              <div key={g.label.text} className="cq-card cq-role-group cq-rv" style={at(i + 3)}>
                <h3 className="cq-role-label">
                  <Label icon={g.label.icon} tone="accent">
                    {g.label.text}
                  </Label>
                </h3>
                <ul className="cq-role-list">
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
      </div>
    </section>
  );
}

/**
 * Control Quest 2026: one self-contained, scrolling showcase section.
 * Ends after its last block, by design: no footer.
 */
export default function ControlQuestSection() {
  // The Gallery link only appears when the gallery does.
  const hasPhotos = listPhotos().length > 0;
  return (
    <Root className={`cq ${display.variable} ${text.variable}`}>
      <Nav items={hasPhotos ? nav.items : nav.items.filter((i) => i.id !== "cq-gallery")} />
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
