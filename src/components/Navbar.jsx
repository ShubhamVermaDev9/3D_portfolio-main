import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const logo = "https://api.iconify.design/ph:code-bold.svg";

const LINKS = [
  { to: "/about",    label: "About"    },
  { to: "/projects", label: "Projects" },
  { to: "/contact",  label: "Contact"  },
];

const Navbar = () => {
  const [visible,    setVisible]    = useState(false);
  const [pinned,     setPinned]     = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isMobile,   setIsMobile]   = useState(window.innerWidth < 640);

  // track viewport
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // hover-reveal only on desktop
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      if (e.clientY < 80) setVisible(true);
      else if (!pinned)   setVisible(false);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [pinned, isMobile]);

  // on mobile always show bar
  useEffect(() => {
    if (isMobile) setVisible(true);
  }, [isMobile]);

  // close drawer on route change (click)
  const closeMenu = () => setMenuOpen(false);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&display=swap');

    /* ── hover trigger zone ── */
    .nav-trigger {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 12px;
      z-index: 200;
      cursor: default;
    }

    /* ── main bar ── */
    .nav-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 199;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 48px;
      height: 62px;
      background: rgba(255,255,255,0.22);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.38);
      font-family: 'Outfit', sans-serif;
      transform: translateY(-100%);
      opacity: 0;
      transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                  opacity   0.30s ease;
      pointer-events: none;
    }
    .nav-header.nav-visible {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* ── peek dots (desktop only) ── */
    .nav-peek {
      position: fixed;
      top: 0; left: 50%; transform: translateX(-50%);
      z-index: 198;
      display: flex; align-items: center; gap: 5px;
      padding: 5px 14px 7px;
      background: rgba(255,255,255,0.35);
      backdrop-filter: blur(10px);
      border-radius: 0 0 10px 10px;
      border: 1px solid rgba(255,255,255,0.55);
      border-top: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
      cursor: default;
    }
    .nav-peek.nav-visible {
      opacity: 0;
      transform: translateX(-50%) translateY(-100%);
      pointer-events: none;
    }
    .nav-peek-dot {
      width: 4px; height: 4px; border-radius: 50%;
      background: rgba(74,144,184,0.5);
    }
    .nav-peek-dot:nth-child(2) { background: rgba(74,144,184,0.35); }
    .nav-peek-dot:nth-child(3) { background: rgba(74,144,184,0.2);  }

    /* ── logo ── */
    .nav-logo {
      display: flex; align-items: center; gap: 9px;
      text-decoration: none; flex-shrink: 0;
    }
    .nav-logo-box {
      width: 34px; height: 34px;
      background: rgba(255,255,255,0.38);
      border: 1px solid rgba(255,255,255,0.6);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .nav-logo:hover .nav-logo-box { background: rgba(255,255,255,0.6); }
    .nav-logo-box img {
      width: 18px; height: 18px; object-fit: contain;
      filter: invert(25%) sepia(40%) saturate(500%) hue-rotate(175deg) brightness(0.7);
    }
    .nav-logo-text {
      font-size: 15px; font-weight: 800;
      color: rgba(30,60,90,0.85); letter-spacing: -0.3px;
    }
    .nav-logo-text span { color: rgba(46,139,192,0.9); }

    /* ── desktop centered links ── */
    .nav-links {
      position: absolute;
      left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 4px;
    }
    .nav-link {
      padding: 7px 18px;
      font-size: 11px; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
      text-decoration: none;
      color: rgba(30,60,90,0.5);
      border-radius: 7px;
      border: 1px solid transparent;
      transition: all 0.2s;
    }
    .nav-link:hover {
      color: rgba(30,60,90,0.85);
      background: rgba(255,255,255,0.32);
      border-color: rgba(255,255,255,0.55);
    }
    .nav-link.active {
      color: rgba(30,65,100,0.9);
      background: rgba(255,255,255,0.42);
      border-color: rgba(255,255,255,0.65);
    }
    .nav-link.active::after {
      content: '';
      display: block;
      margin: 3px auto 0;
      width: 4px; height: 4px;
      border-radius: 50%;
      background: rgba(46,139,192,0.8);
    }

    /* ── available badge ── */
    .nav-status {
      display: flex; align-items: center; gap: 7px;
      font-size: 10.5px; font-weight: 700;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: rgba(40,100,80,0.75);
      flex-shrink: 0;
    }
    .nav-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #5bbf8a;
      box-shadow: 0 0 0 3px rgba(91,191,138,0.2);
      animation: npulse 2.2s ease-in-out infinite;
    }
    @keyframes npulse {
      0%,100% { box-shadow: 0 0 0 3px rgba(91,191,138,0.2); }
      50%      { box-shadow: 0 0 0 6px rgba(91,191,138,0.08); }
    }

    /* ════════════════════════
       HAMBURGER BUTTON
    ════════════════════════ */
    .nav-burger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 38px; height: 38px;
      background: rgba(255,255,255,0.38);
      border: 1px solid rgba(255,255,255,0.6);
      border-radius: 9px;
      cursor: pointer;
      padding: 0;
      transition: background 0.2s;
    }
    .nav-burger:hover { background: rgba(255,255,255,0.6); }
    .nav-burger-line {
      width: 18px; height: 2px;
      border-radius: 2px;
      background: rgba(30,60,90,0.7);
      transition: transform 0.28s ease, opacity 0.2s ease, width 0.2s ease;
      transform-origin: center;
    }
    /* open state */
    .nav-burger.open .nav-burger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .nav-burger.open .nav-burger-line:nth-child(2) { opacity: 0; width: 0; }
    .nav-burger.open .nav-burger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* ════════════════════════
       MOBILE DRAWER
    ════════════════════════ */
    .nav-drawer {
      position: fixed;
      top: 62px; left: 0; right: 0;
      z-index: 198;
      background: rgba(210,235,252,0.92);
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
      border-bottom: 1px solid rgba(255,255,255,0.5);
      display: flex;
      flex-direction: column;
      padding: 12px 20px 18px;
      gap: 4px;
      font-family: 'Outfit', sans-serif;
      /* slide in/out */
      transform: translateY(-12px);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease;
    }
    .nav-drawer.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    .nav-drawer-link {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px;
      font-size: 13px; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: rgba(20,55,85,0.65);
      text-decoration: none;
      border-radius: 10px;
      border: 1px solid transparent;
      transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
    }
    .nav-drawer-link:hover {
      background: rgba(255,255,255,0.52);
      color: rgba(20,55,85,0.9);
      border-color: rgba(255,255,255,0.7);
    }
    .nav-drawer-link.active {
      background: rgba(255,255,255,0.55);
      color: rgba(46,139,192,0.95);
      border-color: rgba(46,139,192,0.2);
    }
    .nav-drawer-arrow {
      font-size: 14px;
      opacity: 0.4;
      transition: transform 0.18s ease, opacity 0.18s ease;
    }
    .nav-drawer-link:hover .nav-drawer-arrow,
    .nav-drawer-link.active .nav-drawer-arrow { transform: translateX(3px); opacity: 0.8; }

    .nav-drawer-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(46,139,192,0.18), transparent);
      margin: 6px 0;
    }

    .nav-drawer-status {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 16px;
      font-size: 10.5px; font-weight: 700;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: rgba(40,100,80,0.75);
    }

    /* ════════════════════════
       RESPONSIVE BREAKPOINTS
    ════════════════════════ */
    @media (max-width: 640px) {
      .nav-header   { padding: 0 18px; }
      .nav-links    { display: none; }
      .nav-status   { display: none; }
      .nav-burger   { display: flex; }
      .nav-peek     { display: none; }
    }

    @media (min-width: 641px) and (max-width: 900px) {
      .nav-header { padding: 0 28px; }
      .nav-link   { padding: 6px 13px; font-size: 10px; }
      .nav-status { font-size: 9.5px; letter-spacing: 0.12em; }
    }
  `;

  return (
    <>
      <style>{css}</style>

      {/* Desktop hover trigger */}
      {!isMobile && (
        <div className="nav-trigger" onMouseEnter={() => setVisible(true)} />
      )}

      {/* Peek dots — desktop only */}
      {!isMobile && (
        <div className={`nav-peek${visible ? " nav-visible" : ""}`}>
          <div className="nav-peek-dot" />
          <div className="nav-peek-dot" />
          <div className="nav-peek-dot" />
        </div>
      )}

      {/* Main bar */}
      <header
        className={`nav-header${visible ? " nav-visible" : ""}`}
        onMouseEnter={() => { if (!isMobile) { setVisible(true); setPinned(true); } }}
        onMouseLeave={() => { if (!isMobile) { setPinned(false); setVisible(false); } }}
      >
        {/* Logo */}
        <NavLink to="/" className="nav-logo" onClick={closeMenu}>
          <div className="nav-logo-box">
            <img src={logo} alt="logo" />
          </div>
          <span className="nav-logo-text">shubham<span>.</span>dev</span>
        </NavLink>

        {/* Desktop nav links */}
        <nav className="nav-links">
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop status badge */}
        <div className="nav-status">
          <div className="nav-dot" /> Available
        </div>

        {/* Mobile hamburger */}
        <button
          className={`nav-burger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className={`nav-drawer${menuOpen ? " open" : ""}`}>
        {LINKS.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `nav-drawer-link${isActive ? " active" : ""}`}
            onClick={closeMenu}
          >
            {l.label}
            <span className="nav-drawer-arrow">→</span>
          </NavLink>
        ))}

        <div className="nav-drawer-divider" />

        <div className="nav-drawer-status">
          <div className="nav-dot" /> Available for work
        </div>
      </div>
    </>
  );
};

export default Navbar;
