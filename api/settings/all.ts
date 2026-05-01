/**
 * GET /api/settings/all
 * Retorna configurações com metadados (id, key, label, value) para o painel admin
 */
import { prisma } from "../_lib/prisma";
import { verifyToken, getTokenFromRequest, cors } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  cors(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" });

  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: "Não autenticado" });
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Token inválido" });

  try {
    const items = await prisma.siteSettings.findMany({ orderBy: { key: "asc" } });
    return res.status(200).json(items);
  } catch (error) {
    console.error("[GET /api/settings/all]", error);
    return res.status(500).json({ error: "Erro ao buscar configurações" });
  }
}
