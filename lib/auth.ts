import { verifyToken } from "@/utils/jwt";

export async function getUserFromRequest(
  request: Request
): Promise<number | null> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    console.warn("Missing Authorization header");
    return null;
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const payload = verifyToken(token);

  if (!payload || typeof payload.userId !== "number") {
    console.warn("Invalid or missing userId in token payload:", payload);
    return null;
  }

  return payload.userId;
}
