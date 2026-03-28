import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';
import gimg from './letter-g.png'

gsap.registerPlugin(ScrollTrigger);

// ── EDIT YOUR CONTACT INFO HERE ──────────────────────
const CONTACT_INFO = [
  {
    icon: "✉",
    label: "Email",
    value: "guhanneelakandan1898@gmail.com",
    href: "mailto:guhanneelakandan1898@gmail.com",
    color: "cyan",
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/guhan-neelakandan",
    href: "https://www.linkedin.com/in/guhan-neelakandan-596b84239",
    color: "purple",
  },
  {
    icon: 'GH',
    label: "GitHub",
    value: "github.com/GuhanNeelakandan",
    href: "https://github.com/GuhanNeelakandan",
    color: "pink",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Chennai, TamilNadu",
    href: null,
    color: "green",
  },
];
// ─────────────────────────────────────────────────────

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const glowRef = useRef(null);

  const [formState, setFormState] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(infoRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
      gsap.to(glowRef.current, {
        scale: 1.4,
        opacity: 0.5,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // ── Replace this with your actual form submission logic ──
    // e.g., fetch('/api/contact', { method: 'POST', body: JSON.stringify(formState) })
    await new Promise(r => setTimeout(r, 1500)); // Simulated delay
    setStatus('sent');
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section className="contact-section section" id="contact" ref={sectionRef}>
      <div className="contact-glow" ref={glowRef} />

      <div className="container">
        <div className="section-header">
          <p className="section-tag">// get in touch</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left — Info */}
          <div className="contact-info" ref={infoRef}>
            <p className="contact-intro">
              I'm currently available for freelance projects, full-time roles, and exciting collaborations.
              Whether you have a clear brief or just an idea — let's talk.
            </p>

            <div className="contact-cards">
              {CONTACT_INFO.map(item => (
                <div key={item.label} className={`contact-card cc-${item.color}`}>
                  <span className={`cc-icon color-${item.color}`}>{item.icon}</span>
                  <div className="cc-body">
                    <span className="cc-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className={`cc-value color-${item.color}`} target="_blank" rel="noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <span className="cc-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability Banner */}
            <div className="availability-banner">
              <div className="avail-dot" />
              <div>
                <p className="avail-title">Open to opportunities</p>
                <p className="avail-sub">Typically responds within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Project proposal / Job opportunity / Say hello"
                value={formState.subject}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell me about your project, timeline, and budget..."
                value={formState.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className={`submit-btn ${status}`}
              disabled={status === 'sending' || status === 'sent'}
            >
              {status === 'idle' && <><span>Send Message</span><span className="btn-arrow">→</span></>}
              {status === 'sending' && <><span className="spinner" /><span>Sending…</span></>}
              {status === 'sent' && <><span>✓</span><span>Message Sent!</span></>}
              {status === 'error' && <span>Something went wrong. Try again.</span>}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <img src={gimg} width={40} height={40} className="nav-logo" onClick={(e) => handleLinkClick(e, '#home')}/>
          <p className="footer-copy">
            Designed & built by <span className="gradient-text">Guhan</span> — {new Date().getFullYear()}
          </p>
          <p className="footer-stack">React · Three.js · GSAP</p>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
