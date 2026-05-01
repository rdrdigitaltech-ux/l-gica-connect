/**
 * POST /api/upload
 * Recebe uma imagem em base64 e salva em /public/uploads/
 *
 * ⚠️  IMPORTANTE: No Vercel em produção, o filesystem é somente-leitura.
 * Para produção, use um serviço de armazenamento como Cloudinary ou AWS S3.
 * Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET
 * para ativar upload em nuvem automaticamente.
 *
 * Body esperado (JSON):
 * {
 *   "filename": "imagem.jpg",
 *   "data": "data:image/jpeg;base64,..."
 * }
 */
import { verifyToken, getTokenFromRequest, cors } from "./_lib/auth";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

export default async function handler(req: any, res: any) {
  cors(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: "Não autenticado" });
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Token inválido" });

  try {
    const { filename, data } = req.body || {};

    if (!filename || !data) {
      return res.status(400).json({ error: "filename e data são obrigatórios" });
    }

    // Valida que é uma imagem base64
    const base64Match = data.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!base64Match) {
      return res.status(400).json({ error: "Formato inválido. Use base64 com data URI." });
    }

    const buffer = Buffer.from(base64Match[2], "base64");

    // Sanitiza o nome do arquivo
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    const finalName = `${timestamp}_${safe}`;

    // ── Cloudinary (produção) ──────────────────────────────────────
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const formData = new FormData();
      const blob = new Blob([buffer], { type: base64Match[1] });
      formData.append("file", blob, finalName);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET || "ml_default");

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!cloudRes.ok) {
        const err = await cloudRes.json();
        return res.status(500).json({ error: "Erro no upload para Cloudinary", detail: err });
      }

      const json = await cloudRes.json();
      return res.status(200).json({ url: json.secure_url, filename: finalName });
    }

    // ── Filesystem local (desenvolvimento) ────────────────────────
    const uploadsDir = join(process.cwd(), "public", "uploads");
    mkdirSync(uploadsDir, { recursive: true });
    writeFileSync(join(uploadsDir, finalName), buffer);

    return res.status(200).json({ url: `/uploads/${finalName}`, filename: finalName });
  } catch (error) {
    console.error("[POST /api/upload]", error);
    return res.status(500).json({ error: "Erro ao fazer upload" });
  }
}
