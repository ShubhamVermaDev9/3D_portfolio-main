import { useRef, useState, useEffect } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Footer from "./Footer";
import { FiSend } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const WEB3FORMS_KEY = "421aaff5-e46c-4396-a349-b97e2dc84e20";

function loadScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src; s.async = true; s.onload = resolve;
    document.head.appendChild(s);
  });
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:     #0f2133;
    --ink2:    #1e3d52;
    --accent:  #2e8bc0;
    --accent2: #56c1f0;
    --glass:   rgba(255,255,255,0.30);
    --glass-b: rgba(255,255,255,0.58);
    --muted:   rgba(20,60,90,0.60);
    --font:    'Outfit', sans-serif;
  }

  .ct-vanta { position: fixed; inset: 0; z-index: 0; }

  .ct-overlay {
    position: fixed; inset: 0; z-index: 1; pointer-events: none;
    background: linear-gradient(
      108deg,
      rgba(190,225,248,0.96) 0%,
      rgba(200,230,250,0.80) 38%,
      rgba(210,235,252,0.38) 60%,
      transparent 76%
    );
  }

  .ct-page {
    position: relative; z-index: 2;
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 110px 32px 60px;
    font-family: var(--font);
    color: var(--ink2);
  }

  /* ── ANIMATIONS ── */
  @keyframes rise {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .r0 { animation: rise .5s .00s both; }
  .r1 { animation: rise .5s .09s both; }
  .r2 { animation: rise .5s .17s both; }
  .r3 { animation: rise .5s .25s both; }
  .r4 { animation: rise .5s .33s both; }

  /* ── OUTER CARD ── */
  .ct-card {
    display: flex;
    width: 100%; max-width: 980px;
    min-height: 560px;
    background: var(--glass);
    backdrop-filter: blur(22px);
    border: 1px solid var(--glass-b);
    border-radius: 22px;
    box-shadow: 0 20px 60px rgba(30,80,120,.13);
    overflow: hidden;
  }

  /* ── LEFT FORM PANEL ── */
  .ct-left {
    flex: 1; padding: 48px 44px;
    border-right: 1px solid rgba(255,255,255,.4);
  }

  /* ── BADGE ── */
  .ct-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--glass); border: 1px solid var(--glass-b);
    backdrop-filter: blur(12px); border-radius: 6px;
    padding: 5px 14px;
    font-size: 10px; letter-spacing: 0.20em; text-transform: uppercase;
    color: var(--accent); font-weight: 700;
    margin-bottom: 16px;
  }
  .ct-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent2);
    animation: ping 1.8s ease infinite;
  }
  @keyframes ping {
    0%  { box-shadow: 0 0 0 0   rgba(86,193,240,.65); }
    70% { box-shadow: 0 0 0 7px rgba(86,193,240,0);   }
    100%{ box-shadow: 0 0 0 0   rgba(86,193,240,0);   }
  }

  /* ── HEADING ── */
  .ct-heading {
    font-size: clamp(26px, 3.8vw, 40px);
    font-weight: 900; color: var(--ink);
    letter-spacing: -1.5px; line-height: 1.0;
    margin-bottom: 4px;
  }
  .ct-heading em {
    font-family: 'Playfair Display', serif;
    font-style: italic; font-weight: 400;
    color: var(--accent);
  }

  .ct-rule {
    width: 44px; height: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
    border-radius: 2px; margin: 14px 0 10px;
  }

  .ct-sub {
    font-size: 13.5px; color: var(--muted);
    line-height: 1.75; margin-bottom: 26px;
  }

  /* ── FORM ── */
  .ct-form { display: flex; flex-direction: column; gap: 14px; }

  .ct-label {
    display: flex; flex-direction: column; gap: 5px;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--muted);
  }

  .ct-input, .ct-textarea {
    padding: 11px 14px;
    background: rgba(255,255,255,.52);
    border: 1.5px solid rgba(255,255,255,.75);
    border-radius: 10px;
    font-family: var(--font);
    font-size: 13px; color: var(--ink);
    outline: none; width: 100%;
    transition: border-color .2s ease;
  }
  .ct-input:focus, .ct-textarea:focus {
    border-color: rgba(46,139,192,.5);
    background: rgba(255,255,255,.7);
  }
  .ct-textarea { resize: vertical; min-height: 100px; }

  .ct-submit {
    display: inline-flex; align-items: center; gap: 8px;
    align-self: flex-start;
    padding: 12px 28px;
    background: linear-gradient(135deg, #1f6a96, #0f2133);
    color: #fff; border: none; border-radius: 999px;
    font-family: var(--font); font-size: 11px; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 5px 22px rgba(15,33,51,.26), inset 0 1px 0 rgba(255,255,255,.12);
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .ct-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(15,33,51,.34), inset 0 1px 0 rgba(255,255,255,.12);
  }
  .ct-submit:disabled { opacity: .6; cursor: not-allowed; }

  /* ── RIGHT PANEL ── */
  .ct-right {
    width: 300px; flex-shrink: 0;
    background: rgba(255,255,255,.14);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 44px 28px; gap: 24px;
  }

  .ct-icon-wrap {
    width: 88px; height: 88px;
    background: var(--glass); border: 1px solid var(--glass-b);
    border-radius: 22px;
    display: flex; align-items: center; justify-content: center;
    font-size: 36px; color: var(--accent);
    box-shadow: 0 8px 28px rgba(46,139,192,.18);
  }

  .ct-tagline {
    font-size: 13.5px; font-weight: 700; color: var(--ink);
    text-align: center; line-height: 1.5;
  }
  .ct-tagline em {
    font-family: 'Playfair Display', serif;
    font-style: italic; color: var(--accent);
  }

  .ct-links { display: flex; flex-direction: column; gap: 9px; width: 100%; }

  .ct-link {
    display: flex; align-items: center; gap: 11px;
    padding: 11px 14px;
    background: var(--glass); border: 1px solid var(--glass-b);
    backdrop-filter: blur(10px); border-radius: 12px;
    text-decoration: none;
    transition: transform .18s ease, background .18s ease;
  }
  .ct-link:hover {
    transform: translateX(4px);
    background: rgba(255,255,255,.5);
  }

  .ct-link-icon {
    width: 32px; height: 32px; border-radius: 9px;
    background: rgba(46,139,192,.1); border: 1px solid rgba(46,139,192,.2);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent); font-size: 15px; flex-shrink: 0;
  }

  .ct-link-info { display: flex; flex-direction: column; gap: 1px; }
  .ct-link-label { font-size: 9px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); font-weight: 700; }
  .ct-link-value { font-size: 12px; font-weight: 600; color: var(--ink); }

  /* ── TOAST ── */
  .ct-toast {
    position: fixed; top: 22px; left: 50%;
    transform: translateX(-50%);
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 22px;
    border-radius: 10px; font-family: var(--font);
    font-size: 13px; font-weight: 600;
    backdrop-filter: blur(14px);
    z-index: 9999;
    animation: rise .3s both;
  }
  .ct-toast.success { background: rgba(86,193,140,.22); color: #166534; border: 1px solid rgba(86,193,140,.35); }
  .ct-toast.error   { background: rgba(220,80,80,.15);  color: #7f1d1d; border: 1px solid rgba(220,80,80,.3); }
`;

export default function Contact() {
  const vantaRef = useRef(null);
  const vantaFx  = useRef(null);
  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js");
      if (cancelled || !vantaRef.current || vantaFx.current) return;
      vantaFx.current = window.VANTA.CLOUDS({
        el: vantaRef.current,
        skyColor: 0x3faedc,
        cloudColor: 0xb8e0f5,
        speed: 0.75,
      });
    })();
    return () => { cancelled = true; vantaFx.current?.destroy(); };
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setForm(p => ({ ...p, [name]: value }));

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form, subject: `Portfolio Contact from ${form.name}` }),
      });
      const data = await res.json();
      if (data.success) {
        setForm({ name: "", email: "", message: "" });
        showToast("success", "Message sent! I'll get back to you soon.");
      } else {
        showToast("error", "Something went wrong. Try again.");
      }
    } catch {
      showToast("error", "Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{css}</style>
      <div ref={vantaRef} className="ct-vanta" />
      <div className="ct-overlay" />

      {toast && (
        <div className={`ct-toast ${toast.type}`}>
          {toast.type === "success"
            ? <AiOutlineCheckCircle />
            : <AiOutlineCloseCircle />}
          {toast.text}
        </div>
      )}

      <div className="ct-page">
        <div className="ct-card r1">

          {/* ── LEFT ── */}
          <div className="ct-left">

            <div className="ct-badge r0"><span className="ct-dot" /> Contact</div>

            <h1 className="ct-heading r1">
              Get in <em>Touch</em>
            </h1>

            <div className="ct-rule r2" />

            <p className="ct-sub r2">
              Have a project or collaboration idea? Send me a message.
            </p>

            <form onSubmit={handleSubmit} className="ct-form r3">
              <label className="ct-label">
                Your Name
                <input
                  type="text" name="name"
                  value={form.name} onChange={handleChange}
                  className="ct-input" required
                />
              </label>

              <label className="ct-label">
                Email Address
                <input
                  type="email" name="email"
                  value={form.email} onChange={handleChange}
                  className="ct-input" required
                />
              </label>

              <label className="ct-label">
                Message
                <textarea
                  name="message"
                  value={form.message} onChange={handleChange}
                  className="ct-textarea" required
                />
              </label>

              <button type="submit" disabled={loading} className="ct-submit">
                {loading ? "Sending…" : <><FiSend /> Send Message</>}
              </button>
            </form>
          </div>

          {/* ── RIGHT ── */}
          <div className="ct-right r2">

            <div className="ct-icon-wrap">
              <FaEnvelope />
            </div>

            <div className="ct-tagline">
              Let's build something<br /><em>great together.</em>
            </div>

            <div className="ct-links">
              <a href="mailto:2k23.it2310808@gmail.com" className="ct-link">
                <div className="ct-link-icon"><FaEnvelope /></div>
                <div className="ct-link-info">
                  <span className="ct-link-label">Email</span>
                  <span className="ct-link-value">2k23.it2310808@gmail.com</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/shubhamwebdev" target="_blank" rel="noopener noreferrer" className="ct-link">
                <div className="ct-link-icon"><FaLinkedin /></div>
                <div className="ct-link-info">
                  <span className="ct-link-label">LinkedIn</span>
                  <span className="ct-link-value">shubhamwebdev</span>
                </div>
              </a>

              <a href="https://github.com/ShubhamVermaDev9" target="_blank" rel="noopener noreferrer" className="ct-link">
                <div className="ct-link-icon"><FaGithub /></div>
                <div className="ct-link-info">
                  <span className="ct-link-label">GitHub</span>
                  <span className="ct-link-value">ShubhamVermaDev9</span>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
