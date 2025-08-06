import { NextRequest } from "next/server";
import  prisma  from "../../../../lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return new Response("Invalid ID format", { status: 400 });
  }

  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return new Response("Invalid category name", { status: 400 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return new Response(JSON.stringify(updatedCategory), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
