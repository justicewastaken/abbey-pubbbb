import rawEvents from "./events-source.json";

export type EventCategory =
  | "Live Music"
  | "Bingo"
  | "Specials"
  | "Community"
  | "Trivia"
  | "Other";

export interface AbbeyEvent {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  endTime?: string;
  category: EventCategory;
  description?: string;
  coverImage?: string;
  facebookUrl?: string;
}

export const MAX_STORED_EVENTS = 9;

function normalizeEvent(event: AbbeyEvent): AbbeyEvent {
  const dateObj = new Date(event.date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = dateObj
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();

  return {
    ...event,
    day: event.day || day,
    month: event.month || month,
  };
}

function dedupeEvents(events: AbbeyEvent[]): AbbeyEvent[] {
  const seen = new Set<string>();
  return events.filter((event) => {
    const key = `${event.date}::${event.title.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const UPCOMING_EVENTS: AbbeyEvent[] = dedupeEvents(
  (rawEvents as AbbeyEvent[])
    .map(normalizeEvent)
    .sort((a, b) => a.date.localeCompare(b.date))
).slice(0, MAX_STORED_EVENTS);

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  "Live Music": "#d4820a",
  Bingo: "#7c6fcd",
  Specials: "#4ade80",
  Community: "#60a5fa",
  Trivia: "#f472b6",
  Other: "#c8b89a",
};

export const ALL_CATEGORIES: EventCategory[] = [
  "Live Music",
  "Bingo",
  "Specials",
  "Community",
  "Trivia",
  "Other",
];
