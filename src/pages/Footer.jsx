const styles = `
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&family=Lora:ital@1&display=swap');

.footer-root {
  position: relative;
  z-index: 1;
  width: 100%;
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255,255,255,0.55);
  font-family: 'Raleway', sans-serif;
  padding: 44px 48px 32px;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 28px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
}

.footer-logo-box {
  width: 32px;
  height: 32px;
  background: rgba(255,255,255,0.38);
  border: 1px solid rgba(255,255,255,0.65);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}

.footer-logo-text {
  font-size: 15px;
  font-weight: 800;
  color: rgba(30,60,90,0.85);
}

.footer-logo-text span {
  color: #4a90b8;
}

.footer-tagline {
  font-size: 12.5px;
  color: rgba(30,70,100,0.5);
  max-width: 260px;
}

.footer-links-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links-label {
  font-size: 9.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(40,90,130,0.5);
  font-weight: 700;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(30,70,100,0.65);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #1a3a52;
}

.footer-divider {
  height: 1px;
  background: rgba(74,144,184,0.15);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-copy {
  font-size: 12px;
  color: rgba(30,70,100,0.45);
}

.footer-copy strong {
  color: rgba(30,70,100,0.65);
}

.footer-copy em {
  font-family: 'Lora', serif;
  font-style: italic;
  color: #4a90b8;
}

.footer-made {
  font-size: 11.5px;
  color: rgba(30,70,100,0.4);
}

@media (max-width: 640px) {
  .footer-root { padding: 36px 24px 24px; }
  .footer-top { flex-direction: column; }
}
`;

const Footer = () => (
  <>
    <style>{styles}</style>

    <footer className="footer-root">
      <div className="footer-inner">

        {/* Top */}
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <div className="footer-logo-box">💻</div>
              <span className="footer-logo-text">dev<span>.</span>folio</span>
            </a>

            <p className="footer-tagline">
              Frontend Developer & ML Engineer building intelligent, beautiful web products.
            </p>
          </div>

          {/* Connect */}
          <div className="footer-links-group">
            <div className="footer-links-label">Connect</div>

            <a href="mailto:2k23.it2310808@gmail.com" className="footer-link">
              ✉️ 2k23.it2310808@gmail.com
            </a>

            <a
              href="https://linkedin.com/in/shubhamwebdev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              💼 linkedin.com/in/shubhamwebdev
            </a>

            <a
              href="https://github.com/ShubhamVermaDev9"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              🐙 github.com/ShubhamVermaDev9
            </a>
          </div>

          {/* Nav */}
          <div className="footer-links-group">
            <div className="footer-links-label">Pages</div>
            <a href="/about" className="footer-link">About</a>
            <a href="/projects" className="footer-link">Projects</a>
            <a href="/contact" className="footer-link">Contact</a>
          </div>

        </div>

        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} <strong>Shubham Verma</strong> · Built with <em>React.js</em>
          </p>

          <span className="footer-made">
            Crafted with 🩵 & ☁️
          </span>
        </div>

      </div>
    </footer>
  </>
);

export default Footer;