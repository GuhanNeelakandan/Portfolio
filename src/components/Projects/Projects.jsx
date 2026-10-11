import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

// ── EDIT YOUR PROJECTS HERE ──────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'Studytez',
    description: 'International education consultancy website focused on study-abroad admissions, visa guidance, and lead capture for students planning to study in the UK, Canada, USA, and Europe.',
    tags: ['React', 'HTML', 'CSS', 'Bootstrap', 'MongoDB', 'Express', 'Node.js'],
    image: '/images/studytez.png',
    color: '#00f5ff',
    github: null,
    live: 'https://studytez.com/',
    featured: true,
    year: '2025',
  },
  {
    id: 2,
    title: 'Studytez Admin Panel',
    description: 'MERN admin portal for managing student enquiries, applications, document tracking, follow-ups, and counsellor workflow from a central backend dashboard.',
    tags: ['React', 'HTML', 'CSS', 'Bootstrap', 'MongoDB', 'Express', 'Node.js'],
    image: '/images/adminstudytez.png',
    color: '#7c3aed',
    github: null,
    live: 'https://admin.studytez.com/',
    featured: true,
    year: '2025',
  },
  {
    id: 3,
    title: 'MMDJ Food Supplies',
    description: 'Customer-facing grocery delivery app for fresh produce, household essentials, and order placement with a smooth online shopping experience.',
    tags: ['React', 'HTML', 'CSS', 'Bootstrap', 'MongoDB', 'Express', 'Node.js'],
    image: '/images/mmdj.png',
    color: '#f72585',
    github: null,
    live: 'https://mmdjapp.svstraders.com/',
    featured: true,
    year: '2026',
  },
  {
    id: 4,
    title: 'SVS Family Shopper',
    description: 'Modern grocery ordering platform for daily essentials, fresh vegetables, fruits, and home delivery with a clean storefront and checkout flow.',
    tags: ['React', 'MongoDB', 'UI/UX', 'Storefront', 'Orders'],
    image: '/images/svs.png',
    color: '#39ff14',
    github: null,
    live: 'https://www.svsapp.svstraders.com/',
    featured: false,
    year: '2026',
  },
  {
    id: 5,
    title: 'Krishna Traders',
    description: 'Wholesale and retail grocery portal built for product catalog browsing, customer ordering, and business-focused online selling operations.',
    tags: ['React', 'Node.js', 'MongoDB', 'B2B', 'Inventory'],
    image: '/images/krishna.png',
    color: '#00f5ff',
    github: null,
    live: 'https://krishnatraders-app.svstraders.com/',
    featured: false,
    year: '2026',
  },
  {
    id: 6,
    title: 'SKS Fresh Kartz',
    description: 'Fresh produce commerce app with category-based product listings, seasonal inventory, and convenient online ordering for local grocery demand.',
    tags: ['React', 'E-commerce', 'MongoDB', 'Cart', 'Delivery'],
    image: '/images/sks.png',
    color: '#7c3aed',
    github: null,
    live: 'https://sksfreshkartzapp.svstraders.com/',
    featured: false,
    year: '2026',
  },
  {
    id: 7,
    title: 'Labham General Stores',
    description: 'Indian and South Asian grocery marketplace designed for UK customers with product discovery, category browsing, and order delivery flows.',
    tags: ['React', 'MongoDB', 'Store App', 'Groceries', 'UK Market'],
    image: '/images/labham.png',
    color: '#f72585',
    github: null,
    live: 'https://www.labhamgeneralstores.org/',
    featured: false,
    year: '2026',
  },
  {
    id: 8,
    title: 'NeoSmile Dental',
    description: 'Healthcare and dental clinic website with service information, contact form, and lead-generation workflow for appointments and patient enquiries.',
    tags: ['React', 'Healthcare', 'Forms', 'Website', 'SEO'],
    image: '/images/neosmildental.png',
    color: '#39ff14',
    github: null,
    live: 'https://neosmiledentalomr.in/',
    featured: false,
    year: '2023',
  },
  {
    id: 9,
    title: 'Kathir Limited',
    description: 'Corporate business website for a company profile, service presentation, and trust-building brand presence for clients and partners.',
    tags: ['React', 'Business Website', 'Corporate', 'Branding', 'SEO'],
    image: '/images/kathirlimited.png',
    color: '#00f5ff',
    github: null,
    live: 'https://kathirlimited.com/',
    featured: false,
    year: '2026',
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
          {project.github && (
            <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <span className="link-arrow">↗</span>
            </a>
          )}
          {project.live && (
            <a href={project.live} className={`project-link ${project.github ? 'live' : ''}`} target="_blank" rel="noreferrer">
              <span>Live</span>
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
