import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { activityId, date, participants, customerName, customerEmail } = body;

  if (!activityId || !date || !participants || !customerName || !customerEmail) {
    return NextResponse.json(
      { error: "Missing required booking fields." },
      { status: 400 }
    );
  }

  const activity = await prisma.activity.findUnique({ where: { id: activityId } });
  if (!activity) {
    return NextResponse.json({ error: "Activity not found." }, { status: 404 });
  }

  const totalPrice = activity.price * Number(participants);

  const booking = await prisma.booking.create({
    data: {
      activityId,
      date: new Date(date),
      participants: Number(participants),
      customerName,
      customerEmail,
      totalPrice,
    },
  });

  return NextResponse.json(booking, { status: 201 });
}
