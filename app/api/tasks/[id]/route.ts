import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Update a task by ID */
export async function PUT(request: NextRequest, context: any) {
  const { params } = await context;
  const id = parseInt(params?.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  const body = await request.json();

  try {
    // Optional: Check if task exists before update
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: body, // ensure client sends valid structure
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
  const { params } = await context;
  const id = parseInt(params?.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  try {
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

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
