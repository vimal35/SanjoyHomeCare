// services.jsx
import { useEffect, useRef } from "react";
import {
  Activity,
  Apple,
  Baby,
  Bed,
  Brain,
  CheckCircle2,
  HandHeart,
  Heart,
  HeartPulse,
  MessageCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import "./Services.css";

const clinicalPillars = [
  {
    number: "01",
    title: "Doctor & Nursing Services",
    subtitle: "Clinical expertise, brought home.",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=85",
    services: [
      {
        icon: Stethoscope,
        title: "Specialist Doctor Home Visits",
        description:
          "Direct consultations across 16+ medical specialties for diagnoses and treatment adjustments without the hassle of hospital transit.",
      },
      {
        icon: UserCheck,
        title: "MBBS Doctor Visits",
        description:
          "Routine clinical assessments, acute illness management, and continuous health monitoring.",
      },
      {
        icon: HeartPulse,
        title: "5 Levels of Skilled Nursing",
        description:
          "From basic post-operative wound care to complex ICU-at-home monitoring, meticulously matched to patient acuity.",
      },
    ],
  },
  {
    number: "02",
    title: "Specialized Rehabilitative & Allied Therapies",
    subtitle: "Focused recovery. Measurable progress.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85",
    services: [
      {
        icon: Activity,
        title: "6 Streams of Specialized Physiotherapy",
        description:
          "Including Orthopedic, Neurological, Pulmonary, Cardiovascular, Palliative, and Sports Physiotherapy for aggressive, recovery-focused rehabilitation.",
      },
      {
        icon: MessageCircle,
        title: "Speech and Swallow Therapy",
        description:
          "Specialized rehabilitation for dysphagia and speech impairments post-neurological events.",
      },
      {
        icon: HandHeart,
        title: "Occupational Therapy",
        description:
          "Custom interventions to help patients regain independence in daily living activities.",
      },
      {
        icon: Brain,
        title: "Clinical Psychology & Nutrition",
        description:
          "Dedicated mental health support and scientifically-backed, condition-specific dietary planning.",
      },
    ],
  },
  {
    number: "03",
    title: "Seamless Medical Logistics",
    subtitle: "Everything required for confident care.",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=85",
    services: [
      {
        icon: Users,
        title: "Supportive Care",
        description:
          "Compassionate, non-clinical assistance for daily living needs.",
      },
      {
        icon: Apple,
        title: "Pharmacy & Consumables Delivery",
        description:
          "Reliable home delivery of medicines and essential clinical supplies.",
      },
      {
        icon: Bed,
        title: "Medical Equipment (Rent / Sale)",
        description:
          "Hospital-grade technology including oxygen concentrators, BiPAPs, hospital beds, and cardiac monitors.",
      },
    ],
  },
];

const standards = [
  "WHO ICOPE",
  "WHO IPSG",
  "NABH",
  "NICE Guidelines (UK)",
  "IAP Guidelines",
  "Pallium India",
  "CPOC (UK)",
];

const careModules = [
  {
    title: "Geriatric Care",
    description:
      "Preserve independence and functional ability with comprehensive care guided by WHO ICOPE frameworks.",
    guideline: "WHO ICOPE Framework",
    icon: Users,
    accent: "#1bb6a5",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Palliative Care",
    description:
      "Advanced symptom management and compassionate comfort care for chronic illnesses, adhering to Pallium India protocols.",
    guideline: "Pallium India Protocols",
    icon: Heart,
    accent: "#bf7d97",
    image:
      "https://images.unsplash.com/photo-1576765608622-067973a79f53?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Perioperative Care",
    description:
      "Seamless pre-surgery optimization and post-surgery clinical management to accelerate healing, governed by CPOC (UK) & NABH.",
    guideline: "CPOC (UK) & NABH",
    icon: Plus,
    accent: "#4779c4",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Onco Care",
    description:
      "Specialized home support for cancer patients, managing side effects and nutrition, aligned with NICE Guidelines.",
    guideline: "NICE Guidelines",
    icon: Activity,
    accent: "#b66d55",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Neuro Care",
    description:
      "Comprehensive home management for Stroke, Dementia, and ALS, governed by NICE Clinical Pathways.",
    guideline: "NICE Clinical Pathways",
    icon: Brain,
    accent: "#596fc4",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Mind Care",
    description:
      "Dedicated home interventions for cognitive decline and behavioral health, guided by NICE mental health standards.",
    guideline: "NICE Mental Health Standards",
    icon: Sparkles,
    accent: "#8b69bd",
    image:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Pediatric Care",
    description:
      "Specialized clinical home care for infants and children, adhering strictly to IAP Guidelines.",
    guideline: "IAP Guidelines",
    icon: Baby,
    accent: "#e5a252",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "End of Life Care",
    description:
      "Compassionate, medically managed comfort care for the patient and family, anchored in Pallium India standards.",
    guideline: "Pallium India Standards",
    icon: HandHeart,
    accent: "#7c8d67",
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=85",
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const revealElements = section.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleHeroPointerMove = (event) => {
    const hero = event.currentTarget;
    const bounds = hero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;

    hero.style.setProperty("--pointer-x", `${x}px`);
    hero.style.setProperty("--pointer-y", `${y}px`);
  };

  const resetHeroPointer = (event) => {
    event.currentTarget.style.setProperty("--pointer-x", "0px");
    event.currentTarget.style.setProperty("--pointer-y", "0px");
  };

  return (
    <section className="aureal-services" ref={sectionRef} id="services">
      <div className="services-noise" />
      <div className="services-orb services-orb-one" />
      <div className="services-orb services-orb-two" />

      <div className="services-container">
        <div className="services-intro reveal">
          <div className="section-kicker">
            <span className="kicker-line" />
            The Aureal Clinical Ecosystem
          </div>

          <div className="intro-heading-row">
            <div>
              <h2>Institutional-Grade Care, <em>Expert-Led.</em></h2>
            </div>

            <p>
              Our team comprises the city&apos;s top medical experts who
              collaborate to deliver elite, goal-oriented clinical management
              in the comfort of your home.
            </p>
          </div>
        </div>

        <div
          className="ecosystem-hero reveal"
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={resetHeroPointer}
        >
          <div className="hero-content">
            <span className="hero-eyebrow">
              <Sparkles size={15} />
              Coordinated Clinical Excellence
            </span>

            <h3>
              A connected care team.
              <br />
              <span>One clear clinical direction.</span>
            </h3>

            <p>
              Every care plan is built around the individual, aligned by
              specialists, and delivered with clinical precision at home.
            </p>

            <a href="#care-modules" className="hero-link">
              Explore care pathways
              <span>→</span>
            </a>

            <div className="hero-trust-row">
              <div className="trust-avatars" aria-label="Multidisciplinary care team">
                <span>DR</span>
                <span>RN</span>
                <span>PT</span>
                <span>+</span>
              </div>
              <p>
                A multidisciplinary team
                <strong> working as one.</strong>
              </p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbital-ring orbital-ring-one" />
            <div className="orbital-ring orbital-ring-two" />

            <div className="hero-photo-frame">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=90"
                alt="Clinical specialist consulting with a patient"
              />
              <div className="photo-gradient" />
            </div>

            <div className="clinical-status-card">
              <div className="status-icon">
                <ShieldCheck size={19} />
              </div>
              <div>
                <span>Clinical coordination</span>
                <strong>Specialist-aligned care</strong>
              </div>
              <i className="status-pulse" />
            </div>

            <div className="specialty-counter">
              <span>16+</span>
              <small>Medical specialties<br />available at home</small>
            </div>
          </div>
        </div>

        <div className="pillar-heading reveal">
          <span>01 — 03</span>
          <div>
            <h3>Clinical care, rehabilitation and logistics.</h3>
            <p>
              A complete ecosystem designed around continuity, comfort and
              measurable outcomes.
            </p>
          </div>
        </div>

        <div className="pillars-grid">
          {clinicalPillars.map((pillar, pillarIndex) => (
            <article
              className="clinical-pillar reveal"
              key={pillar.title}
              style={{ "--delay": `${pillarIndex * 110}ms` }}
            >
              <div
                className="pillar-image"
                style={{ backgroundImage: `url(${pillar.image})` }}
                aria-hidden="true"
              />
              <div className="pillar-image-overlay" />

              <div className="pillar-content">
                <div className="pillar-topline">
                  <span>{pillar.number}</span>
                  <span className="pillar-rule" />
                </div>

                <h3>{pillar.title}</h3>
                <p className="pillar-subtitle">{pillar.subtitle}</p>

                <div className="pillar-services">
                  {pillar.services.map((service) => {
                    const Icon = service.icon;

                    return (
                      <div className="pillar-service" key={service.title}>
                        <div className="service-icon">
                          <Icon size={18} strokeWidth={1.8} />
                        </div>

                        <div>
                          <h4>{service.title}</h4>
                          <p>{service.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="standards-panel reveal">
          <div className="standards-icon-wrap">
            <div className="standards-ripple ripple-one" />
            <div className="standards-ripple ripple-two" />
            <ShieldCheck size={30} strokeWidth={1.6} />
          </div>

          <div className="standards-copy">
            <span className="section-kicker light-kicker">
              <span className="kicker-line" />
              Clinical Governance
            </span>
            <h3>Our Quality &amp; Safety Frameworks</h3>
            <p>
              Every Aureal care pathway is designed with institutional
              discipline and governed by internationally recognized clinical
              standards.
            </p>
          </div>

          <div className="standards-tags">
            <p>Adhering to</p>
            <div>
              {standards.map((standard) => (
                <span key={standard}>
                  <CheckCircle2 size={13} />
                  {standard}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modules-header reveal" id="care-modules">
          <div>
            <span className="section-kicker">
              <span className="kicker-line" />
              Integrated Solutions for Complex Conditions
            </span>
            <h2>
              Our Multi-Disciplinary
              <br />
              <em>Care Modules.</em>
            </h2>
          </div>

          <p>
            Recognizing that complex conditions require integrated solutions,
            our multi-disciplinary teams are led by specialists, anchored in
            global medical guidelines, and follow a strict collaborative model
            to ensure cohesive, real-time care.
          </p>
        </div>

        <div className="modules-grid">
          {careModules.map((module, index) => {
            const Icon = module.icon;

            return (
              <article
                className="care-module-card reveal"
                key={module.title}
                style={{
                  "--accent": module.accent,
                  "--delay": `${(index % 4) * 80}ms`,
                }}
              >
                <div className="module-card-top">
                  <div className="module-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <div
                    className="module-image"
                    style={{ backgroundImage: `url(${module.image})` }}
                    aria-hidden="true"
                  />
                </div>

                <div className="module-content">
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>

                <div className="module-guideline">
                  <span />
                  {module.guideline}
                </div>
              </article>
            );
          })}
        </div>

        <div className="services-closing reveal">
          <div className="closing-symbol">
            <span />
            <span />
          </div>

          <div>
            <span>THE AUREAL STANDARD</span>
            <h3>
              Advanced clinical care should feel
              <em> personal, connected and reassuring.</em>
            </h3>
          </div>

          <a href="#contact" className="closing-link">
            Request a clinical assessment <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}