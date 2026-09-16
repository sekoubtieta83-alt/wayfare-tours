import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

const REGIONS = [
  { name: "Accra", blurb: "City life & street food", img: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800&q=80" },
  { name: "Cape Coast", blurb: "Castles & coastline", img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80" },
  { name: "Kumasi", blurb: "Ashanti crafts & culture", img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&q=80" },
  { name: "Volta", blurb: "Waterfalls & highlands", img: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80" },
];

export default async function HomePage() {
  const featured = await prisma.activity.findMany({
    orderBy: { rating: "desc" },
    take: 8,
  });

  const categories = await prisma.activity.findMany({
    distinct: ["category"],
    select: { category: true },
  });

  return (
    <>
      {/* Hero with search */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1600&q=80"
            alt="Savannah landscape in northern Ghana"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 via-forest-900/70 to-forest-900/30" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-kente-300">
            Tours & experiences across Ghana
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-cream-50 sm:text-6xl">
            Book Ghana with the people who know it best.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream-100/85">
            From Jamestown food walks to elephant tracking in Mole — booked
            directly with Ghanaian guides and tour operators.
          </p>

          <form
            action="/activities"
            className="mt-8 flex max-w-xl overflow-hidden rounded-full bg-white shadow-lg"
          >
            <input
              type="text"
              name="q"
              placeholder="Where to? Try 'Accra', 'Kumasi', 'Mole'"
              className="w-full bg-transparent px-6 py-4 text-ink-900 outline-none placeholder:text-ink-700/40"
            />
            <button
              type="submit"
              className="whitespace-nowrap bg-kente-400 px-8 py-4 font-semibold text-forest-900 transition hover:bg-kente-300"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Category pills */}
      <section className="border-b border-ink-900/10 bg-cream-50">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 py-5">
          {categories.map((c) => (
            <Link
              key={c.category}
              href={`/activities?category=${encodeURIComponent(c.category)}`}
              className="whitespace-nowrap rounded-full border border-forest-800/20 px-5 py-2 text-sm text-forest-800 transition hover:border-forest-800 hover:bg-forest-50"
            >
              {c.category}
            </Link>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="font-display text-3xl text-forest-900">
          Where do you want to go?
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((r) => (
            <Link
              key={r.name}
              href={`/activities?q=${encodeURIComponent(r.name)}`}
              className="group relative h-44 overflow-hidden rounded-2xl"
            >
              <Image
                src={r.img}
                alt={r.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/85 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <p className="font-display text-xl text-cream-50">{r.name}</p>
                <p className="text-sm text-cream-100/80">{r.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured activities */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl text-forest-900">
            Top-rated experiences
          </h2>
          <Link
            href="/activities"
            className="text-sm font-medium text-clay-500 hover:text-clay-600"
          >
            See all
          </Link>
        </div>

        <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((a) => (
            <Link
              key={a.id}
              href={`/activities/${a.slug}`}
              className="group overflow-hidden rounded-2xl border border-ink-900/10 bg-white transition hover:shadow-lg"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={a.imageUrl}
                  alt={a.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-kente-400 px-3 py-1 text-xs font-semibold text-forest-900">
                  {a.category}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-clay-500">
                  {a.city}
                </p>
                <h3 className="mt-1 font-display text-lg leading-snug text-forest-900">
                  {a.title}
                </h3>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-ink-700/70">
                    ★ {a.rating.toFixed(1)} ({a.reviewCount})
                  </span>
                  <span className="font-semibold text-forest-900">
                    {formatPrice(a.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-forest-800">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
          {[
            { t: "Local operators", d: "Every tour is run by a Ghanaian guide or tour company, paid directly." },
            { t: "Free cancellation", d: "Cancel up to 24 hours before most experiences for a full refund." },
            { t: "Pay in cedis or USD", d: "Mobile money and card payments, priced clearly with no hidden fees." },
          ].map((f) => (
            <div key={f.t}>
              <h3 className="font-display text-xl text-kente-300">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-100/75">
                {f.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Operator CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-kente-400/40 bg-cream-100 px-8 py-10 text-center">
          <h2 className="font-display text-3xl text-forest-900">
            Run tours in Ghana?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-700/80">
            List your packages on Wayfare and reach travelers planning their
            trip before they land.
          </p>
          <button className="mt-6 rounded-full bg-forest-800 px-7 py-3 font-medium text-cream-50 transition hover:bg-forest-900">
            Become a partner
          </button>
        </div>
      </section>
    </>
  );
}
