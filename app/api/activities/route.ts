import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  const category = req.nextUrl.searchParams.get("category")?.trim();

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

  return NextResponse.json(activities);
}
