import { NextResponse } from "next/server";
import {prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  const userId = await getUserFromRequest(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const categories = await prisma.category.findMany({
    where: { userId },
    include: { tasks: true },
  });

  return NextResponse.json({ categories });
}
export async function POST(request: Request) {
  const userId = await getUserFromRequest(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json(
      { error: "Category name is required" },
      { status: 400 }
    );
  }

  const category = await prisma.category.create({
    data: {
      name,
      userId,
    },
  });

  return NextResponse.json({ category }, { status: 201 });
}
