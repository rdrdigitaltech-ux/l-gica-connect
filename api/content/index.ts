import { prisma } from "../_lib/prisma";
import { cors } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  cors(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" });

  try {
    const { section } = req.query || {};

    const items = await prisma.siteContent.findMany({
      where: section ? { section: String(section) } : undefined,
      orderBy: [{ section: "asc" }, { key: "asc" }],
    });

    // Agrupar por seção: { hero: { titulo: "...", subtitulo: "..." }, ... }
    const grouped: Record<string, Record<string, string>> = {};
    for (const item of items) {
      if (!grouped[item.section]) grouped[item.section] = {};
      grouped[item.section][item.key] = item.value;
    }

    // Se filtrou por seção, retorna só essa seção
    if (section) {
      return res.status(200).json(grouped[String(section)] || {});
    }

    return res.status(200).json(grouped);
  } catch (error) {
    console.error("[GET /api/content]", error);
    return res.status(500).json({ error: "Erro ao buscar conteúdo" });
  }
}
