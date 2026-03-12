import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const logo = "https://api.iconify.design/ph:code-bold.svg";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [pinned, setPinned]   = useState(false); // stays open if mouse is ON the bar

  useEffect(() => {
    const onMove = (e) => {
      if (e.clientY < 80) setVisible(true);
      else if (!pinned)   setVisible(false);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [pinned]);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@500;600;700;800&display=swap');

    /* ── hover trigger zone (invisible 12px strip at top) ── */
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
      height: 66px;
      background: rgba(255,255,255,0.22);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.38);
      font-family: 'Raleway', sans-serif;

      /* slide in/out */
      transform: translateY(-100%);
      opacity: 0;
      transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                  opacity   0.3s ease;
      pointer-events: none;
    }
    .nav-header.nav-visible {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* peek indicator — tiny dot strip shown when bar is hidden */
    .nav-peek {
      position: fixed;
      top: 0; left: 50%; transform: translateX(-50%);
      z-index: 198;
      display: flex;
      align-items: center;
      gap: 5px;
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
      transform: translateY(-100%);
      pointer-events: none;
    }
    .nav-peek-dot {
      width: 4px; height: 4px;
      border-radius: 50%;
      background: rgba(74,144,184,0.5);
    }
    .nav-peek-dot:nth-child(2) { background: rgba(74,144,184,0.35); }
    .nav-peek-dot:nth-child(3) { background: rgba(74,144,184,0.2);  }

    /* ── logo ── */
    .nav-logo {
      display: flex; align-items: center; gap: 9px;
      text-decoration: none;
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
    .nav-logo-text span { color: rgba(70,130,170,0.9); }

    /* ── centered links ── */
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
      background: rgba(70,130,170,0.8);
    }

    /* ── available badge ── */
    .nav-status {
      display: flex; align-items: center; gap: 7px;
      font-size: 10.5px; font-weight: 700;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: rgba(40,100,80,0.75);
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

    @media (max-width: 640px) {
      .nav-header { padding: 0 20px; }
      .nav-logo-text { display: none; }
    }
  `;

  return (
    <>
      <style>{css}</style>

      {/* Invisible 12px hover-trigger strip at top edge */}
      <div className="nav-trigger" onMouseEnter={() => setVisible(true)} />

      {/* 3-dot peek indicator when navbar is hidden */}
      <div className={`nav-peek${visible ? " nav-visible" : ""}`}>
        <div className="nav-peek-dot" />
        <div className="nav-peek-dot" />
        <div className="nav-peek-dot" />
      </div>

      {/* Main navbar */}
      <header
        className={`nav-header${visible ? " nav-visible" : ""}`}
        onMouseEnter={() => { setVisible(true);  setPinned(true);  }}
        onMouseLeave={() => { setPinned(false); setVisible(false); }}
      >
        <NavLink to="/" className="nav-logo">
          <div className="nav-logo-box">
            <img src={logo} alt="logo" />
          </div>
          <span className="nav-logo-text">shubham<span>.</span>folio</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/about"    className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>About</NavLink>
          <NavLink to="/projects" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Projects</NavLink>
          <NavLink to="/contact"  className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Contact</NavLink>
        </nav>

        <div className="nav-status">
          <div className="nav-dot" /> Available
        </div>
      </header>
    </>
  );
};

export default Navbar;