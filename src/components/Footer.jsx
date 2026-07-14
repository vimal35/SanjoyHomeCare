import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const socialRef = useRef(null);
  const columnRefs = useRef([]);
  const contactItemsRef = useRef([]);
  const linkGroupRefs = useRef([]);
  const appointmentRef = useRef(null);
  const bottomRef = useRef(null);
  const headingRefs = useRef([]);
  const orbRefs = useRef([]);

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Care Modules", href: "#modules" },
    { name: "Clinical Governance", href: "#governance" },
    { name: "Book Appointment", href: "#appointment" },
    { name: "Contact Us", href: "#contact" },
  ];

  const services = [
    { name: "Doctor & Nursing Services", href: "#doctor-nursing" },
    { name: "Specialist Home Visits", href: "#specialist" },
    { name: "Skilled Nursing Care", href: "#nursing" },
    { name: "Specialized Physiotherapy", href: "#physiotherapy" },
    { name: "Speech & Swallow Therapy", href: "#speech" },
    { name: "Occupational Therapy", href: "#occupational" },
    { name: "Medical Equipment", href: "#equipment" },
  ];

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // ═══════════════════════════════════════
      // MASTER TIMELINE — SCROLL TRIGGERED
      // ═══════════════════════════════════════

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      });

      // ─── Top accent line shimmer ───
      masterTl.from(".site-footer::before", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1.2,
        ease: "power4.out",
      });

      // ─── Decorative orbs entrance ───
      masterTl.from(
        ".deco-orb-1",
        {
          scale: 0,
          opacity: 0,
          x: -100,
          duration: 1.8,
          ease: "power3.out",
        },
        0
      );

      masterTl.from(
        ".deco-orb-2",
        {
          scale: 0,
          opacity: 0,
          x: 100,
          duration: 1.8,
          ease: "power3.out",
        },
        0.2
      );

      // ─── Grid pattern fade ───
      masterTl.from(
        ".deco-grid-pattern",
        {
          opacity: 0,
          duration: 2,
          ease: "power2.out",
        },
        0.3
      );

      // ═══════════════════════════════════════
      // BRAND COLUMN — SLIDE LEFT + FADE IN
      // ═══════════════════════════════════════

      const brandTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Brand logo — scale in + rotate
      brandTl.from(".footer-brand-mark", {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(2.5)",
      });

      // Brand text — slide left
      brandTl.from(
        ".footer-brand-content",
        {
          x: -40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // About text — fade in with blur
      brandTl.from(
        ".footer-about-text",
        {
          y: 30,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.3"
      );

      // Social icons — staggered scale in + rotate
      brandTl.from(
        ".social-link",
        {
          scale: 0,
          rotation: -90,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(3)",
        },
        "-=0.4"
      );

      // ═══════════════════════════════════════
      // COLUMN HEADINGS — UNIQUE PER COLUMN
      // ═══════════════════════════════════════

      gsap.utils.toArray(".footer-heading").forEach((heading, i) => {
        const directions = [
          { x: -50, rotation: -5 },
          { x: 50, rotation: 5 },
          { y: -40, rotation: 0 },
        ];
        const dir = directions[i] || directions[0];

        const headingTl = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        headingTl.from(heading, {
          x: dir.x || 0,
          y: dir.y || 0,
          opacity: 0,
          rotation: dir.rotation,
          duration: 0.8,
          ease: "power4.out",
        });

        headingTl.from(
          heading.querySelector(".heading-underline"),
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        );
      });

      // ═══════════════════════════════════════
      // QUICK LINKS — STAGGERED SLIDE RIGHT
      // ═══════════════════════════════════════

      const quickLinksItems = gsap.utils.toArray(
        ".footer-column:nth-child(2) .footer-link"
      );

      gsap.from(quickLinksItems, {
        scrollTrigger: {
          trigger: ".footer-column:nth-child(2)",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
        x: -60,
        opacity: 0,
        rotationY: -15,
        transformPerspective: 800,
        stagger: {
          each: 0.06,
          from: "start",
        },
        duration: 0.7,
        ease: "power3.out",
      });

      // ═══════════════════════════════════════
      // SERVICES — STAGGERED SLIDE LEFT
      // ═══════════════════════════════════════

      const servicesItems = gsap.utils.toArray(
        ".footer-column:nth-child(3) .footer-link"
      );

      gsap.from(servicesItems, {
        scrollTrigger: {
          trigger: ".footer-column:nth-child(3)",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
        x: 60,
        opacity: 0,
        rotationY: 15,
        transformPerspective: 800,
        stagger: {
          each: 0.06,
          from: "start",
        },
        duration: 0.7,
        ease: "power3.out",
      });

      // ═══════════════════════════════════════
      // CONTACT ITEMS — MIXED REVEAL
      // ═══════════════════════════════════════

      const contactItems = gsap.utils.toArray(".contact-item");

      contactItems.forEach((item, i) => {
        const icon = item.querySelector(".contact-icon");
        const content = item.querySelector(".contact-content");

        const contactTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 93%",
            toggleActions: "play none none reverse",
          },
        });

        // Each contact item has a unique reveal
        const reveals = [
          // Address — slide up + rotate
          () => {
            contactTl.from(item, {
              y: 50,
              opacity: 0,
              rotation: -3,
              duration: 0.8,
              ease: "power4.out",
            });
            contactTl.from(
              icon,
              {
                scale: 0,
                rotation: -180,
                duration: 0.6,
                ease: "back.out(3)",
              },
              "-=0.4"
            );
            contactTl.from(
              content,
              {
                x: 30,
                opacity: 0,
                filter: "blur(4px)",
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.3"
            );
          },
          // Phone — slide right + scale
          () => {
            contactTl.from(item, {
              x: -70,
              opacity: 0,
              scale: 0.9,
              duration: 0.8,
              ease: "power4.out",
            });
            contactTl.from(
              icon,
              {
                scale: 0,
                rotation: 360,
                duration: 0.7,
                ease: "back.out(2.5)",
              },
              "-=0.4"
            );
            contactTl.from(
              content,
              {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.3"
            );
          },
          // Email — slide left + perspective
          () => {
            contactTl.from(item, {
              x: 70,
              opacity: 0,
              rotationY: 20,
              transformPerspective: 600,
              duration: 0.9,
              ease: "power4.out",
            });
            contactTl.from(
              icon,
              {
                scale: 0,
                rotation: -270,
                duration: 0.7,
                ease: "back.out(2)",
              },
              "-=0.5"
            );
            contactTl.from(
              content,
              {
                x: -20,
                opacity: 0,
                filter: "blur(3px)",
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.3"
            );
          },
        ];

        (reveals[i] || reveals[0])();
      });

      // ═══════════════════════════════════════
      // APPOINTMENT BUTTON — SCALE IN + BOUNCE
      // ═══════════════════════════════════════

      gsap.from(".footer-appointment-btn", {
        scrollTrigger: {
          trigger: ".footer-appointment-btn",
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
        scale: 0.5,
        y: 40,
        opacity: 0,
        rotation: -8,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });

      // ═══════════════════════════════════════
      // FOOTER BOTTOM — SLIDE UP + FADE
      // ═══════════════════════════════════════

      const bottomTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".footer-bottom",
          start: "top 98%",
          toggleActions: "play none none reverse",
        },
      });

      bottomTl.from(".footer-bottom", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      bottomTl.from(
        ".footer-copyright",
        {
          x: -40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

      bottomTl.from(
        ".footer-bottom-link",
        {
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3"
      );

      bottomTl.from(
        ".footer-bottom-divider",
        {
          scale: 0,
          opacity: 0,
          stagger: 0.06,
          duration: 0.4,
          ease: "back.out(3)",
        },
        "-=0.4"
      );

      // ═══════════════════════════════════════
      // CONTINUOUS FLOATING ANIMATIONS
      // ═══════════════════════════════════════

      // Orb 1 — slow drift
      gsap.to(".deco-orb-1", {
        x: 30,
        y: -25,
        scale: 1.08,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Orb 2 — slow drift opposite
      gsap.to(".deco-orb-2", {
        x: -25,
        y: 30,
        scale: 1.05,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Brand mark subtle pulse
      gsap.to(".footer-brand-mark", {
        boxShadow:
          "0 4px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(125, 214, 245, 0.15)",
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // ═══════════════════════════════════════
      // SOCIAL LINK HOVER GSAP ENHANCEMENTS
      // ═══════════════════════════════════════

      gsap.utils.toArray(".social-link").forEach((link) => {
        const enterHandler = () => {
          gsap.to(link, {
            y: -6,
            rotation: -6,
            scale: 1.15,
            boxShadow: "0 14px 30px rgba(0, 0, 0, 0.35)",
            duration: 0.4,
            ease: "back.out(2)",
          });
        };

        const leaveHandler = () => {
          gsap.to(link, {
            y: 0,
            rotation: 0,
            scale: 1,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            duration: 0.5,
            ease: "power3.out",
          });
        };

        link.addEventListener("mouseenter", enterHandler);
        link.addEventListener("mouseleave", leaveHandler);
      });

      // ═══════════════════════════════════════
      // CONTACT ICON HOVER GSAP
      // ═══════════════════════════════════════

      gsap.utils.toArray(".contact-item").forEach((item) => {
        const icon = item.querySelector(".contact-icon");

        const enterHandler = () => {
          gsap.to(icon, {
            rotation: -8,
            scale: 1.12,
            backgroundColor: "#ffffff",
            color: "#026fa0",
            duration: 0.4,
            ease: "back.out(2)",
          });
          gsap.to(item, {
            x: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const leaveHandler = () => {
          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            color: "#ffffff",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(item, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        item.addEventListener("mouseenter", enterHandler);
        item.addEventListener("mouseleave", leaveHandler);
      });

      // ═══════════════════════════════════════
      // APPOINTMENT BUTTON HOVER GSAP
      // ═══════════════════════════════════════

      const appointmentBtn = document.querySelector(".footer-appointment-btn");
      if (appointmentBtn) {
        const btnArrow = appointmentBtn.querySelector(".btn-arrow");

        const enterHandler = () => {
          gsap.to(appointmentBtn, {
            y: -5,
            scale: 1.03,
            boxShadow:
              "0 16px 40px rgba(0, 0, 0, 0.35), 0 0 20px rgba(125, 214, 245, 0.15)",
            duration: 0.4,
            ease: "power3.out",
          });

          if (btnArrow) {
            gsap.to(btnArrow, {
              x: 6,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        const leaveHandler = () => {
          gsap.to(appointmentBtn, {
            y: 0,
            scale: 1,
            boxShadow:
              "0 6px 20px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.9) inset",
            duration: 0.5,
            ease: "power3.out",
          });

          if (btnArrow) {
            gsap.to(btnArrow, {
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        appointmentBtn.addEventListener("mouseenter", enterHandler);
        appointmentBtn.addEventListener("mouseleave", leaveHandler);
      }

      // ═══════════════════════════════════════
      // FOOTER LINK HOVER GSAP
      // ═══════════════════════════════════════

      gsap.utils.toArray(".footer-link").forEach((link) => {
        const arrow = link.querySelector(".link-arrow");
        const text = link.querySelector(".link-text");

        const enterHandler = () => {
          gsap.to(link, {
            x: 6,
            duration: 0.3,
            ease: "power2.out",
          });
          if (arrow) {
            gsap.to(arrow, {
              width: 16,
              opacity: 1,
              rotation: 0,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          }
        };

        const leaveHandler = () => {
          gsap.to(link, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          if (arrow) {
            gsap.to(arrow, {
              width: 0,
              opacity: 0,
              duration: 0.25,
              ease: "power2.in",
            });
          }
        };

        link.addEventListener("mouseenter", enterHandler);
        link.addEventListener("mouseleave", leaveHandler);
      });

      // ═══════════════════════════════════════
      // HEADING UNDERLINE HOVER GSAP
      // ═══════════════════════════════════════

      gsap.utils.toArray(".footer-heading").forEach((heading) => {
        const underline = heading.querySelector(".heading-underline");
        const parentCol = heading.closest(".footer-column");

        if (parentCol && underline) {
          const enterHandler = () => {
            gsap.to(underline, {
              width: 60,
              duration: 0.5,
              ease: "power3.out",
            });
          };

          const leaveHandler = () => {
            gsap.to(underline, {
              width: 32,
              duration: 0.4,
              ease: "power2.inOut",
            });
          };

          parentCol.addEventListener("mouseenter", enterHandler);
          parentCol.addEventListener("mouseleave", leaveHandler);
        }
      });

      // ═══════════════════════════════════════
      // BOTTOM LINK HOVER GSAP
      // ═══════════════════════════════════════

      gsap.utils.toArray(".footer-bottom-link").forEach((link) => {
        const enterHandler = () => {
          gsap.to(link, {
            y: -2,
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const leaveHandler = () => {
          gsap.to(link, {
            y: 0,
            color: "rgba(255, 255, 255, 0.65)",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        link.addEventListener("mouseenter", enterHandler);
        link.addEventListener("mouseleave", leaveHandler);
      });

      // ═══════════════════════════════════════
      // MAGNETIC CURSOR EFFECT ON BRAND
      // ═══════════════════════════════════════

      const brand = document.querySelector(".footer-brand");
      if (brand) {
        const moveHandler = (e) => {
          const rect = brand.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(brand, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const leaveHandler = () => {
          gsap.to(brand, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          });
        };

        brand.addEventListener("mousemove", moveHandler);
        brand.addEventListener("mouseleave", leaveHandler);
      }

      // ═══════════════════════════════════════
      // PARALLAX SCROLL EFFECTS
      // ═══════════════════════════════════════

      gsap.to(".deco-orb-1", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".deco-orb-2", {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.5,
        },
      });

      gsap.to(".deco-grid-pattern", {
        backgroundPosition: "25px 25px",
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="site-footer" ref={footerRef}>
      {/* Decorative Background Elements */}
      <div className="footer-decoration">
        <div className="deco-orb deco-orb-1"></div>
        <div className="deco-orb deco-orb-2"></div>
        <div className="deco-orb deco-orb-3"></div>
        <div className="deco-grid-pattern"></div>
        <div className="deco-gradient-line"></div>
      </div>

      <div className="footer-container">
        <div className="footer-grid">
          {/* ============ COLUMN 1 — BRAND / ABOUT ============ */}
          <div className="footer-column footer-brand-column">
            <a href="/" className="footer-brand" ref={brandRef}>
              <div className="footer-brand-mark">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="footer-brand-content">
                <span className="footer-brand-name">Aureal</span>
                <span className="footer-brand-tagline">Clinical Care</span>
              </div>
            </a>

            <p className="footer-about-text">
              Aureal Healthcare is a progressive, tech-enabled clinical
              ecosystem that brings precision medicine directly into the comfort
              of your home. Founded by practicing physicians, we recognized the
              critical limitations of India's fragmented healthcare system and
              built a structured, 100% specialist-led model that redefines how
              high-acuity care is delivered.
            </p>

            <div className="footer-social" ref={socialRef}>
              <a
                href="#facebook"
                className="social-link"
                aria-label="Facebook"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#twitter" className="social-link" aria-label="Twitter">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#linkedin"
                className="social-link"
                aria-label="LinkedIn"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#instagram"
                className="social-link"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ============ COLUMN 2 — QUICK LINKS ============ */}
          <div className="footer-column">
            <h3 className="footer-heading">
              Quick Links
              <span className="heading-underline"></span>
            </h3>
            <ul className="footer-links">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="footer-link">
                    <span className="link-arrow">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                    <span className="link-text">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ============ COLUMN 3 — SERVICES ============ */}
          <div className="footer-column">
            <h3 className="footer-heading">
              Our Services
              <span className="heading-underline"></span>
            </h3>
            <ul className="footer-links">
              {services.map((service, idx) => (
                <li key={idx}>
                  <a href={service.href} className="footer-link">
                    <span className="link-arrow">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                    <span className="link-text">{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ============ COLUMN 4 — CONTACT ============ */}
          <div className="footer-column">
            <h3 className="footer-heading">
              Contact Info
              <span className="heading-underline"></span>
            </h3>

            <ul className="footer-contact">
              <li className="contact-item">
                <div className="contact-icon">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-content">
                  <span className="contact-label">Address</span>
                  <p className="contact-value">
                    123, Medical Plaza, Health District,
                    <br />
                    Bengaluru, Karnataka 560001, India
                  </p>
                </div>
              </li>

              <li className="contact-item">
                <div className="contact-icon">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-content">
                  <span className="contact-label">Call Us</span>
                  <a
                    href="tel:+919876543210"
                    className="contact-value contact-link"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </li>

              <li className="contact-item">
                <div className="contact-icon">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-content">
                  <span className="contact-label">Email Us</span>
                  <a
                    href="mailto:care@aurealhealthcare.com"
                    className="contact-value contact-link"
                  >
                    care@aurealhealthcare.com
                  </a>
                </div>
              </li>
            </ul>

            <a href="#appointment" className="footer-appointment-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Book Appointment</span>
              <svg
                className="btn-arrow"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* ============ FOOTER BOTTOM ============ */}
        <div className="footer-bottom" ref={bottomRef}>
          <p className="footer-copyright">
            © {currentYear} <strong>Aureal Clinical Care</strong>. All rights
            reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy" className="footer-bottom-link">
              Privacy Policy
            </a>
            <span className="footer-bottom-divider"></span>
            <a href="#terms" className="footer-bottom-link">
              Terms of Service
            </a>
            <span className="footer-bottom-divider"></span>
            <a href="#cookies" className="footer-bottom-link">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;