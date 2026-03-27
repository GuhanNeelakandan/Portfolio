import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/global.css';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Achievement from './components/Achievement/Achievement';
import Contact from './components/Contact/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    const moveCursor = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
    };

    const addHover = () => ring.classList.add('hover');
    const removeHover = () => ring.classList.remove('hover');

    window.addEventListener('mousemove', moveCursor);

    const hoverEls = document.querySelectorAll('a, button, [data-hover]');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div className="cursor">
        <div className="cursor-dot" ref={cursorDotRef} />
      </div>
      <div className="cursor">
        <div className="cursor-ring" ref={cursorRingRef} />
      </div>

      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Achievement />
        <Contact />
      </main>
    </>
  );
}

export default App;
