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
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
      <header className="site-header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="site-brand" aria-label="Aureal home">
            <span className="brand-mark">
              <HeartPulse size={23} strokeWidth={1.9} />
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
                <CalendarDays size={17} strokeWidth={2} />
              </span>

              <span className="appointment-label">
                <span className="appointment-full">Book Appointment</span>
                <span className="appointment-short">Book</span>
              </span>

              <ArrowUpRight
                className="appointment-arrow"
                size={17}
                strokeWidth={2}
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? (
                <X size={23} strokeWidth={2} />
              ) : (
                <Menu size={23} strokeWidth={2} />
              )}
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
          <div className="mobile-panel-header">
            <Link
              to="/"
              className="mobile-panel-brand"
              onClick={closeMenu}
              aria-label="Aureal home"
            >
              <span className="brand-mark">
                <HeartPulse size={21} strokeWidth={1.9} />
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
              <X size={21} strokeWidth={2} />
            </button>
          </div>

          <div className="mobile-menu-label">Navigation</div>

          <nav className="mobile-navigation-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={getMobileNavClass}
                onClick={closeMenu}
              >
                <span>{item.label}</span>
                <ChevronRight size={18} strokeWidth={1.8} />
              </NavLink>
            ))}
          </nav>

          <div className="mobile-panel-footer">
            <p>Need trusted care at home?</p>

            <Link
              to="/Appointment"
              className="mobile-appointment-button"
              onClick={closeMenu}
            >
              <CalendarDays size={18} strokeWidth={2} />
              Schedule an Appointment
              <ArrowUpRight size={17} strokeWidth={2} />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Header;