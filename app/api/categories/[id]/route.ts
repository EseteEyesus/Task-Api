import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = await getUserFromRequest(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name } = body;

  const updated = await prisma.category.updateMany({
    where: { id: Number(params.id), userId },
    data: { name },
  });

  return NextResponse.json({ updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = await getUserFromRequest(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const categoryId = Number(params.id);

  await prisma.task.deleteMany({
    where: { categoryId, userId },
  });

  const deleted = await prisma.category.deleteMany({
    where: { id: categoryId, userId },
  });

  return NextResponse.json({ deleted });
}
