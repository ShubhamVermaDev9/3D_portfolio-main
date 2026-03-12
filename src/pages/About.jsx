import { useEffect, useRef } from "react";
import { FaTrophy, FaRunning, FaCode, FaBrain } from "react-icons/fa";
import { MdSportsKabaddi } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import { BsPalette } from "react-icons/bs";
import { Sparkles, MapPin, GraduationCap, Mail } from "lucide-react";

const SKILLS = {
  Frontend:       ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS"],
  "ML / CV":      ["Python", "TensorFlow", "Scikit-learn", "OpenCV"],
  "Deep Learning":["NN", "ANN", "CNN", "RNN"],
  Tools:          ["Git", "GitHub", "VS Code", "Jupyter", "Colab", "n8n"],
};

const FOCUS = [
  { icon: <FaCode />,             text: "Frontend Dev",     sub: "React · Tailwind · JS",  pct: 88 },
  { icon: <FaBrain />,            text: "Machine Learning", sub: "TF · Scikit · OpenCV",   pct: 74 },
  { icon: <Sparkles size={13}/>,  text: "UI / UX Design",  sub: "Figma · Design Systems", pct: 80 },
];

const ACHIEVEMENTS = [
  { icon: <FaTrophy />,        title: "Smart India Hackathon (SIH)",    desc: "First Round Finalist — national-level government hackathon",    tag: "Hackathon" },
  { icon: <MdSportsKabaddi />, title: "3rd Position — Kabaddi 2026",    desc: "Footprints Inter-College Tournament · Role: Defender",         tag: "Sports"    },
  { icon: <FaRunning />,       title: "Quarter-Finalist — Kho Kho",     desc: "Inter-College Kho Kho Tournament · Role: All-round",           tag: "Sports"    },
];

const HOBBIES = [
  { icon: <BsPalette />,        label: "Design Trends"   },
  { icon: <MdSportsKabaddi />,  label: "Kabaddi"         },
  { icon: <FaRunning />,        label: "Kho Kho"         },
  { icon: <RiFilePaper2Line />, label: "AI / ML Research"},
  { icon: <Sparkles size={13}/>,label: "Modern UI / UX"  },
];

const STATS = [
  { value: "7+", label: "Projects Built" },
  { value: "2+", label: "Years Coding"   },
  { value: "4+", label: "Tech Stacks"    },
  { value: "3",  label: "Hackathons"     },
];

const ORBS = [
  { label: "HTML",      color: "#e44d26", size: 58, top: "10%", left: "12%" },
  { label: "CSS",       color: "#2965f1", size: 46, top: "30%", left: "58%" },
  { label: "Tailwind",  color: "#38bdf8", size: 62, top: "55%", left: "30%" },
  { label: "React",     color: "#61dafb", size: 66, top: "8%",  left: "62%" },
  { label: "Python",    color: "#ffd43b", size: 52, top: "36%", left: "20%" },
  { label: "TF",        color: "#ff6f00", size: 44, top: "68%", left: "64%" },
  { label: "OpenCV",    color: "#56c1f0", size: 50, top: "22%", left: "80%" },
  { label: "Git",       color: "#f05032", size: 42, top: "78%", left: "16%" },
  { label: "JS",        color: "#f7df1e", size: 40, top: "50%", left: "76%" },
  { label: "Bootstrap", color: "#7c3aed", size: 48, top: "80%", left: "48%" },
];

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
    --ink:      #0f2133;
    --ink2:     #1e3d52;
    --accent:   #2e8bc0;
    --accent2:  #56c1f0;
    --glass:    rgba(255,255,255,0.28);
    --glass-b:  rgba(255,255,255,0.56);
    --muted:    rgba(20,60,90,0.58);
    --font:     'Outfit', sans-serif;

    /* ── uniform tokens ── */
    --card-radius:  12px;
    --card-pad:     12px 14px;
    --card-gap:     8px;
    --sec-gap:      14px;
    --section-mb:   18px;
  }

  html, body, #root { height:100%; overflow:hidden; }

  .ab-vanta   { position:fixed; inset:0; z-index:0; }
  .ab-overlay {
    position:fixed; inset:0; z-index:1; pointer-events:none;
    background: linear-gradient(108deg,
      rgba(190,225,248,.97) 0%,
      rgba(200,230,250,.82) 36%,
      rgba(210,235,252,.40) 58%,
      transparent 74%);
  }

  /* ── TWO-COLUMN SHELL ── */
  .ab-page {
    padding-top:3rem;
    position:relative; z-index:2;
    height:100vh; overflow:hidden;
    display:grid;
    grid-template-columns: minmax(0,1fr) minmax(0,390px);
    font-family:var(--font); color:var(--ink2);
  }

  /* ── LEFT ── */
  .ab-left {
    padding: 28px 36px 28px 40px;
    overflow-y:auto; scrollbar-width:none;
    display:flex; flex-direction:column;
  }
  .ab-left::-webkit-scrollbar { display:none; }

  /* ── RIGHT ── */
  .ab-right {
    padding: 28px 28px 28px 14px;
    display:flex; flex-direction:column;
    gap: 10px; overflow:hidden;
  }

  /* ── ANIMATIONS ── */
  @keyframes rise {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .r0{animation:rise .45s .00s both}
  .r1{animation:rise .45s .07s both}
  .r2{animation:rise .45s .13s both}
  .r3{animation:rise .45s .19s both}
  .r4{animation:rise .45s .25s both}
  .r5{animation:rise .45s .31s both}
  .r6{animation:rise .45s .37s both}
  .r7{animation:rise .45s .43s both}

  @keyframes float {
    0%,100% { transform:translateY(0); }
    50%     { transform:translateY(-7px); }
  }

  /* ════════════════════════════════
     SHARED CARD BASE
     All cards use these same tokens
  ════════════════════════════════ */
  .card {
    background: var(--glass);
    border: 1px solid var(--glass-b);
    backdrop-filter: blur(14px);
    border-radius: var(--card-radius);
    padding: var(--card-pad);
    transition: transform .22s ease, box-shadow .22s ease, background .22s ease;
    cursor: default;
  }
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(46,139,192,.13);
    background: rgba(255,255,255,.44);
  }

  /* ── BADGE ── */
  .ab-badge {
    display:inline-flex; align-items:center; gap:7px;
    background:var(--glass); border:1px solid var(--glass-b);
    backdrop-filter:blur(12px); border-radius:6px;
    padding:4px 13px;
    font-size:10px; letter-spacing:.18em; text-transform:uppercase;
    color:var(--accent); font-weight:700;
    margin-bottom:10px; align-self:flex-start;
  }
  .ab-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--accent2);
    animation:ping 1.8s ease infinite;
  }
  @keyframes ping {
    0%  { box-shadow:0 0 0 0   rgba(86,193,240,.65); }
    70% { box-shadow:0 0 0 7px rgba(86,193,240,0);   }
    100%{ box-shadow:0 0 0 0   rgba(86,193,240,0);   }
  }

  /* ── HERO TEXT ── */
  .ab-name {
    font-size:clamp(32px,4vw,48px);
    font-weight:900; color:var(--ink);
    line-height:1.0; letter-spacing:-2px;
    margin-bottom:0;
  }
  .ab-name span { position:relative; display:inline-block; }
  .ab-name span::after {
    content:''; position:absolute;
    left:0; bottom:-4px; width:100%; height:3px;
    background:linear-gradient(90deg,var(--accent),var(--accent2),transparent);
    border-radius:2px;
  }
  .ab-role {
    font-family:'Playfair Display',serif;
    font-style:italic; font-weight:400;
    font-size:clamp(13px,1.7vw,17px);
    color:var(--accent);
    margin-top:12px; margin-bottom:8px;
  }
  .ab-bio {
    font-size:12.5px; line-height:1.72;
    color:var(--muted); max-width:480px;
  }

  /* ── DIVIDER ── */
  .ab-rule {
    width:44px; height:2px;
    background:linear-gradient(90deg,var(--accent),transparent);
    border-radius:2px; margin:14px 0 12px;
    flex-shrink:0;
  }

  /* ── SECTION LABEL ── uniform across all sections ── */
  .sec-lbl {
    font-size:10px; letter-spacing:.22em;
    color:var(--accent); text-transform:uppercase;
    font-weight:700; margin-bottom:8px;
    display:flex; align-items:center; gap:10px;
    flex-shrink:0;
  }
  .sec-lbl::after {
    content:''; flex:1; height:1px;
    background:linear-gradient(90deg,rgba(46,139,192,.28),transparent);
  }

  /* ════════════════════════
     SKILL CARDS  (2×2 grid)
  ════════════════════════ */
  .sk-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:var(--card-gap);
    margin-bottom:var(--section-mb);
  }
  .sk-cat {
    font-size:9px; letter-spacing:.14em;
    color:var(--accent); font-weight:800;
    text-transform:uppercase; margin-bottom:7px;
  }
  .sk-pills { display:flex; flex-wrap:wrap; gap:3px; }
  .sk-pill {
    font-size:10px; font-weight:500;
    color:rgba(15,33,51,.72);
    background:rgba(255,255,255,.52);
    border:1px solid rgba(255,255,255,.65);
    border-radius:4px; padding:1px 7px;
  }

  /* ════════════════════════
     FOCUS CARDS  (3-col grid, same card base)
  ════════════════════════ */
  .focus-grid {
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    gap:var(--card-gap);
    margin-bottom:var(--section-mb);
  }
  .focus-card-top { display:flex; align-items:center; gap:7px; margin-bottom:6px; }
  .focus-card-icon {
    width:26px; height:26px; border-radius:7px;
    background:rgba(255,255,255,.52); border:1px solid rgba(255,255,255,.68);
    display:flex; align-items:center; justify-content:center;
    color:var(--accent); font-size:12px; flex-shrink:0;
  }
  .focus-card-name { font-size:11px; font-weight:800; color:var(--ink); line-height:1.2; }
  .focus-card-sub  { font-size:9.5px; color:var(--muted); line-height:1.35; margin-bottom:6px; }
  .focus-bar-track {
    height:4px; background:rgba(46,139,192,.14);
    border-radius:3px; overflow:hidden; margin-bottom:3px;
  }
  .focus-bar-fill {
    height:100%; border-radius:3px;
    background:linear-gradient(90deg,var(--accent),var(--accent2));
  }
  .focus-pct { font-size:9px; font-weight:700; color:var(--accent); text-align:right; }

  /* ════════════════════════
     ACHIEVEMENT CARDS
  ════════════════════════ */
  .ach-list {
    display:flex; flex-direction:column;
    gap:var(--card-gap); margin-bottom:var(--section-mb);
  }
  .ach-card-inner {
    display:flex; align-items:center; gap:11px;
    position:relative; overflow:hidden;
  }
  /* left accent bar on hover */
  .card.ach:hover { transform:translateX(4px) translateY(0); }
  .ach-bar {
    position:absolute; left:-14px; top:0; bottom:0; width:3px;
    background:linear-gradient(180deg,var(--accent2),var(--accent));
    border-radius:2px;
    transition:left .22s ease;
  }
  .card.ach:hover .ach-bar { left:0; }
  .ach-icon-box {
    width:34px; height:34px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
    background:rgba(255,255,255,.52); border:1px solid rgba(255,255,255,.7);
    border-radius:9px; color:var(--accent); font-size:15px;
  }
  .ach-title { font-size:12px; font-weight:700; color:var(--ink); margin-bottom:1px; }
  .ach-desc  { font-size:10.5px; color:var(--muted); line-height:1.4; }
  .ach-tag {
    margin-left:auto; flex-shrink:0;
    font-size:9px; letter-spacing:.1em; text-transform:uppercase;
    color:var(--accent);
    background:rgba(46,139,192,.1); border:1px solid rgba(46,139,192,.22);
    border-radius:4px; padding:2px 8px; font-weight:700;
  }

  /* ════════════════════════
     HOBBY PILLS
  ════════════════════════ */
  .hobby-wrap {
    display:flex; flex-wrap:wrap;
    gap:6px; margin-bottom:16px;
  }
  .hobby-pill {
    display:inline-flex; align-items:center; gap:5px;
    background:var(--glass); border:1px solid var(--glass-b);
    backdrop-filter:blur(10px); border-radius:999px;
    padding:5px 13px; font-size:11px; font-weight:600;
    color:rgba(15,33,51,.75);
    transition:transform .18s ease, background .18s ease, color .18s ease;
    cursor:default;
  }
  .hobby-pill:hover { transform:scale(1.05); background:rgba(255,255,255,.55); color:var(--accent); }

  /* ── RESUME BTN ── */
  .ab-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:10px 24px;
    background:linear-gradient(135deg,#1f6a96,#0f2133);
    color:#fff; border-radius:999px;
    font-family:var(--font); font-size:11px; font-weight:700;
    letter-spacing:.1em; text-transform:uppercase; text-decoration:none;
    box-shadow:0 5px 22px rgba(15,33,51,.26),inset 0 1px 0 rgba(255,255,255,.12);
    transition:transform .2s ease, box-shadow .2s ease;
    align-self:flex-start;
  }
  .ab-btn:hover {
    transform:translateY(-2px);
    box-shadow:0 10px 32px rgba(15,33,51,.34),inset 0 1px 0 rgba(255,255,255,.12);
  }

  /* ════════════════════════
     RIGHT PANEL
  ════════════════════════ */
  .rp-stats {
    display:grid; grid-template-columns:1fr 1fr;
    gap:8px; flex-shrink:0;
    background:var(--glass); border:1px solid var(--glass-b);
    backdrop-filter:blur(18px); border-radius:var(--card-radius);
    padding:12px 14px;
  }
  .rp-stat {
    display:flex; flex-direction:column; align-items:center;
    background:rgba(255,255,255,.32); border:1px solid rgba(255,255,255,.6);
    border-radius:10px; padding:9px 6px;
    transition:transform .2s ease; cursor:default;
  }
  .rp-stat:hover { transform:translateY(-2px); }
  .rp-stat-val { font-size:20px; font-weight:900; color:var(--ink); letter-spacing:-1px; line-height:1; }
  .rp-stat-lbl { font-size:9.5px; color:var(--muted); font-weight:500; margin-top:3px; text-align:center; }

  .rp-orbs {
    flex:1; min-height:0;
    background:var(--glass); border:1px solid var(--glass-b);
    backdrop-filter:blur(18px); border-radius:var(--card-radius);
    position:relative; overflow:hidden;
  }
  .rp-orbs-lbl {
    position:absolute; top:10px; left:13px;
    font-size:9px; letter-spacing:.18em; text-transform:uppercase;
    color:var(--accent); font-weight:700; opacity:.7;
  }
  .orb {
    position:absolute; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    font-size:10px; font-weight:800; color:#fff;
    box-shadow:0 5px 16px rgba(0,0,0,.18);
    cursor:default; transition:transform .2s ease;
    text-shadow:0 1px 3px rgba(0,0,0,.3);
  }
  .orb:hover { transform:scale(1.18) !important; }

  .rp-focus {
    background:var(--glass); border:1px solid var(--glass-b);
    backdrop-filter:blur(18px); border-radius:var(--card-radius);
    padding:12px 14px; flex-shrink:0;
  }
  .rp-focus-lbl {
    font-size:10px; letter-spacing:.2em; text-transform:uppercase;
    color:var(--accent); font-weight:700; margin-bottom:9px;
    display:flex; align-items:center; gap:10px;
  }
  .rp-focus-lbl::after {
    content:''; flex:1; height:1px;
    background:linear-gradient(90deg,rgba(46,139,192,.28),transparent);
  }
  .rp-focus-row {
    display:flex; align-items:center; gap:9px;
    padding:6px 0; border-bottom:1px solid rgba(255,255,255,.38);
  }
  .rp-focus-row:last-child { border-bottom:none; padding-bottom:0; }
  .rp-focus-icon {
    width:28px; height:28px; border-radius:8px;
    background:rgba(255,255,255,.48); border:1px solid rgba(255,255,255,.65);
    display:flex; align-items:center; justify-content:center;
    color:var(--accent); font-size:12px; flex-shrink:0;
  }
  .rp-focus-text { font-size:11.5px; font-weight:600; color:var(--ink2); }
  .rp-focus-sub  { font-size:9.5px; color:var(--muted); margin-top:1px; }
  .rp-bar-wrap { margin-left:auto; width:52px; }
  .rp-bar-track { height:3px; background:rgba(46,139,192,.15); border-radius:2px; overflow:hidden; }
  .rp-bar-fill  { height:100%; border-radius:2px; background:linear-gradient(90deg,var(--accent),var(--accent2)); }

  @media (max-width:900px) {
    html,body,#root { overflow:auto; }
    .ab-page { grid-template-columns:1fr; height:auto; }
    .ab-left  { padding:28px 20px; }
    .ab-right { padding:0 20px 40px; }
    .rp-orbs  { min-height:200px; flex:none; }
    .focus-grid { grid-template-columns:1fr 1fr; }
  }
`;

export default function About() {
  const vantaRef = useRef(null);
  const vantaFx  = useRef(null);

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

  return (
    <>
      <style>{css}</style>
      <div ref={vantaRef} className="ab-vanta" />
      <div className="ab-overlay" />

      <div className="ab-page pt">

        {/* ══════ LEFT ══════ */}
        <div className="ab-left">

          {/* Hero */}
          <div className="ab-badge r0"><span className="ab-dot" /> About Me</div>
          <h1 className="ab-name r1"><span>Shubham</span><br />Verma</h1>
          <p className="ab-bio r2">
            Frontend Developer proficient in React.js and Tailwind CSS with
            hands-on experience in Machine Learning.
          </p>

          <div className="ab-rule r3" />

          {/* Technical Skills */}
          <p className="sec-lbl r3">Technical Skills</p>
          <div className="sk-grid r3">
            {Object.entries(SKILLS).map(([cat, pills]) => (
              <div className="card" key={cat}>
                <div className="sk-cat">{cat}</div>
                <div className="sk-pills">
                  {pills.map(p => <span key={p} className="sk-pill">{p}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Core Focus Areas */}
          <p className="sec-lbl r4">Core Focus Areas</p>
          <div className="focus-grid r4">
            {FOCUS.map((f, i) => (
              <div className="card" key={i}>
                <div className="focus-card-top">
                  <div className="focus-card-icon">{f.icon}</div>
                  <div className="focus-card-name">{f.text}</div>
                </div>
                <div className="focus-card-sub">{f.sub}</div>
                <div className="focus-bar-track">
                  <div className="focus-bar-fill" style={{ width: `${f.pct}%` }} />
                </div>
                <div className="focus-pct">{f.pct}%</div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <p className="sec-lbl r5">Achievements</p>
          <div className="ach-list r5">
            {ACHIEVEMENTS.map((a, i) => (
              <div className="card ach" key={i}>
                <div className="ach-card-inner">
                  <div className="ach-bar" />
                  <div className="ach-icon-box">{a.icon}</div>
                  <div>
                    <div className="ach-title">{a.title}</div>
                    <div className="ach-desc">{a.desc}</div>
                  </div>
                  <div className="ach-tag">{a.tag}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Hobbies */}
          <p className="sec-lbl r6">Hobbies &amp; Interests</p>
          <div className="hobby-wrap r6">
            {HOBBIES.map((h, i) => (
              <div className="hobby-pill" key={i}>{h.icon} {h.label}</div>
            ))}
          </div>

          {/* Resume */}
          <a href="/sv1106.pdf" download className="ab-btn r7">
            <RiFilePaper2Line /> Download Resume
          </a>

        </div>

        {/* ══════ RIGHT ══════ */}
        <div className="ab-right">

          <div className="rp-stats r1">
            {STATS.map((s, i) => (
              <div className="rp-stat" key={i}>
                <div className="rp-stat-val">{s.value}</div>
                <div className="rp-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="rp-orbs r2">
            <span className="rp-orbs-lbl">Tech Stack</span>
            {ORBS.map((o, i) => (
              <div
                key={i} className="orb"
                style={{
                  width: o.size, height: o.size,
                  top: o.top, left: o.left,
                  background: `radial-gradient(circle at 35% 35%, ${o.color}dd, ${o.color}88)`,
                  animation: `float ${3.2 + i * 0.35}s ${i * 0.25}s ease-in-out infinite`,
                }}
              >{o.label}</div>
            ))}
          </div>

          <div className="rp-focus r3">
            <div className="rp-focus-lbl">Core Focus Areas</div>
            {FOCUS.map((f, i) => (
              <div className="rp-focus-row" key={i}>
                <div className="rp-focus-icon">{f.icon}</div>
                <div>
                  <div className="rp-focus-text">{f.text}</div>
                  <div className="rp-focus-sub">{f.sub}</div>
                </div>
                <div className="rp-bar-wrap">
                  <div className="rp-bar-track">
                    <div className="rp-bar-fill" style={{ width: `${f.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}