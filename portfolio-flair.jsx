// Flair: bespoke project thumbnails, handwritten marginalia, terminal strip.
// Each thumbnail is hand-built SVG/CSS, themed to the project — no
// generic gradient + glyph placeholders.

const { useState: useFlairState, useEffect: useFlairEffect, useRef: useFlairRef } = React;

// ────────────────────────────────────────────────────────────────────────────
// Project thumbnails — one per project id
// ────────────────────────────────────────────────────────────────────────────

// rv-mini — scrolling RISC-V instruction trace with register state
function ThumbRvMini() {
  const lines = [
    { addr: '0x80000000', op: 'addi',  args: 'sp, sp, -16' },
    { addr: '0x80000004', op: 'sw',    args: 'ra, 12(sp)' },
    { addr: '0x80000008', op: 'lui',   args: 'a0, 0x10' },
    { addr: '0x8000000c', op: 'jal',   args: 'kmain' },
    { addr: '0x80000010', op: 'lw',    args: 'ra, 12(sp)' },
    { addr: '0x80000014', op: 'addi',  args: 'sp, sp, 16' },
    { addr: '0x80000018', op: 'ret',   args: '' },
  ];
  return (
    <div className="thumb thumb-rv">
      <div className="thumb-rv-scroll">
        {lines.concat(lines).map((l, i) => (
          <div className="thumb-rv-line" key={i} data-active={i === 3 ? '' : undefined}>
            <span className="thumb-rv-addr">{l.addr}</span>
            <span className="thumb-rv-op">{l.op}</span>
            <span className="thumb-rv-args">{l.args}</span>
          </div>
        ))}
      </div>
      <div className="thumb-rv-regs">
        <div className="thumb-rv-regs-h">x[ ]</div>
        <div className="thumb-rv-reg"><span>ra</span><span>80000010</span></div>
        <div className="thumb-rv-reg"><span>sp</span><span>7ffff8e0</span></div>
        <div className="thumb-rv-reg"><span>a0</span><span>00010000</span></div>
        <div className="thumb-rv-reg"><span>pc</span><span>8000000c</span></div>
      </div>
      <div className="thumb-pin">rv32i · 47 / 47 tests</div>
    </div>
  );
}

// watiam scheduler — mini week grid with course blocks
function ThumbScheduler() {
  // [col 0-4, row start 0-9, span, hue]
  const blocks = [
    { col: 0, top: 1, span: 2, c: 'var(--hue-1)', label: 'ECE 250' },
    { col: 1, top: 2, span: 1, c: 'var(--hue-0)', label: 'MATH 213' },
    { col: 2, top: 1, span: 2, c: 'var(--hue-1)', label: 'ECE 250' },
    { col: 3, top: 4, span: 3, c: 'var(--hue-2)', label: 'ECE 224' },
    { col: 4, top: 2, span: 1, c: 'var(--hue-0)', label: 'MATH 213' },
    { col: 1, top: 5, span: 2, c: 'var(--hue-3)', label: 'ECE 320' },
    { col: 4, top: 5, span: 2, c: 'var(--hue-3)', label: 'ECE 320' },
  ];
  return (
    <div className="thumb thumb-cal">
      <div className="thumb-cal-head">
        <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span>
      </div>
      <div className="thumb-cal-grid">
        {[...Array(50)].map((_, i) => <div key={i} className="thumb-cal-cell" />)}
        {blocks.map((b, i) => (
          <div className="thumb-cal-block" key={i}
            style={{
              gridColumn: (b.col + 1),
              gridRowStart: b.top + 1,
              gridRowEnd: b.top + 1 + b.span,
              background: `color-mix(in oklab, ${b.c} 80%, transparent)`,
            }}>
            <span>{b.label}</span>
          </div>
        ))}
      </div>
      <div className="thumb-pin">winter 2026 · no conflicts</div>
    </div>
  );
}

// shazam-on-fpga — constellation map of FFT peaks
function ThumbFft() {
  // peaks scattered across freq/time
  const peaks = [];
  const seed = (n) => ((n * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 38; i++) {
    peaks.push({
      x: 6 + seed(i + 1) * 88,
      y: 10 + seed(i + 11) * 80,
      r: 1 + seed(i + 31) * 1.6,
    });
  }
  // anchor a few key peaks for hash lines
  const anchors = [peaks[3], peaks[8], peaks[14], peaks[21], peaks[28]];
  return (
    <div className="thumb thumb-fft">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="thumb-fft-svg">
        <defs>
          <linearGradient id="fft-axis" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e0a8ff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#e0a8ff" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {anchors.map((a, i) => {
          // draw 3 lines from each anchor to subsequent peaks
          const targets = peaks.filter(p => p.x > a.x && p.x < a.x + 30).slice(0, 3);
          return targets.map((t, j) => (
            <line key={i + '-' + j}
              x1={a.x} y1={a.y} x2={t.x} y2={t.y}
              stroke="#e0a8ff" strokeOpacity="0.35" strokeWidth="0.25" />
          ));
        })}
        {peaks.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r}
            fill={anchors.includes(p) ? '#ffd9ff' : '#e0a8ff'}
            opacity={anchors.includes(p) ? 1 : 0.85} />
        ))}
        {/* sliding analysis window */}
        <rect x="22" y="6" width="22" height="88" fill="#fff" fillOpacity="0.05"
          stroke="#fff" strokeOpacity="0.25" strokeDasharray="1 1" strokeWidth="0.3" />
      </svg>
      <div className="thumb-fft-axis">freq →</div>
      <div className="thumb-pin">hash: 7c2b · match</div>
    </div>
  );
}

// uw embedded — pcb traces with pads + IC
function ThumbPcb() {
  return (
    <div className="thumb thumb-pcb">
      <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" className="thumb-pcb-svg">
        {/* traces */}
        <g stroke="#d99a4a" strokeWidth="0.6" fill="none" strokeLinecap="round">
          <path d="M5 10 L 25 10 L 30 15 L 50 15 L 55 20 L 80 20" />
          <path d="M5 25 L 22 25 L 28 31 L 60 31 L 65 36" />
          <path d="M5 40 L 40 40 L 45 45 L 95 45" />
          <path d="M5 55 L 30 55 L 35 60 L 70 60 L 78 68 L 95 68" />
          <path d="M82 5 L 82 20 M88 5 L 88 25 M94 5 L 94 30" />
          <path d="M14 70 L 14 50 M20 70 L 20 45" />
        </g>
        {/* pads */}
        <g fill="#f0c065">
          {[[5,10],[5,25],[5,40],[5,55],[82,5],[88,5],[94,5],[95,45],[95,68],[14,70],[20,70],[80,20]].map((p,i)=>(
            <circle key={i} cx={p[0]} cy={p[1]} r="1.2" />
          ))}
        </g>
        {/* IC chip */}
        <g>
          <rect x="40" y="48" width="22" height="14" rx="0.5" fill="#1a1a1a" stroke="#2d2d2d" strokeWidth="0.3"/>
          <circle cx="42.5" cy="50.5" r="0.6" fill="#5a5a5a"/>
          <text x="51" y="56.5" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="3" fill="#7a7a7a" letterSpacing="0.3">ATmega328</text>
          {/* legs */}
          {[0,1,2,3,4,5].map(i => (
            <g key={i}>
              <rect x={41 + i*3.5} y={47} width="1.5" height="1" fill="#c89a4a"/>
              <rect x={41 + i*3.5} y={62} width="1.5" height="1" fill="#c89a4a"/>
            </g>
          ))}
        </g>
        {/* resistors */}
        <g>
          <rect x="65" y="11" width="6" height="2" fill="#d4a060" rx="0.3"/>
          <rect x="66.5" y="11" width="1" height="2" fill="#5a3020"/>
          <rect x="68" y="11" width="1" height="2" fill="#c04020"/>
        </g>
      </svg>
      <div className="thumb-pin thumb-pin-light">badge v2 · 12 / 200 shipped</div>
    </div>
  );
}

// doom-on-lfs — boot log scrolling on a CRT-ish black
function ThumbDoom() {
  return (
    <div className="thumb thumb-doom">
      <div className="thumb-doom-scan" />
      <pre className="thumb-doom-pre">
{`[ ok ] mount / on tmpfs
[ ok ] loading kernel 6.6.21
[ ok ] init busybox 1.36
[ ok ] starting xinit
> exec /usr/local/doom1.wad
`}<span className="thumb-doom-blink">_</span>
      </pre>
      <div className="thumb-doom-logo">DOOM</div>
      <div className="thumb-pin thumb-pin-light">40-post log · public</div>
    </div>
  );
}

// tinydb — LSM-tree levels with compaction arrows
function ThumbLsm() {
  return (
    <div className="thumb thumb-lsm">
      <div className="thumb-lsm-rows">
        <div className="thumb-lsm-row thumb-lsm-mem">
          <span className="thumb-lsm-label">memtable</span>
          <span className="thumb-lsm-bar" style={{ width: '32%' }}/>
        </div>
        <div className="thumb-lsm-row" data-level="0">
          <span className="thumb-lsm-label">L0</span>
          <span className="thumb-lsm-seg" style={{ width: '22%' }}/>
          <span className="thumb-lsm-seg" style={{ width: '24%' }}/>
          <span className="thumb-lsm-seg" style={{ width: '21%' }}/>
        </div>
        <div className="thumb-lsm-row" data-level="1">
          <span className="thumb-lsm-label">L1</span>
          <span className="thumb-lsm-seg" style={{ width: '46%' }}/>
          <span className="thumb-lsm-seg" style={{ width: '42%' }}/>
        </div>
        <div className="thumb-lsm-row" data-level="2">
          <span className="thumb-lsm-label">L2</span>
          <span className="thumb-lsm-seg" style={{ width: '94%' }}/>
        </div>
      </div>
      <div className="thumb-lsm-flow">
        <span>flush</span>
        <span>↓</span>
        <span>compact</span>
      </div>
      <div className="thumb-pin">~ 1.2M keys · ok</div>
    </div>
  );
}

// ece150 ta — code snippet with simple syntax colors
function ThumbCpp() {
  return (
    <div className="thumb thumb-cpp">
      <pre className="thumb-cpp-pre">
        <span className="cl-c">// office hours: tue/thu 4pm</span>{'\n'}
        <span className="cl-k">template</span><span className="cl-p">{'<'}</span><span className="cl-k">typename</span> <span className="cl-t">T</span><span className="cl-p">{'>'}</span>{'\n'}
        <span className="cl-k">struct</span> <span className="cl-t">List</span> <span className="cl-p">{'{'}</span>{'\n'}
        {'  '}<span className="cl-t">T</span> head<span className="cl-p">;</span>{'\n'}
        {'  '}<span className="cl-t">List</span><span className="cl-p">*</span> tail<span className="cl-p">;</span>{'\n'}
        <span className="cl-p">{'}'}</span><span className="cl-p">;</span>
      </pre>
      <div className="thumb-pin">ece150 · 2 terms</div>
    </div>
  );
}

// systems weekly — envelope w/ paper peeking out
function ThumbNewsletter() {
  return (
    <div className="thumb thumb-mail">
      <div className="thumb-mail-paper">
        <div className="thumb-mail-line" style={{ width: '70%' }}/>
        <div className="thumb-mail-line" style={{ width: '90%' }}/>
        <div className="thumb-mail-line" style={{ width: '60%' }}/>
        <div className="thumb-mail-line" style={{ width: '82%' }}/>
        <div className="thumb-mail-line" style={{ width: '74%' }}/>
      </div>
      <div className="thumb-mail-env">
        <div className="thumb-mail-flap"/>
        <div className="thumb-mail-stamp">№012</div>
      </div>
      <div className="thumb-pin thumb-pin-light">issue 12 · 900 subs</div>
    </div>
  );
}

const THUMB_BY_ID = {
  'riscv':         ThumbRvMini,
  'scheduler':     ThumbScheduler,
  'fpga-audio':    ThumbFft,
  'embedded-club': ThumbPcb,
  'doom-lfs':      ThumbDoom,
  'tinydb':        ThumbLsm,
  'tutoring':      ThumbCpp,
  'newsletter':    ThumbNewsletter,
};

function ProjectThumb({ project }) {
  const C = THUMB_BY_ID[project.id];
  return (
    <div className="lp-card-img lp-card-img-flair"
      style={{
        background: `linear-gradient(135deg, ${project.bgFrom} 0%, ${project.bgTo} 100%)`,
        '--accent': project.accent,
      }}>
      <div className="lp-card-grain" />
      {C ? <C /> : <div className="lp-card-glyph" style={{ color: project.accent }}>{project.glyph}</div>}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Marginalia — Caveat-font handwritten side-notes with curly arrows.
// Place absolutely against a positioned parent.
// ────────────────────────────────────────────────────────────────────────────
function Margin({ text, side = 'right', top = 0, rotate = -4, arrow = 'curve-l' }) {
  return (
    <span className={'lp-margin lp-margin-' + side}
      style={{ top, '--rot': rotate + 'deg' }}>
      <span className="lp-margin-text">{text}</span>
      <svg className={'lp-margin-arrow lp-margin-arrow-' + arrow}
        viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {arrow === 'curve-l' && (
          <>
            <path d="M58 6 C 36 6, 18 14, 8 32" />
            <path d="M14 28 L 8 32 L 12 38" />
          </>
        )}
        {arrow === 'curve-r' && (
          <>
            <path d="M2 6 C 24 6, 42 14, 52 32" />
            <path d="M46 28 L 52 32 L 48 38" />
          </>
        )}
        {arrow === 'down' && (
          <>
            <path d="M10 4 C 14 18, 24 26, 36 36" />
            <path d="M30 36 L 36 36 L 36 30" />
          </>
        )}
      </svg>
    </span>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Terminal strip — sits at the very top of the main column, types out
// current activity, blinking cursor.
// ────────────────────────────────────────────────────────────────────────────
function TerminalStrip() {
  const messages = [
    "compiling rv-mini ... ok",
    "reading: crafting interpreters, ch.18",
    "git push origin main → 3 files, +112 −7",
    "iron horse trail · 6.2km · 31:04",
    "open to coop · winter '26",
    "currently: a small risc-v emulator, slowly",
  ];
  const [idx, setIdx] = useFlairState(0);
  const [shown, setShown] = useFlairState('');
  const [phase, setPhase] = useFlairState('typing'); // typing | holding | erasing

  useFlairEffect(() => {
    const full = messages[idx];
    let t;
    if (phase === 'typing') {
      if (shown.length < full.length) {
        t = setTimeout(() => setShown(full.slice(0, shown.length + 1)), 28 + Math.random() * 35);
      } else {
        t = setTimeout(() => setPhase('holding'), 1800);
      }
    } else if (phase === 'holding') {
      t = setTimeout(() => setPhase('erasing'), 1200);
    } else if (phase === 'erasing') {
      if (shown.length > 0) {
        t = setTimeout(() => setShown(shown.slice(0, -1)), 12);
      } else {
        setIdx((idx + 1) % messages.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(t);
  }, [shown, phase, idx]);

  return (
    <div className="lp-term" aria-hidden="true">
      <span className="lp-term-dots">
        <span/><span/><span/>
      </span>
      <span className="lp-term-prompt">~/leo</span>
      <span className="lp-term-arrow">›</span>
      <span className="lp-term-text">{shown}</span>
      <span className="lp-term-cursor" />
    </div>
  );
}

Object.assign(window, { ProjectThumb, Margin, TerminalStrip });
