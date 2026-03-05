/* ============================================================
   About Page — The Abbey Pub & Grub
   Design: "Worn Leather & Amber Light"
   ============================================================ */

import { Link } from "wouter";
import { Beer, Utensils, Music, Gamepad2, Users, MapPin, Phone, Calendar, Star } from "lucide-react";

const features = [
  { icon: Beer, title: "16 Beers on Tap", desc: "Rotating taps including local Wisconsin favorites, Guinness, Spotted Cow, and more. Plus 48 bottled and canned options." },
  { icon: Utensils, title: "Late-Night Food", desc: "Kitchen open daily until 1 AM. Pulled pork sandwiches, stuffed pretzels, nachos, Heggie's pizza, and more." },
  { icon: Music, title: "Live Music", desc: "Local and regional artists perform regularly. Check our events calendar and Facebook for upcoming shows." },
  { icon: Gamepad2, title: "Bingo & Trivia", desc: "Downtown Bingo nights, trivia Tuesdays, and more community events throughout the month." },
  { icon: Users, title: "Free Pool", desc: "Free pool tables available every night. Bring your friends and play a few rounds." },
  { icon: Star, title: "Free Popcorn", desc: "Freshly popped popcorn — always on the house. A classic pub touch that keeps people coming back." },
];

const timeline = [
  { year: "2013", title: "The Abbey Opens", desc: "The Abbey Pub & Grub opens its doors at 414 Main St E in downtown Menomonie, WI." },
  { year: "2015", title: "Renovation", desc: "A full renovation brings the old-fashioned pub aesthetic to life — warm wood, amber lighting, and a welcoming bar." },
  { year: "2018", title: "Bingo Nights Begin", desc: "Downtown Bingo becomes a beloved weekly tradition, drawing regulars and newcomers alike." },
  { year: "2020", title: "Community Support", desc: "During challenging times, The Abbey adapts and continues to serve the Menomonie community." },
  { year: "2023", title: "A Decade of Pints", desc: "Celebrating 10+ years as Menomonie's neighborhood pub. Still pouring, still playing, still welcoming everyone." },
];

export default function About() {
  return (
    <div style={{ backgroundColor: "#1a1410", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        className="relative py-24 overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_bar_real_30f46fa1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(26,20,16,0.88) 0%, rgba(26,20,16,0.72) 50%, rgba(26,20,16,0.45) 100%), rgba(212,130,10,0.15)" }} />
        <div className="container relative z-10 max-w-2xl">
          <div className="abbey-section-label mb-2">Our Story</div>
          <h1 className="abbey-section-title mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            A Menomonie Tradition
          </h1>
          <p style={{ color: "#c8b89a", fontSize: "1.1rem", lineHeight: "1.8" }}>
            Tucked away on Main Street, The Abbey has quietly earned its place as one of Menomonie's favorite local hangouts. It's the kind of place where everyone feels welcome.
          </p>
        </div>
      </div>

      <div className="container py-16">
        {/* Story section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="abbey-section-label mb-2">Who We Are</div>
            <h2 className="abbey-section-title mb-6">More Than Just a Bar</h2>
            <div className="space-y-4" style={{ color: "#c8b89a", fontSize: "1rem", lineHeight: "1.8" }}>
              <p>
                The Abbey Pub & Grub is a newly renovated, old-fashioned pub nestled in the heart of downtown Menomonie, Wisconsin. Since opening, we've been the go-to spot for locals, students, and visitors looking for a genuine neighborhood bar experience.
              </p>
              <p>
                We're not trying to be a trendy cocktail bar or a chain restaurant. We're a pub — warm, unpretentious, and genuinely local. Between the free pool, fresh popcorn, great drinks, and friendly staff, it's more than just a bar. It's a Menomonie tradition.
              </p>
              <p>
                Whether you're stopping in for Happy Hour, catching a live show, playing bingo with friends, or just unwinding after a long day — The Abbey is your place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/events" className="abbey-btn-primary">
                <Calendar size={16} />
                See Events
              </Link>
              <Link href="/contact" className="abbey-btn-outline">
                <MapPin size={16} />
                Find Us
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_owners_01b91e68.jpg"
              alt="The Abbey Pub owners"
              className="w-full object-cover"
              style={{ height: "400px", border: "1px solid #3a3028" }}
            />
            <div
              className="absolute -bottom-4 -left-4 px-6 py-4"
              style={{ backgroundColor: "#d4820a", color: "#1a1410" }}
            >
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Est.
              </div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
                2013
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="abbey-section-label mb-2">What We Offer</div>
            <h2 className="abbey-section-title">Everything You Need for a Great Night</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="abbey-card p-6">
                  <div
                    className="p-2 inline-flex mb-4"
                    style={{ backgroundColor: "#d4820a", color: "#1a1410" }}
                  >
                    <Icon size={18} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#f0e8d0",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: "#c8b89a", fontSize: "0.88rem", lineHeight: "1.6" }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="abbey-section-label mb-2">Our History</div>
            <h2 className="abbey-section-title">A Decade on Main Street</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
              style={{ backgroundColor: "#3a3028" }}
            />
            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <div key={item.year} className="flex gap-6 items-start">
                  {/* Year bubble */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center z-10"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: idx === timeline.length - 1 ? "#d4820a" : "#231e18",
                      border: `2px solid ${idx === timeline.length - 1 ? "#d4820a" : "#3a3028"}`,
                      color: idx === timeline.length - 1 ? "#1a1410" : "#d4820a",
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textAlign: "center",
                    }}
                  >
                    {item.year}
                  </div>
                  {/* Content */}
                  <div className="abbey-card p-5 flex-1">
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#f0e8d0",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ color: "#c8b89a", fontSize: "0.88rem", lineHeight: "1.6" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact info strip */}
        <div
          className="p-8"
          style={{ backgroundColor: "#231e18", border: "1px solid #3a3028" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div
                className="p-3 inline-flex mb-3"
                style={{ backgroundColor: "#d4820a", color: "#1a1410" }}
              >
                <MapPin size={20} />
              </div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#d4820a", marginBottom: "0.3rem" }}>
                Address
              </div>
              <p style={{ color: "#c8b89a", fontSize: "0.9rem" }}>414 Main St E<br />Menomonie, WI 54751</p>
            </div>
            <div>
              <div
                className="p-3 inline-flex mb-3"
                style={{ backgroundColor: "#d4820a", color: "#1a1410" }}
              >
                <Phone size={20} />
              </div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#d4820a", marginBottom: "0.3rem" }}>
                Phone
              </div>
              <a href="tel:+17153092208" style={{ color: "#c8b89a", fontSize: "0.9rem" }}>
                (715) 309-2208
              </a>
            </div>
            <div>
              <div
                className="p-3 inline-flex mb-3"
                style={{ backgroundColor: "#d4820a", color: "#1a1410" }}
              >
                <Calendar size={20} />
              </div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#d4820a", marginBottom: "0.3rem" }}>
                Hours
              </div>
              <p style={{ color: "#c8b89a", fontSize: "0.9rem" }}>Mon–Sun<br />12:00 PM – 2:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
