import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const whyRef = useRef(null);
  const benefitsRef = useRef(null);
  const scaleRef = useRef(null);
  const targetRef = useRef(null);
  const whyCardsRef = useRef([]);
  const statRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hero Animation
      gsap.from(".hero-tag", { y: 80, opacity: 0, duration: 1.4, ease: "power4.out" });
      gsap.from(".hero-title span", {
        y: 120,
        opacity: 0,
        stagger: 0.12,
        duration: 1.6,
        ease: "power4.out",
        delay: 0.3
      });
      gsap.from(".hero-subtitle", { opacity: 0, y: 50, duration: 1.4, delay: 0.9, ease: "power3.out" });
      gsap.from(".hero-cta button", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        delay: 1.2,
        ease: "back.out(1.4)"
      });

      // Parallax Background
      gsap.to(".hero-bg img", {
        scale: 1.12,
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.8
        }
      });

      // About Section
      gsap.from(".about-content p", {
        scrollTrigger: { trigger: aboutRef.current, start: "top 70%" },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.1,
        ease: "power3.out"
      });

      gsap.from(".about-image", {
        scrollTrigger: { trigger: aboutRef.current, start: "top 65%" },
        scale: 0.85,
        opacity: 0,
        duration: 1.8,
        ease: "power4.out"
      });

      // Vision & Mission
      gsap.from(".vision-card", {
        scrollTrigger: { trigger: visionRef.current, start: "top 75%" },
        x: -80,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out"
      });

      gsap.from(".mission-card", {
        scrollTrigger: { trigger: missionRef.current, start: "top 75%" },
        x: 80,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out"
      });

      // Why Choose Us - Advanced GSAP
      gsap.from(".why-header h2", {
        scrollTrigger: { trigger: whyRef.current, start: "top 70%" },
        y: 90,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      whyCardsRef.current.forEach((card, i) => {
        if (!card) return;
        const icon = card.querySelector('.why-icon');
        const bar = card.querySelector('.progress-bar');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse"
          }
        });

        tl.from(card, {
          y: 140,
          opacity: 0,
          rotationX: 25,
          scale: 0.92,
          duration: 1.1,
          delay: i * 0.08,
          ease: "back.out(1.6)"
        })
        .from(icon, { scale: 0, rotation: -120, duration: 0.8, ease: "back.out(2.5)" }, "-=0.7")
        .from(bar, { scaleX: 0, duration: 1.2, ease: "power3.out" }, "-=0.5");

        // Professional Hover
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -22, scale: 1.04, boxShadow: "0 40px 70px -20px rgba(20,184,166,0.25)", duration: 0.6, ease: "power3.out" });
          gsap.to(icon, { scale: 1.25, rotation: 15, duration: 0.6, ease: "back.out(2)" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, boxShadow: "0 20px 35px -15px rgba(10,37,64,0.12)", duration: 0.6, ease: "power3.out" });
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.6, ease: "power2.out" });
        });
      });

      // Benefits Animation
      gsap.from(".benefit-card", {
        scrollTrigger: { trigger: benefitsRef.current, start: "top 70%" },
        y: 100,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out"
      });

      // Stats Counter
      statRefs.current.forEach((stat) => {
        if (!stat) return;
        const target = parseInt(stat.getAttribute("data-target"));
        gsap.to(stat, {
          scrollTrigger: { trigger: stat, start: "top 80%" },
          innerHTML: target,
          duration: 2.4,
          ease: "power1.inOut",
          onUpdate: function () {
            stat.innerHTML = Math.ceil(this.targets()[0].innerHTML);
          }
        });
      });

      // Target Cards
      gsap.from(".target-card", {
        scrollTrigger: { trigger: targetRef.current, start: "top 75%" },
        y: 90,
        opacity: 0,
        stagger: 0.15,
        duration: 1.1,
        ease: "power3.out"
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const whyData = [
    {
      icon: "⚡",
      title: "Operational & Financial Efficiency",
      desc: "We eliminate operational bottlenecks, reduce overhead costs, and maximize asset utilization while delivering superior clinical outcomes."
    },
    {
      icon: "🔄",
      title: "End-to-End Extended Coverage",
      desc: "Seamless transition from hospital to home care ensures zero gaps in treatment continuity and clinical supervision."
    },
    {
      icon: "📈",
      title: "Data-Driven Clinical Pathways",
      desc: "Integrated HIMS platforms reduce clinical errors, minimize administrative burden on physicians, and enhance patient throughput."
    },
    {
      icon: "🏆",
      title: "Uncompromised Quality",
      desc: "World-class medical treatments powered by seamless, technology-enabled clinical logic aligned with global best practices."
    },
    {
      icon: "🛡️",
      title: "Built for Compliance",
      desc: "Designed to exceed NABH and international accreditation standards, ensuring absolute patient safety and regulatory excellence."
    }
  ];

  const benefitsData = [
    {
      category: "For Patients & Families",
      color: "#14b8a6",
      points: [
        "Hospital-grade care in the comfort and dignity of home",
        "Continuous specialist monitoring with 24/7 response",
        "Reduced risk of hospital-acquired infections",
        "Faster recovery with family support and lower stress",
        "Significant cost savings compared to prolonged hospitalization"
      ]
    },
    {
      category: "For Healthcare Organizations",
      color: "#0a2540",
      points: [
        "Optimized bed utilization for critical cases",
        "Substantial reduction in 30-day readmissions",
        "Improved clinical outcomes and quality metrics",
        "Scalable care delivery with minimal infrastructure cost",
        "Enhanced patient satisfaction and institutional reputation"
      ]
    }
  ];

  return (
    <div className="au-page" ref={pageRef}>
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=2000&amp;fit=crop" alt="Precision Care at Home" />
        </div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-tag">AUREAL CARES</div>
          <h1 className="hero-title">
            <span>BRINGING PRECISION MEDICINE</span>
            <span>AT THE COMFORT OF YOUR HOME</span>
          </h1>
          <p className="hero-subtitle">
            Delivering comprehensive, multi-disciplinary medical care directly to patients' homes. 
            Guided by UK Standards and internationally validated clinical frameworks.
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Discover Our Model</button>
            <button className="btn-secondary">Watch Our Story</button>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="about-section" ref={aboutRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">OUR STORY</span>
            <h2>Welcome to Aureal Cares</h2>
          </div>
          
          <div className="about-grid">
            <div className="about-content">
              <p>
                Aureal Healthcare is a progressive, tech-enabled clinical ecosystem that brings precision 
                medicine directly into the comfort of your home. Founded by practicing physicians, we recognized 
                the critical limitations of India's fragmented healthcare system and built a structured, 
                100% specialist-led model that redefines how high-acuity care is delivered.
              </p>
              <p>
                By seamlessly integrating advanced Health Information Management Systems (HIMS) with globally 
                validated clinical frameworks and UK NHS standards, we have created a repeatable and scalable 
                system that delivers hospital-level outcomes without the disruption of traditional inpatient stays.
              </p>
              <p>
                Our multidisciplinary teams provide continuous, data-driven care across the entire patient journey — 
                from acute intervention and post-operative recovery to geriatric support, palliative care, mental 
                wellness, and long-term disease reversal programs. Every protocol is designed with one goal: 
                superior clinical outcomes in the environment patients value most — their own home.
              </p>
              <p>
                Operating as a revenue-generating venture with a rapidly expanding footprint across Puducherry, 
                Tamil Nadu, and Kerala, Aureal Cares represents the future of healthcare — where precision, 
                technology, compassion, and clinical excellence converge to create dignified healing and healthy longevity.
              </p>
            </div>
            
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&amp;fit=crop" alt="Aureal Clinical Team" />
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="vm-section">
        <div className="container">
          <div className="vm-grid">
            <div className="vision-card" ref={visionRef}>
              <div className="vm-icon">🌟</div>
              <h3>Our Vision</h3>
              <p>To engineer India’s most precise, tech-enabled, clinician-led healthcare ecosystem—redefining the continuum of care so that high-acuity precision medicine, healthy longevity, and dignified healing are seamlessly accessible in the comfort of every home.</p>
            </div>

            <div className="mission-card" ref={missionRef}>
              <div className="vm-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To replace fragmented care systems with a structured, 100% specialist-led clinical model powered by an advanced clinician-centric EMR. By deploying globally validated frameworks, we deliver precise, high-acuity continuum of care directly to the comfort of your home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section" ref={whyRef}>
        <div className="container">
          <div className="why-header">
            <span className="section-badge">CLINICAL EXCELLENCE</span>
            <h2>Why Healthcare Organizations Choose Aureal Cares</h2>
            <p className="section-subtitle">Five pillars that define our superior hospital-at-home model</p>
          </div>

          <div className="why-grid">
            {whyData.map((item, index) => (
              <div 
                key={index}
                className="why-card"
                ref={el => whyCardsRef.current[index] = el}
              >
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="progress-bar"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits-section" ref={benefitsRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">TRANSFORMATIVE VALUE</span>
            <h2>Benefits for All Stakeholders</h2>
          </div>

          <div className="benefits-grid">
            {benefitsData.map((benefit, index) => (
              <div key={index} className="benefit-card" style={{ borderTopColor: benefit.color }}>
                <h3>{benefit.category}</h3>
                <ul>
                  {benefit.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCALE OF OPERATIONS */}
      <section className="scale-section" ref={scaleRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-badge">OUR FOOTPRINT</span>
            <h2 style={{ color: "#ffffff" }}>Scale of Operations</h2>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number" data-target="3" ref={el => statRefs.current[0] = el}>0</div>
              <p className="stat-label">States</p>
              <span>Puducherry • Tamil Nadu • Kerala</span>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="100" ref={el => statRefs.current[1] = el}>0</div>
              <p className="stat-label">% Specialist Led</p>
              <span>Revenue-generating early-stage venture</span>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="87" ref={el => statRefs.current[2] = el}>0</div>
              <p className="stat-label">Active Patients</p>
              <span>Rapidly expanding clinical network</span>
            </div>
          </div>
        </div>
      </section>

      {/* TARGET MARKET */}
      <section className="target-section" ref={targetRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-badge">WHO WE SERVE</span>
            <h2>Target Markets &amp; Beneficiaries</h2>
          </div>
          
          <div className="target-grid">
            <div className="target-card">
              <img src="https://picsum.photos/id/64/600/380" alt="Geriatric Care" />
              <h4>Geriatric Care</h4>
              <p>Dignified, comprehensive care focused on mobility, cognitive health, and quality of life for elderly patients.</p>
            </div>
            <div className="target-card">
              <img src="https://picsum.photos/id/201/600/380" alt="Perioperative Care" />
              <h4>Perioperative Care</h4>
              <p>Seamless surgical preparation, post-operative monitoring, and recovery — all delivered at home.</p>
            </div>
            <div className="target-card">
              <img src="https://picsum.photos/id/180/600/380" alt="Palliative Care" />
              <h4>Palliative &amp; Mind Care</h4>
              <p>Compassionate, holistic support for patients and families navigating complex or end-of-life care.</p>
            </div>
            <div className="target-card">
              <img src="https://picsum.photos/id/251/600/380" alt="Preventive Care" />
              <h4>Preventive &amp; Disease Reversal</h4>
              <p>Advanced, root-cause focused programs designed to promote healthy longevity and reverse chronic conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Healthcare Delivery?</h2>
          <p>Join leading hospitals and healthcare organizations partnering with Aureal Cares</p>
          <button className="btn-primary large">Partner With Us</button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;