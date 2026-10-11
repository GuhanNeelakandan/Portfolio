import React, { useEffect, useState } from 'react';
import './Workshop.css';

const WORKSHOP_IMAGES = [
  '/workshop/DSC_0106.JPG',
  '/workshop/DSC_0126.JPG',
  '/workshop/DSC_0187.JPG',
  '/workshop/DSC_0189.JPG',
  '/workshop/DSC_0191.JPG',
  '/workshop/DSC_0192.JPG',
];

const Workshop = () => {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage(current => (current + 1) % WORKSHOP_IMAGES.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const showPrevious = () => {
    setActiveImage(current => (current - 1 + WORKSHOP_IMAGES.length) % WORKSHOP_IMAGES.length);
  };

  const showNext = () => {
    setActiveImage(current => (current + 1) % WORKSHOP_IMAGES.length);
  };

  return (
    <section className="workshop-section section" id="workshop">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">// sharing what I know</p>
          <h2 className="section-title">
            Workshop <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            A day of learning, building, and sharing ideas with aspiring technologists.
          </p>
        </div>

        <div className="workshop-content">
          <div className="workshop-gallery" aria-roledescription="carousel" aria-label="Workshop photos">
            <div className="workshop-image-frame">
              {WORKSHOP_IMAGES.map((image, index) => (
                <img
                  key={image}
                  className={`workshop-image ${index === activeImage ? 'active' : ''}`}
                  src={image}
                  alt={`Workshop at Jeppiaar Engineering College, photo ${index + 1}`}
                  aria-hidden={index !== activeImage}
                />
              ))}
              <span className="workshop-photo-count">
                {String(activeImage + 1).padStart(2, '0')} / {String(WORKSHOP_IMAGES.length).padStart(2, '0')}
              </span>
              <button
                className="workshop-arrow workshop-arrow-previous"
                type="button"
                onClick={showPrevious}
                aria-label="Previous workshop photo"
              >
                ‹
              </button>
              <button
                className="workshop-arrow workshop-arrow-next"
                type="button"
                onClick={showNext}
                aria-label="Next workshop photo"
              >
                ›
              </button>
            </div>
            <div className="workshop-dots" aria-label="Choose workshop photo">
              {WORKSHOP_IMAGES.map((image, index) => (
                <button
                  key={image}
                  className={`workshop-dot ${index === activeImage ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show workshop photo ${index + 1}`}
                  aria-current={index === activeImage ? 'true' : undefined}
                />
              ))}
            </div>
          </div>

          <div className="workshop-details">
            <span className="workshop-label">One-day workshop</span>
            <h3>Jeppiaar Engineering College</h3>
            <p className="workshop-location">Chennai, Tamil Nadu</p>
            <p>
              I had the opportunity to conduct a one-day workshop at Jeppiaar Engineering
              College, Chennai. The session brought students together for a practical,
              hands-on learning experience, with time to explore concepts, ask questions,
              and build confidence through collaborative learning.
            </p>
            <p>
              It was a rewarding experience to share my knowledge and connect with
              enthusiastic students interested in technology.
            </p>
            <div className="workshop-highlights">
              <span>Knowledge sharing</span>
              <span>Hands-on learning</span>
              <span>Student engagement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshop;
