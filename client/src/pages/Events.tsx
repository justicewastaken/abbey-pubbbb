/* ============================================================
   Events Page — The Abbey Pub & Grub
   Features: Month calendar, upcoming list, category filters, admin panel
   Design: "Worn Leather & Amber Light"
   ============================================================ */

import { useState, useMemo } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, Download, Facebook, Music, Gamepad2, Tag, Users, HelpCircle, Star, Trash2, Edit2, X } from "lucide-react";
import { MAX_STORED_EVENTS, UPCOMING_EVENTS, ALL_CATEGORIES, CATEGORY_COLORS, type AbbeyEvent, type EventCategory } from "../data/events";

// ── ICS Generator ──────────────────────────────────────────
function generateICS(event: AbbeyEvent): string {
  const dateStr = event.date.replace(/-/g, "");
  const dtStart = `${dateStr}T${event.time.includes("PM") || event.time.includes("AM") ? convertTimeTo24(event.time) : "190000"}00`;
  const dtEnd = event.endTime ? `${dateStr}T${convertTimeTo24(event.endTime)}00` : `${dateStr}T220000`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Abbey Pub & Grub//Events//EN",
    "BEGIN:VEVENT",
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.title} @ The Abbey Pub & Grub`,
    `DESCRIPTION:${event.description || ""} | ${event.time}`,
    "LOCATION:414 Main St E\\, Menomonie\\, WI 54751",
    `URL:${event.facebookUrl || "https://www.facebook.com/theabbeypubandgrub"}`,
    `UID:${event.id}@theabbeypubandgrub.com`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function convertTimeTo24(time: string): string {
  if (time === "All Day") return "120000";
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return "190000";
  let hours = parseInt(match[1]);
  const mins = match[2];
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}${mins}00`;
}

function downloadICS(event: AbbeyEvent) {
  const ics = generateICS(event);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, "-").toLowerCase()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

const CategoryIcon: Record<EventCategory, React.ElementType> = {
  "Live Music": Music,
  "Bingo": Gamepad2,
  "Specials": Star,
  "Community": Users,
  "Trivia": HelpCircle,
  "Other": Tag,
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

interface AdminModalProps {
  onClose: () => void;
  onAdd: (event: AbbeyEvent) => void;
  editEvent?: AbbeyEvent | null;
}

function AdminModal({ onClose, onAdd, editEvent }: AdminModalProps) {
  const [form, setForm] = useState<Partial<AbbeyEvent>>(
    editEvent || {
      title: "",
      date: "",
      time: "",
      category: "Other",
      description: "",
      facebookUrl: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time) return;
    const dateObj = new Date(form.date!);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = MONTHS[dateObj.getMonth()].slice(0, 3).toUpperCase();
    onAdd({
      id: editEvent?.id || `evt-${Date.now()}`,
      title: form.title!,
      date: form.date!,
      day,
      month,
      time: form.time!,
      endTime: form.endTime,
      category: (form.category as EventCategory) || "Other",
      description: form.description,
      facebookUrl: form.facebookUrl,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg"
        style={{ backgroundColor: "#231e18", border: "1px solid #3a3028" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #3a3028" }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.2rem",
              color: "#f0e8d0",
            }}
          >
            {editEvent ? "Edit Event" : "Add New Event"}
          </h3>
          <button onClick={onClose} style={{ color: "#c8b89a" }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {[
            { label: "Event Title *", key: "title", type: "text", placeholder: "e.g. Live Music Night" },
            { label: "Date *", key: "date", type: "date", placeholder: "" },
            { label: "Start Time *", key: "time", type: "text", placeholder: "e.g. 7:00 PM" },
            { label: "End Time", key: "endTime", type: "text", placeholder: "e.g. 10:00 PM" },
            { label: "Facebook Event URL", key: "facebookUrl", type: "url", placeholder: "https://facebook.com/..." },
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
                value={(form as Record<string, string>)[key] || ""}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                required={label.includes("*")}
                className="w-full px-3 py-2 outline-none transition-colors"
                style={{
                  backgroundColor: "#1a1410",
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
              Category
            </label>
            <select
              value={form.category || "Other"}
              onChange={(e) => setForm({ ...form, category: e.target.value as EventCategory })}
              className="w-full px-3 py-2 outline-none"
              style={{
                backgroundColor: "#1a1410",
                border: "1px solid #3a3028",
                color: "#f0e8d0",
                fontSize: "0.9rem",
              }}
            >
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
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
              Description
            </label>
            <textarea
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Short description of the event..."
              className="w-full px-3 py-2 outline-none resize-none"
              style={{
                backgroundColor: "#1a1410",
                border: "1px solid #3a3028",
                color: "#f0e8d0",
                fontSize: "0.9rem",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#d4820a")}
              onBlur={(e) => (e.target.style.borderColor = "#3a3028")}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="abbey-btn-primary flex-1 justify-center">
              {editEvent ? "Save Changes" : "Add Event"}
            </button>
            <button type="button" onClick={onClose} className="abbey-btn-outline flex-1 justify-center">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EventCard({ event, onEdit, onDelete, showAdmin }: {
  event: AbbeyEvent;
  onEdit: (e: AbbeyEvent) => void;
  onDelete: (id: string) => void;
  showAdmin: boolean;
}) {
  const Icon = CategoryIcon[event.category] || Tag;
  const color = CATEGORY_COLORS[event.category] || "#c8b89a";

  return (
    <div className="abbey-card overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center text-center"
              style={{
                width: "52px",
                height: "52px",
                backgroundColor: `${color}15`,
                border: `1px solid ${color}44`,
              }}
            >
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.3rem", fontWeight: 700, color, lineHeight: 1 }}>
                {event.day}
              </div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c8b89a" }}>
                {event.month}
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#f0e8d0",
                  lineHeight: 1.3,
                }}
              >
                {event.title}
              </h3>
              <div className="flex items-center gap-1 mt-1" style={{ color: "#c8b89a", fontSize: "0.8rem" }}>
                <Clock size={12} style={{ color }} />
                {event.time}{event.endTime ? ` – ${event.endTime}` : ""}
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-1 flex-shrink-0"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.2rem 0.5rem",
              backgroundColor: `${color}18`,
              color,
              border: `1px solid ${color}44`,
            }}
          >
            <Icon size={10} />
            {event.category}
          </div>
        </div>

        {event.description && (
          <p
            className="mb-4"
            style={{ color: "#c8b89a", fontSize: "0.85rem", lineHeight: "1.6" }}
          >
            {event.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {event.facebookUrl && (
            <a
              href={event.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="abbey-btn-primary text-xs py-2 px-3"
              style={{ fontSize: "0.75rem" }}
            >
              <Facebook size={12} />
              View on Facebook
            </a>
          )}
          <button
            onClick={() => downloadICS(event)}
            className="abbey-btn-outline text-xs py-2 px-3"
            style={{ fontSize: "0.75rem" }}
          >
            <Download size={12} />
            Add to Calendar
          </button>
          {showAdmin && (
            <>
              <button
                onClick={() => onEdit(event)}
                className="abbey-btn-outline text-xs py-2 px-3"
                style={{ fontSize: "0.75rem", borderColor: "#60a5fa44", color: "#60a5fa" }}
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="abbey-btn-outline text-xs py-2 px-3"
                style={{ fontSize: "0.75rem", borderColor: "#ef444444", color: "#ef4444" }}
              >
                <Trash2 size={12} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [activeFilters, setActiveFilters] = useState<EventCategory[]>([]);
  const [storedEvents, setStoredEvents] = useState<AbbeyEvent[]>(UPCOMING_EVENTS);
  const [view, setView] = useState<"list" | "calendar">("list");

  const allEvents = useMemo(
    () =>
      [...storedEvents]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, MAX_STORED_EVENTS),
    [storedEvents]
  );

  const filteredEvents = useMemo(() => {
    if (activeFilters.length === 0) return allEvents;
    return allEvents.filter((e) => activeFilters.includes(e.category));
  }, [allEvents, activeFilters]);

  const toggleFilter = (cat: EventCategory) => {
    setActiveFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const refreshEvents = () => {
    setStoredEvents([...UPCOMING_EVENTS].slice(0, MAX_STORED_EVENTS));
    window.location.reload();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const calendarCells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const eventsByDate = useMemo(() => {
    const map: Record<string, AbbeyEvent[]> = {};
    filteredEvents.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [filteredEvents]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <div style={{ backgroundColor: "#1a1410", minHeight: "100vh" }}>
      <div
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_events_92a99f12.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(26,20,16,0.85)" }} />
        <div className="container relative z-10">
          <div className="abbey-section-label mb-2">What's On</div>
          <h1 className="abbey-section-title mb-4">Events at The Abbey</h1>
          <p style={{ color: "#c8b89a", fontSize: "1rem", maxWidth: "520px", lineHeight: "1.7" }}>
            Live music, bingo, trivia, community events, and weekly specials. We keep this page focused to the next {MAX_STORED_EVENTS} upcoming events.
          </p>
          <div className="flex gap-3 mt-6">
            <button onClick={refreshEvents} className="abbey-btn-primary">
              Refresh Events
            </button>
            <a
              href="https://www.facebook.com/theabbeypubandgrub/events"
              target="_blank"
              rel="noopener noreferrer"
              className="abbey-btn-outline"
              style={{ fontSize: "0.8rem" }}
            >
              <Facebook size={16} />
              See Events on Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div
          className="mb-10 p-6"
          style={{
            backgroundColor: "#231e18",
            border: "1px solid #3a3028",
          }}
        >
          <p style={{ color: "#8a7a6a", fontSize: "0.9rem" }}>
            This page shows up to {MAX_STORED_EVENTS} upcoming events. Use refresh to reload the latest stored event list, or open Facebook for the full event feed.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilters([])}
            className={`filter-btn ${activeFilters.length === 0 ? "active" : ""}`}
          >
            All Events
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const Icon = CategoryIcon[cat];
            return (
              <button
                key={cat}
                onClick={() => toggleFilter(cat)}
                className={`filter-btn flex items-center gap-1 ${activeFilters.includes(cat) ? "active" : ""}`}
                style={activeFilters.includes(cat) ? { borderColor: CATEGORY_COLORS[cat], color: CATEGORY_COLORS[cat], backgroundColor: `${CATEGORY_COLORS[cat]}15` } : {}}
              >
                <Icon size={12} />
                {cat}
              </button>
            );
          })}
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setView("list")}
              className={`filter-btn ${view === "list" ? "active" : ""}`}
            >
              List
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`filter-btn ${view === "calendar" ? "active" : ""}`}
            >
              Calendar
            </button>
          </div>
        </div>

        {view === "calendar" && (
          <div className="mb-12">
            <div
              className="p-6"
              style={{ backgroundColor: "#231e18", border: "1px solid #3a3028" }}
            >
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 transition-colors"
                  style={{ color: "#c8b89a" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#d4820a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#c8b89a")}
                >
                  <ChevronLeft size={20} />
                </button>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.4rem",
                    color: "#f0e8d0",
                  }}
                >
                  {MONTHS[currentMonth]} {currentYear}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 transition-colors"
                  style={{ color: "#c8b89a" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#d4820a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#c8b89a")}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((d) => (
                  <div
                    key={d}
                    className="text-center py-2"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6b5a3e",
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarCells.map((day, idx) => {
                  if (!day) return <div key={`empty-${idx}`} />;
                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayEvents = eventsByDate[dateStr] || [];
                  const isToday = dateStr === today.toISOString().split("T")[0];
                  return (
                    <div
                      key={day}
                      className="relative min-h-16 p-1"
                      style={{
                        border: isToday ? "1px solid #d4820a" : "1px solid #2e2820",
                        backgroundColor: isToday ? "#d4820a10" : "transparent",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Oswald', sans-serif",
                          fontSize: "0.8rem",
                          color: isToday ? "#d4820a" : "#c8b89a",
                          fontWeight: isToday ? 700 : 400,
                        }}
                      >
                        {day}
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {dayEvents.slice(0, 2).map((e) => (
                          <div
                            key={e.id}
                            className="truncate"
                            style={{
                              fontSize: "0.6rem",
                              backgroundColor: `${CATEGORY_COLORS[e.category]}22`,
                              color: CATEGORY_COLORS[e.category],
                              padding: "1px 3px",
                              borderLeft: `2px solid ${CATEGORY_COLORS[e.category]}`,
                            }}
                          >
                            {e.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div style={{ fontSize: "0.55rem", color: "#6b5a3e" }}>+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.5rem",
                color: "#f0e8d0",
              }}
            >
              {activeFilters.length > 0 ? `${activeFilters.join(", ")} Events` : "All Upcoming Events"}
            </h2>
            <span style={{ color: "#6b5a3e", fontSize: "0.85rem" }}>
              {filteredEvents.length} of {MAX_STORED_EVENTS} max
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16" style={{ color: "#6b5a3e" }}>
              <Calendar size={40} className="mx-auto mb-4 opacity-30" />
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.1rem" }}>
                No events found for the selected filters.
              </p>
              <button
                onClick={() => setActiveFilters([])}
                className="abbey-btn-outline mt-4 text-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={() => undefined}
                  onDelete={() => undefined}
                  showAdmin={false}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className="mt-16 p-8 text-center"
          style={{ backgroundColor: "#231e18", border: "1px solid #3a3028" }}
        >
          <div className="abbey-section-label mb-2">Stay in the Loop</div>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.5rem",
              color: "#f0e8d0",
              marginBottom: "0.75rem",
            }}
          >
            Follow Us on Facebook
          </h3>
          <p style={{ color: "#c8b89a", fontSize: "0.95rem", marginBottom: "1.5rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
            The most up-to-date event listings are always on our Facebook page. Follow us to never miss a night out.
          </p>
          <a
            href="https://www.facebook.com/theabbeypubandgrub"
            target="_blank"
            rel="noopener noreferrer"
            className="abbey-btn-primary inline-flex"
          >
            <Facebook size={16} />
            Visit Our Facebook Page
          </a>
        </div>
      </div>
    </div>
  );
}
