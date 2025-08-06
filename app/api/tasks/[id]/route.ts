import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Update a task by ID */
export async function PUT(request: NextRequest, context: any) {
  const id = parseInt(context?.params?.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  const body = await request.json();

  try {
    const updated = await prisma.task.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    console.error("Update error:", detail);
    return NextResponse.json(
      { error: "Failed to update task", detail },
      { status: 500 }
    );
  }
}

/** Delete a task by ID */
export async function DELETE(request: NextRequest, context: any) {
  const id = parseInt(context?.params?.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  try {
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    console.error("Delete error:", detail);
    return NextResponse.json(
      { error: "Failed to delete task", detail },
      { status: 500 }
    );
  }
}
