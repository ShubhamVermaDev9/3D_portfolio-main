import { useEffect, useRef } from "react";
import {
  FaTrophy, FaLeaf, FaEye, FaLungs, FaGamepad, FaCube,
} from "react-icons/fa";
import Footer from "./Footer";

const arrow = "https://api.iconify.design/heroicons:arrow-right-16-solid.svg";

const projects = [
  {
    icon: <FaTrophy />,
    name: "Award Winning Website",
    description:
      "A visually stunning, award-style web experience built with React, GSAP animations, and Tailwind CSS — focused on immersive UI and smooth interactions.",
    stack: ["React.js", "Tailwind", "GSAP", "Vite"],
    github: "https://github.com/ShubhamVermaDev9/award-winning-website-main",
    link: "#",
    tag: "Web Dev",
  },
  {
    icon: <FaLeaf />,
    name: "Plant Disease Detection",
    description:
      "Deep learning model trained to detect plant diseases from leaf images using CNN architecture with TensorFlow and Keras, including data augmentation.",
    stack: ["Python", "TensorFlow", "Keras", "CNN"],
    github: "https://github.com/ShubhamVermaDev9/Plant_Disease_Model_Training",
    link: "#",
    tag: "Deep Learning",
  },
  {
    icon: <FaEye />,
    name: "YOLOv8 Object Detection",
    description:
      "Real-time object detection pipeline using YOLOv8, trained and evaluated on custom datasets with optimized inference for speed and accuracy.",
    stack: ["Python", "YOLOv8", "OpenCV", "PyTorch"],
    github: "https://github.com/ShubhamVermaDev9/ML-projects/blob/main/YOLOv8_Object_Detection.ipynb",
    link: "#",
    tag: "Computer Vision",
  },
  {
    icon: <FaLungs />,
    name: "VGG16 Pneumonia Classifier",
    description:
      "Medical image classifier using transfer learning on VGG16 to detect pneumonia from chest X-rays with high diagnostic accuracy.",
    stack: ["Python", "VGG16", "Keras", "NumPy"],
    github: "https://github.com/ShubhamVermaDev9/ML-projects/blob/main/VGG16_Pneumonia_Classifier_.ipynb",
    link: "#",
    tag: "Deep Learning",
  },
  {
    icon: <FaGamepad />,
    name: "Talon Gaming",
    description:
      "A fully designed and deployed gaming website built from a Figma prototype — featuring a dark aesthetic, responsive layout, and polished UI components.",
    stack: ["Figma", "HTML", "CSS", "JavaScript"],
    github: "#",
    link: "https://talon-gaming-60501244.figma.site/",
    tag: "UI Design",
  },
  {
    icon: <FaCube />,
    name: "3D Hero Section",
    description:
      "An interactive 3D hero section for the web using Three.js — featuring animated 3D models, lighting effects, and smooth camera transitions.",
    stack: ["Three.js", "React.js", "JavaScript", "CSS"],
    github: "https://github.com/ShubhamVermaDev9/3DHeroSection",
    link: "#",
    tag: "3D / Web",
  },
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
    --ink:     #0f2133;
    --ink2:    #1e3d52;
    --accent:  #2e8bc0;
    --accent2: #56c1f0;
    --glass:   rgba(255,255,255,0.30);
    --glass-b: rgba(255,255,255,0.58);
    --muted:   rgba(20,60,90,0.60);
    --font:    'Outfit', sans-serif;
  }

  .pj-vanta { position: fixed; inset: 0; z-index: 0; }

  .pj-overlay {
    position: fixed; inset: 0; z-index: 1; pointer-events: none;
    background: linear-gradient(
      108deg,
      rgba(190,225,248,0.96) 0%,
      rgba(200,230,250,0.80) 38%,
      rgba(210,235,252,0.38) 60%,
      transparent 76%
    );
  }

  .pj-root {
    position: relative; z-index: 2;
    min-height: 100vh;
    font-family: var(--font); color: var(--ink2);
  }

  .pj-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 106px 48px 80px;
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

  /* ── BADGE ── */
  .pj-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--glass); border: 1px solid var(--glass-b);
    backdrop-filter: blur(12px); border-radius: 6px;
    padding: 5px 14px;
    font-size: 10px; letter-spacing: 0.20em; text-transform: uppercase;
    color: var(--accent); font-weight: 700;
    margin-bottom: 16px;
  }
  .pj-dot {
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
  .pj-heading {
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 900; color: var(--ink);
    letter-spacing: -2px; line-height: 1.0;
    margin-bottom: 4px;
  }
  .pj-heading em {
    font-family: 'Playfair Display', serif;
    font-style: italic; font-weight: 400;
    color: var(--accent);
  }

  .pj-rule {
    width: 48px; height: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
    border-radius: 2px; margin: 14px 0;
  }

  .pj-subtext {
    font-size: 13.5px; line-height: 1.80;
    color: var(--muted); max-width: 520px;
    margin-bottom: 36px;
  }

  /* ── GRID: 3 columns ── */
  .pj-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }

  /* ── CARD ── */
  .pj-card {
    background: var(--glass); border: 1px solid var(--glass-b);
    backdrop-filter: blur(18px); border-radius: 16px;
    padding: 22px 20px 18px;
    display: flex; flex-direction: column;
    transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
    position: relative; overflow: hidden;
  }
  .pj-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(180deg, var(--accent2), var(--accent));
    border-radius: 3px 0 0 3px;
    opacity: 0; transition: opacity .25s ease;
  }
  .pj-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(30,80,120,.13);
    background: rgba(255,255,255,.46);
  }
  .pj-card:hover::before { opacity: 1; }

  /* card top row: icon + category tag */
  .pj-card-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 14px;
  }

  .pj-icon-box {
    width: 44px; height: 44px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.52);
    border: 1px solid rgba(255,255,255,.7);
    color: var(--accent); font-size: 18px; flex-shrink: 0;
  }

  .pj-tag {
    font-size: 9px; letter-spacing: .13em; text-transform: uppercase;
    background: rgba(46,139,192,.1); border: 1px solid rgba(46,139,192,.22);
    border-radius: 5px; padding: 4px 10px;
    color: var(--accent); font-weight: 700;
  }

  .pj-title {
    font-size: 15.5px; font-weight: 800; color: var(--ink);
    letter-spacing: -.3px; margin-bottom: 8px; line-height: 1.25;
  }

  .pj-desc {
    font-size: 12.5px; color: var(--muted);
    line-height: 1.72; flex: 1; margin-bottom: 14px;
  }

  /* ── TECH STACK PILLS ── */
  .pj-stack {
    display: flex; flex-wrap: wrap; gap: 5px;
    margin-bottom: 16px;
  }
  .pj-stack-pill {
    font-size: 10px; font-weight: 600;
    color: var(--ink2);
    background: rgba(255,255,255,.55);
    border: 1px solid rgba(255,255,255,.72);
    border-radius: 4px; padding: 2px 9px;
    transition: background .18s ease, color .18s ease;
  }
  .pj-card:hover .pj-stack-pill {
    background: rgba(46,139,192,.1);
    border-color: rgba(46,139,192,.25);
    color: var(--accent);
  }

  /* ── FOOTER ROW: divider + links ── */
  .pj-divider {
    height: 1px; background: rgba(46,139,192,.12); margin-bottom: 12px;
  }

  .pj-footer {
    display: flex; align-items: center; justify-content: space-between;
  }

  .pj-link {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 10.5px; font-weight: 700; letter-spacing: .08em;
    color: var(--accent); text-decoration: none; text-transform: uppercase;
    transition: gap .2s ease, color .2s ease;
  }
  .pj-link:hover { gap: 9px; color: var(--ink); }

  .pj-github {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 10.5px; font-weight: 600;
    color: var(--muted); text-decoration: none;
    transition: color .2s ease;
  }
  .pj-github:hover { color: var(--ink); }
  .pj-github svg { width: 14px; height: 14px; }

  /* ── CTA BANNER ── */
  .pj-cta {
    background: var(--glass); border: 1px solid var(--glass-b);
    backdrop-filter: blur(18px); border-radius: 16px;
    padding: 32px 36px;
    display: flex; justify-content: space-between;
    align-items: center; flex-wrap: wrap; gap: 20px;
  }
  .pj-cta-title {
    font-size: 21px; font-weight: 900; color: var(--ink);
    letter-spacing: -.5px; margin-bottom: 5px;
  }
  .pj-cta-title em {
    font-family: 'Playfair Display', serif;
    font-style: italic; font-weight: 400; color: var(--accent);
  }
  .pj-cta-sub { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .pj-cta-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 28px;
    background: linear-gradient(135deg, #1f6a96, #0f2133);
    color: #fff; border-radius: 999px; text-decoration: none;
    font-family: var(--font); font-size: 11px; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase;
    box-shadow: 0 6px 24px rgba(15,33,51,.26), inset 0 1px 0 rgba(255,255,255,.12);
    transition: transform .2s ease, box-shadow .2s ease;
    white-space: nowrap;
  }
  .pj-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(15,33,51,.34), inset 0 1px 0 rgba(255,255,255,.12);
  }

  @media (max-width: 900px) {
    .pj-grid { grid-template-columns: 1fr 1fr; }
    .pj-container { padding: 52px 24px 60px; }
  }
  @media (max-width: 580px) {
    .pj-grid { grid-template-columns: 1fr; }
  }
`;

// Inline GitHub SVG icon
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-1.92c-3.19.69-3.86-1.54-3.86-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.96 10.96 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.13v3.16c0 .3.2.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
  </svg>
);

const CTA = () => (
  <div className="pj-cta r4">
    <div>
      <div className="pj-cta-title">Let's build something <em>together.</em></div>
      <p className="pj-cta-sub">Interested in collaborating or discussing ideas? Let's connect.</p>
    </div>
    <a href="mailto:2k23.it2310808@gmail.com" className="pj-cta-btn">
      Let's Connect →
    </a>
  </div>
);

export default function Projects() {
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
      <div ref={vantaRef} className="pj-vanta" />
      <div className="pj-overlay" />

      <div className="pj-root">
        <div className="pj-container">

          <div className="pj-badge r0"><span className="pj-dot" /> My Work</div>

          <h1 className="pj-heading r1">Selected <em>Projects.</em></h1>

          <div className="pj-rule r2" />

          <p className="pj-subtext r2">
            Projects I've built while exploring AI, web development, and machine learning.
          </p>

          <div className="pj-grid r3">
            {projects.map((p) => (
              <div key={p.name} className="pj-card">

                {/* Top: icon + category */}
                <div className="pj-card-top">
                  <div className="pj-icon-box">{p.icon}</div>
                  <span className="pj-tag">{p.tag}</span>
                </div>

                {/* Title & description */}
                <h3 className="pj-title">{p.name}</h3>
                <p className="pj-desc">{p.description}</p>

                {/* Tech stack pills */}
                <div className="pj-stack">
                  {p.stack.map(t => (
                    <span key={t} className="pj-stack-pill">{t}</span>
                  ))}
                </div>

                {/* Footer: live link + github */}
                <div className="pj-divider" />
                <div className="pj-footer">
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="pj-link">
                    Live Link <img src={arrow} alt="→" width={11} />
                  </a>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="pj-github">
                    <GithubIcon /> GitHub
                  </a>
                </div>

              </div>
            ))}
          </div>

          <CTA />

        </div>
      </div>
      <Footer />
    </>
  );
}
