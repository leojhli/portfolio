// Shayaan-inspired portfolio for Leo Li.
// Left taskbar + scrollable main content. Sections: about (hero + bio +
// projects grid), bookshelf (cover grid), and placeholder views for the rest.
// Light/dark theme, lowercase typography, image-card project grid.

const { useState, useEffect, useRef, useMemo } = React;

const NAV_SECTIONS = [
  { id: 'about',      label: 'about'      },
  { id: 'projects',   label: 'projects'   },
  { id: 'bookshelf',  label: 'bookshelf'  },
  { id: 'marginalia', label: 'marginalia' },
];

// ────────────────────────────────────────────────────────────────────────────
// Theme + persistence
// ────────────────────────────────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('leo-theme') || 'light'; } catch { return 'light'; }
  });
  useEffect(() => {
    try { localStorage.setItem('leo-theme', theme); } catch {}
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return [theme, setTheme];
}

// ────────────────────────────────────────────────────────────────────────────
// Top-right cluster: theme toggle + Cmd+K placeholder
// ────────────────────────────────────────────────────────────────────────────
const SunIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="3.5" />
    <path d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.2 4.2l1.1 1.1M14.7 14.7l1.1 1.1M4.2 15.8l1.1-1.1M14.7 5.3l1.1-1.1" />
  </svg>
);
const MoonIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 11.5A6.5 6.5 0 1 1 8.5 4a5 5 0 0 0 7.5 7.5z" />
  </svg>
);

function TopRight({ theme, setTheme, onCmdK }) {
  return (
    <div className="lp-topright">
      <button className="lp-cmdk" onClick={onCmdK} aria-label="Open command menu">
        <span className="lp-cmdk-label">jump to…</span>
        <kbd className="lp-kbd">⌘</kbd><kbd className="lp-kbd">K</kbd>
      </button>
      <button className="lp-icon-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle theme">
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Record player — spinning vinyl, real album art via Spotify oEmbed (no auth)
// ────────────────────────────────────────────────────────────────────────────
const RECORD_TRACKS = [
  { id: '047fCsbO4NdmwCBn8pcUXl', ytId: 'JDb3ZZD4bA0', title: 'Marvins Room',       artist: 'Drake'                },
  { id: '0GaBIpyHvytM1UBYmqXu08', ytId: 'CikjiSG8eRM', title: 'From Time',          artist: 'Drake, Jhene Aiko'   },
  { id: '6Z01gUquJsjJC67uNWm6P0', ytId: 'wc7JPaRV5uU', title: 'Shot For Me',        artist: 'Drake'                },
  { id: '7JXZq0JgG2zTrSOAgY8VMC', ytId: 'AfRdRXCo3IU', title: 'Jungle',             artist: 'Drake'                },
  { id: '6G9XqMGLEFMqHWkTIOY3Nd', ytId: 'lG4HICGeQoo', title: 'Come and See Me',    artist: 'PARTYNEXTDOOR, Drake' },
  { id: '2rFqkDRJlumT7QjljlldlR', ytId: 'Q4SRlZtuHoQ', title: 'LOYAL',              artist: 'PARTYNEXTDOOR, Drake' },
  { id: '',                        ytId: 'lXYq9ImJIN8', title: 'Break from Toronto', artist: 'Drake'                },
  { id: '',                        ytId: '-zzP29emgpg', title: 'Take Care',          artist: 'Drake, Rihanna'       },
  { id: '',                        ytId: 'zhY_0DoQCQs', title: 'Do Not Disturb',     artist: 'Drake'                },
  { id: '',                        ytId: 'ZX_mvoY_Hg0', title: 'Not You Too',        artist: 'Drake, Chris Brown'   },
  { id: '',                        ytId: 'PMk8L9FNqnY', title: 'Over My Dead Body',  artist: 'Drake'                },
  { id: '',                        ytId: 'Fg1yLqL8clo', title: 'Fortworth',          artist: 'Drake'                },
  { id: '',                        ytId: 'rThDEqJsRtk', title: 'Make Them Know',     artist: 'Drake'                },
];

function RecordPlayer() {
  const [artMap, setArtMap]   = useState({});
  const [idx, setIdx]         = useState(0);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const n = RECORD_TRACKS.length;

  // Spotify oEmbed — album art only (skips tracks without a Spotify ID)
  useEffect(() => {
    RECORD_TRACKS.forEach(t => {
      if (!t.id) return;
      fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${t.id}`)
        .then(r => r.json())
        .then(d => setArtMap(m => ({ ...m, [t.id]: d.thumbnail_url })))
        .catch(() => {});
    });
  }, []);

  // Load YouTube IFrame API (returns a promise that resolves when ready)
  const loadYouTubeAPI = () => {
    if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
    if (window._ytApiLoading) return window._ytApiLoading;
    window._ytApiLoading = new Promise((resolve) => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(tag, first);
      window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    });
    return window._ytApiLoading;
  };

  const [playerReady, setPlayerReady] = useState(false);

  // Create player once and reuse it. Keep it visually hidden.
  useEffect(() => {
    let mounted = true;
    loadYouTubeAPI().then((YT) => {
      if (!mounted) return;
      if (playerRef.current) return;
      playerRef.current = new YT.Player(containerRef.current, {
        height: '0', width: '0', videoId: RECORD_TRACKS[idx].ytId || '',
        playerVars: { playsinline: 1 },
        events: {
          onReady: () => setPlayerReady(true),
        },
      });
    }).catch(() => {});
    return () => { mounted = false; if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy(); };
  }, []);

  const track = RECORD_TRACKS[idx];
  const art   = artMap[track.id];

  const togglePlayback = () => {
    const player = playerRef.current;
    if (player && playerReady) {
      try {
        if (playing) player.pauseVideo(); else player.playVideo();
      } catch (e) {}
    }
    setPlaying(p => !p);
  };

  const goTo = (dir) => {
    setIdx(i => {
      const next = (i + dir + n) % n;
      return next;
    });
  };

  // When index changes and the player is ready, load the new video.
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !playerReady) return;
    if (track.ytId) {
      try {
        player.loadVideoById(track.ytId);
        if (playing && player.playVideo) player.playVideo();
      } catch (e) {}
    }
  }, [idx, playerReady]);

  // Keep playback in sync with the play state once the player is ready.
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !playerReady) return;
    try {
      if (playing) player.playVideo(); else player.pauseVideo();
    } catch (e) {}
  }, [playing, playerReady]);

  return (
    <div className="lp-record">
      <div ref={containerRef} style={{position: 'fixed', left: -9999, top: -9999}} />
      <div className="lp-record-row">
        <button className="lp-record-nav" onClick={() => goTo(-1)} aria-label="Previous track">
          &#8249;
        </button>
        <button
          className="lp-record-disc-btn"
          onClick={togglePlayback}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          <div
            className="lp-record-disc"
            data-playing={playing || undefined}
            style={art ? { backgroundImage: `url(${art})` } : undefined}
          />
        </button>
        <button className="lp-record-nav" onClick={() => goTo(1)} aria-label="Next track">
          &#8250;
        </button>
      </div>
      <div className="lp-record-meta">
        <div className="lp-record-title">{track.title}</div>
        <div className="lp-record-artist">{track.artist}</div>
      </div>
    </div>
  );
}
function Taskbar({ active, onChange }) {
  const markRef = useRef(null);
  const onMarkClick = () => {
    const el = markRef.current;
    if (!el) return;
    el.setAttribute('data-spin', '');
    setTimeout(() => el.removeAttribute('data-spin'), 900);
    // confetti
    const rect = el.getBoundingClientRect();
    const glyphs = ['✦','✺','◆','✷','✧','◇','★'];
    const colors = ['var(--hue-0)','var(--hue-1)','var(--hue-2)','var(--hue-3)','var(--hue-4)'];
    for (let i = 0; i < 12; i++) {
      const s = document.createElement('span');
      s.className = 'lp-confetti';
      s.textContent = glyphs[i % glyphs.length];
      s.style.left = (rect.left + rect.width/2) + 'px';
      s.style.top  = (rect.top  + rect.height/2) + 'px';
      s.style.color = colors[i % colors.length];
      s.style.setProperty('--cx', (Math.cos(i / 12 * Math.PI * 2) * 90) + 'px');
      s.style.setProperty('--cy', (Math.sin(i / 12 * Math.PI * 2) * 90 - 20) + 'px');
      s.style.setProperty('--rt', (Math.random() * 540 - 270) + 'deg');
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
  };
  return (
    <aside className="lp-side">
      <div className="lp-brand">
        <div ref={markRef} className="lp-brand-mark" onClick={onMarkClick}
          role="button" tabIndex={0} title="click me"
          onKeyDown={(e)=>{ if(e.key==='Enter') onMarkClick(); }}>L</div>
        <div>
          <div className="lp-brand-name">Leo Li</div>
          <div className="lp-brand-sub">ce @ uwaterloo</div>
        </div>
      </div>

      <nav className="lp-nav">
        {NAV_SECTIONS.map((item, i) => (
          <button
            key={item.id}
            onClick={item.soon ? undefined : () => onChange(item.id)}
            className="lp-nav-item"
            data-active={active === item.id || undefined}
            data-soon={item.soon || undefined}
            data-hue={String(i % 5)}
          >
            <span className="lp-nav-dot" />
            <span className="lp-nav-label">{item.label}</span>
            {item.soon && <span className="lp-nav-soon">soon</span>}
          </button>
        ))}
      </nav>

      <RecordPlayer />

      <div className="lp-side-foot">
        <div className="lp-side-foot-row">
          <span className="lp-dot lp-dot-green" />
          <span>open to coop · winter ’26</span>
        </div>
        <div className="lp-side-foot-row lp-side-foot-muted">
          built {new Date().getFullYear()} · v0.1
        </div>
      </div>
    </aside>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// About — hero, bio, "things i've done", projects grid
// ────────────────────────────────────────────────────────────────────────────
function SocialLink({ href, label, glyph }) {
  return (
    <a href={href} className="lp-social" aria-label={label} title={label}>
      {glyph}
    </a>
  );
}

const socials = [
  { label: 'twitter',  href: '#', glyph: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.16 17.52h1.833L7.084 4.126H5.117L17.084 19.77z"/>
    </svg>
  )},
  { label: 'github',   href: '#', glyph: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.13c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.39.97.1-.76.4-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.08.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.35.78 1.05.78 2.11v3.13c0 .3.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  )},
  { label: 'linkedin', href: '#', glyph: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 3H3.55C2.69 3 2 3.68 2 4.52v14.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V4.52C22 3.68 21.31 3 20.45 3zM7.12 18.34H4.4V9.75h2.72v8.59zM5.76 8.55c-.87 0-1.58-.71-1.58-1.58s.71-1.58 1.58-1.58c.87 0 1.58.71 1.58 1.58s-.71 1.58-1.58 1.58zm13.83 9.79h-2.72v-4.17c0-1 0-2.28-1.39-2.28s-1.6 1.09-1.6 2.21v4.24h-2.72V9.75h2.61v1.17h.04c.36-.69 1.25-1.39 2.57-1.39 2.75 0 3.26 1.81 3.26 4.17v4.64z"/>
    </svg>
  )},
  { label: 'email',    href: 'mailto:leo@example.com', glyph: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )},
  { label: 'résumé',   href: '#', glyph: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  )},
];

function AboutHero() {
  return (
    <section className="lp-hero" style={{ position: 'relative' }}>
      <div className="lp-hero-term"><TerminalStrip /></div>
      <div className="lp-h1-wrap">
        <h1 className="lp-h1">
          Leo Li<span className="lp-h1-cursor" aria-hidden="true" />
          <span className="lp-h1-sparkle" aria-hidden="true">✦</span>
        </h1>
        <Margin text="that's me" side="right" top={6} rotate={-6} arrow="curve-l" />
      </div>

      <p className="lp-program">
        <a href="#" className="lp-link">Computer Engineering</a> <span className="lp-program-at">@UWaterloo</span>
      </p>

      <div className="lp-socials">
        {socials.map(s => <SocialLink key={s.label} {...s} />)}
      </div>

      <h2 className="lp-pitch">
        i build <span className="lp-hl-hand">close to the metal<svg className="lp-hl-hand-svg" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9 C 40 3, 90 12, 140 6 S 197 9, 197 5" /></svg></span> — <mark className="lp-hl lp-hl-0">compilers</mark>, <mark className="lp-hl lp-hl-3">embedded</mark>, and the parts of a machine that don’t usually get a ui
      </h2>
    </section>
  );
}

function ThingsDone() {
  return (
    <section className="lp-things">
      <ul className="lp-things-list">
        {THINGS_DONE.map((t, i) => (
          <li key={i} className="lp-thing">
            <span className="lp-thing-bullet">&gt;</span>
            <span>
              {t.text}
              {t.linkText && <a href={t.url} className="lp-link">{t.linkText}</a>}
              {t.suffix || ''}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Tape labels for the corner of each project card — keyed by id.
const TAPE_BY_ID = {
  'riscv':         { label: 'building',  kind: 'building' },
  'scheduler':     { label: 'shipped',   kind: 'shipped'  },
  'fpga-audio':    { label: '2nd · htn', kind: 'won'      },
  'embedded-club': { label: 'club',      kind: 'shipped'  },
  'doom-lfs':      { label: 'log',       kind: 'archive'  },
  'tinydb':        { label: 'reading',   kind: 'building' },
  'tutoring':      { label: 'teaching',  kind: 'shipped'  },
  'newsletter':    { label: 'weekly',    kind: 'shipped'  },
};

function ProjectCard({ project }) {
  const tape = TAPE_BY_ID[project.id];
  return (
    <article className="lp-card">
      {tape && (
        <span className="lp-card-tape" data-kind={tape.kind}>{tape.label}</span>
      )}
      <ProjectThumb project={project} />
      <div className="lp-card-body">
        <h3 className="lp-card-title">{project.title}</h3>
        <div className="lp-card-badge">{project.badge}</div>
        <p className="lp-card-blurb">{project.blurb}</p>
      </div>
    </article>
  );
}

function ProjectsGrid({ standalone = false }) {
  const [filter, setFilter] = useState('everything');
  const filtered = useMemo(() =>
    filter === 'everything' ? PROJECTS : PROJECTS.filter(p => p.tag === filter),
  [filter]);

  return (
    <section className={'lp-projects ' + (standalone ? 'lp-projects-standalone' : '')}>
      {standalone && (
        <header className="lp-section-header">
          <h1 className="lp-h1 lp-h1-page" style={{color: 'var(--hue-0)'}}>Projects</h1>
          <p className="lp-lede">stuff i’ve built. mostly weekends, occasionally for class.</p>
        </header>
      )}
      <div className="lp-filters">
        {PROJECT_FILTERS.map(f => (
          <button key={f.id}
            onClick={() => setFilter(f.id)}
            className="lp-filter"
            data-active={filter === f.id || undefined}
          >{f.label}</button>
        ))}
      </div>
      <div className="lp-grid">
        {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}

function AboutView() {
  return (
    <>
      <AboutHero />
      <ThingsDone />
      <ProjectsGrid />
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Bookshelf view
// ────────────────────────────────────────────────────────────────────────────
function BookCard({ book, onClick }) {
  return (
    <button className="lp-book" onClick={onClick}>
      <div className="lp-book-cover" style={{ background: book.cover, color: book.text }}>
        <div className="lp-book-spine" style={{ background: book.spine }} />
        <div className="lp-book-year">{book.year}</div>
        <div className="lp-book-cover-inner">
          <div className="lp-book-title">{book.title}</div>
          <div className="lp-book-author">{book.author}</div>
        </div>
      </div>
      <div className="lp-book-meta">
        <span className="lp-book-rating">
          {'★'.repeat(book.rating)}<span className="lp-book-rating-empty">{'★'.repeat(5 - book.rating)}</span>
        </span>
        <span className="lp-book-status">{book.status}</span>
      </div>
    </button>
  );
}

function BookshelfView() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const filtered = filter === 'all' ? BOOKS : BOOKS.filter(b => b.status === filter);
  const book = selected !== null ? filtered[selected] : null;

  const stats = useMemo(() => {
    const finished = BOOKS.filter(b => b.status === 'finished');
    return {
      finishedCount: finished.length,
      pagesRead: finished.reduce((s, b) => s + (b.pages || 0), 0),
      reading: BOOKS.filter(b => b.status === 'reading').length,
    };
  }, []);

  return (
    <section>
      <header className="lp-section-header">
        <h1 className="lp-h1 lp-h1-page" style={{color: 'var(--hue-2)'}}>Bookshelf</h1>
        <p className="lp-lede">
          what i’ve been reading. mostly tech, some fiction. notes are the bit i still remember a year later.
        </p>
      </header>

      <div className="lp-stats">
        <div className="lp-stat" data-hue="1">
          <div className="lp-stat-n">{stats.finishedCount}</div>
          <div className="lp-stat-l">books finished</div>
        </div>
        <div className="lp-stat" data-hue="2">
          <div className="lp-stat-n">{stats.pagesRead.toLocaleString()}</div>
          <div className="lp-stat-l">pages read</div>
        </div>
        <div className="lp-stat" data-hue="0">
          <div className="lp-stat-n">{stats.reading}</div>
          <div className="lp-stat-l">currently reading</div>
        </div>
        <div className="lp-stat" data-hue="4">
          <div className="lp-stat-n">{(stats.pagesRead / Math.max(stats.finishedCount, 1)).toFixed(0)}</div>
          <div className="lp-stat-l">avg pages / book</div>
        </div>
      </div>

      <div className="lp-filters">
        {['all', 'reading', 'finished', 'reference'].map(f => (
          <button key={f} className="lp-filter"
            onClick={() => { setFilter(f); setSelected(null); }}
            data-active={filter === f || undefined}>{f}</button>
        ))}
        <span className="lp-filter-count">{filtered.length} volumes</span>
      </div>

      <div className="lp-books-grid">
        {filtered.map((b, i) => (
          <BookCard key={b.title} book={b} onClick={() => setSelected(i)} />
        ))}
      </div>

      {book && (
        <div className="lp-modal" onClick={() => setSelected(null)}>
          <div className="lp-modal-inner" onClick={e => e.stopPropagation()}>
            <button className="lp-modal-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <div className="lp-modal-cover" style={{ background: book.cover, color: book.text }}>
              <div className="lp-book-spine" style={{ background: book.spine }} />
              <div className="lp-book-year">{book.year}</div>
              <div className="lp-book-cover-inner">
                <div className="lp-book-title" style={{ fontSize: 18 }}>{book.title}</div>
                <div className="lp-book-author">{book.author}</div>
              </div>
            </div>
            <div className="lp-modal-body">
              <div className="lp-modal-meta">
                <span className="lp-book-rating">
                  {'★'.repeat(book.rating)}<span className="lp-book-rating-empty">{'★'.repeat(5 - book.rating)}</span>
                </span>
                <span className="lp-book-status">{book.status}</span>
                {book.pages && <span className="lp-book-pages">· {book.pages} pp.</span>}
              </div>

              {book.synopsis && (
                <div className="lp-modal-section">
                  <div className="lp-modal-label">synopsis</div>
                  <p className="lp-modal-note">{book.synopsis}</p>
                </div>
              )}

              <div className="lp-modal-section">
                <div className="lp-modal-label">my notes</div>
                <p className="lp-modal-note lp-modal-note-mine">{book.note}</p>
              </div>

              <div className="lp-modal-tags">
                {book.tags.map(t => <span key={t} className="lp-modal-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Command palette (Cmd+K)
// ────────────────────────────────────────────────────────────────────────────
function CmdK({ open, onClose, onJump }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) {
      setQ('');
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const items = useMemo(() => {
    const all = [
      ...NAV_SECTIONS.map(n => ({ kind: 'section', id: n.id, label: n.label, soon: n.soon })),
      ...PROJECTS.map(p => ({ kind: 'project', id: p.id, label: p.title, sub: p.badge })),
      ...BOOKS.map(b => ({ kind: 'book', id: b.title, label: b.title, sub: b.author })),
    ];
    if (!q.trim()) return all.slice(0, 8);
    const needle = q.toLowerCase();
    return all.filter(x =>
      x.label.toLowerCase().includes(needle) ||
      (x.sub && x.sub.toLowerCase().includes(needle))
    ).slice(0, 10);
  }, [q]);

  if (!open) return null;
  return (
    <div className="lp-cmdk-overlay" onClick={onClose}>
      <div className="lp-cmdk-panel" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="type to find a section, project, or book…"
          className="lp-cmdk-input"
        />
        <div className="lp-cmdk-results">
          {items.length === 0 && <div className="lp-cmdk-empty">no matches</div>}
          {items.map(item => (
            <button key={item.kind + ':' + item.id} className="lp-cmdk-result"
              onClick={() => {
                if (item.kind === 'section') onJump(item.id);
                else if (item.kind === 'project') onJump('projects');
                else if (item.kind === 'book') onJump('bookshelf');
              }}
              disabled={item.soon}>
              <span className="lp-cmdk-kind">{item.kind}</span>
              <span className="lp-cmdk-label2">{item.label}</span>
              {item.sub && <span className="lp-cmdk-sub">{item.sub}</span>}
              {item.soon && <span className="lp-cmdk-sub">soon</span>}
            </button>
          ))}
        </div>
        <div className="lp-cmdk-foot">
          <kbd className="lp-kbd">esc</kbd> close
          <span className="lp-cmdk-foot-sep">·</span>
          <kbd className="lp-kbd">↵</kbd> jump
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Marginalia — flat chronological feed. Themes are tags, not chapters.
// Entries can carry an `aside` (a margin note jotted later, set in Caveat).
// Surprise mechanic: "leaf of the day" rotates daily, shuffle for another.
// ────────────────────────────────────────────────────────────────────────────
function LeafOfTheDay() {
  const entries = MARGINALIA.entries;
  // Deterministic daily seed so it's the same all day, then user can shuffle.
  const todaySeed = useMemo(() => Math.floor(Date.now() / 86400000) % entries.length, [entries.length]);
  const [idx, setIdx] = useState(todaySeed);
  const e = entries[idx];
  const shuffle = () => {
    let n = idx;
    while (n === idx && entries.length > 1) n = Math.floor(Math.random() * entries.length);
    setIdx(n);
  };
  return (
    <div className="lp-mg-leaf" data-tag={e.tag}>
      <div className="lp-mg-leaf-head">
        <span className="lp-mg-leaf-kicker">leaf of the day</span>
        <span className="lp-mg-leaf-sep">·</span>
        <span className="lp-mg-leaf-cite">{e.date} · {e.tag}</span>
        <button className="lp-mg-shuffle" onClick={shuffle} aria-label="shuffle">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4h3l6 8h3M2 12h3l1.5-2M9.5 6L11 4h3M12 2l2 2-2 2M12 10l2 2-2 2" />
          </svg>
          <span>another</span>
        </button>
      </div>
      <p className="lp-mg-leaf-text">{e.text}</p>
      {e.aside && <div className="lp-mg-leaf-aside">{e.aside}</div>}
      <div className="lp-mg-leaf-foot">
        <span>{e.where}</span>
      </div>
    </div>
  );
}

function MarginaliaEntry({ entry }) {
  return (
    <article className="lp-mg-card" data-tag={entry.tag}>
      <div className="lp-mg-stub">
        <div className="lp-mg-stub-date">{entry.date}</div>
        <div className="lp-mg-stub-where">{entry.where}</div>
        <div className="lp-mg-card-tag">{entry.tag}</div>
      </div>
      <div className="lp-mg-body-wrap">
        <p className="lp-mg-body">{entry.text}</p>
        {entry.aside && (
          <div className="lp-mg-aside">
            <span className="lp-mg-aside-arrow" aria-hidden="true">↪</span>
            <span className="lp-mg-aside-text">{entry.aside}</span>
          </div>
        )}
      </div>
    </article>
  );
}

function MarginaliaView() {
  const [filter, setFilter] = useState('everything');
  const [order, setOrder] = useState('newest');

  const filtered = useMemo(() => {
    const list = MARGINALIA.entries.filter(e => filter === 'everything' || e.tag === filter);
    return order === 'newest' ? [...list].reverse() : list;
  }, [filter, order]);

  const counts = useMemo(() => {
    const out = { everything: MARGINALIA.entries.length };
    MARGINALIA.tags.forEach(t => { out[t] = MARGINALIA.entries.filter(e => e.tag === t).length; });
    return out;
  }, []);

  return (
    <section className="lp-mg">
      {/* slim, personal frontispiece */}
      <header className="lp-mg-front">
        <h1 className="lp-h1 lp-h1-page lp-mg-title" style={{ color: 'var(--hue-3)' }}>
          marginalia
        </h1>
        <p className="lp-mg-front-sub">{MARGINALIA.subtitle}</p>
        <p className="lp-mg-blurb">{MARGINALIA.blurb}</p>
        <div className="lp-mg-front-row">
          <div className="lp-mg-stats">
            <b>{MARGINALIA.entries.length}</b> entries
            <span className="lp-mg-meta-sep">·</span>
            <b>{MARGINALIA.tags.length}</b> tags
            <span className="lp-mg-meta-sep">·</span>
            since <b>{MARGINALIA.started}</b>
          </div>
          <div className="lp-mg-sticky" role="note">
            <span className="lp-mg-sticky-pin" aria-hidden="true" />
            <span className="lp-mg-sticky-quote">"{MARGINALIA.epigraph.text}"</span>
            <span className="lp-mg-sticky-cite">— {MARGINALIA.epigraph.by}</span>
          </div>
        </div>
      </header>

      {/* daily featured entry */}
      <LeafOfTheDay />

      {/* filters + sort toggle */}
      <div className="lp-mg-toolbar">
        <div className="lp-mg-tags">
          {['everything', ...MARGINALIA.tags].map(t => (
            <button key={t}
              className="lp-mg-chip"
              data-active={filter === t || undefined}
              data-tag={t === 'everything' ? undefined : t}
              onClick={() => setFilter(t)}
            >
              <span>{t}</span>
              <small>{counts[t]}</small>
            </button>
          ))}
        </div>
        <div className="lp-mg-sort">
          <button data-active={order === 'newest' || undefined} onClick={() => setOrder('newest')}>newest</button>
          <span aria-hidden="true">/</span>
          <button data-active={order === 'oldest' || undefined} onClick={() => setOrder('oldest')}>oldest</button>
        </div>
      </div>

      {/* the feed */}
      <div className="lp-mg-feed">
        {filtered.map(e => <MarginaliaEntry key={e.id} entry={e} />)}
        {filtered.length === 0 && (
          <div className="lp-mg-empty">nothing under <em>{filter}</em> yet. check back.</div>
        )}
      </div>

      <div className="lp-mg-rule lp-mg-rule-end"><span>more to come.</span></div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// App
// ────────────────────────────────────────────────────────────────────────────
function App() {
  const [theme, setTheme] = useTheme();
  const [active, setActive] = useState(() => {
    try { return localStorage.getItem('leo-section') || 'about'; } catch { return 'about'; }
  });
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => { try { localStorage.setItem('leo-section', active); } catch {} }, [active]);

  // Cmd+K binding
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdkOpen(o => !o);
      } else if (e.key === 'Escape') {
        setCmdkOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Scroll main back to top on section change
  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [active]);

  // Cycle a hue across every .lp-link so each one gets a different colour.
  useEffect(() => {
    const links = document.querySelectorAll('.lp-link');
    links.forEach((el, i) => { el.dataset.hue = String(i % 5); });
  }, [active]);

  const handleJump = (id) => {
    setActive(id);
    setCmdkOpen(false);
  };

  return (
    <div className="lp-root">
      <Taskbar active={active} onChange={setActive} />

      <main ref={mainRef} className="lp-main">
        <TopRight theme={theme} setTheme={setTheme} onCmdK={() => setCmdkOpen(true)} />
        <div className="lp-main-inner">
          {active === 'about'      && <AboutView />}
          {active === 'projects'   && <ProjectsGrid standalone />}
          {active === 'bookshelf'  && <BookshelfView />}
          {active === 'marginalia' && <MarginaliaView />}
          <footer className="lp-footer">
            <span>— Leo Li, {new Date().getFullYear()}</span>
            <span className="lp-footer-sep">·</span>
            <span>last updated may 2026</span>
            <span className="lp-footer-sep">·</span>
            <a className="lp-link" href="#">source</a>
          </footer>
        </div>
      </main>

      <CmdK open={cmdkOpen} onClose={() => setCmdkOpen(false)} onJump={handleJump} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('lp-root')).render(<App />);
