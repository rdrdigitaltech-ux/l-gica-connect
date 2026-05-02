/**
 * GET /api/auth/verify
 *
 * Verifica o cookie de sessão portal_token e retorna os dados do usuário.
 * Chamado no carregamento inicial do AuthContext para restaurar a sessão.
 *
 * Variável necessária no Vercel:
 *   JWT_SECRET — mesma usada em /api/auth/login
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  cnpj: string;
  company: string;
  userType: "standard" | "premium";
  iat: number;
  exp: number;
}

function parseCookies(header: string): Record<string, string> {
  return Object.fromEntries(
    header.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k.trim(), v.join("=").trim()];
    })
  );
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("[auth/verify] JWT_SECRET não configurado.");
    return res.status(500).json({ error: "Erro interno de configuração." });
  }

  const cookieHeader = req.headers.cookie ?? "";
  const cookies = parseCookies(cookieHeader);
  const token = cookies["portal_token"];

  if (!token) {
    return res.status(401).json({ error: "Não autenticado." });
  }

  try {
    const payload = jwt.verify(token, secret) as TokenPayload;

    return res.status(200).json({
      user: {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        cnpj: payload.cnpj,
        company: payload.company,
        userType: payload.userType,
        registeredAt: "",
      },
    });
  } catch {
    // Token expirado ou inválido — limpa o cookie corrompido
    res.setHeader("Set-Cookie", [
      "portal_token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/",
    ]);
    return res.status(401).json({ error: "Sessão expirada. Faça login novamente." });
  }
}
