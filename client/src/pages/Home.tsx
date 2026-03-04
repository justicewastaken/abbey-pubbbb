/* ============================================================
   Home Page — The Abbey Pub & Grub
   Design: "Worn Leather & Amber Light" — Americana Tavern Revival
   Sections: Hero, What to Expect, Today at a Glance, Events Preview, About Snippet
   ============================================================ */

import { Link } from "wouter";
import { Calendar, MapPin, Phone, Music, Gamepad2, Beer, Utensils, Users, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UPCOMING_EVENTS } from "../data/events";

// Intersection observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const highlights = [
  {
    icon: Beer,
    title: "Drinks",
    desc: "16 beers on tap, 48 bottled brews, cocktails, and a wide variety of spirits. Daily drink deals & Happy Hour Mon–Fri 3–5 PM.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_drinks_5f6079fa.jpg",
  },
  {
    icon: Utensils,
    title: "Food",
    desc: "Pulled pork sandwiches, stuffed pretzels, house nachos, Heggie's pizza, and more. Food served daily till 1 AM.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_food_7e5b8171.jpg",
  },
  {
    icon: Users,
    title: "Atmosphere",
    desc: "Newly renovated old-fashioned pub vibe. Free pool, photo booth, free popcorn, heated bar, and a back patio.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_patio_14a6eaf3.jpg",
  },
  {
    icon: Calendar,
    title: "Events",
    desc: "Live music, downtown bingo, trivia nights, community events, and weekly specials. Always something going on.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_events_92a99f12.jpg",
  },
];

function HighlightCard({ item, index }: { item: typeof highlights[0]; index: number }) {
  const { ref, inView } = useInView();
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className="abbey-card overflow-hidden group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(26,20,16,0.85) 0%, rgba(26,20,16,0.2) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-3 left-4 flex items-center gap-2"
        >
          <div
            className="p-1.5 rounded-sm"
            style={{ backgroundColor: "#d4820a" }}
          >
            <Icon size={14} style={{ color: "#1a1410" }} />
          </div>
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#f0e8d0",
            }}
          >
            {item.title}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p style={{ color: "#c8b89a", fontSize: "0.9rem", lineHeight: "1.7" }}>{item.desc}</p>
      </div>
    </div>
  );
}

function EventPreviewCard({ event, index }: { event: typeof UPCOMING_EVENTS[0]; index: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className="abbey-card p-5 flex gap-4"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      {/* Date block */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-center text-center"
        style={{
          width: "56px",
          height: "56px",
          backgroundColor: "#d4820a15",
          border: "1px solid #d4820a44",
        }}
      >
        <div
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "#d4820a",
            lineHeight: 1,
          }}
        >
          {event.day}
        </div>
        <div
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#c8b89a",
          }}
        >
          {event.month}
        </div>
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4
            className="truncate"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#f0e8d0",
            }}
          >
            {event.title}
          </h4>
          <span className="abbey-tag flex-shrink-0">{event.category}</span>
        </div>
        <div
          className="flex items-center gap-1 mt-1"
          style={{ color: "#c8b89a", fontSize: "0.8rem" }}
        >
          <Clock size={12} style={{ color: "#d4820a" }} />
          {event.time}
        </div>
        {event.description && (
          <p
            className="mt-1 line-clamp-1"
            style={{ color: "#8a7a6a", fontSize: "0.8rem" }}
          >
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const { ref: heroRef, inView: heroInView } = useInView(0.01);
  const { ref: highlightsRef, inView: highlightsInView } = useInView();
  const { ref: eventsRef, inView: eventsInView } = useInView();

  return (
    <div>
      {/* ── Hero Section ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_bar_real_30f46fa1.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Warm amber tint + dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(26,20,16,0.88) 0%, rgba(26,20,16,0.72) 50%, rgba(26,20,16,0.45) 100%), rgba(212,130,10,0.15)",
            backdropFilter: "none",
          }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            opacity: 0.4,
            mixBlendMode: "overlay",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-2xl" ref={heroRef}>
            {/* Label */}
            <div
              className="abbey-section-label mb-4"
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              Downtown Menomonie, WI
            </div>

            {/* Headline */}
            <h1
              className="abbey-section-title mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              Your neighborhood pub in the heart of Menomonie.
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "1.1rem",
                color: "#c8b89a",
                lineHeight: "1.7",
                marginBottom: "2rem",
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
              }}
            >
              Beer on tap, bottled brews, cocktails, late-night bites.
              <br />
              Free pool · Free popcorn · Live music · Bingo & more.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3"
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
              }}
            >
              <Link href="/events" className="abbey-btn-primary">
                <Calendar size={16} />
                View Events
              </Link>
              <Link href="/menu" className="abbey-btn-outline">
                <Utensils size={16} />
                See Menu
              </Link>
              <a
                href="https://maps.google.com/?q=414+Main+St+E,+Menomonie,+WI+54751"
                target="_blank"
                rel="noopener noreferrer"
                className="abbey-btn-outline"
              >
                <MapPin size={16} />
                Directions
              </a>
              <a href="tel:+17153092208" className="abbey-btn-outline">
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Hours strip at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            backgroundColor: "rgba(212,130,10,0.12)",
            backdropFilter: "blur(4px)",
            borderTop: "1px solid rgba(212,130,10,0.3)",
          }}
        >
          <div className="container py-3 flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#4ade80" }}
              />
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#f0e8d0",
                }}
              >
                Open Daily
              </span>
              <span style={{ color: "#c8b89a", fontSize: "0.85rem" }}>
                12:00 PM – 2:00 AM
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Music size={14} style={{ color: "#d4820a" }} />
                <span style={{ color: "#c8b89a", fontSize: "0.8rem" }}>Live Music</span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 size={14} style={{ color: "#d4820a" }} />
                <span style={{ color: "#c8b89a", fontSize: "0.8rem" }}>Bingo Nights</span>
              </div>
              <div className="flex items-center gap-2">
                <Beer size={14} style={{ color: "#d4820a" }} />
                <span style={{ color: "#c8b89a", fontSize: "0.8rem" }}>Happy Hour 3–5 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What to Expect ── */}
      <section
        className="py-20"
        style={{ backgroundColor: "#1a1410" }}
      >
        <div className="container">
          <div
            ref={highlightsRef}
            style={{
              opacity: highlightsInView ? 1 : 0,
              transform: highlightsInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="abbey-section-label mb-2">What We're About</div>
            <h2 className="abbey-section-title mb-3">What to Expect</h2>
            <p
              className="mb-12 max-w-xl"
              style={{ color: "#c8b89a", fontSize: "1rem", lineHeight: "1.7" }}
            >
              A laid-back neighborhood pub where everyone feels welcome — from college students to longtime locals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <HighlightCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div
        className="h-px mx-auto"
        style={{
          maxWidth: "800px",
          background: "linear-gradient(to right, transparent, #d4820a44, transparent)",
        }}
      />

      {/* ── Upcoming Events Preview ── */}
      <section
        className="py-20"
        style={{ backgroundColor: "#1a1410" }}
      >
        <div className="container">
          <div
            ref={eventsRef}
            className="flex flex-col lg:flex-row gap-12"
            style={{
              opacity: eventsInView ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            {/* Left: text */}
            <div className="lg:w-1/3">
              <div className="abbey-section-label mb-2">What's On</div>
              <h2 className="abbey-section-title mb-4">Upcoming Events</h2>
              <p
                className="mb-6"
                style={{ color: "#c8b89a", fontSize: "0.95rem", lineHeight: "1.7" }}
              >
                Live music, bingo, trivia, community events, and weekly specials. There's always something happening at The Abbey.
              </p>
              <Link
                href="/events"
                className="abbey-btn-primary inline-flex"
              >
                <Calendar size={16} />
                Full Events Calendar
              </Link>
              <div className="mt-6">
                <a
                  href="https://www.facebook.com/theabbeypubandgrub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors"
                  style={{ color: "#c8b89a", fontSize: "0.85rem" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#d4820a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#c8b89a")}
                >
                  <ArrowRight size={14} />
                  Follow us on Facebook for the latest
                </a>
              </div>
            </div>

            {/* Right: event cards */}
            <div className="lg:w-2/3 flex flex-col gap-4">
              {UPCOMING_EVENTS.slice(0, 4).map((event, i) => (
                <EventPreviewCard key={event.id} event={event} index={i} />
              ))}
              <div className="text-right">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-1 transition-colors"
                  style={{ color: "#d4820a", fontSize: "0.85rem", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  See all events <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Snippet ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "#231e18" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_exterior_23993b45.jpeg"
                alt="The Abbey Pub exterior"
                className="w-full object-cover"
                style={{ height: "380px", border: "1px solid #3a3028" }}
                loading="lazy"
              />
              <div
                className="absolute -bottom-4 -right-4 px-6 py-4"
                style={{
                  backgroundColor: "#d4820a",
                  color: "#1a1410",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  Since
                </div>
                <div
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  2013
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="abbey-section-label mb-2">Our Story</div>
              <h2 className="abbey-section-title mb-6">A Menomonie Tradition</h2>
              <p
                className="mb-4"
                style={{ color: "#c8b89a", fontSize: "1rem", lineHeight: "1.8" }}
              >
                Tucked away on Main Street, The Abbey has quietly earned its place as one of Menomonie's favorite local hangouts. It's the kind of place where everyone feels welcome — from college students looking to unwind to longtime residents catching up over a drink.
              </p>
              <p
                className="mb-8"
                style={{ color: "#c8b89a", fontSize: "1rem", lineHeight: "1.8" }}
              >
                Newly renovated with an old-fashioned pub-like atmosphere — warm, unpretentious, and genuinely local. Between the free pool, fresh popcorn, great drinks, and friendly staff, it's more than just a bar. It's a Menomonie tradition.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/about" className="abbey-btn-primary">
                  Our Story
                </Link>
                <Link href="/contact" className="abbey-btn-outline">
                  <MapPin size={16} />
                  Find Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_events_92a99f12.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(26,20,16,0.82)" }}
        />
        <div className="container relative z-10 text-center">
          <div className="abbey-section-label mb-3">Come On In</div>
          <h2
            className="abbey-section-title mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Always Something Happening at The Abbey
          </h2>
          <p
            className="mb-8 mx-auto"
            style={{ color: "#c8b89a", fontSize: "1rem", maxWidth: "520px", lineHeight: "1.7" }}
          >
            Check out our events calendar and plan your next visit. Live music, bingo, trivia, and specials every week.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/events" className="abbey-btn-primary">
              <Calendar size={16} />
              View Events
            </Link>
            <a
              href="tel:+17153092208"
              className="abbey-btn-outline"
            >
              <Phone size={16} />
              (715) 309-2208
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
