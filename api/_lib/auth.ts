import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn("⚠️  JWT_SECRET não definido nas variáveis de ambiente");
}

export interface TokenPayload {
  userId: number;
  email: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET || "dev-secret-change-me", { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET || "dev-secret-change-me") as TokenPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: { headers: Record<string, string | string[] | undefined> }): string | null {
  const auth = req.headers["authorization"];
  const header = Array.isArray(auth) ? auth[0] : auth;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}

export function cors(res: { setHeader: (k: string, v: string) => void }) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
