import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './Appointment.css';

gsap.registerPlugin(ScrollTrigger);

const Appointment = () => {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const heroRef = useRef(null);
  const heroPinRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const stepsRef = useRef(null);
  const counterRefs = useRef([]);

  const [formData, setFormData] = useState({
    patientName: '',
    whatsapp: '',
    age: '',
    message: ''
  });
  const [focused, setFocused] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ============================================================
       LENIS SMOOTH SCROLL — synced with GSAP ScrollTrigger
    ============================================================ */
    let lenis;
    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      /* ============================================================
         CUSTOM DUAL CURSOR (desktop only)
      ============================================================ */
      const cursor = cursorRef.current;
      const dot = cursorDotRef.current;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      if (cursor && dot && !isTouch && !reduceMotion) {
        gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });
        const move = (e) => {
          gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.55, ease: 'power3.out' });
          gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        };
        window.addEventListener('mousemove', move);
      } else if (cursor) {
        cursor.style.display = 'none';
        if (dot) dot.style.display = 'none';
      }

      /* ============================================================
         HERO — pinned scroll-scrubbed storytelling reveal
         blur-to-clear + scale + clip-path, driven by scroll progress
      ============================================================ */
      gsap.set('.apt-hero-title-inner', { filter: 'blur(14px)' });

      const heroTl = gsap.timeline({ delay: 0.15 });
      heroTl
        .fromTo('.apt-hero-mask',
          { clipPath: 'circle(0% at 50% 40%)' },
          { clipPath: 'circle(140% at 50% 40%)', duration: 1.6, ease: 'power4.inOut' }
        )
        .fromTo('.apt-hero-badge',
          { y: 40, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out' }, '-=0.9'
        )
        .to('.apt-hero-title-inner',
          { filter: 'blur(0px)', y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' }, '-=0.7'
        )
        .from('.apt-hero-sub', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
        .from('.apt-hero-chips .apt-chip', {
          y: 24, opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.7, ease: 'back.out(2)'
        }, '-=0.5');

      // Pin hero briefly and scrub a scale/parallax as user scrolls past
      if (heroPinRef.current) {
        gsap.to('.apt-hero-title-inner', {
          scale: 0.92,
          opacity: 0.4,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroPinRef.current,
            start: 'top top',
            end: '+=60%',
            scrub: 1,
          },
        });
      }

      gsap.utils.toArray('.apt-float-el').forEach((el, i) => {
        gsap.to(el, {
          y: 'random(-22, 22)',
          x: 'random(-12, 12)',
          rotation: 'random(-6, 6)',
          duration: 'random(4, 7)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        });
      });

      /* ============================================================
         STATS STRIP — animated counters
      ============================================================ */
      counterRefs.current.forEach((el) => {
        if (!el) return;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = (target % 1 !== 0 ? obj.val.toFixed(1) : Math.ceil(obj.val)) + suffix;
          },
        });
      });
      gsap.from('.apt-stats-strip', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.apt-stats-strip', start: 'top 90%' },
      });

      /* ============================================================
         STEPS — clip-path reveal + 3D-ish stagger + connecting line draw
      ============================================================ */
      gsap.from('.apt-steps-title', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      gsap.utils.toArray('.apt-step-card').forEach((card, i) => {
        gsap.fromTo(card,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', y: 50, opacity: 0 },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.inOut',
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        );

        const num = card.querySelector('.apt-step-num');
        const icon = card.querySelector('.apt-step-icon');
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -10, scale: 1.03, boxShadow: '0 30px 60px -20px rgba(0,150,199,0.28)', duration: 0.45, ease: 'power2.out' });
          gsap.to(num, { scale: 1.15, rotation: 8, duration: 0.45, ease: 'back.out(2)' });
          gsap.to(icon, { y: -6, scale: 1.12, duration: 0.4, ease: 'back.out(2)' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, boxShadow: '0 8px 30px rgba(15,42,67,0.06)', duration: 0.45, ease: 'power2.out' });
          gsap.to(num, { scale: 1, rotation: 0, duration: 0.45 });
          gsap.to(icon, { y: 0, scale: 1, duration: 0.4 });
        });
      });

      gsap.fromTo('.apt-steps-connector',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );

      /* ============================================================
         FORM SECTION
      ============================================================ */
      gsap.fromTo('.apt-form-title',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.from('.apt-form-subtitle', {
        y: 20, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 72%', toggleActions: 'play none none reverse' },
      });

      gsap.fromTo('.apt-form-card',
        { clipPath: 'circle(0% at 0% 0%)', opacity: 0 },
        {
          clipPath: 'circle(150% at 0% 0%)',
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.apt-form-card', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.utils.toArray('.apt-field-group').forEach((field, i) => {
        gsap.fromTo(field,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 0.8,
            ease: 'power2.inOut',
            delay: i * 0.1,
            scrollTrigger: { trigger: '.apt-form-card', start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      });

      gsap.fromTo('.apt-info-card',
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', opacity: 0 },
        {
          clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: infoRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.utils.toArray('.apt-info-list li').forEach((item, i) => {
        gsap.fromTo(item,
          { clipPath: 'inset(0 100% 0 0)', x: -20, opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)',
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: '.apt-info-card', start: 'top 72%', toggleActions: 'play none none reverse' },
          }
        );
      });

      gsap.from('.apt-contact-strip', {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.apt-contact-strip', start: 'top 90%', toggleActions: 'play none none reverse' },
      });

      /* ============================================================
         MAGNETIC BUTTONS + RIPPLE
      ============================================================ */
      gsap.utils.toArray('.apt-mag').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.25,
            duration: 0.35,
            ease: 'power2.out',
          });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
        });
        btn.addEventListener('click', (e) => {
          const ripple = document.createElement('span');
          ripple.className = 'apt-ripple';
          const r = btn.getBoundingClientRect();
          ripple.style.left = `${e.clientX - r.left}px`;
          ripple.style.top = `${e.clientY - r.top}px`;
          btn.appendChild(ripple);
          gsap.to(ripple, {
            scale: 4,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            onComplete: () => ripple.remove(),
          });
        });
      });

      /* ============================================================
         DIVIDER + BOTTOM CTA (pinned parallax reveal)
      ============================================================ */
      gsap.utils.toArray('.apt-divider').forEach((d) => {
        gsap.fromTo(d,
          { clipPath: 'inset(0 50% 0 50%)' },
          {
            clipPath: 'inset(0 0% 0 0%)',
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: d, start: 'top 92%', toggleActions: 'play none none reverse' },
          }
        );
      });

      gsap.fromTo('.apt-bottom-cta h2',
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.apt-bottom-cta', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.from('.apt-bottom-cta p', {
        y: 24, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.apt-bottom-cta', start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      gsap.to('.apt-bottom-glow', {
        scale: 1.3,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.apt-bottom-cta',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      ScrollTrigger.refresh();
    }, pageRef);

    return () => {
      ctx.revert();
      if (lenis) lenis.destroy();
    };
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      gsap.fromTo('.apt-success',
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        { clipPath: 'circle(100% at 50% 50%)', opacity: 1, duration: 0.8, ease: 'power4.out' }
      );
      gsap.from('.apt-success-icon', { scale: 0, rotation: 360, duration: 1, ease: 'back.out(3)', delay: 0.3 });

      setTimeout(() => setSubmitted(false), 5000);
    }, 900);
  };

  const steps = [
    { num: '01', icon: '📋', title: 'Fill the Form', desc: 'Enter your basic details and describe your health concern briefly.' },
    { num: '02', icon: '📞', title: 'We Call You Back', desc: 'Our clinical coordinator contacts you within 30 minutes to confirm.' },
    { num: '03', icon: '🏥', title: 'Specialist Assigned', desc: 'A board-certified specialist is matched to your specific clinical need.' },
    { num: '04', icon: '🏠', title: 'Care at Your Door', desc: 'Receive hospital-grade precision care in the comfort of your home.' },
  ];

  const stats = [
    { count: 30, suffix: '+', label: 'Specialists On-Call' },
    { count: 24, suffix: '/7', label: 'Coordinator Support' },
    { count: 98.6, suffix: '%', label: 'Patient Satisfaction' },
    { count: 30, suffix: ' min', label: 'Avg. Callback Time' },
  ];

  return (
    <div className="apt-page" ref={pageRef}>
      <div className="apt-cursor" ref={cursorRef}></div>
      <div className="apt-cursor-dot" ref={cursorDotRef}></div>

      {/* HERO */}
      <section className="apt-hero" ref={heroRef}>
        <div className="apt-hero-pin" ref={heroPinRef}>
          <div className="apt-hero-bg-pattern"></div>
          <div className="apt-hero-deco-group">
            <div className="apt-hero-deco apt-float-el" style={{ top: '12%', left: '8%' }}></div>
            <div className="apt-hero-deco apt-float-el" style={{ top: '20%', right: '12%' }}></div>
            <div className="apt-hero-deco apt-float-el" style={{ bottom: '25%', left: '15%' }}></div>
            <div className="apt-hero-deco apt-float-el" style={{ bottom: '15%', right: '8%' }}></div>
          </div>

          <div className="apt-hero-mask">
            <div className="apt-hero-content">
              <span className="apt-hero-badge">Book an Appointment</span>
              <h1 className="apt-hero-title">
                <span className="apt-hero-title-inner">
                  Your Health Journey<br />
                  <span className="apt-hero-accent">Starts Here</span>
                </span>
              </h1>
              <p className="apt-hero-sub">
                Schedule a consultation with our specialist team. Experience precision medicine
                delivered directly to your home with UK-standard clinical protocols.
              </p>
              <div className="apt-hero-chips">
                <span className="apt-chip">✓ Board-Certified</span>
                <span className="apt-chip">✓ Home-Based</span>
                <span className="apt-chip">✓ NABH Aligned</span>
              </div>
            </div>
          </div>
          <div className="apt-scroll-cue"><span></span></div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="apt-stats-strip">
        <div className="apt-stats-inner">
          {stats.map((s, i) => (
            <div className="apt-stat-block" key={i}>
              <div className="apt-stat-num" ref={(el) => (counterRefs.current[i] = el)} data-count={s.count} data-suffix={s.suffix}>
                0
              </div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="apt-steps" ref={stepsRef}>
        <div className="apt-steps-inner">
          <h2 className="apt-steps-title">How It <span className="apt-accent">Works</span></h2>
          <div className="apt-steps-grid">
            <div className="apt-steps-connector"></div>
            {steps.map((step) => (
              <div className="apt-step-card" key={step.num}>
                <div className="apt-step-num">{step.num}</div>
                <div className="apt-step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="apt-step-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="apt-divider"></div>

      {/* FORM + INFO */}
      <section className="apt-form-section" ref={formRef}>
        <div className="apt-form-grid">
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
                    type="text" name="patientName" className="apt-input"
                    value={formData.patientName} onChange={handleChange}
                    onFocus={() => setFocused('patientName')} onBlur={() => setFocused('')}
                    required
                  />
                  <div className="apt-input-line"></div>
                </div>

                <div className="apt-field-group">
                  <label className={`apt-label ${focused === 'whatsapp' || formData.whatsapp ? 'apt-label-up' : ''}`}>
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel" name="whatsapp" className="apt-input"
                    value={formData.whatsapp} onChange={handleChange}
                    onFocus={() => setFocused('whatsapp')} onBlur={() => setFocused('')}
                    required
                  />
                  <div className="apt-input-line"></div>
                </div>

                <div className="apt-field-group">
                  <label className={`apt-label ${focused === 'age' || formData.age ? 'apt-label-up' : ''}`}>
                    Age *
                  </label>
                  <input
                    type="number" name="age" className="apt-input"
                    value={formData.age} onChange={handleChange}
                    onFocus={() => setFocused('age')} onBlur={() => setFocused('')}
                    min="1" max="120" required
                  />
                  <div className="apt-input-line"></div>
                </div>

                <div className="apt-field-group">
                  <label className={`apt-label apt-label-textarea ${focused === 'message' || formData.message ? 'apt-label-up' : ''}`}>
                    Message / Health Concern
                  </label>
                  <textarea
                    name="message" className="apt-input apt-textarea"
                    value={formData.message} onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                    rows="4"
                  ></textarea>
                  <div className="apt-input-line"></div>
                </div>

                <button type="submit" className="apt-mag apt-submit-btn" disabled={loading}>
                  {loading ? (
                    <span className="apt-btn-loader"><span></span><span></span><span></span></span>
                  ) : (
                    <>
                      <span className="btn-text-mask">Book Appointment</span>
                      <span className="apt-btn-arrow">→</span>
                    </>
                  )}
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

          <div className="apt-info-col" ref={infoRef}>
            <div className="apt-info-card">
              <div className="apt-info-header"><h3>Why Book With Us?</h3></div>
              <ul className="apt-info-list">
                <li>
                  <span className="apt-info-ico">🏥</span>
                  <div><strong>100% Specialist-Led</strong><p>Every consultation handled by board-certified specialists only.</p></div>
                </li>
                <li>
                  <span className="apt-info-ico">⚡</span>
                  <div><strong>30-Min Response</strong><p>Our coordinator calls you back within 30 minutes of submission.</p></div>
                </li>
                <li>
                  <span className="apt-info-ico">🏠</span>
                  <div><strong>Home-Based Care</strong><p>Hospital-grade clinical care delivered at your doorstep.</p></div>
                </li>
                <li>
                  <span className="apt-info-ico">🌐</span>
                  <div><strong>UK Standards</strong><p>Clinical protocols aligned with NICE guidelines and NABH benchmarks.</p></div>
                </li>
                <li>
                  <span className="apt-info-ico">🔒</span>
                  <div><strong>100% Confidential</strong><p>Your medical data is encrypted and handled with strict privacy protocols.</p></div>
                </li>
              </ul>
            </div>

            <div className="apt-contact-strip">
              <span>📞</span>
              <div><strong>Need Immediate Help?</strong><p>Call us: +91 98765 43210</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="apt-bottom-cta">
        <div className="apt-bottom-glow"></div>
        <div className="apt-bottom-inner">
          <h2>Experience <span className="apt-accent">Precision Care</span> at Home</h2>
          <p>Aureal Cares — Redefining healthcare delivery across Puducherry, Tamil Nadu & Kerala</p>
        </div>
      </section>
    </div>
  );
};

export default Appointment;