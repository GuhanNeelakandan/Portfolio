import React, { useCallback, useEffect, useState } from 'react';
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
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrevious = useCallback(() => {
    setLightboxIndex(current =>
      current === null
        ? null
        : (current - 1 + WORKSHOP_IMAGES.length) % WORKSHOP_IMAGES.length
    );
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex(current =>
      current === null ? null : (current + 1) % WORKSHOP_IMAGES.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrevious, showNext]);

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

          <div className="workshop-mosaic" aria-label="Workshop photo gallery">
            {WORKSHOP_IMAGES.map((image, index) => (
              <button
                key={image}
                type="button"
                className="workshop-mosaic-item"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View workshop photo ${index + 1} of ${WORKSHOP_IMAGES.length}`}
              >
                <img
                  src={image}
                  alt={`Workshop at Jeppiaar Engineering College, photo ${index + 1}`}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="workshop-mosaic-overlay" aria-hidden="true">
                  <span className="workshop-mosaic-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="workshop-mosaic-zoom">View</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="workshop-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged workshop photo"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="workshop-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close enlarged photo"
          >
            ×
          </button>
          <button
            type="button"
            className="workshop-lightbox-nav workshop-lightbox-nav--prev"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <figure className="workshop-lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <img
              src={WORKSHOP_IMAGES[lightboxIndex]}
              alt={`Workshop at Jeppiaar Engineering College, photo ${lightboxIndex + 1}`}
            />
            <figcaption>
              {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
              {String(WORKSHOP_IMAGES.length).padStart(2, '0')}
            </figcaption>
          </figure>
          <button
            type="button"
            className="workshop-lightbox-nav workshop-lightbox-nav--next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default Workshop;
