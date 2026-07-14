import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  HeartPulse,
  Menu,
  X,
} from "lucide-react";
import "./Header.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Services", path: "/services" },
  { label: "Blog", path: "/blog" },
  { label: "Updates", path: "/updates" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const getNavClass = ({ isActive }) =>
    `header-nav-link${isActive ? " is-active" : ""}`;

  const getMobileNavClass = ({ isActive }) =>
    `mobile-nav-link${isActive ? " is-active" : ""}`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        {/* Top accent bar */}
        <div className="header-top-bar">
          <div className="header-top-inner">
            <span className="top-bar-text">Trusted Clinical Care — Serving you since 2010</span>
            <div className="top-bar-links">
              <a href="tel:+18001234567" className="top-bar-link">📞 +1 800 123 4567</a>
              <span className="top-bar-divider" />
              <a href="mailto:care@aureal.com" className="top-bar-link">✉ care@aureal.com</a>
            </div>
          </div>
        </div>

        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="site-brand" aria-label="Aureal home">
            <span className="brand-mark">
              <HeartPulse size={26} strokeWidth={1.8} />
            </span>
            <span className="brand-content">
              <span className="brand-name">Aureal</span>
              <span className="brand-tagline">Clinical Care</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-navigation" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={getNavClass}
              >
                {item.label}
                <span className="nav-link-underline" />
              </NavLink>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <Link
              to="/Appointment"
              className="appointment-button"
              aria-label="Book an appointment"
            >
              <span className="appointment-icon">
                <CalendarDays size={16} strokeWidth={2} />
              </span>
              <span className="appointment-label">
                <span className="appointment-full">Book Appointment</span>
                <span className="appointment-short">Book</span>
              </span>
              <ArrowUpRight
                className="appointment-arrow"
                size={16}
                strokeWidth={2}
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={`menu-toggle${menuOpen ? " is-open" : ""}`}
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="toggle-bar top" />
              <span className="toggle-bar middle" />
              <span className="toggle-bar bottom" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`mobile-navigation${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="mobile-backdrop"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />

        <aside className="mobile-panel" aria-label="Mobile navigation panel">
          {/* Panel glow orb */}
          <div className="panel-glow" />

          <div className="mobile-panel-header">
            <Link
              to="/"
              className="mobile-panel-brand"
              onClick={closeMenu}
              aria-label="Aureal home"
            >
              <span className="brand-mark">
                <HeartPulse size={22} strokeWidth={1.8} />
              </span>
              <span className="brand-content">
                <span className="brand-name">Aureal</span>
                <span className="brand-tagline">Clinical Care</span>
              </span>
            </Link>

            <button
              type="button"
              className="mobile-close-button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="mobile-menu-label">
            <span>Navigation</span>
          </div>

          <nav className="mobile-navigation-links">
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={getMobileNavClass}
                onClick={closeMenu}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="mobile-nav-text">{item.label}</span>
                <ChevronRight className="mobile-nav-arrow" size={17} strokeWidth={2} />
              </NavLink>
            ))}
          </nav>

          <div className="mobile-panel-footer">
            <div className="footer-card">
              <div className="footer-card-icon">
                <HeartPulse size={20} strokeWidth={1.8} />
              </div>
              <div className="footer-card-content">
                <p className="footer-card-title">Need trusted care at home?</p>
                <p className="footer-card-sub">Our team is ready to help you.</p>
              </div>
            </div>

            <Link
              to="/Appointment"
              className="mobile-appointment-button"
              onClick={closeMenu}
            >
              <CalendarDays size={17} strokeWidth={2} />
              <span>Schedule an Appointment</span>
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Header;
