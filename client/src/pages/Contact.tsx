/* ============================================================
   Contact Page — The Abbey Pub & Grub
   Design: "Worn Leather & Amber Light"
   Features: Contact info, hours, embedded map, Facebook link
   ============================================================ */

import { useState } from "react";
import { MapPin, Phone, Clock, Facebook, Instagram, ExternalLink, CheckCircle } from "lucide-react";

const hours = [
  { day: "Monday", open: "12:00 PM", close: "2:00 AM" },
  { day: "Tuesday", open: "12:00 PM", close: "2:00 AM" },
  { day: "Wednesday", open: "12:00 PM", close: "2:00 AM" },
  { day: "Thursday", open: "12:00 PM", close: "2:00 AM" },
  { day: "Friday", open: "12:00 PM", close: "2:00 AM" },
  { day: "Saturday", open: "12:00 PM", close: "2:00 AM" },
  { day: "Sunday", open: "12:00 PM", close: "2:00 AM" },
];

function getTodayName() {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
}

export default function Contact() {
  const today = getTodayName();
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission — in production, connect to a backend or email service
    setFormSent(true);
  };

  return (
    <div style={{ backgroundColor: "#1a1410", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_patio_14a6eaf3.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(26,20,16,0.88)" }} />
        <div className="container relative z-10">
          <div className="abbey-section-label mb-2">Get in Touch</div>
          <h1 className="abbey-section-title mb-4">Contact & Location</h1>
          <p style={{ color: "#c8b89a", fontSize: "1rem", maxWidth: "520px", lineHeight: "1.7" }}>
            We're at 414 Main St E in downtown Menomonie. Stop in, give us a call, or send us a message.
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact info + Hours */}
          <div className="space-y-8">
            {/* Contact cards */}
            <div className="space-y-4">
              <a
                href="https://maps.google.com/?q=414+Main+St+E,+Menomonie,+WI+54751"
                target="_blank"
                rel="noopener noreferrer"
                className="abbey-card p-5 flex items-start gap-4 group block"
              >
                <div
                  className="p-3 flex-shrink-0 transition-colors"
                  style={{ backgroundColor: "#d4820a", color: "#1a1410" }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#d4820a", marginBottom: "0.3rem" }}>
                    Address
                  </div>
                  <p style={{ color: "#f0e8d0", fontSize: "1rem", fontWeight: 600 }}>414 Main St E</p>
                  <p style={{ color: "#c8b89a", fontSize: "0.9rem" }}>Menomonie, WI 54751</p>
                  <p
                    className="flex items-center gap-1 mt-2 transition-colors"
                    style={{ color: "#d4820a", fontSize: "0.8rem", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    <ExternalLink size={12} />
                    Get Directions
                  </p>
                </div>
              </a>

              <a
                href="tel:+17153092208"
                className="abbey-card p-5 flex items-start gap-4 block"
              >
                <div
                  className="p-3 flex-shrink-0"
                  style={{ backgroundColor: "#d4820a", color: "#1a1410" }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#d4820a", marginBottom: "0.3rem" }}>
                    Phone
                  </div>
                  <p style={{ color: "#f0e8d0", fontSize: "1rem", fontWeight: 600 }}>(715) 309-2208</p>
                  <p style={{ color: "#c8b89a", fontSize: "0.85rem" }}>Call or text anytime</p>
                </div>
              </a>

              <div className="abbey-card p-5 flex items-start gap-4">
                <div
                  className="p-3 flex-shrink-0"
                  style={{ backgroundColor: "#d4820a", color: "#1a1410" }}
                >
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#d4820a", marginBottom: "0.5rem" }}>
                    Hours
                  </div>
                  <div className="space-y-1.5">
                    {hours.map((h) => (
                      <div
                        key={h.day}
                        className="flex items-center justify-between"
                        style={{
                          padding: "0.3rem 0",
                          borderBottom: "1px solid #2e2820",
                          backgroundColor: h.day === today ? "#d4820a08" : "transparent",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: "0.82rem",
                            letterSpacing: "0.05em",
                            color: h.day === today ? "#d4820a" : "#c8b89a",
                            fontWeight: h.day === today ? 600 : 400,
                          }}
                        >
                          {h.day === today ? `${h.day} (Today)` : h.day}
                        </span>
                        <span
                          style={{
                            fontSize: "0.82rem",
                            color: h.day === today ? "#f0e8d0" : "#8a7a6a",
                          }}
                        >
                          {h.open} – {h.close}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4820a", marginBottom: "0.75rem" }}>
                Follow Us
              </div>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/theabbeypubandgrub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="abbey-btn-primary"
                >
                  <Facebook size={16} />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/theabbeymenomonie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="abbey-btn-outline"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Right: Map + Message form */}
          <div className="space-y-8">
            {/* Google Maps embed */}
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4820a", marginBottom: "0.75rem" }}>
                Find Us
              </div>
              <div
                className="overflow-hidden"
                style={{ border: "1px solid #3a3028", height: "280px" }}
              >
                <iframe
                  title="The Abbey Pub & Grub location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.4!2d-91.9190!3d44.8754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f7e3c1b2c5a7b3%3A0x1234567890abcdef!2s414+Main+St+E%2C+Menomonie%2C+WI+54751!5e0!3m2!1sen!2sus!4v1709000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.6) brightness(0.85)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.google.com/?q=414+Main+St+E,+Menomonie,+WI+54751"
                target="_blank"
                rel="noopener noreferrer"
                className="abbey-btn-outline w-full justify-center mt-3 block text-center"
                style={{ fontSize: "0.85rem" }}
              >
                <ExternalLink size={14} />
                Open in Google Maps
              </a>
            </div>

            {/* Message form */}
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4820a", marginBottom: "0.75rem" }}>
                Send a Message
              </div>
              {formSent ? (
                <div
                  className="p-8 text-center"
                  style={{ backgroundColor: "#231e18", border: "1px solid #4ade8044" }}
                >
                  <CheckCircle size={40} className="mx-auto mb-4" style={{ color: "#4ade80" }} />
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.2rem",
                      color: "#f0e8d0",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message Received!
                  </h3>
                  <p style={{ color: "#c8b89a", fontSize: "0.9rem" }}>
                    Thanks for reaching out. We'll get back to you soon. Or just stop in — we're open daily till 2 AM!
                  </p>
                  <button
                    onClick={() => { setFormSent(false); setForm({ name: "", email: "", message: "" }); }}
                    className="abbey-btn-outline mt-4 text-sm"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { label: "Your Name", key: "name", type: "text", placeholder: "John Smith" },
                    { label: "Email Address", key: "email", type: "email", placeholder: "john@example.com" },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label
                        style={{
                          fontFamily: "'Oswald', sans-serif",
                          fontSize: "0.75rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#d4820a",
                          display: "block",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        value={(form as Record<string, string>)[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        required
                        className="w-full px-3 py-2.5 outline-none transition-colors"
                        style={{
                          backgroundColor: "#231e18",
                          border: "1px solid #3a3028",
                          color: "#f0e8d0",
                          fontSize: "0.9rem",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#d4820a")}
                        onBlur={(e) => (e.target.style.borderColor = "#3a3028")}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#d4820a",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      placeholder="Questions, event inquiries, feedback..."
                      required
                      className="w-full px-3 py-2.5 outline-none resize-none transition-colors"
                      style={{
                        backgroundColor: "#231e18",
                        border: "1px solid #3a3028",
                        color: "#f0e8d0",
                        fontSize: "0.9rem",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#d4820a")}
                      onBlur={(e) => (e.target.style.borderColor = "#3a3028")}
                    />
                  </div>
                  <button type="submit" className="abbey-btn-primary w-full justify-center">
                    Send Message
                  </button>
                  <p style={{ color: "#6b5a3e", fontSize: "0.78rem", textAlign: "center" }}>
                    For faster responses, call us at (715) 309-2208 or message us on Facebook.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
