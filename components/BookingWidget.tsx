"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingWidget({
  activityId,
  pricePerPerson,
}: {
  activityId: string;
  pricePerPerson: number;
}) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [participants, setParticipants] = useState(2);

  const total = pricePerPerson * participants;

  function handleContinue() {
    const params = new URLSearchParams({
      activityId,
      date,
      participants: String(participants),
    });
    router.push(`/booking/new?${params.toString()}`);
  }

  return (
    <div className="mt-5 space-y-4">
      <div>
        <label className="block text-sm font-medium text-plum-900/70">
          Date
        </label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-plum-900/20 px-3 py-2 text-plum-900 outline-none focus:border-plum-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-plum-900/70">
          Participants
        </label>
        <div className="mt-1 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setParticipants((p) => Math.max(1, p - 1))}
            className="h-9 w-9 rounded-full border border-plum-900/20 text-plum-900 hover:bg-sand-100"
            aria-label="Decrease participants"
          >
            −
          </button>
          <span className="w-6 text-center text-plum-900">{participants}</span>
          <button
            type="button"
            onClick={() => setParticipants((p) => Math.min(20, p + 1))}
            className="h-9 w-9 rounded-full border border-plum-900/20 text-plum-900 hover:bg-sand-100"
            aria-label="Increase participants"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-plum-900/10 pt-4 text-plum-900">
        <span className="text-sm">Total</span>
        <span className="font-display text-xl">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(total)}
        </span>
      </div>

      <button
        onClick={handleContinue}
        className="w-full rounded-full bg-gold-400 py-3 font-medium text-plum-900 transition hover:bg-gold-300"
      >
        Continue to booking
      </button>
    </div>
  );
}
