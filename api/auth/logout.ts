/**
 * POST /api/auth/logout
 *
 * Invalida a sessão limpando o cookie httpOnly portal_token.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  res.setHeader("Set-Cookie", [
    "portal_token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/",
  ]);

  return res.status(200).json({ ok: true });
}
