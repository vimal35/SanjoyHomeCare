// Events.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Updates.css";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    title: "Global Hospital Innovation Summit",
    location: "Apollo Convention Center, New Delhi",
    category: "Clinical Technology",
    day: "01",
    month: "MAR",
    time: "09:00 AM",
    seats: "1,200 Seats",
    sessions: "18 Sessions",
    speakers: "24 Speakers",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=90",
    description:
      "The flagship edition of our hospital innovation summit brings together clinical directors, biomedical engineers and healthcare leaders. Explore next-generation ICU systems, diagnostic imaging breakthroughs and connected care infrastructure through live demos and expert-led panels.",
  },
  {
    id: 2,
    title: "Advanced Critical Care & ICU Conference",
    location: "Fortis Medical Auditorium, Mumbai",
    category: "Critical Care",
    day: "04",
    month: "MAR",
    time: "10:30 AM",
    seats: "850 Seats",
    sessions: "12 Sessions",
    speakers: "16 Speakers",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=90",
    description:
      "A focused clinical conference dedicated to intensive care advancement, ventilator management and patient safety protocols. Practicing intensivists and nursing leads share evidence-based strategies for improving critical care outcomes and reducing response delays in emergency situations.",
  },
  {
    id: 3,
    title: "Diagnostic Imaging & Radiology Expo",
    location: "Max Healthcare Hall, Bengaluru",
    category: "Diagnostics",
    day: "07",
    month: "MAR",
    time: "09:30 AM",
    seats: "1,000 Seats",
    sessions: "14 Sessions",
    speakers: "20 Speakers",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=90",
    description:
      "Discover the future of medical imaging with hands-on MRI, CT and ultrasound technology showcases. Radiologists and imaging specialists demonstrate early-detection workflows, AI-assisted diagnostics and faster scan protocols designed for higher accuracy and safer patient experiences.",
  },
  {
    id: 4,
    title: "Surgical Robotics & OR Excellence Forum",
    location: "Medanta Institute, Gurugram",
    category: "Surgery",
    day: "10",
    month: "MAR",
    time: "11:00 AM",
    seats: "600 Seats",
    sessions: "10 Sessions",
    speakers: "14 Speakers",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=90",
    description:
      "An immersive forum on robotic-assisted surgery, operating room efficiency and precision instrumentation. Leading surgeons present live case studies covering minimally invasive procedures, enhanced visualization systems and clinical governance for safer, more consistent surgical outcomes.",
  },
  {
    id: 5,
    title: "Digital Health & Remote Care Conclave",
    location: "AIIMS Knowledge Center, Hyderabad",
    category: "Digital Health",
    day: "14",
    month: "MAR",
    time: "10:00 AM",
    seats: "1,500 Seats",
    sessions: "20 Sessions",
    speakers: "28 Speakers",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=90",
    description:
      "Connect with digital transformation leaders shaping the future of connected hospitals. Sessions cover remote patient monitoring, interoperable health records, cybersecurity in medical devices and telehealth models that extend quality care beyond hospital walls.",
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

const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const SeatIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 12V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
    <path d="M4 12h16v5H4z" />
    <path d="M6 17v3" />
    <path d="M18 17v3" />
  </svg>
);

const SessionIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 5h16v12H4z" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
  </svg>
);

const SpeakerIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="8" r="4" />
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 6h13M8 12h13M8 18h13" />
    <path d="M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

const Events = () => {
  const pageRef = useRef(null);
  const [view, setView] = useState("list");
  const [filter, setFilter] = useState("All Events");

  const categories = ["All Events", ...new Set(events.map((e) => e.category))];

  const filtered =
    filter === "All Events"
      ? events
      : events.filter((e) => e.category === filter);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".events-hero-badge", {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".events-hero-title", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        delay: 0.1,
        ease: "power3.out",
      });

      gsap.from(".events-hero-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".events-toolbar", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".event-card", {
        scrollTrigger: {
          trigger: ".events-list",
          start: "top 85%",
        },
        y: 44,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, pageRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [view, filter]);

  return (
    <main className="events-page" ref={pageRef}>
      <section className="events-hero">
        <div className="events-container">
          <div className="events-hero-badge">
            <span></span>
            Hospital Sector Calendar
          </div>

          <h1 className="events-hero-title">
            Upcoming healthcare events, summits and clinical conferences.
          </h1>

          <p className="events-hero-text">
            Reserve your place at leading hospital sector events focused on
            medical innovation, critical care, diagnostics, surgical excellence
            and digital health transformation.
          </p>

          <div className="events-toolbar">
            <div className="toolbar-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-chip ${filter === cat ? "active" : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="toolbar-right">
              <div className="date-range">
                <CalendarIcon />
                01 Mar 2026 - 14 Mar 2026
              </div>

              <div className="view-toggle">
                <button
                  type="button"
                  className={view === "list" ? "active" : ""}
                  onClick={() => setView("list")}
                  aria-label="List view"
                >
                  <ListIcon />
                </button>
                <button
                  type="button"
                  className={view === "grid" ? "active" : ""}
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                >
                  <GridIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section">
        <div className="events-container">
          <div className={`events-list ${view === "grid" ? "is-grid" : ""}`}>
            {filtered.map((event) => (
              <article className="event-card" key={event.id}>
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <span className="event-category">{event.category}</span>
                </div>

                <div className="event-body">
                  <div className="event-body-head">
                    <div>
                      <h3>{event.title}</h3>
                      <span className="event-location">
                        <PinIcon />
                        {event.location}
                      </span>
                    </div>

                    <div className="event-date">
                      <span>{event.month}</span>
                      <strong>{event.day}</strong>
                    </div>
                  </div>

                  <p className="event-desc">{event.description}</p>

                  <div className="event-footer">
                    <div className="event-stats">
                      <span>
                        <ClockIcon />
                        {event.time}
                      </span>
                      <span>
                        <SeatIcon />
                        {event.seats}
                      </span>
                      <span>
                        <SessionIcon />
                        {event.sessions}
                      </span>
                      <span>
                        <SpeakerIcon />
                        {event.speakers}
                      </span>
                    </div>

                    <button type="button" className="event-btn">
                      Register Now
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Events;