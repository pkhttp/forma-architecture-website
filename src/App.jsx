import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X, Building2, DraftingCompass, HardHat, Landmark, MapPin, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const services = [
  [Building2, '01', 'Real Estate Development', 'End-to-end development shaped around people, place and long-term value.'],
  [DraftingCompass, '02', 'Architecture & Planning', 'Design intelligence that brings clarity, character and purpose to every space.'],
  [HardHat, '03', 'Construction Management', 'Disciplined delivery, precise coordination and quality at every stage.'],
  [Landmark, '04', 'Investment & Advisory', 'Strategic insight to help identify opportunity and make confident decisions.']
];

const projects = [
  { no: '01', title: 'AURORA RESIDENCES', type: 'RESIDENTIAL / PUNE', img: 'photo-1600607687939-ce8a6c25118c', cls: 'project-tall' },
  { no: '02', title: 'NEXUS BUSINESS DISTRICT', type: 'COMMERCIAL / MUMBAI', img: 'photo-1486406146926-c627a92ad1ab', cls: '' },
  { no: '03', title: 'THE CANOPY', type: 'MIXED USE / PUNE', img: 'photo-1600566753086-00f18fb6b3ea', cls: '' }
];

function Eyebrow({ n, children }) {
  return <div className="eyebrow"><span>{n}</span><i />{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [['VISION', '#about'], ['CAPABILITIES', '#services'], ['PROJECTS', '#projects'], ['CONTACT', '#contact']];
  return <header className="header">
    <a className="logo" href="#top"><span className="logo-symbol"><b /><b /><b /></span><span>FORMA<small>DEVELOPMENTS</small></span></a>
    <nav className={open ? 'nav nav-open' : 'nav'}>
      {nav.map(([name, href]) => <a key={name} href={href} onClick={() => setOpen(false)}>{name}</a>)}
      <a className="mobile-contact" href="#contact" onClick={() => setOpen(false)}>START A PROJECT <ArrowUpRight size={15} /></a>
    </nav>
    <a className="header-link" href="#contact">START A PROJECT <ArrowUpRight size={15} /></a>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
  </header>;
}

export default function App() {
  const root = useRef(null);
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const tick = t => lenis.raf(t * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow,.hero-line,.hero-copy,.hero-buttons', { y: 32, opacity: 0, duration: .9, stagger: .12, ease: 'power3.out', delay: .15 });
      gsap.utils.toArray('[data-reveal]').forEach(el => gsap.from(el, {
        y: 45, opacity: 0, duration: .85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true }
      }));
      gsap.from('.service', { y: 32, opacity: 0, stagger: .1, duration: .7, scrollTrigger: { trigger: '.service-grid', start: 'top 82%', once: true } });
      gsap.from('.project-card', { y: 42, opacity: 0, stagger: .13, duration: .8, scrollTrigger: { trigger: '.project-grid', start: 'top 82%', once: true } });
      gsap.to('.about-photo', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
    }, root);
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  const submit = e => { e.preventDefault(); setSent(true); };

  return <main ref={root} id="top">
    <Header />
    <section className="hero shell">
      <div className="hero-grid">
        <div className="hero-copy-wrap">
          <div className="hero-eyebrow"><i /> DESIGNING TOMORROW'S LANDMARKS</div>
          <h1 className="hero-title"><span className="hero-line">Beyond</span><span className="hero-line outline">the built</span><span className="hero-line">world<span className="blue">.</span></span></h1>
          <p className="hero-copy">We shape the future of real estate through visionary design, intelligent development and construction without compromise.</p>
          <div className="hero-buttons"><a className="btn btn-blue" href="#projects">EXPLORE OUR WORK <ArrowUpRight size={16} /></a><a className="btn-text" href="#about">OUR VISION <ArrowDown size={15} /></a></div>
          <div className="hero-index"><span>01 / 04</span><i /> BUILT FOR WHAT'S NEXT</div>
        </div>
        <div className="hero-art">
          <div className="hero-photo" role="img" aria-label="Photorealistic contemporary glass architecture" />
          <div className="hero-photo-shade" />
          <div className="hero-photo-caption"><span>01 / FEATURED VISION</span><b>Architecture for a changing world.</b></div>
          <span className="art-side">ARCHITECTURE / ENGINEERING / DEVELOPMENT</span>
          <span className="art-fig">DESIGN STUDY — CONTEMPORARY FORM</span>
        </div>
      </div>
      <div className="hero-foot"><span>INDEPENDENT THINKING. ENDURING IMPACT.</span><a href="#about">SCROLL TO EXPLORE <ArrowDown size={13} /></a></div>
    </section>

    <section className="manifesto"><div className="manifesto-inner shell"><span>OUR PHILOSOPHY</span><h2>Tomorrow is not something we wait for.<br /><em>It's something we build.</em></h2><b>F.</b></div></section>

    <section className="about shell section" id="about">
      <div className="section-title" data-reveal><Eyebrow n="01">THE FORMA VISION</Eyebrow><h2>Spaces with purpose.<br /><em>Places with meaning.</em></h2></div>
      <div className="about-grid">
        <div className="about-image" data-reveal><div className="about-photo" /><span>FIG. 02 / BUILT ENVIRONMENT</span><b>FORM<br />FOLLOWS<br />FUTURE.</b></div>
        <div className="about-text" data-reveal><h3>We believe the built environment should do more than occupy space. It should move life forward.</h3><p>FORMA is a conceptual construction and real estate development brand bringing design thinking and execution discipline together. We look at every site as an opportunity to create lasting value — for people, communities and the future.</p><a className="line-link" href="#services">DISCOVER OUR CAPABILITIES <ArrowUpRight size={15} /></a>
          <div className="principles"><div><strong>01</strong><span>Design-led<br/>thinking</span></div><div><strong>02</strong><span>Integrated<br/>delivery</span></div><div><strong>03</strong><span>Long-term<br/>value</span></div></div>
          <small className="note">Company profile content should be updated with your verified experience, team and credentials.</small>
        </div>
      </div>
    </section>

    <section className="services-section section" id="services"><div className="shell">
      <div className="service-heading" data-reveal><div><Eyebrow n="02">WHAT WE DO</Eyebrow><h2>One vision.<br /><em>Four disciplines.</em></h2></div><p>From the first idea to the final detail, our integrated approach keeps every part of the journey connected.</p></div>
      <div className="service-grid">{services.map(([Icon, no, title, desc]) => <article className="service" key={no}><div className="service-top"><span>{no} / 04</span><Icon size={24} /></div><h3>{title}</h3><p>{desc}</p><a href="#contact" aria-label={`Enquire about ${title}`}><ArrowUpRight size={18} /></a></article>)}</div>
    </div></section>

    <section className="projects shell section" id="projects">
      <div className="project-heading" data-reveal><div><Eyebrow n="03">SELECTED WORK</Eyebrow><h2>Made to make<br /><em>an impression.</em></h2></div><a className="line-link" href="#contact">HAVE A PROJECT IN MIND? <ArrowUpRight size={15} /></a></div>
      <div className="project-grid">{projects.map(p => <article className={`project-card ${p.cls}`} key={p.no}><a className="project-image" href="#contact" style={{ backgroundImage: `url(https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=1800&q=90)` }}><span>{p.no} / CONCEPT</span><b><ArrowUpRight size={20} /></b></a><small>{p.type} · VISUAL REFERENCE</small><h3>{p.title}</h3></article>)}</div>
      <p className="note">Illustrative project names and images only. Replace with your actual portfolio before publishing.</p>
    </section>

    <section className="feature">
      <div className="feature-bg" />
      <div className="shell feature-content" data-reveal><Eyebrow n="04">THE FORMA STANDARD</Eyebrow><h2>Built on precision.<br /><em>Defined by possibility.</em></h2><p>We bring ambition and accountability to every square foot.</p><a className="btn btn-white" href="#contact">LET'S CREATE WHAT'S NEXT <ArrowUpRight size={16} /></a></div>
      <span className="feature-coord">18°31' N / 73°51' E</span>
    </section>

    <section className="process shell section"><div className="process-title" data-reveal><Eyebrow n="05">OUR APPROACH</Eyebrow><h2>From vision<br /><em>to reality.</em></h2></div><div className="steps">
      {[['01','Discover','Understand the brief, the context and the opportunity.'],['02','Design','Translate insight into an intelligent, considered plan.'],['03','Deliver','Coordinate people, process and execution with precision.'],['04','Sustain','Create long-term value beyond the handover.']].map(([n,t,d]) => <div className="step" data-reveal key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><i /></div>)}
    </div></section>

    <section className="faq-section section"><div className="shell faq-grid"><div data-reveal><Eyebrow n="06">A FEW DETAILS</Eyebrow><h2>Questions,<br /><em>answered.</em></h2><p>Start with the essentials. We can take it from there.</p></div><div className="faq-list">{[
      ['What types of projects do you work on?','Our concept offering includes residential, commercial and mixed-use developments, along with construction management and advisory services. Adapt this to match your actual business.'],
      ['Can you work with an existing architect?','Yes. Project teams can coordinate with appointed architects, consultants and contractors according to the agreed project scope.'],
      ['How can we discuss a project?','Send a short overview using the enquiry form. Include the project location, type and your expected timeline so the team can follow up.']
    ].map(([q,a],i)=><div className="faq-item" key={q}><button onClick={()=>setFaq(faq===i?-1:i)}>{q}{faq===i?<Minus size={17}/>:<Plus size={17}/>}</button>{faq===i&&<p>{a}</p>}</div>)}</div></div></section>

    <section className="contact shell section" id="contact"><div className="contact-title" data-reveal><Eyebrow n="07">START A CONVERSATION</Eyebrow><h2>Have a vision?<br /><em>Let's build it.</em></h2></div><div className="contact-grid"><div className="contact-copy" data-reveal><p>Tell us what you're planning. From a new development to a strategic partnership, every great project starts with a conversation.</p><a href="mailto:hello@forma.example">HELLO@FORMA.EXAMPLE <ArrowUpRight size={15}/></a><div className="location"><MapPin size={17}/><span>PUNE, INDIA<br/><small>Building across possibilities.</small></span></div></div>
      <form className="contact-form" onSubmit={submit} data-reveal>{sent?<div className="success"><CheckCircle2 size={28}/><h3>Thank you for reaching out.</h3><p>This is a frontend demo. Connect a backend or form service to receive enquiries.</p><button type="button" onClick={()=>setSent(false)}>SEND ANOTHER MESSAGE</button></div>:<><div className="form-row"><label>YOUR NAME<input required placeholder="Name"/></label><label>EMAIL ADDRESS<input required type="email" placeholder="you@company.com"/></label></div><label>PROJECT TYPE<select defaultValue=""><option value="" disabled>Select a project type</option><option>Residential</option><option>Commercial</option><option>Mixed-use</option><option>Construction management</option><option>Partnership</option></select></label><label>YOUR MESSAGE<textarea required rows="3" placeholder="Tell us a little about your project..."/></label><button className="btn btn-blue" type="submit">SEND ENQUIRY <ArrowUpRight size={16}/></button></>}</form>
    </div></section>

    <footer className="footer"><div className="shell footer-top"><a className="logo" href="#top"><span className="logo-symbol"><b/><b/><b/></span><span>FORMA<small>DEVELOPMENTS</small></span></a><span>DESIGNING TOMORROW'S LANDMARKS.</span><a href="#top">BACK TO TOP <ArrowUpRight size={15}/></a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} FORMA DEVELOPMENTS — CONCEPT WEBSITE</span><span>BUILT FOR WHAT'S NEXT.</span><span>PRIVACY / TERMS</span></div></footer>
  </main>;
}
