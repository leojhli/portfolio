// Projects + "things i've done" content for Leo.
// All placeholder — Leo can swap freely.

const THINGS_DONE = [
  { text: "incoming ", linkText: "@shopify", url: "#", suffix: " · summer ’26, prev @psp investments" },
  { text: "launched ", linkText: "rv-mini", url: "#", suffix: ", a tiny rv32i emulator in c that boots a bare-metal kernel" },
  { text: "won 2nd at ", linkText: "hack the north", url: "#", suffix: " for an fpga-accelerated audio fingerprinter" },
  { text: "co-built the watiam-integrated scheduler used by ~3k cs/ce students at waterloo" },
  { text: "ran the ", linkText: "uw embedded systems club", url: "#", suffix: " — weekly soldering nights, two pcb badges shipped" },
  { text: "ta’d ece-150 (intro c++) two terms in a row, wrote the study guide the prof now ships officially" },
  { text: "seeking winter ’26 internship opportunities" },
];

const PROJECTS = [
  {
    id: 'riscv',
    title: 'rv-mini',
    badge: 'in progress',
    tag: 'projects',
    blurb: "a small rv32i emulator in c. supports the integer base + zicsr, boots a tiny bare-metal kernel. writing it to actually understand the bits i hand-wave about in lecture.",
    // image placeholder — abstract gradient
    bgFrom: '#1a2a3a', bgTo: '#3a5577',
    accent: '#6ab4ff',
    glyph: 'CPU',
  },
  {
    id: 'scheduler',
    title: 'watiam scheduler',
    badge: '3k+ users',
    tag: 'projects',
    blurb: "course scheduler that actually understands your prereqs. drag-and-drop terms, conflict detection, exports to ical. built with a friend over a single reading week.",
    bgFrom: '#2a3f2a', bgTo: '#3e5c3e',
    accent: '#9bd28a',
    glyph: 'CAL',
  },
  {
    id: 'fpga-audio',
    title: 'shazam-on-fpga',
    badge: 'won 2nd · htn',
    tag: 'projects',
    blurb: "ran a constellation-map audio fingerprinter on a basys3 fpga. mic input, fft on hardware, hash matching in host software. recognised a song from 3 seconds of phone-speaker audio.",
    bgFrom: '#3a1a3a', bgTo: '#5d2a55',
    accent: '#e0a8ff',
    glyph: 'FFT',
  },
  {
    id: 'embedded-club',
    title: 'uw embedded',
    badge: 'community',
    tag: 'communities',
    blurb: "vp + organiser of the waterloo embedded systems club. weekly solder nights, talks from arm engineers, and two pcb badges we shipped to 200 students.",
    bgFrom: '#3a2a1a', bgTo: '#5c4530',
    accent: '#f0b870',
    glyph: '◊',
  },
  {
    id: 'doom-lfs',
    title: 'doom-on-lfs',
    badge: 'project',
    tag: 'projects',
    blurb: "built linux from scratch over a summer (kernel + glibc + busybox + a tiny init), then got chocolate doom running on it. wrote up the whole thing as a 40-post log.",
    bgFrom: '#1a1a1a', bgTo: '#2a2a2a',
    accent: '#ff5a3a',
    glyph: 'TUX',
  },
  {
    id: 'tinydb',
    title: 'tinydb',
    badge: 'reading-along',
    tag: 'projects',
    blurb: "an lsm-tree based kv store i wrote alongside ‘designing data-intensive applications.’ supports puts, gets, range scans, and a sad-but-working compaction routine.",
    bgFrom: '#1a3a3a', bgTo: '#2e5a5a',
    accent: '#7adcd0',
    glyph: 'KV',
  },
  {
    id: 'tutoring',
    title: 'ece150 ta',
    badge: 'school',
    tag: 'communities',
    blurb: "ta for intro c++ two terms running. ran tutorials, held twice-weekly office hours, and wrote a study guide that the prof now distributes officially.",
    bgFrom: '#2a2a3a', bgTo: '#3e3e5a',
    accent: '#a8a8ff',
    glyph: 'C++',
  },
  {
    id: 'newsletter',
    title: 'systems weekly',
    badge: '900 subs',
    tag: 'communities',
    blurb: "a newsletter where i summarise one systems paper a week for cs undergrads who don't have time to read them. now sponsored by a chip startup nobody's heard of yet.",
    bgFrom: '#3a2a2a', bgTo: '#5a3a3a',
    accent: '#ff9a8a',
    glyph: '✉',
  },
];

const PROJECT_FILTERS = [
  { id: 'everything',  label: 'everything'  },
  { id: 'projects',    label: 'projects'    },
  { id: 'communities', label: 'communities' },
];

Object.assign(window, { THINGS_DONE, PROJECTS, PROJECT_FILTERS });
