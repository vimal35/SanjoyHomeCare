// products.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Products.css";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    category: "Intensive Care",
    title: "Aeris X5 Pro ICU Ventilator",
    description:
      "Advanced critical care respiratory ventilator featuring real-time AI flow adaptation and seamless central telemetry synchronization.",
    price: "$14,500",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=85",
    certification: "ISO 80601-2-12 Certified",
    features: [
      "Adaptive Volume Support",
      "Real-time Lung Mechanics",
      '15" Touch Dual Display',
    ],
    capabilities: [
      "Multi-mode invasive and non-invasive ventilation capabilities",
      "Automated spontaneous breathing trial protocols",
      "Integrated ultrasonic nebulizer with synchronized delivery",
    ],
  },
  {
    id: 2,
    category: "Emergency & Resuscitation",
    title: "CardioPulse Ultra Defibrillator",
    description:
      "Biphasic hospital-grade defibrillator with synchronized external pacing, advanced 12-lead ECG telemetry, and Wi-Fi incident uploading.",
    price: "$8,900",
    image:
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=900&q=85",
    certification: "FDA Class III Approved",
    features: [
      "360J Biphasic Energy",
      "Integrated 12-lead ECG",
      "Thermal Strip Printer",
    ],
    capabilities: [
      "Manual defibrillation, AED mode, and synchronized cardioversion",
      "Non-invasive transthoracic pacing with demand mode",
      "Military-grade drop resistance and IP55 liquid ingress protection",
    ],
  },
  {
    id: 3,
    category: "Diagnostic Imaging",
    title: "Optima 3T High-Res MRI System",
    description:
      "Ultra-high field superconducting magnetic resonance scanner offering unparalleled neuro and vascular imaging with 50% faster scan sequences.",
    price: "$125,000",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=85",
    certification: "CE Mark & FDA Cleared",
    features: [
      "Zero-Boil-Off Magnet",
      "Sub-millimeter Resolution",
      "QuietScan Tech (-80%)",
    ],
    capabilities: [
      "Advanced neurofunctional and spectroscopic imaging packages",
      "Automated patient positioning with laser crosshair alignment",
      "Rapid whole-body oncology staging workflows in under 20 minutes",
    ],
  },
  {
    id: 4,
    category: "Patient Monitoring",
    title: "VitalWave Elite Patient Monitor",
    description:
      "Modular bedside clinical monitor delivering continuous non-invasive hemodynamics, BIS brain monitoring, and central nurse station sync.",
    price: "$4,200",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=900&q=85",
    certification: "ISO 13485 Compliant",
    features: [
      "12-Channel Waveforms",
      "Hot-swappable Modules",
      "Early Warning Score (EWS)",
    ],
    capabilities: [
      "Standard ECG, RESP, dual TEMP, SpO2, and NIBP",
      "Optional 4-channel invasive blood pressure and cardiac output",
      "Full disclosure waveform review for up to 72 hours",
    ],
    featured: true,
  },
  {
    id: 5,
    category: "Surgical Systems",
    title: "MedSurg Pro Robotic Console",
    description:
      "Ergonomic microsurgical robotic arm workstation featuring dual 4K 3D optical immersion and active physiological tremor cancellation.",
    price: "$85,000",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=85",
    certification: "FDA Class II Surgical",
    features: [
      "7-Degree Freedom Arms",
      "True 3D 4K Optical Feed",
      "Haptic Tactile Feedback",
    ],
    capabilities: [
      "Seamless multi-quadrant anatomical access without repositioning",
      "Integrated near-infrared fluorescence imaging for real-time perfusion",
      "Surgeon-customizable foot pedal assignments and ergonomic armrests",
    ],
  },
  {
    id: 6,
    category: "Clinical Systems",
    title: "InfusaSense Smart Infusion Pump",
    description:
      "Precise multi-channel volumetric infusion system with an extensive on-board drug library and strict Dose Error Reduction Systems.",
    price: "$2,800",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85",
    certification: "ISO 13485 Medical",
    features: [
      "Dose Error Reduction",
      "Auto Flow Block Detection",
      "Wireless EHR Logging",
    ],
    capabilities: [
      "Multi-channel volumetric infusion with programmable dosing",
      "Drug library with dose limit alerts and patient safety validation",
      "Wireless EHR logging with clinical audit trail support",
    ],
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" />
    <path d="m8.8 12 2 2 4.6-5" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 6h15l-2 8H8L6 3H3" />
    <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <path d="M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6" />
    <path d="M12 7h.01" />
  </svg>
);

const Products = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".hero-visual-card", {
        x: 42,
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".floating-card", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray(".section-heading").forEach((item) => {
        gsap.from(item.children, {
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
          },
          y: 30,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
        });
      });

      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 82%",
        },
        y: 42,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".solution-card", {
        scrollTrigger: {
          trigger: ".solutions-list",
          start: "top 82%",
        },
        y: 34,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="products-page" ref={pageRef}>
      <section className="hero-section">
        <div className="products-container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow-pill">
              <span className="spark-icon">✣</span>
              Pristine Medical Technology - Certified Standards
            </div>

            <h1>
              Hospital-Grade <span>Healthcare</span> Solutions.
            </h1>

            <p>
              Engineered to meet uncompromising clinical standards. We equip
              modern medical facilities with ultra-precise diagnostic systems,
              automated life support, and surgical robotics designed for
              unyielding reliability.
            </p>

            <div className="hero-cert-row">
              <div>
                <CheckIcon />
                ISO 13485 Medical
              </div>
              <div>
                <CheckIcon />
                FDA Class III Cleared
              </div>
              <div>
                <CheckIcon />
                99.99% Guaranteed Uptime
              </div>
            </div>

            <div className="hero-actions">
              <button type="button" className="primary-btn">
                View Hospital Lineup
                <span>→</span>
              </button>

              <button type="button" className="outline-btn">
                <span className="stack-icon">▱</span>
                Advanced Equipment
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>850+</strong>
                <span>Hospitals Equipped</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Clinical Compliance</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Bio-Tech Support</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-blue-glow"></div>

            <div className="hero-visual-card">
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=90"
                alt="Hospital MRI diagnostic system"
              />

              <div className="floating-card top-badge">
                <span></span>
                Clinical Diagnostic Ready
              </div>

              <div className="floating-card protection-card">
                <div className="icon-box">
                  <ShieldIcon />
                </div>
                <div>
                  <small>PROTECTION</small>
                  <strong>Class III Validated</strong>
                  <p>Zero EMI Interference</p>
                </div>
              </div>

              <div className="floating-card precision-card">
                <div className="icon-box wave-icon">⌁</div>
                <div>
                  <small>PRECISION RATING</small>
                  <strong>99.99%</strong>
                  <p>Laser Aligned Scanning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="primary-products-section">
        <div className="products-container">
          <div className="section-heading">
            <div className="style-pill">⌘ Style 01: Professional Clinical Grid</div>
            <h2>Our Primary Healthcare Products</h2>
            <p>
              Six exceptional hospital-grade machines crafted for intensive care
              units, emergency wards, and sophisticated clinical laboratories.
              Each setup is fully warrantied for rigorous hospital use.
            </p>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                  <span className="category-badge">{product.category}</span>
                  <span className="ready-badge">
                    <ShieldIcon />
                    Hospital Ready
                  </span>
                </div>

                <div className="product-body">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>

                  <div className="feature-tags">
                    {product.features.map((feature) => (
                      <span key={feature}>{feature}</span>
                    ))}
                  </div>
                </div>

                <div className="product-footer">
                  <div className="price-row">
                    <span>INSTITUTIONAL PRICE</span>
                    <strong>{product.price}</strong>
                  </div>

                  <div className="product-actions">
                    <button type="button" className="buy-btn">
                      <CartIcon />
                      Buy Now
                    </button>
                    <button type="button" className="read-btn">
                      <InfoIcon />
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="integration-banner">
            <div className="banner-icon">⚙</div>
            <div>
              <h3>Need Custom Integration for Your Facility?</h3>
              <p>
                Our hospital biomedical engineering experts offer fully
                synchronized deployment, staff training, and ongoing calibration.
              </p>
            </div>
            <button type="button">☎ Connect with Procurement</button>
          </div>
        </div>
      </section>

      <section className="advanced-section">
        <div className="products-container">
          <div className="section-heading">
            <div className="style-pill">↯ Style 02: Advanced Modular Portfolio</div>
            <h2>Advanced Clinical Solutions List</h2>
            <p>
              Exploring the exact same highly capable healthcare equipment in an
              elegant, feature-forward horizontal architecture designed for
              technical spec validation.
            </p>
          </div>

          <div className="solutions-list">
            {products.slice(0, 5).map((product) => (
              <article
                className={`solution-card ${product.featured ? "active" : ""}`}
                key={`solution-${product.id}`}
              >
                <div className="solution-image">
                  <img src={product.image} alt={product.title} />
                  <span className="category-badge teal">{product.category}</span>
                  <div className="solution-cert">
                    <strong>{product.certification}</strong>
                    <span>
                      <CheckIcon />
                      Premium Verified
                    </span>
                  </div>
                </div>

                <div className="solution-content">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>

                  <div className="capabilities">
                    <h4>ENGINEERING CAPABILITIES</h4>
                    <ul>
                      {product.capabilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="solution-side">
                  <div className="unit-price">
                    <span>UNIT COST</span>
                    <strong>{product.price}</strong>
                    <p>Includes 3-Year On-Site Calibration & Support</p>
                  </div>

                  <button type="button" className="buy-btn">
                    <CartIcon />
                    Buy Now
                  </button>

                  <button type="button" className="read-btn">
                    <InfoIcon />
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;