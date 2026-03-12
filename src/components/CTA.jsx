import { Link } from "react-router-dom";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800&family=Lora:ital@1&display=swap');

.cta-section{
width:100%;
padding:56px 48px;
background:rgba(255,255,255,0.28);
backdrop-filter:blur(16px);
-webkit-backdrop-filter:blur(16px);
border-top:1px solid rgba(255,255,255,0.55);
border-bottom:1px solid rgba(255,255,255,0.55);
display:flex;
align-items:center;
justify-content:space-between;
flex-wrap:wrap;
gap:32px;
font-family:'Raleway',sans-serif;
position:relative;
overflow:hidden;
}

.cta-section::before{
content:'';
position:absolute;
width:340px;
height:180px;
background:rgba(255,255,255,0.35);
border-radius:50%;
filter:blur(52px);
top:-40px;
right:10%;
pointer-events:none;
}

.cta-left{position:relative;z-index:1;}

.cta-eyebrow{
display:inline-flex;
align-items:center;
gap:7px;
background:rgba(255,255,255,0.35);
border:1px solid rgba(255,255,255,0.65);
border-radius:5px;
padding:5px 13px;
font-size:9.5px;
letter-spacing:0.2em;
text-transform:uppercase;
color:rgba(40,90,120,0.65);
margin-bottom:16px;
font-weight:700;
}

.cta-eyebrow-dot{
width:5px;
height:5px;
border-radius:50%;
background:#4a90b8;
}

.cta-heading{
font-size:clamp(24px,3.5vw,38px);
font-weight:800;
color:#1a3a52;
letter-spacing:-1px;
line-height:1.1;
margin-bottom:10px;
}

.cta-heading em{
font-family:'Lora',serif;
font-style:italic;
font-weight:400;
color:#4a90b8;
}

.cta-sub{
font-size:14px;
color:rgba(30,70,100,0.62);
line-height:1.75;
max-width:420px;
}

.cta-right{
display:flex;
flex-direction:column;
align-items:flex-end;
gap:12px;
position:relative;
z-index:1;
}

.cta-btn-primary{
display:inline-flex;
align-items:center;
gap:9px;
padding:15px 32px;
background:linear-gradient(135deg,#33505c,#1a3a52);
color:rgba(220,240,250,0.92);
border-radius:999px;
text-decoration:none;
font-size:12px;
font-weight:700;
letter-spacing:0.12em;
text-transform:uppercase;
box-shadow:0 8px 28px rgba(30,80,120,0.22);
transition:transform .22s ease,box-shadow .22s ease;
}

.cta-btn-primary:hover{
transform:translateY(-3px);
box-shadow:0 16px 36px rgba(30,80,120,0.3);
}

.cta-btn-secondary{
display:inline-flex;
align-items:center;
gap:7px;
padding:11px 24px;
background:rgba(255,255,255,0.35);
border:1px solid rgba(255,255,255,0.7);
border-radius:999px;
text-decoration:none;
font-size:11px;
font-weight:700;
letter-spacing:0.12em;
text-transform:uppercase;
color:rgba(30,70,100,0.65);
backdrop-filter:blur(8px);
transition:background .2s,color .2s;
}

.cta-btn-secondary:hover{
background:rgba(255,255,255,0.58);
color:#1a3a52;
}

.cta-divider{
width:1px;
height:64px;
background:rgba(74,144,184,0.18);
align-self:center;
flex-shrink:0;
}

@media(max-width:640px){
.cta-section{padding:44px 28px;flex-direction:column;align-items:flex-start;}
.cta-right{align-items:flex-start;}
.cta-divider{display:none;}
}
`;

const CTA = () => {
  return (
    <>
      <style>{styles}</style>

      <section className="cta-section">

        {/* LEFT */}
        <div className="cta-left">
          <div className="cta-eyebrow">
            <div className="cta-eyebrow-dot" /> Open to opportunities
          </div>

          <h2 className="cta-heading">
            Have a project <em>in mind?</em><br />
            Let's build together.
          </h2>

          <p className="cta-sub">
            Whether it's an AI-powered app, a web platform, or just a great idea —
            I'm always excited to collaborate and create something meaningful.
          </p>
        </div>

        <div className="cta-divider"></div>

        {/* RIGHT */}
        <div className="cta-right">

          <Link to="/contact" className="cta-btn-primary">
            ✉️ Contact Me
          </Link>

          <a
            href="https://github.com/ShubhamVermaDev9"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn-secondary"
          >
            🐙 View GitHub
          </a>

        </div>

      </section>
    </>
  );
};

export default CTA;