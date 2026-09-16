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
    slug: "cape-coast-castle-heritage-tour",
    title: "Cape Coast Castle Heritage Tour",
    city: "Cape Coast",
    country: "Ghana",
    category: "History & Heritage",
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
    slug: "kumasi-kente-weaving-workshop",
    title: "Kumasi Kente Weaving Workshop",
    city: "Kumasi",
    country: "Ghana",
    category: "Culture & Crafts",
    description:
      "Sit at the loom with a master weaver in Bonwire, learn what the patterns mean, and weave a strip of kente to take home with you.",
    highlights: JSON.stringify([
      "Hands-on session at the loom",
      "Take home the strip you weave",
      "Visit to Manhyia Palace grounds",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1200&q=80",
    price: 48,
    durationHrs: 4,
    rating: 4.9,
    reviewCount: 142,
  },
  {
    slug: "mole-national-park-safari",
    title: "Mole National Park Walking Safari",
    city: "Damongo",
    country: "Ghana",
    category: "Wildlife & Safari",
    description:
      "Track elephants on foot with an armed park ranger across the savannah, then watch the waterhole from the escarpment as the herds come to drink.",
    highlights: JSON.stringify([
      "Guided walking safari with a park ranger",
      "Elephant, antelope and warthog sightings",
      "Sunset viewing over the waterhole",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1200&q=80",
    price: 95,
    durationHrs: 6,
    rating: 4.8,
    reviewCount: 203,
  },
  {
    slug: "wli-waterfalls-volta-day-trip",
    title: "Wli Waterfalls & Volta Region Day Trip",
    city: "Hohoe",
    country: "Ghana",
    category: "Nature & Outdoors",
    description:
      "Hike through cocoa farms and rainforest to the tallest waterfall in West Africa, swim in the plunge pool, and watch the fruit bat colony overhead.",
    highlights: JSON.stringify([
      "Guided hike to the Lower Falls",
      "Swim beneath the waterfall",
      "Lunch in a village on the Volta",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&q=80",
    price: 72,
    durationHrs: 8,
    rating: 4.7,
    reviewCount: 168,
  },
  {
    slug: "busua-surf-lesson-beach-day",
    title: "Busua Beach Surf Lesson",
    city: "Busua",
    country: "Ghana",
    category: "Beach & Water",
    description:
      "Learn to surf on Ghana's friendliest beach break with local instructors, then eat grilled fish on the sand as the fishing boats come in.",
    highlights: JSON.stringify([
      "Two-hour lesson, board included",
      "Beginner-friendly beach break",
      "Fresh grilled fish lunch",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&q=80",
    price: 40,
    durationHrs: 3,
    rating: 4.8,
    reviewCount: 97,
  },
  {
    slug: "jamestown-photo-walk-accra",
    title: "Jamestown Photography Walk",
    city: "Accra",
    country: "Ghana",
    category: "City Tours",
    description:
      "Walk the old colonial quarter and fishing harbour with a Ghanaian photographer, from the lighthouse to the boxing gyms Jamestown is known for.",
    highlights: JSON.stringify([
      "Led by a working photographer",
      "Climb the Jamestown lighthouse",
      "Portraits and street shooting tips",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=1200&q=80",
    price: 38,
    durationHrs: 3,
    rating: 4.9,
    reviewCount: 124,
  },
];

async function main() {
  console.log("Seeding database...");
  for (const a of activities) {
    await prisma.activity.upsert({
      where: { slug: a.slug },
      update: a,
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
