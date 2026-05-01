/**
 * GET /api/content/all
 * Retorna todos os campos com metadados completos (id, section, key, label, type, value)
 * Usado pelo painel admin para listar e editar campos
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
    const items = await prisma.siteContent.findMany({
      orderBy: [{ section: "asc" }, { key: "asc" }],
    });

    // Agrupar por seção retornando objetos completos
    const grouped: Record<string, typeof items> = {};
    for (const item of items) {
      if (!grouped[item.section]) grouped[item.section] = [];
      grouped[item.section].push(item);
    }

    return res.status(200).json(grouped);
  } catch (error) {
    console.error("[GET /api/content/all]", error);
    return res.status(500).json({ error: "Erro ao buscar conteúdo" });
  }
}
