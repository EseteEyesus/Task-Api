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
  const { title, description, status, categoryId } = body;

  // Only update fields that are provided
  const data: any = {};
  if (title !== undefined) data.title = title;
  if (description !== undefined) data.description = description;
  if (status !== undefined) data.status = status;
  if (categoryId !== undefined) data.categoryId = categoryId;

  const updated = await prisma.task.updateMany({
    where: { id: Number(params.id), userId },
    data,
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

  const deleted = await prisma.task.deleteMany({
    where: { id: Number(params.id), userId },
  });

  return NextResponse.json({ deleted });
}
