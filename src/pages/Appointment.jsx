import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Appointment.css';

gsap.registerPlugin(ScrollTrigger);

const Appointment = () => {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const stepsRef = useRef(null);

  const [formData, setFormData] = useState({
    patientName: '',
    whatsapp: '',
    age: '',
    message: ''
  });
  const [focused, setFocused] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ===== DUAL CURSOR =====
      const cursor = cursorRef.current;
      const dot = cursorDotRef.current;
      if (cursor && dot) {
        gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });
        const move = (e) => {
          gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out' });
          gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.12 });
        };
        window.addEventListener('mousemove', move);
      }

      // ===== HERO ENTRANCE =====
      const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      heroTl
        .from('.apt-hero-badge', { y: 50, opacity: 0, scale: 0.8, duration: 1.2 }, 0.2)
        .from('.apt-hero-line', {
          yPercent: 110,
          stagger: 0.12,
          duration: 1.5,
          ease: 'power4.out'
        }, 0.3)
        .from('.apt-hero-sub', { y: 40, opacity: 0, duration: 1.2 }, 0.9)
        .from('.apt-hero-deco', { scale: 0, opacity: 0, stagger: 0.1, duration: 1, ease: 'back.out(2)' }, 0.6);

      // Floating decorative elements
      gsap.utils.toArray('.apt-float-el').forEach((el, i) => {
        gsap.to(el, {
          y: `random(-20, 20)`,
          x: `random(-10, 10)`,
          rotation: `random(-5, 5)`,
          duration: `random(4, 7)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.6
        });
      });

      // ===== STEPS SECTION =====
      gsap.from('.apt-step-card', {
        y: 100,
        opacity: 0,
        rotateX: 15,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
        transformPerspective: 1000,
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.apt-steps-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Step hover effects
      gsap.utils.toArray('.apt-step-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            scale: 1.03,
            boxShadow: '0 25px 60px rgba(0,172,193,0.15)',
            duration: 0.4,
            ease: 'power2.out'
          });
          gsap.to(card.querySelector('.apt-step-num'), {
            scale: 1.15,
            rotation: 8,
            duration: 0.4,
            ease: 'back.out(2)'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            duration: 0.4,
            ease: 'power2.out'
          });
          gsap.to(card.querySelector('.apt-step-num'), {
            scale: 1,
            rotation: 0,
            duration: 0.4
          });
        });
      });

      // ===== FORM SECTION =====
      gsap.from('.apt-form-title', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.apt-form-card', {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.3,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.apt-form-card',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.apt-field-group', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.apt-form-card',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.apt-info-card', {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // ===== MAGNETIC BUTTONS =====
      gsap.utils.toArray('.apt-mag').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.25,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
        });
      });

      // ===== DIVIDERS =====
      gsap.utils.toArray('.apt-divider').forEach((d) => {
        gsap.from(d, {
          scaleX: 0,
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: d, start: 'top 92%', toggleActions: 'play none none reverse' }
        });
      });

    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    gsap.from('.apt-success', {
      scale: 0.5,
      opacity: 0,
      rotation: -10,
      duration: 0.8,
      ease: 'back.out(2)'
    });
    gsap.from('.apt-success-icon', {
      scale: 0,
      rotation: 360,
      duration: 1,
      ease: 'back.out(3)',
      delay: 0.3
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const steps = [
    { num: '01', icon: '📋', title: 'Fill the Form', desc: 'Enter your basic details and describe your health concern briefly.' },
    { num: '02', icon: '📞', title: 'We Call You Back', desc: 'Our clinical coordinator contacts you within 30 minutes to confirm.' },
    { num: '03', icon: '🏥', title: 'Specialist Assigned', desc: 'A board-certified specialist is matched to your specific clinical need.' },
    { num: '04', icon: '🏠', title: 'Care at Your Door', desc: 'Receive hospital-grade precision care in the comfort of your home.' }
  ];

  return (
    <div className="apt-page" ref={pageRef}>
      <div className="apt-cursor" ref={cursorRef}></div>
      <div className="apt-cursor-dot" ref={cursorDotRef}></div>

      {/* HERO */}
      <section className="apt-hero" ref={heroRef}>
        <div className="apt-hero-bg-pattern"></div>
        <div className="apt-hero-deco-group">
          <div className="apt-hero-deco apt-float-el" style={{ top: '12%', left: '8%' }}></div>
          <div className="apt-hero-deco apt-float-el" style={{ top: '20%', right: '12%' }}></div>
          <div className="apt-hero-deco apt-float-el" style={{ bottom: '25%', left: '15%' }}></div>
          <div className="apt-hero-deco apt-float-el" style={{ bottom: '15%', right: '8%' }}></div>
        </div>
        <div className="apt-hero-content">
          <span className="apt-hero-badge">Book an Appointment</span>
          <h1 className="apt-hero-title">
            <span className="apt-hero-line-wrap"><span className="apt-hero-line">Your Health Journey</span></span>
            <span className="apt-hero-line-wrap"><span className="apt-hero-line apt-hero-accent">Starts Here</span></span>
          </h1>
          <p className="apt-hero-sub">
            Schedule a consultation with our specialist team. Experience precision medicine
            delivered directly to your home with UK-standard clinical protocols.
          </p>
        </div>
      </section>

      {/* STEPS */}
     

      <div className="apt-divider"></div>

      {/* FORM + INFO */}
      <section className="apt-form-section" ref={formRef}>
        <div className="apt-form-grid">
          {/* FORM */}
          <div className="apt-form-col">
            <h2 className="apt-form-title">Book Your <span className="apt-accent">Consultation</span></h2>
            <p className="apt-form-subtitle">Fill in your details below and our team will reach out within 30 minutes.</p>

            {!submitted ? (
              <form className="apt-form-card" onSubmit={handleSubmit}>
                <div className="apt-field-group">
                  <label className={`apt-label ${focused === 'patientName' || formData.patientName ? 'apt-label-up' : ''}`}>
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    className="apt-input"
                    value={formData.patientName}
                    onChange={handleChange}
                    onFocus={() => setFocused('patientName')}
                    onBlur={() => setFocused('')}
                    required
                  />
                  <div className="apt-input-line"></div>
                </div>

                <div className="apt-field-group">
                  <label className={`apt-label ${focused === 'whatsapp' || formData.whatsapp ? 'apt-label-up' : ''}`}>
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    className="apt-input"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    onFocus={() => setFocused('whatsapp')}
                    onBlur={() => setFocused('')}
                    required
                  />
                  <div className="apt-input-line"></div>
                </div>

                <div className="apt-field-group">
                  <label className={`apt-label ${focused === 'age' || formData.age ? 'apt-label-up' : ''}`}>
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    className="apt-input"
                    value={formData.age}
                    onChange={handleChange}
                    onFocus={() => setFocused('age')}
                    onBlur={() => setFocused('')}
                    min="1"
                    max="120"
                    required
                  />
                  <div className="apt-input-line"></div>
                </div>

                <div className="apt-field-group">
                  <label className={`apt-label apt-label-textarea ${focused === 'message' || formData.message ? 'apt-label-up' : ''}`}>
                    Message / Health Concern
                  </label>
                  <textarea
                    name="message"
                    className="apt-input apt-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    rows="4"
                  ></textarea>
                  <div className="apt-input-line"></div>
                </div>

                <button type="submit" className="apt-mag apt-submit-btn">
                  <span>Book Appointment</span>
                  <span className="apt-btn-arrow">→</span>
                </button>
              </form>
            ) : (
              <div className="apt-success">
                <div className="apt-success-icon">✓</div>
                <h3>Appointment Requested!</h3>
                <p>Our clinical coordinator will contact you on WhatsApp within 30 minutes.</p>
              </div>
            )}
          </div>

          {/* INFO SIDE */}
          <div className="apt-info-col" ref={infoRef}>
            <div className="apt-info-card">
              <div className="apt-info-header">
                <h3>Why Book With Us?</h3>
              </div>
              <ul className="apt-info-list">
                <li>
                  <span className="apt-info-ico">🏥</span>
                  <div>
                    <strong>100% Specialist-Led</strong>
                    <p>Every consultation handled by board-certified specialists only.</p>
                  </div>
                </li>
                <li>
                  <span className="apt-info-ico">⚡</span>
                  <div>
                    <strong>30-Min Response</strong>
                    <p>Our coordinator calls you back within 30 minutes of submission.</p>
                  </div>
                </li>
                <li>
                  <span className="apt-info-ico">🏠</span>
                  <div>
                    <strong>Home-Based Care</strong>
                    <p>Hospital-grade clinical care delivered at your doorstep.</p>
                  </div>
                </li>
                <li>
                  <span className="apt-info-ico">🌐</span>
                  <div>
                    <strong>UK Standards</strong>
                    <p>Clinical protocols aligned with NICE guidelines and NABH benchmarks.</p>
                  </div>
                </li>
                <li>
                  <span className="apt-info-ico">🔒</span>
                  <div>
                    <strong>100% Confidential</strong>
                    <p>Your medical data is encrypted and handled with strict privacy protocols.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="apt-contact-strip">
              <span>📞</span>
              <div>
                <strong>Need Immediate Help?</strong>
                <p>Call us: +91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="apt-bottom-cta">
        <div className="apt-bottom-inner">
          <h2>Experience <span className="apt-accent">Precision Care</span> at Home</h2>
          <p>Aureal Cares — Redefining healthcare delivery across Puducherry, Tamil Nadu & Kerala</p>
        </div>
      </section>
    </div>
  );
};

export default Appointment;