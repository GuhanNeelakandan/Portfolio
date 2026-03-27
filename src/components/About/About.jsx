import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';
import guhanImg from './guhan.png'

gsap.registerPlugin(ScrollTrigger);

// ── EDIT YOUR INFO HERE ──────────────────────────────
const ABOUT_DATA = {
  bio: [
  "I'm an AI & Machine Learning Engineer and Full Stack Developer with 4+ years of experience building intelligent, end-to-end web applications. I specialize in React, Node.js, and scalable cloud infrastructure, with a growing focus on data-driven and AI-powered solutions.",

  "My passion lies in designing intuitive user interfaces backed by robust APIs and intelligent systems. I believe great software is not only technically sound but also seamlessly integrates intelligence to enhance user experience.",

  "When I'm not coding, I contribute to open-source, write technical blogs, and explore advancements in AI, machine learning, and modern web performance."
],
  info: [
    { label: "Name", value: "Guhan N S" },
    { label: "Location", value: "Chennai, Tamil Nadu" },
    { label: "Email", value: "guhanneelakandan1898@gmail.com" },
    { label: "Availability", value: "Open to work ✓" },
    { label: "Experience", value: "4+ Years" },
    { label: "Degree", value: "B.E Mechanical Engineer" },
  ],
  techStack: [
  "Python",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "FastAPI",
  "React",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS"
],};
// ─────────────────────────────────────────────────────

const About = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
      gsap.fromTo(rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
      gsap.to(glowRef.current, {
        scale: 1.3,
        opacity: 0.6,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section section" id="about" ref={sectionRef}>
      <div className="about-glow" ref={glowRef} />

      <div className="container">
        <div className="about-grid">
          {/* Left — Visual */}
          <div className="about-visual" ref={leftRef}>
            <div className="avatar-wrapper">
              <div className="avatar-frame">
                <div className="avatar-inner">
                 <img src={guhanImg} alt="Guhan" />
                  {/* <div className="avatar-placeholder">
                    <span className="avatar-initials">AM</span>
                    <div className="avatar-rings">
                      <div className="ring ring-1" />
                      <div className="ring ring-2" />
                      <div className="ring ring-3" />
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Floating badge */}
              <div className="float-badge">
                <span className="badge-dot" />
                <span>Available for hire</span>
              </div>

              {/* Code snippet decoration */}
              {/* <div className="code-snippet">
                <span className="code-keyword">const</span>{' '}
                <span className="code-var">dev</span>{' = {'}
                <br />
                {'  '}
                <span className="code-key">passion</span>: <span className="code-str">"code"</span>
                <br />
                {'}'}
              </div> */}
            </div>
          </div>

          {/* Right — Content */}
          <div className="about-content" ref={rightRef}>
            <p className="section-tag">// who am i</p>
            <h2 className="section-title">
              About <span className="gradient-text">Me</span>
            </h2>

            <div className="about-bio">
              {ABOUT_DATA.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Info Grid */}
            <div className="about-info">
              {ABOUT_DATA.info.map(item => (
                <div key={item.label} className="info-item">
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Tech Pills */}
            <div className="tech-pills">
              {ABOUT_DATA.techStack.map(tech => (
                <span key={tech} className="tech-pill">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
