const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const activities = [
  {
    slug: "accra-street-food-crawl",
    title: "Accra Street Food & Market Crawl",
    city: "Accra",
    country: "Ghana",
    category: "Food & Drink",
    description:
      "Wander through Osu and Jamestown with a local guide, tasting waakye, kelewele, and fresh sugarcane juice as vendors explain the stories behind each dish.",
    highlights: JSON.stringify([
      "Six tastings across three neighborhoods",
      "Visit a working spice market",
      "Small groups, max 8 people",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    price: 42,
    durationHrs: 3,
    rating: 4.9,
    reviewCount: 214,
  },
  {
    slug: "cape-coast-castle-history-tour",
    title: "Cape Coast Castle Heritage Tour",
    city: "Cape Coast",
    country: "Ghana",
    category: "History & Culture",
    description:
      "A guided walk through Cape Coast Castle with a historian, covering its role in the transatlantic slave trade and its significance today.",
    highlights: JSON.stringify([
      "Licensed historian guide",
      "Entry ticket included",
      "Small-group reflection session",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80",
    price: 35,
    durationHrs: 2.5,
    rating: 4.8,
    reviewCount: 356,
  },
  {
    slug: "kakum-canopy-sunrise-hike",
    title: "Kakum Canopy Walk & Sunrise Hike",
    city: "Kakum",
    country: "Ghana",
    category: "Nature & Outdoors",
    description:
      "Beat the crowds on the rope canopy walkway 30 meters above the rainforest floor, then hike a quiet trail as the forest wakes up.",
    highlights: JSON.stringify([
      "Arrive before public opening hours",
      "Certified nature guide",
      "Light breakfast included",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    price: 58,
    durationHrs: 4,
    rating: 4.9,
    reviewCount: 178,
  },
  {
    slug: "lisbon-tram-28-walking-tour",
    title: "Lisbon Tram 28 & Alfama Walking Tour",
    city: "Lisbon",
    country: "Portugal",
    category: "City Tours",
    description:
      "Ride the iconic yellow tram through Lisbon's steepest hills, then wander Alfama's alleys with a guide who knows every hidden viewpoint.",
    highlights: JSON.stringify([
      "Skip-the-line tram boarding",
      "Fado music stop included",
      "Ends at a miradouro sunset view",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&q=80",
    price: 39,
    durationHrs: 3,
    rating: 4.7,
    reviewCount: 892,
  },
  {
    slug: "kyoto-bamboo-grove-tea-ceremony",
    title: "Arashiyama Bamboo Grove & Tea Ceremony",
    city: "Kyoto",
    country: "Japan",
    category: "Culture & Traditions",
    description:
      "Walk the famous bamboo path at dawn, then take part in a traditional tea ceremony led by a certified tea master in a 200-year-old machiya house.",
    highlights: JSON.stringify([
      "Private tea ceremony for your group",
      "Early access before tour buses arrive",
      "Kimono rental available on request",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    price: 74,
    durationHrs: 3.5,
    rating: 5.0,
    reviewCount: 130,
  },
  {
    slug: "santorini-catamaran-sunset-cruise",
    title: "Santorini Catamaran Sunset Cruise",
    city: "Santorini",
    country: "Greece",
    category: "Boat Tours",
    description:
      "Sail past the caldera's red and white cliffs, swim at two secluded coves, and watch the sunset from the water with a Greek dinner on board.",
    highlights: JSON.stringify([
      "BBQ dinner and open bar included",
      "Two swim stops",
      "Small-group catamaran, max 20 guests",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80",
    price: 129,
    durationHrs: 5,
    rating: 4.9,
    reviewCount: 1042,
  },
];

async function main() {
  console.log("Seeding database...");
  for (const a of activities) {
    await prisma.activity.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    });
  }
  console.log(`Seeded ${activities.length} activities.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
