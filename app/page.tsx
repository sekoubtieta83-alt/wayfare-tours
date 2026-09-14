import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await prisma.activity.findMany({
    orderBy: { rating: "desc" },
    take: 6,
  });

  return (
    <>
      <section className="border-b border-plum-900/10 bg-sand-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:grid-cols-2 sm:items-center">
          <div>
            <h1 className="font-display text-5xl leading-tight text-plum-900 sm:text-6xl">
              Spend your trip with someone who knows the place.
            </h1>
            <p className="mt-6 max-w-md text-lg text-plum-900/70">
              Wayfare connects travelers with local guides for food crawls,
              heritage walks, sunrise hikes, and everything in between.
            </p>
            <form
              action="/activities"
              className="mt-8 flex max-w-md overflow-hidden rounded-full border border-plum-900/20 bg-white"
            >
              <input
                type="text"
                name="q"
                placeholder="Try 'Accra' or 'Kyoto'"
                className="w-full bg-transparent px-5 py-3 text-plum-900 outline-none placeholder:text-plum-900/40"
              />
              <button
                type="submit"
                className="whitespace-nowrap bg-gold-400 px-6 py-3 font-medium text-plum-900 transition hover:bg-gold-300"
              >
                Search
              </button>
            </form>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"
              alt="Traveler overlooking a coastal town at golden hour"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl text-plum-900">
            Highly rated experiences
          </h2>
          <Link href="/activities" className="text-sm text-plum-400 hover:text-plum-900">
            View all tours
          </Link>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => (
            <Link
              key={a.id}
              href={`/activities/${a.slug}`}
              className="group overflow-hidden rounded-2xl border border-plum-900/10 bg-white transition hover:border-plum-900/30"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={a.imageUrl}
                  alt={a.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-gold-500">
                  {a.city}, {a.country}
                </p>
                <h3 className="mt-1 font-display text-lg text-plum-900">
                  {a.title}
                </h3>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-plum-900/60">
                    ★ {a.rating.toFixed(1)} ({a.reviewCount})
                  </span>
                  <span className="font-medium text-plum-900">
                    {formatPrice(a.price)}{" "}
                    <span className="font-normal text-plum-900/50">/ person</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
