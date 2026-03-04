/* ============================================================
   Gallery Page — The Abbey Pub & Grub
   Design: "Worn Leather & Amber Light"
   ============================================================ */

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Facebook } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_hero_d8d381db.jpg",
    alt: "The Abbey Pub interior — warm amber lighting and bar atmosphere",
    category: "Interior",
    caption: "The bar — warm amber lighting and a classic pub feel.",
  },
  {
    id: 2,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_drinks_5f6079fa.jpg",
    alt: "Craft beers and cocktails at The Abbey",
    category: "Drinks",
    caption: "16 beers on tap, 48 bottled brews, and a wide variety of spirits.",
  },
  {
    id: 3,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_food_7e5b8171.jpg",
    alt: "Food at The Abbey — pulled pork, nachos, and more",
    category: "Food",
    caption: "Pulled pork sandwiches, stuffed pretzels, nachos, and Heggie's pizza.",
  },
  {
    id: 4,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_events_92a99f12.jpg",
    alt: "Live music and events at The Abbey",
    category: "Events",
    caption: "Live music nights, bingo, and community events every week.",
  },
  {
    id: 5,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_patio_14a6eaf3.jpg",
    alt: "The Abbey back patio",
    category: "Patio",
    caption: "The back patio — perfect for warm Wisconsin evenings.",
  },
  {
    id: 6,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_exterior_23993b45.jpeg",
    alt: "The Abbey Pub & Grub exterior on Main Street",
    category: "Exterior",
    caption: "414 Main St E — right in the heart of downtown Menomonie.",
  },
];

const categories = ["All", ...Array.from(new Set(galleryImages.map((i) => i.category)))];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? galleryImages : galleryImages.filter((i) => i.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextImage = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <div style={{ backgroundColor: "#1a1410", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_hero_d8d381db.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(26,20,16,0.85)" }} />
        <div className="container relative z-10">
          <div className="abbey-section-label mb-2">A Look Inside</div>
          <h1 className="abbey-section-title mb-4">Gallery</h1>
          <p style={{ color: "#c8b89a", fontSize: "1rem", maxWidth: "520px", lineHeight: "1.7" }}>
            A glimpse inside The Abbey — the bar, the food, the events, and the patio. Come see it for yourself.
          </p>
          <a
            href="https://www.facebook.com/theabbeypubandgrub/photos"
            target="_blank"
            rel="noopener noreferrer"
            className="abbey-btn-primary inline-flex mt-6"
          >
            <Facebook size={16} />
            More Photos on Facebook
          </a>
        </div>
      </div>

      <div className="container py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((image, idx) => (
            <div
              key={image.id}
              className="abbey-card overflow-hidden group cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              <div className="relative overflow-hidden" style={{ height: idx % 3 === 1 ? "320px" : "240px" }}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                  style={{ background: "linear-gradient(to top, rgba(26,20,16,0.85) 0%, transparent 60%)" }}
                >
                  <div className="p-4">
                    <span className="abbey-tag mb-2 inline-block">{image.category}</span>
                    <p style={{ color: "#f0e8d0", fontSize: "0.85rem", lineHeight: "1.5" }}>{image.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facebook CTA */}
        <div
          className="mt-16 p-8 text-center"
          style={{ backgroundColor: "#231e18", border: "1px solid #3a3028" }}
        >
          <div className="abbey-section-label mb-2">See More</div>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.5rem",
              color: "#f0e8d0",
              marginBottom: "0.75rem",
            }}
          >
            More Photos on Facebook
          </h3>
          <p style={{ color: "#c8b89a", fontSize: "0.95rem", marginBottom: "1.5rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
            We share photos from events, specials, and everyday life at The Abbey on our Facebook page.
          </p>
          <a
            href="https://www.facebook.com/theabbeypubandgrub/photos"
            target="_blank"
            rel="noopener noreferrer"
            className="abbey-btn-primary inline-flex"
          >
            <Facebook size={16} />
            Visit Our Facebook Gallery
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 transition-colors"
            style={{ color: "#f0e8d0" }}
          >
            <X size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 p-3 transition-colors"
            style={{ color: "#f0e8d0", backgroundColor: "rgba(26,20,16,0.7)" }}
          >
            <ChevronLeft size={24} />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="w-full object-contain"
              style={{ maxHeight: "75vh" }}
            />
            <div
              className="p-4 text-center"
              style={{ backgroundColor: "#231e18", border: "1px solid #3a3028" }}
            >
              <span className="abbey-tag mr-2">{filtered[lightboxIndex].category}</span>
              <span style={{ color: "#c8b89a", fontSize: "0.9rem" }}>{filtered[lightboxIndex].caption}</span>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 p-3 transition-colors"
            style={{ color: "#f0e8d0", backgroundColor: "rgba(26,20,16,0.7)" }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
