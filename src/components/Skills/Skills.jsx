import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

// ── EDIT YOUR SKILLS HERE ────────────────────────────
const SKILLS_DATA = [
  {
    category: "Frontend",
    icon: "◈",
    color: "cyan",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "CSS / Tailwind", level: 88 },
      { name: "Three.js / WebGL", level: 72 },
    ],
  },
  {
    category: "Backend",
    icon: "◆",
    color: "purple",
    skills: [
      { name: "Node.js / Express", level: 92 },
      { name: "Python / FastAPI", level: 80 },
      { name: "GraphQL", level: 78 },
      { name: "REST APIs", level: 95 },
    ],
  },
  {
    category: "Database",
    icon: "◉",
    color: "pink",
    skills: [
      { name: "MongoDB", level: 84 },
      { name: "MySQL", level: 88 },
      // { name: "Redis", level: 76 },
      // { name: "Prisma ORM", level: 82 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "⬡",
    color: "green",
    skills: [
      { name: "Docker / K8s", level: 80 },
      { name: "AWS / GCP", level: 78 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "Linux / Bash", level: 82 },
    ],
  },
];

const TOOLS = [
  "VS Code", "Git", "Figma", "Postman", "Jest", "Webpack",
  "Vite", "Vercel", "Netlify", "GitHub Actions", "Jira", "Notion"
];
// ─────────────────────────────────────────────────────

const SkillBar = ({ name, level, color, index }) => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: 'power2.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
          once: true,
        }
      }
    );
  }, [level, index]);

  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className={`skill-percent color-${color}`}>{level}%</span>
      </div>
      <div className="skill-track">
        <div className={`skill-bar color-${color}`} ref={barRef} />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const toolsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
          }
        );
      });

      gsap.fromTo(toolsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: toolsRef.current, start: 'top 85%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="skills-section section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <p className="section-tag">// what i know</p>
          <h2 className="section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive stack covering frontend finesse to backend muscle.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS_DATA.map((group, i) => (
            <div
              key={group.category}
              className={`skill-card card-${group.color}`}
              ref={el => cardsRef.current[i] = el}
            >
              <div className="skill-card-header">
                <span className={`card-icon color-${group.color}`}>{group.icon}</span>
                <h3 className="card-category">{group.category}</h3>
              </div>
              <div className="skill-list">
                {group.skills.map((skill, j) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={group.color}
                    index={j}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="tools-section" ref={toolsRef}>
          <p className="tools-label">// tools & workflow</p>
          <div className="tools-grid">
            {TOOLS.map(tool => (
              <div key={tool} className="tool-chip">{tool}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
