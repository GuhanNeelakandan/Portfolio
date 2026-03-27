import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Achievement.css';

gsap.registerPlugin(ScrollTrigger);

// ── EDIT YOUR ACHIEVEMENTS HERE ──────────────────────
const ACHIEVEMENTS = [
  {
    icon: "🎓",
    title: "Studytez Platform Development",
    org: "Studytez",
    link:"https://studytez.com",
    year: "2025",
    type: "Full Stack Project",
    color: "cyan",
    description: "Developed a full-stack student platform with admin dashboard using React.js and Node.js. Implemented Google Authentication, course management system, and advanced search with filtering for seamless user experience.",
  },
  {
    icon: "🦷",
    title: "Neosmile Dental Website",
    org: "Neosmile Dental & Implant Centre",
    link:"https://neosmiledentalomr.in",
    year: "2025",
    type: "Client Project",
    color: "purple",
    description: "Built a responsive dental clinic website with modern UI to showcase treatments, testimonials, and doctor profiles. Optimized performance and delivered a fast, user-friendly experience.",
  },
  {
    icon: "🌍",
    title: "Einstro Study Abroad Website",
    org: "Einstro Study Abroad",
     link:"https://einstrostudyabroad.com",
    year: "2025",
    type: "Full Stack Project",
    color: "pink",
    description: "Worked as a Full Stack Developer using the MERN stack to build a study abroad consultancy platform with dynamic country listings, course pages, and inquiry forms, ensuring responsive and cross-browser compatibility.",
  },
  {
    icon: "⚙️",
    title: "Client-Centric Development",
    org: "Freelance / Projects",
    year: "2024-2025",
    type: "Experience",
    color: "green",
    description: "Collaborated directly with clients to gather requirements, iterate on features, and deliver scalable, user-focused web solutions within timelines.",
  }
];

const TIMELINE = [
  { year: "2019", title: "Completed B.E Mech", org: "Anna University" },
  { year: "2022", title: "Full Stack Developer", org: "Devship Private Limited" },
  { year: "2025", title: "AI & ML Engineer", org: "SRM Technologies Private Limited" }
];
// ─────────────────────────────────────────────────────

const Achievement = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
          }
        );
      });

      // Timeline stagger
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      gsap.fromTo(items,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 75%', once: true }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="achievement-section section" id="achievement" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <p className="section-tag">// milestones</p>
          <h2 className="section-title">
            Achievements &amp; <span className="gradient-text">Recognition</span>
          </h2>
          <p className="section-subtitle">
            Awards, certifications, and milestones from my journey as a developer.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="achievements-grid">
          {ACHIEVEMENTS.map((item, i) => (
            <div
              key={i}
              className={`achievement-card ach-${item.color}`}
              ref={el => cardsRef.current[i] = el}
            >
              <div className="ach-top">
                <span className="ach-icon">{item.icon}</span>
                <span className={`ach-type type-${item.color}`}>{item.type}</span>
              </div>
              <h3 className="ach-title">{item.title}</h3>
              <p className="ach-desc">{item.description}</p>
              <div className="ach-meta">
                <span className="ach-org">
                  <a target='_blank' href={item?.link}>{item.org}</a>
                </span>
                <span className="ach-year">{item.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="journey-section">
          <p className="section-tag" style={{ marginBottom: '32px' }}>// career journey</p>
          <div className="timeline" ref={timelineRef}>
            {TIMELINE.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-left">
                  {/* <span className="timeline-year">{item.year}</span> */}
                </div>
                <div className="timeline-dot-wrapper">
                  <div className="timeline-dot" />
                  {i < TIMELINE.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-right">
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-org">{item.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
