"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutForm({
  activityId,
  date,
  participants,
}: {
  activityId: string;
  date: string;
  participants: number;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityId,
          date,
          participants,
          customerName: name,
          customerEmail: email,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      const booking = await res.json();
      router.push(`/confirmation/${booking.id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-plum-900/70">
          Full name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-plum-900/20 px-3 py-2 outline-none focus:border-plum-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-plum-900/70">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-plum-900/20 px-3 py-2 outline-none focus:border-plum-400"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-plum-900 py-3 font-medium text-sand-50 transition hover:bg-plum-800 disabled:opacity-60"
      >
        {loading ? "Booking..." : "Confirm booking"}
      </button>

      <p className="text-xs text-plum-900/50">
        Demo checkout — no real payment is collected.
      </p>
    </form>
  );
}
