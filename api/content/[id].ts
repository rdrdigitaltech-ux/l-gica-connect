import { prisma } from "../_lib/prisma";
import { verifyToken, getTokenFromRequest, cors } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  cors(res);

  if (req.method === "OPTIONS") return res.status(200).end();

  // Autenticação obrigatória para qualquer operação
  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: "Não autenticado" });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Token inválido" });

  const id = Number(req.query?.id);
  if (!id || isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  // PUT /api/content/:id — atualiza o valor de um campo
  if (req.method === "PUT") {
    try {
      const { value } = req.body || {};
      if (value === undefined) return res.status(400).json({ error: "Campo 'value' obrigatório" });

      const updated = await prisma.siteContent.update({
        where: { id },
        data: { value: String(value) },
      });

      return res.status(200).json(updated);
    } catch (error: any) {
      if (error?.code === "P2025") {
        return res.status(404).json({ error: "Campo não encontrado" });
      }
      console.error("[PUT /api/content/:id]", error);
      return res.status(500).json({ error: "Erro ao atualizar" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}
