import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseHighlights, formatPrice } from "@/lib/format";
import BookingWidget from "@/components/BookingWidget";

export const dynamic = "force-dynamic";

export default async function ActivityDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const activity = await prisma.activity.findUnique({
    where: { slug: params.slug },
  });

  if (!activity) notFound();

  const highlights = parseHighlights(activity.highlights);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-wide text-gold-500">
        {activity.city}, {activity.country} · {activity.category}
      </p>
      <h1 className="mt-1 font-display text-4xl text-plum-900">
        {activity.title}
      </h1>
      <p className="mt-2 text-sm text-plum-900/60">
        ★ {activity.rating.toFixed(1)} ({activity.reviewCount} reviews) ·{" "}
        {activity.durationHrs} hour{activity.durationHrs !== 1 ? "s" : ""}
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative h-80 w-full overflow-hidden rounded-3xl sm:h-96">
            <Image
              src={activity.imageUrl}
              alt={activity.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h2 className="mt-8 font-display text-2xl text-plum-900">
            About this experience
          </h2>
          <p className="mt-3 leading-relaxed text-plum-900/80">
            {activity.description}
          </p>

          <h2 className="mt-8 font-display text-2xl text-plum-900">
            Highlights
          </h2>
          <ul className="mt-3 space-y-2">
            {highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-plum-900/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-plum-900/10 bg-white p-6 shadow-sm">
            <p className="font-display text-2xl text-plum-900">
              {formatPrice(activity.price)}{" "}
              <span className="text-sm font-normal text-plum-900/50">
                / person
              </span>
            </p>
            <BookingWidget
              activityId={activity.id}
              pricePerPerson={activity.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
