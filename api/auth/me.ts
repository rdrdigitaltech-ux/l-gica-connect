import { prisma } from "../_lib/prisma";
import { verifyToken, getTokenFromRequest, cors } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  cors(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" });

  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: "Não autenticado" });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Token inválido ou expirado" });

  try {
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

    return res.status(200).json({ id: user.id, email: user.email });
  } catch (error) {
    console.error("[GET /api/auth/me]", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
