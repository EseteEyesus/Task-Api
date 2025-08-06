import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";


export async function GET(request: Request) {
  const userId = await getUserFromRequest(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      ...(status && { status }),
      ...(category && {
        category: {
          name: {
            equals: category,
            mode: "insensitive", // ✅ case-insensitive match
          },
        },
      }),
    },
    include: { category: true },
  });

  return NextResponse.json({ tasks });
}



export async function POST(request: Request) {
  const userId = await getUserFromRequest(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, description, categoryId, status } = body;

  if (!title || !categoryId) {
    return NextResponse.json(
      { error: "Missing title or category" },
      { status: 400 }
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      categoryId,
      status: status || "pending", // ✅ default to "pending" if not provided
      userId,
    },
  });

  return NextResponse.json({ task }, { status: 201 });
}
