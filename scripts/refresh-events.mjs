import fs from "node:fs/promises";
import path from "node:path";

const FACEBOOK_EVENTS_URLS = [
  "https://www.facebook.com/theabbeypubandgrub/events",
  "https://mbasic.facebook.com/theabbeypubandgrub/events",
];
const OUTPUT_PATH = path.resolve(
  process.cwd(),
  "client/src/data/events-source.json",
);

async function main() {
  let html = "";

  for (const url of FACEBOOK_EVENTS_URLS) {
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml",
        "accept-language": "en-US,en;q=0.9",
      },
    });

    if (response.ok) {
      html = await response.text();
      if (html) break;
    }
  }

  if (!html) {
    const existing = JSON.parse(await fs.readFile(OUTPUT_PATH, "utf8"));
    console.log(
      `Facebook did not expose a public event page we could parse. Keeping existing ${existing.length} stored event(s).`,
    );
    return;
  }

  const pageUrls = Array.from(
    new Set(
      [...html.matchAll(/https:\\\/\\\/www\.facebook\.com\\\/events\\\/(\d+)/g)].map(
        (match) => `https://www.facebook.com/events/${match[1]}`,
      ),
    ),
  );

  if (pageUrls.length === 0) {
    const existing = JSON.parse(await fs.readFile(OUTPUT_PATH, "utf8"));
    console.log(
      `No parseable public event payload was exposed by Facebook. Keeping existing ${existing.length} stored event(s).`,
    );
    return;
  }

  const generated = pageUrls.slice(0, 9).map((url, index) => ({
    id: `facebook-${index + 1}`,
    title: `Facebook Event ${index + 1}`,
    date: new Date().toISOString().slice(0, 10),
    day: new Date().toISOString().slice(8, 10),
    month: new Date()
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase(),
    time: "See Facebook",
    category: "Other",
    description: "Open Facebook for the latest event details.",
    facebookUrl: url,
  }));

  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(generated, null, 2)}\n`);
  console.log(`Stored ${generated.length} event link(s) from Facebook.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
