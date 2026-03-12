import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const LINKS = [
  { to: "/about",    label: "About"    },
  { to: "/projects", label: "Projects" },
  { to: "/contact",  label: "Contact"  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

  .nb-bar {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 60px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.35);
    font-family: 'Outfit', sans-serif;
  }

  /* ── Logo ── */
  .nb-logo {
    text-decoration: none;
    font-size: 16px;
    font-weight: 700;
    color: #0f2133;
    letter-spacing: -0.3px;
  }
  .nb-logo span { color: #2e8bc0; }

  /* ── Links ── */
  .nb-links {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .nb-link {
    padding: 7px 16px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    color: rgba(15,33,51,0.50);
    border-radius: 8px;
    transition: color 0.18s, background 0.18s;
    white-space: nowrap;
  }
  .nb-link:hover {
    color: #0f2133;
    background: rgba(255,255,255,0.40);
  }
  .nb-link.active {
    color: #2e8bc0;
    background: rgba(46,139,192,0.08);
  }

  /* ── Status dot ── */
  .nb-status {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 600;
    color: rgba(15,33,51,0.50);
    letter-spacing: 0.04em;
  }
  .nb-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #22c55e;
    animation: pulse 2.4s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
    50%      { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
  }

  /* ── Hamburger ── */
  .nb-burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  .nb-bl {
    width: 20px; height: 2px;
    border-radius: 2px;
    background: #0f2133;
    transition: transform 0.25s ease, opacity 0.2s ease;
    transform-origin: center;
  }
  .nb-burger.open .nb-bl:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nb-burger.open .nb-bl:nth-child(2) { opacity: 0; }
  .nb-burger.open .nb-bl:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── Mobile drawer ── */
  .nb-drawer {
    position: fixed;
    top: 60px; left: 0; right: 0;
    z-index: 99;
    background: rgba(220,238,252,0.97);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.4);
    padding: 8px 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-family: 'Outfit', sans-serif;
    transform: translateY(-4px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.25s ease, opacity 0.22s ease;
  }
  .nb-drawer.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  .nb-dlink {
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(15,33,51,0.55);
    text-decoration: none;
    border-radius: 10px;
    transition: background 0.18s, color 0.18s;
  }
  .nb-dlink:hover  { background: rgba(255,255,255,0.55); color: #0f2133; }
  .nb-dlink.active { background: rgba(255,255,255,0.65); color: #2e8bc0; }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .nb-bar    { padding: 0 20px; }
    .nb-links  { display: none; }
    .nb-status { display: none; }
    .nb-burger { display: flex; }
  }
  @media (min-width: 641px) {
    .nb-drawer { display: none; }
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <style>{css}</style>

      <header className="nb-bar">
        <NavLink to="/" className="nb-logo">
          shubham<span>.</span>dev
        </NavLink>

        <nav className="nb-links">
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nb-link${isActive ? " active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nb-status">
          <span className="nb-dot" /> Available
        </div>

        <button
          className={`nb-burger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="nb-bl" />
          <span className="nb-bl" />
          <span className="nb-bl" />
        </button>
      </header>

      <div className={`nb-drawer${menuOpen ? " open" : ""}`}>
        {LINKS.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `nb-dlink${isActive ? " active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Navbar;
