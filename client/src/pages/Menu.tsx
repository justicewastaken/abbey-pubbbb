/* ============================================================
   Menu Page — The Abbey Pub & Grub
   Design: "Worn Leather & Amber Light"
   ============================================================ */

import { ExternalLink, Utensils, Beer, Pizza, Coffee } from "lucide-react";

const menuSections = [
  {
    id: "mains",
    label: "Mains",
    icon: Utensils,
    note: "Sandwiches served with kettle chips and a pickle spear. Add onion or pepperoncini $0.25. Choice of cheese: Swiss, Cheddar, Pepper Jack, Provolone.",
    items: [
      {
        name: "Pulled Pork Sandwich",
        price: "$8",
        description: "Our famous smothered pulled pork with your choice of cheese on a toasted bun. The house specialty.",
        popular: true,
      },
      {
        name: "Hot Beef Hoagie",
        price: "$8",
        description: "Sliced beef soaked in Au Jus piled on a toasted bun with your choice of cheese. Served with our Cajun horseradish sauce.",
      },
      {
        name: "Georgia Pork Tacos",
        price: "$8",
        description: "Pulled pork with peaches served with a side of salsa.",
      },
      {
        name: "Sandy",
        price: "$10",
        description: "Ask your bartender for the current Sandy build.",
      },
      {
        name: `Matt's Hero`,
        price: "$11",
        description: "Pepperoni, salami, mozz, provolone, gold sauce, red onion.",
      },
      {
        name: `"Grilled" Cheese`,
        price: "$7",
        description: "Pepper jack, cheddar, toasted bun, onion, gold sauce. Served with chips and a pickle!",
      },
      {
        name: "Brat",
        price: "$5",
        description: "Single brat served hot and ready.",
      },
      {
        name: "2 Brats",
        price: "$9",
        description: "Two brats for when one is not enough.",
      },
      {
        name: "Jumbo All Beef Hot Dog",
        price: "$6",
        description: "A classic all-beef hot dog.",
      },
      {
        name: "Vegan Dog",
        price: "$6",
        description: "Plant-based dog option.",
      },
      {
        name: "Corn Dog",
        price: "$4",
        description: "Classic corn dog.",
      },
    ],
  },
  {
    id: "starters",
    label: "Starters & Snacks",
    icon: Coffee,
    note: "* Seasonal items.",
    items: [
      {
        name: "House Nacho *GF",
        price: "$10",
        description: "Kettle chips topped with smothered pulled pork, Parmesan, & Cajun horseradish.",
        popular: true,
      },
      {
        name: "Stuffed Pretzel",
        price: "$10",
        description: "Soft pretzel stuffed with pepperjack cheese. Served with our smothered sauce.",
        popular: true,
      },
      {
        name: "Chips n' Cajun",
        price: "$3",
        description: "Crunchy kettle chips served with our house-made Cajun horseradish sauce for dipping.",
      },
      {
        name: "Free Popcorn",
        price: "On Us",
        description: "Freshly popped popcorn — always free at The Abbey. A classic touch.",
      },
      {
        name: "Shrimp Cocktail *",
        price: "$9",
        description: "Seasonal item.",
      },
      {
        name: "Potato Salad *",
        price: "$4",
        description: "Seasonal item.",
      },
      {
        name: "String Cheese",
        price: "$1",
        description: "Simple grab-and-go snack.",
      },
      {
        name: "Candy Bar",
        price: "$2",
        description: "Ask what candy bars are available.",
      },
      {
        name: "Nichols Inn Rotating Desserts",
        price: "$5",
        description: "Rotating dessert selection.",
      },
    ],
  },
  {
    id: "pizza",
    label: "Brew Pub Lotzza Motzza",
    icon: Pizza,
    note: "Ask your bartender about current availability.",
    items: [
      { name: "Abbey Style", price: "$16", description: "Brew Pub Lotzza Motzza Abbey style pizza." },
      { name: "Stadium Steak", price: "$14", description: "Brew Pub Lotzza Motzza Stadium Steak pizza." },
      { name: "Stadium Kicker", price: "$14", description: "Brew Pub Lotzza Motzza Stadium Kicker pizza." },
      { name: "Cheese", price: "$12", description: "Classic cheese pizza." },
      { name: "Cheese To Go", price: "$10", description: "Cheese pizza available to go." },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: Beer,
    note: "16 beers on tap · 48 bottled brews · Wide variety of spirits & cocktails. Happy Hour Mon–Fri 3–5 PM.",
    items: [
      { name: "Beers on Tap", price: "Ask us", description: "16 rotating taps including local favorites. Guinness, Spotted Cow, and more." },
      { name: "Bottled Brews", price: "Ask us", description: "48 bottled and canned beers to choose from." },
      { name: "Cocktails & Spirits", price: "Ask us", description: "Wide variety of spirits, cocktails, and mixed drinks." },
      { name: "Bloody Mary", price: "Ask us", description: "House Bloody Mary — a local favorite." },
      { name: "Sprecher Root Beer", price: "Ask us", description: "Wisconsin's own Sprecher Root Beer on tap." },
      { name: "White Russian Thursday", price: "$5", description: "Every Thursday — $5 White Russians all day long." },
      { name: "Soft Drinks", price: "Ask us", description: "Coke, Diet Coke, Sprite, Lemonade, Mellow Yellow, Raspberry Iced Tea." },
    ],
  },
];

export default function Menu() {
  return (
    <div style={{ backgroundColor: "#1a1410", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663404247268/EU4KcD7bUaaniPuDkVKwNJ/abbey_food_7e5b8171.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(26,20,16,0.88)" }} />
        <div className="container relative z-10">
          <div className="abbey-section-label mb-2">What We Serve</div>
          <h1 className="abbey-section-title mb-4">Our Menu</h1>
          <p style={{ color: "#c8b89a", fontSize: "1rem", maxWidth: "520px", lineHeight: "1.7" }}>
            A focused menu done right. Sandwiches, snacks, pizza, drinks, and seasonal favorites — all in one place.
          </p>
          <div className="flex gap-3 mt-6">
            <a
              href="https://www.facebook.com/theabbeypubandgrub"
              target="_blank"
              rel="noopener noreferrer"
              className="abbey-btn-outline"
            >
              <ExternalLink size={16} />
              View on Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Menu note */}
        <div
          className="mb-10 p-5 flex gap-4 items-start"
          style={{ backgroundColor: "#231e18", border: "1px solid #d4820a33" }}
        >
          <div
            className="p-2 flex-shrink-0"
            style={{ backgroundColor: "#d4820a", color: "#1a1410" }}
          >
            <Utensils size={16} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#d4820a",
                marginBottom: "0.3rem",
              }}
            >
              Good to Know
            </div>
            <p style={{ color: "#c8b89a", fontSize: "0.9rem", lineHeight: "1.6" }}>
              Menu items and prices may vary. For the most current menu, check our{" "}
              <a
                href="https://www.facebook.com/theabbeypubandgrub"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#d4820a" }}
              >
                Facebook page
              </a>
              .
            </p>
          </div>
        </div>

        {/* Menu sections */}
        <div className="space-y-16">
          {menuSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id}>
                {/* Section header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="p-2"
                    style={{ backgroundColor: "#d4820a", color: "#1a1410" }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        color: "#f0e8d0",
                      }}
                    >
                      {section.label}
                    </h2>
                    {section.note && (
                      <p style={{ color: "#8a7a6a", fontSize: "0.82rem", marginTop: "0.2rem" }}>
                        {section.note}
                      </p>
                    )}
                  </div>
                </div>

                {/* Items grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="abbey-card p-5 flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                              fontSize: "1rem",
                              fontWeight: 700,
                              color: "#f0e8d0",
                            }}
                          >
                            {item.name}
                          </h3>
                          {"popular" in item && item.popular && (
                            <span className="abbey-tag">Popular</span>
                          )}
                        </div>
                        {item.description ? (
                          <p style={{ color: "#c8b89a", fontSize: "0.85rem", lineHeight: "1.6" }}>
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                      <div
                        className="flex-shrink-0"
                        style={{
                          fontFamily: "'Oswald', sans-serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#d4820a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Facebook CTA */}
        <div
          className="mt-16 p-8 text-center"
          style={{ backgroundColor: "#231e18", border: "1px solid #3a3028" }}
        >
          <div className="abbey-section-label mb-2">Full Menu</div>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.5rem",
              color: "#f0e8d0",
              marginBottom: "0.75rem",
            }}
          >
            See the Latest Menu on Facebook
          </h3>
          <p style={{ color: "#c8b89a", fontSize: "0.95rem", marginBottom: "1.5rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
            We post menu updates, specials, and new items on our Facebook page. Check there for the most current offerings.
          </p>
          <a
            href="https://www.facebook.com/theabbeypubandgrub"
            target="_blank"
            rel="noopener noreferrer"
            className="abbey-btn-primary inline-flex"
          >
            <ExternalLink size={16} />
            View Menu on Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
