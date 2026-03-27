import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievement', href: '#achievement' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    // Animate nav in
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
    gsap.fromTo(
      linksRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out', delay: 0.8 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="nav-container">
        {/* Logo */}
        <a href="#home" className="nav-logo" onClick={(e) => handleLinkClick(e, '#home')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">GuhanDev</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                ref={el => linksRef.current[i] = el}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {/* <span className="link-num">0{i + 1}.</span> */}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className="nav-cta" onClick={(e) => handleLinkClick(e, '#contact')}>
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? 'active' : ''}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                <span>0{i + 1}.</span> {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
