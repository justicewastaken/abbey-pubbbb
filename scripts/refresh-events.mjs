import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const OUTPUT_PATH = path.resolve(
  process.cwd(),
  "client/src/data/events-source.json",
);

const TARGET_URL = "https://www.facebook.com/theabbeypubandgrub/events";
const MAX_EVENTS = 9;
const MAC_CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const MONTHS = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

function detectCategory(title) {
  const lower = title.toLowerCase();
  if (lower.includes("bingo")) return "Bingo";
  if (lower.includes("trivia")) return "Trivia";
  if (
    lower.includes("live music") ||
    lower.includes("dj") ||
    lower.includes("band") ||
    lower.includes("presents:")
  ) {
    return "Live Music";
  }
  if (
    lower.includes("happy hour") ||
    lower.includes("special") ||
    lower.includes("white russian")
  ) {
    return "Specials";
  }
  return "Other";
}

function parseDateLabel(label) {
  const match = label.match(
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s+([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})$/,
  );
  if (!match) return null;

  const [, , mon, day, year] = match;
  const monthNum = MONTHS[mon];
  if (!monthNum) return null;

  const iso = `${year}-${monthNum}-${String(day).padStart(2, "0")}`;
  return {
    iso,
    day: String(day).padStart(2, "0"),
    month: mon.toUpperCase(),
  };
}

async function scrapeEvents() {
  const launchOptions = {
    headless: true,
  };

  try {
    await fs.access(MAC_CHROME);
    launchOptions.executablePath = MAC_CHROME;
  } catch {
    // GitHub Actions will use Playwright's installed Chromium.
  }

  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage({
    viewport: { width: 1280, height: 2200 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  });

  try {
    await page.goto(TARGET_URL, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3500);

    const bodyText = await page.locator("body").innerText();
    const lines = bodyText
      .split("\n")
      .map((line) => line.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    const links = await page.locator('a[href*="/events/"]').evaluateAll((anchors) =>
      anchors
        .map((anchor) => ({
          href: anchor.href,
          text: (anchor.textContent || "").trim(),
        }))
        .filter((item) => item.href && item.href.includes("/events/")),
    );

    const eventLinks = [];
    const seenLinks = new Set();
    for (const item of links) {
      const title = item.text.trim();
      if (!title || seenLinks.has(item.href)) continue;
      seenLinks.add(item.href);
      eventLinks.push(item);
    }

    const parsed = [];
    const datePattern =
      /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s+[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}$/;

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      if (!datePattern.test(line)) continue;

      const parsedDate = parseDateLabel(line);
      const title = lines[index + 1];
      if (!parsedDate || !title) continue;

      const venue = lines[index + 2];
      const location = lines[index + 3]?.replace(/^·\s*/, "");
      const hostLine = lines[index + 4]?.startsWith("Event by ")
        ? lines[index + 4]
        : "";
      const matchingLink = eventLinks.find((item) => item.text === title);

      parsed.push({
        id: `facebook-${matchingLink?.href.match(/\/events\/(\d+)/)?.[1] || parsed.length + 1}`,
        title,
        date: parsedDate.iso,
        day: parsedDate.day,
        month: parsedDate.month,
        time: "See Facebook",
        category: detectCategory(title),
        description: [venue, location, hostLine].filter(Boolean).join(" · "),
        facebookUrl: matchingLink?.href || TARGET_URL,
      });
    }

    const deduped = [];
    const seenIds = new Set();
    for (const event of parsed) {
      const key = `${event.date}::${event.title}`;
      if (seenIds.has(key)) continue;
      seenIds.add(key);
      deduped.push(event);
    }

    return deduped.slice(0, MAX_EVENTS);
  } finally {
    await browser.close();
  }
}

async function main() {
  const scraped = await scrapeEvents();

  if (!scraped.length) {
    const existing = JSON.parse(await fs.readFile(OUTPUT_PATH, "utf8"));
    console.log(
      `No Facebook events were parsed. Keeping existing ${existing.length} stored event(s).`,
    );
    return;
  }

  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(scraped, null, 2)}\n`);
  console.log(`Stored ${scraped.length} scraped Facebook event(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exitCode = 1;
});
