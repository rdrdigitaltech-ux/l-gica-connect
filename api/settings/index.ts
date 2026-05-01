import { prisma } from "../_lib/prisma";
import { verifyToken, getTokenFromRequest, cors } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  cors(res);

  if (req.method === "OPTIONS") return res.status(200).end();

  // GET — público (usado pelo site para injetar CSS variables)
  if (req.method === "GET") {
    try {
      const items = await prisma.siteSettings.findMany({ orderBy: { key: "asc" } });
      const map: Record<string, string> = {};
      for (const s of items) map[s.key] = s.value;
      return res.status(200).json(map);
    } catch (error) {
      console.error("[GET /api/settings]", error);
      return res.status(500).json({ error: "Erro ao buscar configurações" });
    }
  }

  // PUT — requer autenticação
  if (req.method === "PUT") {
    const token = getTokenFromRequest(req);
    if (!token) return res.status(401).json({ error: "Não autenticado" });
    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ error: "Token inválido" });

    try {
      const updates: Record<string, string> = req.body || {};

      const ops = Object.entries(updates).map(([key, value]) =>
        prisma.siteSettings.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value), label: key },
        })
      );

      await prisma.$transaction(ops);

      const all = await prisma.siteSettings.findMany({ orderBy: { key: "asc" } });
      const map: Record<string, string> = {};
      for (const s of all) map[s.key] = s.value;
      return res.status(200).json(map);
    } catch (error) {
      console.error("[PUT /api/settings]", error);
      return res.status(500).json({ error: "Erro ao salvar configurações" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}
