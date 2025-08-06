// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "supersecret";

// export function signToken(payload: object) {
//   return jwt.sign(payload, SECRET, { expiresIn: "7d" });
// }

// export function verifyToken(token: string) {
//   return jwt.verify(token, SECRET);
// }
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function signToken(payload: { userId: number }) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: number } | null {
  try {
    const decoded = jwt.verify(token, SECRET) as { userId: number };
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
