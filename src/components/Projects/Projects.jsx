import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

// ── EDIT YOUR PROJECTS HERE ──────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "CloudKart E-Commerce",
    description: "Full-stack e-commerce platform with real-time inventory management, Stripe payments, and a React-powered admin dashboard.",
    tags: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    image: null, // Replace with image path: "/images/project1.png"
    color: "#00f5ff",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    year: "2024",
  },
  {
    id: 2,
    title: "DevCollab — Real-time IDE",
    description: "Browser-based collaborative code editor supporting 20+ languages, live cursors, video calls, and AI-assisted code completion.",
    tags: ["Next.js", "WebSockets", "Monaco Editor", "WebRTC", "AWS"],
    image: null,
    color: "#7c3aed",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    year: "2024",
  },
  {
    id: 3,
    title: "PulseAnalytics Dashboard",
    description: "SaaS analytics platform with custom charting engine, multi-tenant architecture, and automated reporting pipeline.",
    tags: ["React", "Python", "TimescaleDB", "Grafana", "Docker"],
    image: null,
    color: "#f72585",
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
    year: "2023",
  },
  {
    id: 4,
    title: "NexChat Messaging App",
    description: "End-to-end encrypted messaging app with push notifications, media sharing, and offline-first architecture.",
    tags: ["React Native", "Node.js", "Socket.io", "MongoDB"],
    image: null,
    color: "#39ff14",
    github: "https://github.com",
    live: null,
    featured: false,
    year: "2023",
  },
  {
    id: 5,
    title: "AutoDeploy CLI Tool",
    description: "CLI utility that automates Kubernetes deployments, manages secrets, and provides rollback capabilities with a single command.",
    tags: ["Go", "Kubernetes", "Helm", "Terraform"],
    image: null,
    color: "#00f5ff",
    github: "https://github.com",
    live: null,
    featured: false,
    year: "2022",
  },
  {
    id: 6,
    title: "AI Content Generator",
    description: "GPT-4 powered content generation platform with custom fine-tuning, SEO analysis, and team collaboration features.",
    tags: ["Next.js", "OpenAI", "Prisma", "tRPC", "Vercel"],
    image: null,
    color: "#7c3aed",
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
    year: "2024",
  },
];
// ─────────────────────────────────────────────────────

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        delay: (index % 3) * 0.12,
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true }
      }
    );
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -8, duration: 0.3, ease: 'power2.out' });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: 'power2.out' });
  };

  return (
    <div
      className={`project-card ${project.featured ? 'featured' : ''}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ '--project-color': project.color }}
    >
      {/* Image / Placeholder */}
      <div className="project-visual">
        {project.image ? (
          <img src={project.image} alt={project.title} className="project-img" />
        ) : (
          <div className="project-visual-placeholder">
            <div className="visual-grid">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="visual-dot" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <span className="visual-num">{String(project.id).padStart(2, '0')}</span>
          </div>
        )}
        {project.featured && <span className="featured-badge">Featured</span>}
        <span className="year-badge">{project.year}</span>
      </div>

      {/* Content */}
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        <div className="project-links">
          <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
            <span>GitHub</span>
            <span className="link-arrow">↗</span>
          </a>
          {project.live && (
            <a href={project.live} className="project-link live" target="_blank" rel="noreferrer">
              <span>Live Demo</span>
              <span className="link-arrow">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'featured'
    ? PROJECTS.filter(p => p.featured)
    : PROJECTS;

  return (
    <section className="projects-section section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <p className="section-tag">// what i've built</p>
          <h2 className="section-title">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of projects that showcase my full-stack capabilities and attention to craft.
          </p>
        </div>

        <div className="projects-filter">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects ({PROJECTS.length})
          </button>
          <button
            className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
            onClick={() => setFilter('featured')}
          >
            Featured ({PROJECTS.filter(p => p.featured).length})
          </button>
        </div>

        <div className="projects-grid">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
