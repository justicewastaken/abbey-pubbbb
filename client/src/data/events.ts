/* ============================================================
   Events Data — The Abbey Pub & Grub
   Source: Based on typical Abbey events (Facebook-style data)
   Staff can update these manually; "Pull from Facebook" CTA links to FB page
   ============================================================ */

export type EventCategory = "Live Music" | "Bingo" | "Specials" | "Community" | "Trivia" | "Other";

export interface AbbeyEvent {
  id: string;
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  day: string;  // "14"
  month: string; // "MAR"
  time: string; // "7:00 PM"
  endTime?: string;
  category: EventCategory;
  description?: string;
  coverImage?: string;
  facebookUrl?: string;
}

export const UPCOMING_EVENTS: AbbeyEvent[] = [
  {
    id: "evt-001",
    title: "Downtown Bingo Night",
    date: "2026-03-07",
    day: "07",
    month: "MAR",
    time: "5:30 PM",
    endTime: "7:30 PM",
    category: "Bingo",
    description: "Join us for Downtown Bingo! Nosotros samplings 6–8 PM. Great prizes, great company.",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-002",
    title: "Trivia Tuesday",
    date: "2026-03-10",
    day: "10",
    month: "MAR",
    time: "7:00 PM",
    category: "Other",
    description: "Test your knowledge every Tuesday night. Bartenders play along — bring your best team.",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-003",
    title: "Live Music Night",
    date: "2026-03-13",
    day: "13",
    month: "MAR",
    time: "8:00 PM",
    category: "Live Music",
    description: "Local live music in the heart of downtown Menomonie. Come early for a good spot.",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_events_92a99f12.jpg",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-004",
    title: "St. Patrick's Day Celebration",
    date: "2026-03-17",
    day: "17",
    month: "MAR",
    time: "12:00 PM",
    category: "Specials",
    description: "All-day St. Paddy's Day specials! Green beer, Irish whiskey shots, and live music in the evening.",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-005",
    title: "White Russian Thursday",
    date: "2026-03-19",
    day: "19",
    month: "MAR",
    time: "All Day",
    category: "Specials",
    description: "$5 White Russians all day Thursday. A weekly Abbey tradition.",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-006",
    title: "Downtown Bingo Night",
    date: "2026-03-21",
    day: "21",
    month: "MAR",
    time: "5:30 PM",
    endTime: "7:30 PM",
    category: "Bingo",
    description: "Bi-weekly Downtown Bingo returns! Prizes, drinks, and good vibes.",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-007",
    title: "Live Music — Local Band",
    date: "2026-03-27",
    day: "27",
    month: "MAR",
    time: "8:00 PM",
    category: "Live Music",
    description: "Another great night of live music at The Abbey. Follow our Facebook for performer announcements.",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_events_92a99f12.jpg",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-008",
    title: "Happy Hour",
    date: "2026-03-30",
    day: "30",
    month: "MAR",
    time: "3:00 PM",
    endTime: "5:00 PM",
    category: "Specials",
    description: "Daily Happy Hour Mon–Fri 3–5 PM. Drink deals all around.",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-009",
    title: "Trivia Tuesday",
    date: "2026-04-07",
    day: "07",
    month: "APR",
    time: "7:00 PM",
    category: "Other",
    description: "Weekly trivia night. Teams welcome. Prizes for top finishers.",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-010",
    title: "Live Music Night",
    date: "2026-04-10",
    day: "10",
    month: "APR",
    time: "8:00 PM",
    category: "Live Music",
    description: "Live music every other Friday. Check Facebook for performer details.",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_events_92a99f12.jpg",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-011",
    title: "Downtown Bingo Night",
    date: "2026-04-18",
    day: "18",
    month: "APR",
    time: "5:30 PM",
    endTime: "7:30 PM",
    category: "Bingo",
    description: "Bi-weekly Downtown Bingo. Come early, grab a drink, and win big.",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
  {
    id: "evt-012",
    title: "Community Patio Opening",
    date: "2026-04-25",
    day: "25",
    month: "APR",
    time: "4:00 PM",
    category: "Community",
    description: "Celebrate the return of patio season! Outdoor seating, drinks, and good weather.",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_patio_14a6eaf3.jpg",
    facebookUrl: "https://www.facebook.com/theabbeypubandgrub",
  },
];

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  "Live Music": "#d4820a",
  "Bingo": "#7c6fcd",
  "Specials": "#4ade80",
  "Community": "#60a5fa",
  "Trivia": "#f472b6",
  "Other": "#c8b89a",
};

export const ALL_CATEGORIES: EventCategory[] = ["Live Music", "Bingo", "Specials", "Community", "Trivia", "Other"];
