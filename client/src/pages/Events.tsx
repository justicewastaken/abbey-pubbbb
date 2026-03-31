import { useMemo, useState } from "react";
import { Calendar, Facebook, RefreshCw } from "lucide-react";
import { MAX_STORED_EVENTS, UPCOMING_EVENTS } from "../data/events";

const FACEBOOK_EVENTS_URL = "https://www.facebook.com/theabbeypubandgrub/events";
const FACEBOOK_PLUGIN_BASE = "https://www.facebook.com/plugins/page.php";
const FACEBOOK_PAGE_URL = "https://www.facebook.com/theabbeypubandgrub";

function buildPluginUrl(cacheBust: number) {
  const params = new URLSearchParams({
    href: FACEBOOK_PAGE_URL,
    tabs: "events",
    width: "500",
    height: "1200",
    small_header: "false",
    adapt_container_width: "true",
    hide_cover: "false",
    show_facepile: "false",
  });

  params.set("cb", String(cacheBust));
  return `${FACEBOOK_PLUGIN_BASE}?${params.toString()}`;
}

export default function Events() {
  const [cacheBust, setCacheBust] = useState(Date.now());
  const embedUrl = useMemo(() => buildPluginUrl(cacheBust), [cacheBust]);

  return (
    <div style={{ backgroundColor: "#1a1410", minHeight: "100vh" }}>
      <div
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage:
            "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_events_92a99f12.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(26,20,16,0.85)" }}
        />
        <div className="container relative z-10">
          <div className="abbey-section-label mb-2">What's On</div>
          <h1 className="abbey-section-title mb-4">Events at The Abbey</h1>
          <p
            style={{
              color: "#c8b89a",
              fontSize: "1rem",
              maxWidth: "620px",
              lineHeight: "1.7",
            }}
          >
            This page now uses The Abbey&apos;s live Facebook events feed as the
            primary source, so the listings stay closer to what the business is
            already posting.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setCacheBust(Date.now())}
              className="abbey-btn-primary"
            >
              <RefreshCw size={16} />
              Refresh Events
            </button>
            <a
              href={FACEBOOK_EVENTS_URL}
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
          <p style={{ color: "#8a7a6a", fontSize: "0.95rem", lineHeight: "1.7" }}>
            The embedded feed below is the most direct working sync option for
            Facebook events on this site. If Facebook blocks the embed in a
            given browser session, use the Facebook button above.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-8 items-start">
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: "#231e18",
              border: "1px solid #3a3028",
            }}
          >
            <div
              className="px-6 py-4"
              style={{ borderBottom: "1px solid #3a3028" }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#f0e8d0",
                }}
              >
                Live Facebook Events Feed
              </h2>
            </div>

            <div style={{ backgroundColor: "#efe7d4" }}>
              <iframe
                key={cacheBust}
                title="The Abbey Facebook Events"
                src={embedUrl}
                width="100%"
                height="1200"
                style={{ border: 0, overflow: "hidden", display: "block" }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          </div>

          <aside className="space-y-6">
            <div
              className="p-6"
              style={{
                backgroundColor: "#231e18",
                border: "1px solid #3a3028",
              }}
            >
              <div className="abbey-section-label mb-2">Quick Notes</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.35rem",
                  color: "#f0e8d0",
                  marginBottom: "0.75rem",
                }}
              >
                How this page works
              </h3>
              <ul
                className="space-y-3"
                style={{ color: "#c8b89a", fontSize: "0.92rem", lineHeight: "1.65" }}
              >
                <li>The refresh button reloads the Facebook events embed.</li>
                <li>The Facebook button opens the full events page directly.</li>
                <li>
                  We keep a lightweight local backup list of the next{" "}
                  {MAX_STORED_EVENTS} events below in case Facebook does not render.
                </li>
              </ul>
            </div>

            <div
              className="p-6"
              style={{
                backgroundColor: "#231e18",
                border: "1px solid #3a3028",
              }}
            >
              <div className="abbey-section-label mb-2">Backup List</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.35rem",
                  color: "#f0e8d0",
                  marginBottom: "1rem",
                }}
              >
                Stored Upcoming Events
              </h3>

              <div className="space-y-3">
                {UPCOMING_EVENTS.slice(0, MAX_STORED_EVENTS).map((event) => (
                  <div
                    key={event.id}
                    className="p-4"
                    style={{
                      backgroundColor: "#1a1410",
                      border: "1px solid #3a3028",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 flex flex-col items-center justify-center text-center"
                        style={{
                          width: "52px",
                          height: "52px",
                          backgroundColor: "#d4820a18",
                          border: "1px solid #d4820a44",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: "1.3rem",
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
                            fontSize: "0.6rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#c8b89a",
                          }}
                        >
                          {event.month}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <h4
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "1rem",
                            color: "#f0e8d0",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {event.title}
                        </h4>
                        <div
                          className="flex items-center gap-2"
                          style={{ color: "#c8b89a", fontSize: "0.82rem" }}
                        >
                          <Calendar size={13} style={{ color: "#d4820a" }} />
                          <span>
                            {event.date} · {event.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
