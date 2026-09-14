import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate, formatPrice } from "@/lib/format";
import CheckoutForm from "@/components/CheckoutForm";

export const dynamic = "force-dynamic";

export default async function NewBookingPage({
  searchParams,
}: {
  searchParams: { activityId?: string; date?: string; participants?: string };
}) {
  const { activityId, date, participants } = searchParams;

  if (!activityId || !date || !participants) notFound();

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
  });

  if (!activity) notFound();

  const numParticipants = Number(participants);
  const total = activity.price * numParticipants;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl text-plum-900">
        Confirm your booking
      </h1>

      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-plum-900">
            {activity.title}
          </h2>
          <p className="mt-1 text-sm text-plum-900/60">
            {activity.city}, {activity.country}
          </p>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-plum-900/60">Date</dt>
              <dd className="text-plum-900">{formatDate(date)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-plum-900/60">Participants</dt>
              <dd className="text-plum-900">{numParticipants}</dd>
            </div>
            <div className="flex justify-between border-t border-plum-900/10 pt-3 font-medium">
              <dt className="text-plum-900">Total</dt>
              <dd className="text-plum-900">{formatPrice(total)}</dd>
            </div>
          </dl>
        </div>

        <CheckoutForm
          activityId={activity.id}
          date={date}
          participants={numParticipants}
        />
      </div>
    </div>
  );
}
