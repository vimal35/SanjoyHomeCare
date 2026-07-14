import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Blog.css";

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    id: 1,
    title: "How Smart ICU Monitoring Is Changing Critical Care Outcomes",
    date: "March 18, 2026",
    author: "Dr. Ananya Rao",
    category: "Critical Care",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=90",
    link: "https://www.who.int/news-room/fact-sheets/detail/patient-safety",
    description:
      "Modern intensive care units are moving beyond traditional bedside observation toward connected monitoring ecosystems. Smart ICU devices help clinicians track respiratory patterns, blood pressure changes, oxygen saturation and early warning indicators in real time. With accurate data visibility, nurses and physicians can respond faster, reduce manual errors and improve patient safety. Hospitals adopting centralized monitoring also benefit from better workflow coordination and reduced response delays during critical events.",
  },
  {
    id: 2,
    title: "Hospital Infection Control: Building Safer Clinical Environments",
    date: "April 02, 2026",
    author: "Meera Iyer",
    category: "Hospital Safety",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=90",
    link: "https://www.cdc.gov/infection-control/index.html",
    description:
      "Infection control remains one of the most important pillars of hospital quality management. From sterilized surgical zones to antimicrobial surfaces and hand hygiene protocols, every detail contributes to safer patient recovery. Healthcare facilities are now combining staff training, automated disinfection systems and continuous compliance checks to prevent healthcare-associated infections. A strong infection-control culture protects patients, clinical teams and long-term institutional trust.",
  },
  {
    id: 3,
    title: "Why Diagnostic Imaging Technology Is Essential for Early Detection",
    date: "April 21, 2026",
    author: "Dr. Rohan Menon",
    category: "Diagnostics",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=90",
    link: "https://www.radiologyinfo.org/",
    description:
      "Advanced diagnostic imaging gives clinicians the ability to detect disease at earlier and more treatable stages. MRI, CT, ultrasound and digital X-ray systems now offer sharper image resolution, faster scan times and safer patient experiences. For hospitals, investing in reliable imaging infrastructure improves clinical accuracy, reduces diagnostic delays and supports multidisciplinary treatment planning. Imaging technology is no longer just a department asset; it is central to modern patient care.",
  },
  {
    id: 4,
    title: "The Future of Remote Patient Monitoring in Home Healthcare",
    date: "May 09, 2026",
    author: "Sarah Mathew",
    category: "Homecare",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=90",
    link: "https://www.healthit.gov/topic/health-it-and-health-information-exchange-basics/telemedicine-and-telehealth",
    description:
      "Remote patient monitoring is helping hospitals extend care beyond physical wards. Connected blood pressure monitors, pulse oximeters, glucose meters and wearable devices allow clinicians to track recovery from home. This model supports chronic disease management, post-surgery follow-up and elderly care without unnecessary hospital visits. When integrated with electronic health records, remote monitoring creates a continuous care loop that improves convenience, safety and clinical decision-making.",
  },
  {
    id: 5,
    title: "Surgical Robotics: Precision, Control and Safer Operating Rooms",
    date: "May 27, 2026",
    author: "Dr. Vikram Shah",
    category: "Surgery",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=90",
    link: "https://www.fda.gov/medical-devices/surgery-devices/computer-assisted-surgical-systems",
    description:
      "Robotic-assisted surgery is transforming how complex procedures are planned and performed. Surgeons gain enhanced visualization, improved instrument control and greater movement precision through advanced robotic systems. For patients, this can mean smaller incisions, reduced blood loss and faster recovery in selected procedures. Hospitals adopting surgical robotics must also focus on staff training, maintenance standards and clinical governance to ensure consistent, safe and effective use.",
  },
  {
    id: 6,
    title: "Digital Hospital Infrastructure: From Devices to Connected Care",
    date: "June 11, 2026",
    author: "Nisha Kapoor",
    category: "Digital Health",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=90",
    link: "https://www.who.int/health-topics/digital-health",
    description:
      "Hospitals are becoming connected ecosystems where devices, departments and clinical teams share information securely. Digital infrastructure links diagnostic machines, monitoring systems, pharmacy workflows and patient records into one coordinated environment. This reduces duplicate work, improves reporting accuracy and enables faster clinical decisions. A successful digital hospital strategy requires cybersecurity, interoperability and user-friendly systems that support doctors and nurses rather than complicating their workflow.",
  },
];

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 3v4" />
    <path d="M17 3v4" />
    <path d="M4 9h16" />
    <path d="M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
  </svg>
);

const AuthorIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 21a8 8 0 0 0-16 0" />
    <path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
  </svg>
);

const Blog = () => {
  const blogRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Parallax Hero Elements - different speeds for depth
      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        y: 200,
        scale: 1.1
      });

      gsap.to(".blog-hero-badge", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        },
        y: -50,
        opacity: 0.3
      });

      gsap.to(".blog-hero-title", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5
        },
        y: -100,
        filter: "blur(5px)",
        opacity: 0.5
      });

      gsap.to(".blog-hero-text", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        },
        y: -80
      });

      gsap.to(".blog-hero-stats", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6
        },
        y: -40,
        scale: 0.95
      });

      // Parallax for each blog card with scrubbing
      const cards = gsap.utils.toArray(".blog-card");
      
      cards.forEach((card, i) => {
        const image = card.querySelector(".blog-card-image img");
        const content = card.querySelector(".blog-card-content");
        const number = card.querySelector(".blog-number");
        
        // Image parallax - moves slower than scroll
        gsap.to(image, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          },
          yPercent: -20,
          scale: 1.15,
          ease: "none"
        });

        // Card reveal with scrub
        gsap.fromTo(card, 
          { 
            y: 100, 
            opacity: 0.3,
            rotateX: 5
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.5
            },
            y: 0,
            opacity: 1,
            rotateX: 0,
            ease: "power2.out"
          }
        );

        // Content slide in
        gsap.fromTo(content,
          { x: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "top 55%",
              scrub: 0.8
            },
            x: 0,
            opacity: 1
          }
        );

        // Number counter animation on scroll
        gsap.fromTo(number,
          { scale: 0.5, rotation: -10 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              end: "top 50%",
              scrub: 0.5
            },
            scale: 1,
            rotation: 0
          }
        );

        // Floating category tag parallax
        const category = card.querySelector(".blog-card-image span");
        gsap.to(category, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          },
          y: -30
        });
      });

      // Section header parallax
      gsap.fromTo(".blog-section-head", 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".blog-section",
            start: "top 80%",
            end: "top 60%",
            scrub: 0.5
          },
          y: 0,
          opacity: 1
        }
      );

    }, blogRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="blog-page" ref={blogRef}>
      <section className="blog-hero" ref={heroRef}>
        <div className="parallax-bg">
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>
          <div className="hero-grid-pattern"></div>
        </div>
        
        <div className="blog-container">
          <div className="blog-hero-content">
            <div className="blog-hero-badge">
              <span className="pulse-dot"></span>
              Hospital Sector Knowledge Hub
            </div>

            <h1 className="blog-hero-title">
              Healthcare insights for modern hospitals and clinical teams.
            </h1>

            <p className="blog-hero-text">
              Explore professional articles on hospital technology, patient
              safety, diagnostics, digital health, surgical innovation and
              advanced clinical infrastructure.
            </p>

            <div className="blog-hero-stats">
              <div className="blog-hero-stat">
                <strong>06</strong>
                <span>Expert Articles</span>
              </div>
              <div className="blog-hero-stat">
                <strong>24/7</strong>
                <span>Clinical Learning</span>
              </div>
              <div className="blog-hero-stat">
                <strong>100%</strong>
                <span>Hospital Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-section-head">
            <span>Latest Publications</span>
            <h2>Hospital Sector Blogs</h2>
          </div>

          <div className="blog-list">
            {blogs.map((blog, index) => (
              <article className="blog-card" key={blog.id}>
                <a
                  className="blog-card-image"
                  href={blog.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Read more about ${blog.title}`}
                >
                  <img src={blog.image} alt={blog.title} loading="lazy" />
                  <span>{blog.category}</span>
                </a>

                <div className="blog-card-content">
                  <div className="blog-card-top">
                    <span className="blog-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="blog-meta">
                      <span>
                        <CalendarIcon />
                        {blog.date}
                      </span>
                      <span>
                        <AuthorIcon />
                        {blog.author}
                      </span>
                    </div>
                  </div>

                  <h3>{blog.title}</h3>

                  <p>{blog.description}</p>

                  <a
                    className="blog-read-btn"
                    href={blog.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read More
                    <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;