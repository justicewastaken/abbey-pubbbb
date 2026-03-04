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
        description: "Pulled pork with peaches topped with spicy slaw and served with a side of salsa.",
      },
      {
        name: "Soup & Slaw",
        price: "$6",
        description: "Your choice of soup paired with our broccoli bacon slaw.",
      },
      {
        name: "Cup of Soup",
        price: "$3.50",
        description: "Ask your bartender for today's soup.",
      },
      {
        name: "Broccoli Bacon Slaw",
        price: "$3.50",
        description: "House-made broccoli slaw with bacon. A fan favorite.",
      },
    ],
  },
  {
    id: "starters",
    label: "Starters & Snacks",
    icon: Coffee,
    items: [
      {
        name: "House Nachos",
        price: "$8",
        description: "Kettle chips topped with smothered pulled pork, Parmesan, & Cajun horseradish.",
        popular: true,
      },
      {
        name: "Stuffed Pretzel",
        price: "$5",
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
    ],
  },
  {
    id: "pizza",
    label: "Heggie's Pizza",
    icon: Pizza,
    note: "Available in 9\" and 12\" sizes.",
    items: [
      { name: "Double Cheese", price: "$7 / $11", description: "Classic double cheese pizza." },
      { name: "Six Pack", price: "$9 / $13", description: "Six-topping pizza — ask your bartender for today's options." },
      { name: "Sausage & Mushroom", price: "$9", description: "Classic sausage and mushroom combo." },
      { name: "Chicken Alfredo", price: "$13", description: "Creamy chicken alfredo pizza." },
      { name: "Pepperoni", price: "$9", description: "Classic pepperoni pizza." },
      { name: "Breakfast", price: "$13", description: "Breakfast pizza — a unique Abbey offering." },
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
            A focused menu done right. Pulled pork, stuffed pretzels, nachos, pizza, and all the drinks you need. Food served daily till 1 AM.
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
              . Food served daily until 1 AM.
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
                        <p style={{ color: "#c8b89a", fontSize: "0.85rem", lineHeight: "1.6" }}>
                          {item.description}
                        </p>
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
