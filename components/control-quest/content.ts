import type { IconName } from "./icons";

/**
 * Every line of copy, every figure and every icon name for the
 * Control Quest 2026 section lives here.
 *
 * Confidentiality: Corporate Office edition only. No dates, month,
 * prize pool, money amounts or the KGF edition. Do not invent facts.
 */

export type Labelled = { icon: IconName; text: string };

export const hero = {
  title: "Control Quest 2026",
  subtitle: { icon: "Route", text: "Detectives On The Road To Green" } as Labelled,
  support:
    "Five days. One mystery. Controls at Unilever Bangladesh's Corporate Office.",
  logoAlt: "Control Quest logo: a detective's fedora over a shield with a green road, checkered flags and the words The Road To Green",
  backgroundAlt: "",
  scrollCue: { icon: "ArrowDown", text: "Scroll" } as Labelled,
};

export const about = {
  heading: { icon: "Search", text: "What Is Control Quest?" } as Labelled,
  paragraphs: [
    "Unilever Bangladesh's internal controls awareness programme. Policies and processes, taken out of the rulebook and turned into an experience.",
    "2026 edition: a detective story. Sessions as clues, quizzes as tests, a team finale to close the case.",
  ],
  quote:
    "Strong controls come to life when people understand them, challenge them and own them.",
  /** Photo beside the intro (file in public/control-quest/photos/). */
  photo: "01-case-clues.jpg",
};

export type Stat = { value: number; suffix?: string; label: string; icon: IconName };

export const numbers = {
  heading: { icon: "ChartColumn", text: "By The Numbers" } as Labelled,
  note: "Corporate Office edition.",
  stats: [
    { value: 5, label: "Days", icon: "CalendarDays" },
    { value: 250, suffix: "+", label: "Participants", icon: "Users" },
    { value: 17, suffix: "+", label: "Topics", icon: "BookOpen" },
    { value: 15, suffix: "+", label: "Speakers & Facilitators", icon: "Mic" },
    { value: 10, suffix: "+", label: "Hours Of Sessions", icon: "Clock" },
    { value: 500, suffix: "+", label: "Man-Hours Invested", icon: "Hourglass" },
    { value: 15, label: "Finalists", icon: "Award" },
    { value: 5, label: "Detective Teams", icon: "HatGlasses" },
  ] as Stat[],
};

export const flow = {
  heading: { icon: "Route", text: "How The Quest Worked" } as Labelled,
  steps: [
    { icon: "GraduationCap", title: "Learn", text: "Daily sessions, 15+ speakers" },
    { icon: "ListChecks", title: "Test", text: "Daily quizzes, scores carried all week" },
    { icon: "Filter", title: "Qualify", text: "Top 15 to the finale" },
    { icon: "SearchCheck", title: "Solve", text: "Teams crack the final case" },
  ] as { icon: IconName; title: string; text: string }[],
};

export type Stop = {
  id: string;
  /** Lime marker in the day-number position: "Day 1", "Round 1", "Finale"… */
  marker: string;
  icon: IconName;
  /** Title in Title Case. Day names are locked to the official agenda. */
  title: string;
  summary: string;
  topics?: Labelled[];
};

/** Day names and topic names are locked: word for word from the official agenda. */
export const days = {
  heading: { icon: "CalendarDays", text: "The Five Days" } as Labelled,
  pickerLabel: "Choose a day",
  topicsLabel: { icon: "Layers", text: "Topics" } as Labelled,
  stops: [
    {
      id: "day-1",
      marker: "Day 1",
      icon: "ScrollText",
      title: "Navigating The Rules",
      summary: "Policies behind everyday work.",
      topics: [
        { icon: "FileText", text: "Contract Policy" },
        { icon: "Lock", text: "Data Privacy" },
        { icon: "ServerCog", text: "IT Security" },
        { icon: "Megaphone", text: "Media Policy & Others" },
      ],
    },
    {
      id: "day-2",
      marker: "Day 2",
      icon: "ShoppingCart",
      title: "The Procurement Pipeline",
      summary: "Purchasing, from order to invoice.",
      topics: [
        { icon: "ScrollText", text: "Procurement Policy" },
        { icon: "Workflow", text: "PO-GR-IR Flow" },
        { icon: "Calculator", text: "Accrual Guidelines" },
        { icon: "Percent", text: "Tax Implications" },
      ],
    },
    {
      id: "day-3",
      marker: "Day 3",
      icon: "Laptop",
      title: "COUPA Unlocked",
      summary: "The procurement platform, hands on.",
      topics: [
        { icon: "Network", text: "MBS Overview" },
        { icon: "Laptop", text: "COUPA Basic" },
        { icon: "ChartLine", text: "FFP&L" },
        { icon: "Percent", text: "Tax Implications" },
      ],
    },
    {
      id: "day-4",
      marker: "Day 4",
      icon: "ShieldCheck",
      title: "Controls Refresher",
      summary: "Core control frameworks and treasury standards.",
      topics: [
        { icon: "RefreshCw", text: "SOA Refresher" },
        { icon: "Landmark", text: "GFCF Overview" },
        { icon: "Banknote", text: "Treasury Standards" },
        { icon: "Percent", text: "Tax Brief" },
      ],
    },
    {
      id: "day-5",
      marker: "Day 5",
      icon: "Receipt",
      title: "From Claims To Clicks",
      summary: "Expense claims and order-to-cash.",
      topics: [
        { icon: "Plane", text: "T&E Policy" },
        { icon: "Repeat", text: "O2C Process Flow" },
      ],
    },
  ] as Stop[],
};

export const finale = {
  heading: { icon: "Trophy", text: "The Grand Finale" } as Labelled,
  intro: "Five days of clues. One final case. Powered by Surf Excel.",
  /** Photo that opens the finale (file in public/control-quest/photos/). */
  photo: "02-teams-at-work.jpg",
  photoCaption: { icon: "Camera", text: "Teams at work on the case" } as Labelled,
  pickerLabel: "Choose a finale stage",
  stops: [
    {
      id: "qualify",
      marker: "Qualify",
      icon: "Award",
      title: "The Top 15",
      summary: "Highest week-long quiz scores earn a seat",
    },
    {
      id: "team-up",
      marker: "Team Up",
      icon: "UsersRound",
      title: "Five Detective Agencies",
      summary: "Five teams of three, each with its own detective identity",
    },
    {
      id: "round-1",
      marker: "Round 1",
      icon: "Search",
      title: "The Case",
      summary: "Solve a case as a team: knowledge, analysis, collaboration",
    },
    {
      id: "round-2",
      marker: "Round 2",
      icon: "BellRing",
      title: "The Buzzer",
      summary: "Top three teams, rapid fire, speed and precision",
    },
    {
      id: "audience",
      marker: "Audience Round",
      icon: "Users",
      title: "Everyone Plays",
      summary: "Individual prizes for the room",
    },
  ] as Stop[],
  teamsLabel: { icon: "HatGlasses", text: "The Agencies" } as Labelled,
  teams: [
    "Holmes Syndicate",
    "Poirot's Elite",
    "Marple Minds",
    "Blanc Brigade",
    "Columbo Collective",
  ],
};

export const outcomes = {
  heading: { icon: "Target", text: "Why It Matters For The Business" } as Labelled,
  note: { icon: "Waypoints", text: "Intended outcomes, not measured results" } as Labelled,
  items: [
    {
      icon: "ShieldCheck",
      title: "Controls People Understand",
      points: ["Know the why", "Comply consistently", "Spot exceptions early"],
    },
    {
      icon: "Brain",
      title: "Learning That Sticks",
      points: ["A week of active recall", "Not one-off training"],
    },
    {
      icon: "Network",
      title: "Cross-Functional Connection",
      points: ["Knowledge shared across every team"],
    },
    {
      icon: "Waypoints",
      title: "A Model That Travels",
      points: ["Next stop: every cluster across Unilever Bangladesh"],
    },
  ] as { icon: IconName; title: string; points: string[] }[],
};

export const role = {
  heading: { icon: "UserRound", text: "My Role" } as Labelled,
  name: "Ishraq Nasim",
  line: {
    icon: "Briefcase",
    text: "Organising team · Financial Controller's team, Unilever Bangladesh",
  } as Labelled,
  groups: [
    {
      label: { icon: "BadgeCheck", text: "Owned" } as Labelled,
      items: [
        { icon: "Palette", text: "Design" },
        { icon: "Truck", text: "Logistics" },
        { icon: "ChartColumn", text: "Stats Reporting" },
      ] as Labelled[],
    },
    {
      label: { icon: "Handshake", text: "Contributed" } as Labelled,
      items: [
        { icon: "Mic", text: "Speaker Coordination" },
        { icon: "FileText", text: "Content" },
        { icon: "FileQuestion", text: "Quiz & Finale Cases" },
        { icon: "Clapperboard", text: "Video Scripts & Editing" },
      ] as Labelled[],
    },
  ],
};

export const gallery = {
  heading: { icon: "Images", text: "From The Event" } as Labelled,
  /** Shown at most this many photos. */
  max: 8,
  /**
   * Photos are auto-discovered from public/control-quest/photos/ at build time
   * (.jpg, .jpeg, .png, .webp, .avif), sorted by file name.
   * Give each one meaningful alt text here, keyed by file name.
   * Note: the prize amount on the board in 04-champions.jpg is blurred
   * (confidentiality: no money amounts).
   */
  alt: {
    "01-case-clues.jpg": "Hands sorting Control Quest case cards, clue slips and envelopes on a table",
    "02-teams-at-work.jpg": "Detective teams working through case sheets at standing tables, a countdown on the screens behind",
    "03-buzzer-round.jpg": "Finalists at Control Quest buzzer podiums, facing a quiz question on screen",
    "04-champions.jpg": "The champion team holds up the winners' board as confetti falls",
    "05-group.jpg": "Group photo in front of the Control Quest screens",
  } as Record<string, string>,
  fallbackAlt: (n: number) => `Control Quest 2026, Corporate Office: event photo ${n}`,
  pause: { icon: "Pause", text: "Pause" } as Labelled,
  play: { icon: "Play", text: "Play" } as Labelled,
  stripLabel: "Event photos, moving strip",
  dialogLabel: "Event photo viewer",
  closeLabel: "Close photo viewer",
  prevLabel: "Previous photo",
  nextLabel: "Next photo",
};
