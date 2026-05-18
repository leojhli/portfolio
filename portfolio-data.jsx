// Shared content for all variants — placeholder copy Leo can edit.

const LEO = {
  name: 'Leo Li',
  role: 'Computer Engineering · University of Waterloo',
  short: 'CE @ Waterloo',
  location: 'Waterloo, ON',
  email: 'leo@example.com',
  github: 'leoli',
  // four short paragraphs — purely placeholder, swap freely.
  bio: [
    "Hey, I’m Leo. I’m studying computer engineering at the University of Waterloo, somewhere in the middle of the program and still figuring out which end of the stack I like best.",
    "Lately I’ve been writing a lot of C and a lot of TypeScript, which feels like a fair split. I’m drawn to systems that sit close to the metal — embedded firmware, schedulers, the parts of a machine that don’t usually get a UI — but I keep getting pulled back to the browser for side projects.",
    "Outside of school I read more than I probably should, run slowly along the Iron Horse Trail, and keep a running list of half-baked project ideas that I will absolutely get to one day.",
  ],
  now: [
    { label: 'Coursework', value: 'OS, digital comms, microprocessors' },
    { label: 'Internship', value: 'TBD · winter ’26' },
    { label: 'Reading', value: 'The Soul of a New Machine' },
    { label: 'Building', value: 'A small RISC-V emulator, slowly' },
  ],
  links: [
    { label: 'GitHub',   href: '#', handle: 'github.com/leoli' },
    { label: 'Email',    href: '#', handle: 'leo@example.com' },
    { label: 'LinkedIn', href: '#', handle: 'in/leoli' },
    { label: 'Résumé',   href: '#', handle: 'PDF, 1 page' },
  ],
};

const BOOKS = [
  {
    title: 'The Soul of a New Machine',
    author: 'Tracy Kidder',
    year: 1981,
    pages: 320,
    rating: 5,
    status: 'reading',
    spine: '#7a3b2e',  // brick
    cover: '#9b4a3a',
    text:  '#f4ece1',
    synopsis: "Tracy Kidder's Pulitzer-winning account of Data General's secret 'Eagle' team racing to build a 32-bit minicomputer in 18 months \u2014 told from inside the engineering room.",
    note: 'A team building a minicomputer in a basement, told like a thriller. Makes me want to solder something.',
    tags: ['hardware', 'history'],
  },
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    year: 2017,
    pages: 616,
    rating: 5,
    status: 'finished',
    spine: '#2b3a4a',
    cover: '#33485c',
    text:  '#e8d9a3',
    synopsis: "A practitioner's tour of the trade-offs behind every distributed system: storage engines, replication, partitioning, consensus, batch and stream processing \u2014 without the marketing.",
    note: 'The book I wish I had read before my first backend job. Replication and consensus finally clicked.',
    tags: ['systems'],
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Abelson & Sussman',
    year: 1985,
    pages: 657,
    rating: 4,
    status: 'finished',
    spine: '#3a2f55',
    cover: '#46396a',
    text:  '#e4d9f2',
    synopsis: "MIT's foundational programming text. Uses Scheme to build up procedures, data abstraction, modularity, metalinguistic abstraction, and finally a register machine \u2014 all from first principles.",
    note: 'Worked through about a third before life intervened. The metacircular evaluator is genuinely fun.',
    tags: ['classic', 'lisp'],
  },
  {
    title: 'Gödel, Escher, Bach',
    author: 'Douglas Hofstadter',
    year: 1979,
    pages: 777,
    rating: 4,
    status: 'finished',
    spine: '#c8a14a',
    cover: '#d6b15a',
    text:  '#2a2418',
    synopsis: "Hofstadter weaves Bach's fugues, Escher's drawings, and Gödel's incompleteness theorem into a 700-page meditation on strange loops, self-reference, and the nature of mind.",
    note: 'Took two summers. Recursion, formal systems, and a lot of dialogues about turtles.',
    tags: ['mind'],
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    year: 2021,
    pages: 640,
    rating: 5,
    status: 'reading',
    spine: '#1f4f3a',
    cover: '#27604a',
    text:  '#e4f0d8',
    synopsis: "Build two complete language implementations from scratch \u2014 a tree-walking interpreter in Java and a bytecode VM in C \u2014 with deep dives into every component.",
    note: 'On the second half (the bytecode VM in C). The pacing is unreasonably good for a book about parsers.',
    tags: ['languages'],
  },
  {
    title: 'Hackers & Painters',
    author: 'Paul Graham',
    year: 2004,
    pages: 272,
    rating: 3,
    status: 'finished',
    spine: '#a4b0bf',
    cover: '#b5c0cf',
    text:  '#1f242b',
    synopsis: "Paul Graham's collected essays on programming, startups, and taste \u2014 drawn from his time founding Viaweb and writing at Y Combinator.",
    note: 'Some essays hold up, some really don’t. The one about taste still does.',
    tags: ['essays'],
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Hunt & Thomas',
    year: 1999,
    pages: 320,
    rating: 4,
    status: 'finished',
    spine: '#6b5a3a',
    cover: '#7a6845',
    text:  '#f1e8d3',
    synopsis: "A grab-bag of practical advice for working programmers: orthogonality, DRY, plain text, debugging, requirements, contracts. Short chapters, useful daily.",
    note: 'Classic for a reason. The DRY principle has saved me from myself dozens of times.',
    tags: ['craft'],
  },
  {
    title: 'Computer Systems: A Programmer’s Perspective',
    author: 'Bryant & O’Hallaron',
    year: 2015,
    pages: 1078,
    rating: 5,
    status: 'reference',
    spine: '#1a1a1a',
    cover: '#262626',
    text:  '#d4d4d4',
    synopsis: "The textbook view of a computer from a programmer’s perspective: data representation, machine code, memory hierarchy, linking, exceptional control flow, virtual memory, and concurrency.",
    note: 'Lives on the desk. Open to chapter 6 (the memory hierarchy) more often than any other chapter.',
    tags: ['textbook'],
  },
  {
    title: 'Why We Sleep',
    author: 'Matthew Walker',
    year: 2017,
    pages: 368,
    rating: 3,
    status: 'finished',
    spine: '#3a557a',
    cover: '#46638a',
    text:  '#e8eef7',
    synopsis: "Matthew Walker’s case for sleep as the foundation of health, drawn from his neuroscience lab at UC Berkeley. A few specific claims have been contested; the prescriptive parts hold up.",
    note: 'Convinced me to stop pulling all-nighters. Mostly.',
    tags: ['non-tech'],
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    year: 2021,
    pages: 476,
    rating: 4,
    status: 'finished',
    spine: '#d97a3a',
    cover: '#e2864a',
    text:  '#2a1f15',
    synopsis: "A high school science teacher wakes up alone on a spaceship with no memory and a mission to save the sun. Best read knowing as little else as possible.",
    note: 'Read in two flights. The science is mostly hand-wavy but the friendship is great.',
    tags: ['fiction'],
  },
];

const NAV = [
  { id: 'about',     label: 'About',     icon: 'about' },
  { id: 'bookshelf', label: 'Bookshelf', icon: 'book'  },
  { id: 'projects',  label: 'Projects',  icon: 'grid', soon: true },
  { id: 'writing',   label: 'Writing',   icon: 'pen',  soon: true },
];

// Tiny line-icon set — 20×20, currentColor strokes.
const Icon = ({ name, size = 18 }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 20 20',
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.4,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'about':
      return (
        <svg {...props}>
          <circle cx="10" cy="7" r="3" />
          <path d="M3.5 17c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5" />
        </svg>
      );
    case 'book':
      return (
        <svg {...props}>
          <path d="M4 4h8a3 3 0 0 1 3 3v10H7a3 3 0 0 1-3-3V4z" />
          <path d="M4 14a3 3 0 0 1 3-3h8" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...props}>
          <rect x="3"  y="3"  width="6" height="6" rx="1" />
          <rect x="11" y="3"  width="6" height="6" rx="1" />
          <rect x="3"  y="11" width="6" height="6" rx="1" />
          <rect x="11" y="11" width="6" height="6" rx="1" />
        </svg>
      );
    case 'pen':
      return (
        <svg {...props}>
          <path d="M14 3l3 3-9 9-4 1 1-4 9-9z" />
        </svg>
      );
    default:
      return null;
  }
};

// ────────────────────────────────────────────────────────────────────────────
// Marginalia — a personal commonplace book, inspired by Aurelius's Meditations.
// Flat chronological list. Themes are just tags. Voice = mine, not a textbook.
// Some entries have an `aside` — a margin note scribbled later (rendered in
// Caveat handwriting on the page).
// ────────────────────────────────────────────────────────────────────────────
const MARGINALIA = {
  subtitle: 'a commonplace book, in pieces',
  blurb: "thoughts i keep coming back to. inspired by aurelius's meditations \u2014 except mine are written between problem sets, on the bus, after bad sleeps. nothing is finished and nothing is in order except the dates.",
  epigraph: {
    text: 'you could leave life right now. let that determine what you do.',
    by:   'm. aurelius',
  },
  started: 'dec \u201924',
  tags: ['self', 'craft', 'failure', 'people', 'time', 'body'],
  // chronological, oldest first; the view reverses for newest-first display.
  entries: [
    { id: 1,  date: '14 dec 2024', where: 'home, after exams',     tag: 'self',
      text: "the thought you keep coming back to in your head \u2014 that\u2019s the thing. not the application. not the r\u00e9sum\u00e9 thought. the one that wakes you up at 3am.",
      aside: 'told myself this the week i almost switched majors. still applies.' },
    { id: 2,  date: '02 jan 2025', where: '2am, bad sleep',         tag: 'body',
      text: "sleep is the most undervalued debugger ever shipped. half my hardest bugs solve themselves overnight and i still won\u2019t go to bed." },
    { id: 3,  date: '11 feb 2025', where: 'dana porter, 11pm',      tag: 'time',
      text: 'the day is too small a unit. the right one is the season \u2014 three months of one thing, then look up. days are just noise.' },
    { id: 4,  date: '26 feb 2025', where: 'after a 1pm lecture',    tag: 'craft',
      text: "if i can explain it on a whiteboard to my roommate, i understand it. if i have to open the IDE first, i don\u2019t." },
    { id: 5,  date: '08 mar 2025', where: 'iron horse trail',       tag: 'self',
      text: "default to the smaller circle. three people you\u2019d call at 2am, five projects you actually like, two books a month. less, deeper. easier." },
    { id: 6,  date: '21 mar 2025', where: 'after failing a quiz',   tag: 'failure',
      text: "every bug i\u2019ve fixed had a moment in it where i was sure the compiler was wrong. the compiler is never wrong. i think this generalizes." },
    { id: 7,  date: '04 apr 2025', where: 'bus to toronto',         tag: 'self',
      text: 'most decisions are reversible. most of them are small. pick one and go \u2014 the data only arrives after the door closes behind you.' },
    { id: 8,  date: '07 may 2025', where: 'first week of coop',     tag: 'craft',
      text: 'good code is what i can read three months from now without flinching. everything else is just typing fast.' },
    { id: 9,  date: '19 jun 2025', where: 'office, 6pm',            tag: 'craft',
      text: "writing is debugging the version of you who wrote yesterday. point isn\u2019t being smart on the page \u2014 it\u2019s finding out where you were wrong." },
    { id: 10, date: '02 jul 2025', where: 'a long week',            tag: 'people',
      text: "the people who make me a smaller version of myself by being around \u2014 not my people. doesn\u2019t matter how clever they are at the table." },
    { id: 11, date: '24 aug 2025', where: 'last push before launch',tag: 'craft',
      text: "ship at 70%. the other 30% only exists in the wild. can\u2019t manufacture it at a desk no matter how many hours i sit there." },
    { id: 12, date: '09 sep 2025', where: 'a stuck PR',             tag: 'failure',
      text: 'there is a specific dread that arrives when a test passes for the wrong reason. trust that dread. almost always right.',
      aside: 'told my manager. he laughed and said yep.' },
    { id: 13, date: '14 oct 2025', where: 'after a bad demo',       tag: 'failure',
      text: "the post-mortem is worth more than the win. i\u2019ll forget the win by friday anyway." },
    { id: 14, date: '03 nov 2025', where: 'an empty hallway',       tag: 'people',
      text: 'loneliness in a library is the productive kind. loneliness in a hallway is the painful kind. same feeling, different room.' },
    { id: 15, date: '17 dec 2025', where: 'finals',                 tag: 'failure',
      text: "quitting on the right thing is a skill. so is not quitting on the right thing. they\u2019re the same skill used in opposite directions. most days i can\u2019t tell which one i need." },
    { id: 16, date: '11 jan 2026', where: 'walk after dinner',      tag: 'people',
      text: 'i can have a real conversation in twelve minutes. i can have nothing in a three-hour dinner. presence, not duration.' },
    { id: 17, date: '08 feb 2026', where: 'on time, for once',      tag: 'people',
      text: 'show up on time. then leave on time. almost nothing else needs to be said about respecting someone.' },
    { id: 18, date: '22 feb 2026', where: 'the quiet wing',         tag: 'self',
      text: "lonely week. that\u2019s the entry." },
    { id: 19, date: '06 mar 2026', where: 'birthday weekend',       tag: 'time',
      text: 'four years is a long time. four months is a long time. four weeks is the dangerous number \u2014 long enough to dream, short enough to do nothing.' },
    { id: 20, date: '15 mar 2026', where: 'a slow run',             tag: 'time',
      text: 'compounding is real but slow. the first year of any habit looks, from the inside, like nothing happened.' },
    { id: 21, date: '02 apr 2026', where: '2am, owing a paper',     tag: 'time',
      text: "the me who\u2019ll deal with this tomorrow doesn\u2019t exist. it\u2019s just me, with a different timestamp.",
      aside: 'wrote this at 2am, obviously.' },
    { id: 22, date: '20 apr 2026', where: 'first km of the season', tag: 'body',
      text: "run when you don\u2019t want to. the first ten minutes are a tax everyone pays. after that the day arrives differently." },
    { id: 23, date: '05 may 2026', where: 'a clean eight hours',    tag: 'body',
      text: "slept properly. body feels like new firmware." },
    { id: 24, date: '12 may 2026', where: 'a long sunday',          tag: 'body',
      text: 'rest and avoidance look the same from outside. rest leaves me lighter. avoidance, heavier. i should learn to tell the difference faster.' },
  ],
};

// Share globally so other Babel scripts can read them.
Object.assign(window, { LEO, BOOKS, NAV, Icon, MARGINALIA });
