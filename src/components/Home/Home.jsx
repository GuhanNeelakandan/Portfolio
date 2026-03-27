import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ThreeBackground from '../ThreeBackground/ThreeBackground';
import './Home.css';

// ── EDIT YOUR INFO HERE ──────────────────────────────
const HERO_DATA = {
  greeting: "Hello, I'm",
  name: "Guhan",
  titles: ["Ai & ML Engineer","3D Web Developer","Full Stack Developer", "React Specialist", "Node.js Engineer", "UI/UX Enthusiast"],
  description:
    "I craft scalable, performant web applications with clean architecture and delightful user experiences. Currently open to exciting opportunities.",
  ctaPrimary: { label: "View Projects", href: "#projects" },
  ctaSecondary: { label: "Download CV", href: "https://drive.google.com/file/d/10RfGE6gW0kSjBdZgvZYDrlLn8cRvhxC5/view?usp=sharing" },
  socials: [
    { label: "GitHub", href: "https://github.com", icon: "GH" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "LI" },
    { label: "Twitter", href: "https://twitter.com", icon: "TW" },
  ],
  stats: [
    { value: "4+", label: "Years Exp." },
    { value: "10+", label: "Projects" },
    { value: "3+", label: "Company" },
  ],
};
// ─────────────────────────────────────────────────────

const Home = () => {
  const sectionRef = useRef(null);
  const greetRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const titleIndexRef = useRef(0);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.2 });
    tl.fromTo(greetRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .fromTo(nameRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .fromTo(statsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.1');

    // Rotating title
    const titles = HERO_DATA.titles;
    const el = titleRef.current?.querySelector('.rotating-title');
    if (!el) return;

    const rotateTitle = () => {
      titleIndexRef.current = (titleIndexRef.current + 1) % titles.length;
      gsap.to(el, {
        y: -20, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          el.textContent = titles[titleIndexRef.current];
          gsap.fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
        }
      });
    };

    el.textContent = titles[0];
    const interval = setInterval(rotateTitle, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="home-section" id="home" ref={sectionRef}>
      <ThreeBackground />

      <div className="home-content container">
        <div className="home-left">
          <p className="home-greeting" ref={greetRef}>
            <span className="mono-tag">&lt;</span>
            {HERO_DATA.greeting}
            <span className="mono-tag">&gt;</span>
          </p>

          <h1 className="home-name" ref={nameRef}>
            {HERO_DATA.name}
          </h1>

          <div className="home-title" ref={titleRef}>
            <span className="title-prefix">I'm a </span>
            <span className="rotating-title gradient-text"></span>
            <span className="cursor-blink">_</span>
          </div>

          <p className="home-desc" ref={descRef}>
            {HERO_DATA.description}
          </p>

          <div className="home-cta" ref={ctaRef}>
            <a
              href={HERO_DATA.ctaPrimary.href}
              className="btn-secondary"
              onClick={(e) => handleScroll(e, HERO_DATA.ctaPrimary.href)}
            >
              {HERO_DATA.ctaPrimary.label}
              <span className="btn-arrow">→</span>
            </a>
            <a href={HERO_DATA.ctaSecondary.href} className="btn-secondary" target="_blank" rel="noreferrer">
              {HERO_DATA.ctaSecondary.label}
            </a>
          </div>

          <div className="home-socials">
            {HERO_DATA.socials.map(social => (
              <a key={social.label} href={social.href} className="social-link" target="_blank" rel="noreferrer" aria-label={social.label}>
                <span>{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="home-stats" ref={statsRef}>
          {HERO_DATA.stats.map(stat => (
            <div key={stat.label} className="stat-card">
              <span className="stat-value gradient-text">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Home;
