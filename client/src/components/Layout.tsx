/* ============================================================
   Layout — Sticky header + footer wrapper
   Design: "Worn Leather & Amber Light" — Americana Tavern Revival
   ============================================================ */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Phone, MapPin, Menu as MenuIcon, X, Calendar, ChevronRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#1a1410", color: "#f0e8d0" }}>
      {/* ── Sticky Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(26,20,16,0.97)" : "rgba(26,20,16,0.85)",
          backdropFilter: "blur(8px)",
          borderBottom: scrolled ? "1px solid rgba(212,130,10,0.25)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_logo_new_b93e90e8.png"
                alt="The Abbey Pub & Grub"
                className="h-16 lg:h-20 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`abbey-nav-link ${location === link.href ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+17153092208"
                className="abbey-btn-outline text-sm py-2 px-4"
                style={{ fontSize: "0.8rem" }}
              >
                <Phone size={14} />
                Call Now
              </a>
              <a
                href="https://maps.google.com/?q=414+Main+St+E,+Menomonie,+WI+54751"
                target="_blank"
                rel="noopener noreferrer"
                className="abbey-btn-primary text-sm py-2 px-4"
                style={{ fontSize: "0.8rem" }}
              >
                <MapPin size={14} />
                Directions
              </a>
            </div>

            {/* Mobile: Phone + Hamburger */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href="tel:+17153092208"
                className="p-2 rounded-full transition-colors"
                style={{ color: "#d4820a" }}
                aria-label="Call The Abbey"
              >
                <Phone size={20} />
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 transition-colors"
                style={{ color: "#f0e8d0" }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t"
            style={{
              backgroundColor: "#1a1410",
              borderColor: "#3a3028",
            }}
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between py-3 px-2 border-b transition-colors"
                  style={{
                    borderColor: "#2e2820",
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: location === link.href ? "#d4820a" : "#c8b89a",
                  }}
                >
                  {link.label}
                  <ChevronRight size={16} style={{ color: "#d4820a55" }} />
                </Link>
              ))}
              <div className="flex gap-3 mt-4">
                <a
                  href="tel:+17153092208"
                  className="abbey-btn-outline flex-1 justify-center text-sm py-3"
                >
                  <Phone size={16} />
                  Call
                </a>
                <a
                  href="https://maps.google.com/?q=414+Main+St+E,+Menomonie,+WI+54751"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="abbey-btn-primary flex-1 justify-center text-sm py-3"
                >
                  <MapPin size={16} />
                  Directions
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 pt-20 lg:pt-24">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer
        className="mt-auto"
        style={{
          backgroundColor: "#0f0c09",
          borderTop: "1px solid #3a3028",
        }}
      >
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_logo_new_b93e90e8.png"
                  alt="The Abbey Pub & Grub"
                  className="h-20 w-auto object-contain mb-3"
                />
              </div>
              <p style={{ color: "#c8b89a", fontSize: "0.9rem", lineHeight: "1.7" }}>
                Newly renovated old-fashioned, pub-like atmosphere. Your neighborhood spot in the heart of downtown Menomonie.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="mb-4"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#d4820a",
                }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors"
                      style={{
                        fontFamily: "'Source Serif 4', Georgia, serif",
                        fontSize: "0.9rem",
                        color: "#c8b89a",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#d4820a")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#c8b89a")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="mb-4"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#d4820a",
                }}
              >
                Find Us
              </h4>
              <div className="space-y-3" style={{ color: "#c8b89a", fontSize: "0.9rem" }}>
                <div className="flex items-start gap-2">
                  <MapPin size={16} style={{ color: "#d4820a", marginTop: "2px", flexShrink: 0 }} />
                  <span>414 Main St E<br />Menomonie, WI 54751</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} style={{ color: "#d4820a", flexShrink: 0 }} />
                  <a
                    href="tel:+17153092208"
                    style={{ color: "#c8b89a" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#d4820a")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#c8b89a")}
                  >
                    (715) 309-2208
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar size={16} style={{ color: "#d4820a", marginTop: "2px", flexShrink: 0 }} />
                  <span>Mon–Sun: 12:00 PM – 2:00 AM</span>
                </div>
                <div className="flex gap-3 mt-4">
                  <a
                    href="https://www.facebook.com/theabbeypubandgrub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="abbey-btn-outline py-2 px-3 text-xs"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/theabbeymenomonie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="abbey-btn-outline py-2 px-3 text-xs"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid #2e2820" }}
          >
            <p style={{ color: "#6b5a3e", fontSize: "0.8rem" }}>
              © {new Date().getFullYear()} The Abbey Pub &amp; Grub · Menomonie, WI · All rights reserved.
            </p>
            <p style={{ color: "#6b5a3e", fontSize: "0.8rem" }}>
              Must be 21+ to consume alcohol. Please drink responsibly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
