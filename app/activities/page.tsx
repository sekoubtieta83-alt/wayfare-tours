import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const q = searchParams.q?.trim();
  const category = searchParams.category?.trim();

  const activities = await prisma.activity.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q } },
                { city: { contains: q } },
                { country: { contains: q } },
              ],
            }
          : {},
        category ? { category: { equals: category } } : {},
      ],
    },
    orderBy: { rating: "desc" },
  });

  const categories = await prisma.activity.findMany({
    distinct: ["category"],
    select: { category: true },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl text-plum-900">Explore tours</h1>

      <form className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by city, country, or tour name"
          className="flex-1 min-w-[220px] rounded-full border border-plum-900/20 bg-white px-5 py-2.5 text-plum-900 outline-none focus:border-plum-400"
        />
        <button
          type="submit"
          className="rounded-full bg-plum-900 px-6 py-2.5 font-medium text-sand-50 hover:bg-plum-800"
        >
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/activities"
          className={`rounded-full border px-4 py-1.5 text-sm ${
            !category
              ? "border-plum-900 bg-plum-900 text-sand-50"
              : "border-plum-900/20 text-plum-900/70 hover:border-plum-900/40"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.category}
            href={`/activities?category=${encodeURIComponent(c.category)}`}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              category === c.category
                ? "border-plum-900 bg-plum-900 text-sand-50"
                : "border-plum-900/20 text-plum-900/70 hover:border-plum-900/40"
            }`}
          >
            {c.category}
          </Link>
        ))}
      </div>

      <p className="mt-6 text-sm text-plum-900/60">
        {activities.length} tour{activities.length !== 1 ? "s" : ""} found
      </p>

      <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((a) => (
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

      {activities.length === 0 && (
        <p className="mt-12 text-center text-plum-900/50">
          No tours match that search. Try a different city or clear the filter.
        </p>
      )}
    </div>
  );
}
