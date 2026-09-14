import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: { activity: true },
  });

  if (!booking) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-2xl text-plum-900">
        ✓
      </div>
      <h1 className="mt-6 font-display text-3xl text-plum-900">
        Booking confirmed
      </h1>
      <p className="mt-2 text-plum-900/70">
        A confirmation has been sent to {booking.customerEmail}.
      </p>

      <div className="mt-8 rounded-2xl border border-plum-900/10 bg-white p-6 text-left">
        <h2 className="font-display text-xl text-plum-900">
          {booking.activity.title}
        </h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-plum-900/60">Booking ID</dt>
            <dd className="text-plum-900">{booking.id}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-plum-900/60">Date</dt>
            <dd className="text-plum-900">{formatDate(booking.date)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-plum-900/60">Participants</dt>
            <dd className="text-plum-900">{booking.participants}</dd>
          </div>
          <div className="flex justify-between border-t border-plum-900/10 pt-2 font-medium">
            <dt className="text-plum-900">Total paid</dt>
            <dd className="text-plum-900">{formatPrice(booking.totalPrice)}</dd>
          </div>
        </dl>
      </div>

      <Link
        href="/activities"
        className="mt-8 inline-block rounded-full bg-plum-900 px-6 py-3 font-medium text-sand-50 hover:bg-plum-800"
      >
        Browse more tours
      </Link>
    </div>
  );
}
