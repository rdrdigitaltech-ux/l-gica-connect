/**
 * POST /api/auth/login
 *
 * Autentica um usuário do portal pelo CNPJ + senha.
 * A senha nunca trafega após o login; o token fica num cookie httpOnly.
 *
 * Variáveis de ambiente necessárias no Vercel (não prefixadas com VITE_):
 *   SUPABASE_URL              — mesma URL do projeto
 *   SUPABASE_SERVICE_ROLE_KEY — chave service_role (NUNCA exposta no frontend)
 *   JWT_SECRET                — string aleatória longa (≥ 32 chars)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const COOKIE_MAX_AGE = 8 * 60 * 60; // 8 horas em segundos
const JWT_EXPIRES_IN = "8h";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase não configurado no servidor.");
  return createClient(url, key, { auth: { persistSession: false } });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("[auth/login] JWT_SECRET não configurado.");
    return res.status(500).json({ error: "Erro interno de configuração." });
  }

  // Validação básica do body
  const { cnpj, password } = req.body ?? {};
  if (
    typeof cnpj !== "string" ||
    typeof password !== "string" ||
    !cnpj.trim() ||
    !password.trim()
  ) {
    return res.status(400).json({ error: "CNPJ e senha são obrigatórios." });
  }

  const cleanCnpj = cnpj.replace(/\D/g, "");
  if (cleanCnpj.length !== 14) {
    return res.status(400).json({ error: "CNPJ inválido." });
  }

  // Limite de tamanho de senha (anti-DoS em bcrypt)
  if (password.length > 128) {
    return res.status(400).json({ error: "Senha inválida." });
  }

  try {
    const supabase = getSupabase();

    // Busca o usuário pelo CNPJ (somente campos necessários)
    const { data: user, error: dbError } = await supabase
      .from("users")
      .select("id, email, name, cnpj, company, user_type, password_hash, created_at")
      .eq("cnpj", cleanCnpj)
      .single();

    if (dbError || !user) {
      // Resposta genérica para não revelar se o CNPJ existe
      return res.status(401).json({ error: "CNPJ ou senha incorretos." });
    }

    // Verifica a senha com bcrypt
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "CNPJ ou senha incorretos." });
    }

    // Emite JWT com claims mínimos (sem password_hash)
    const payload = {
      sub: String(user.id),
      name: user.name,
      email: user.email,
      cnpj: user.cnpj,
      company: user.company ?? "",
      userType: user.user_type,
    };

    const token = jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES_IN });

    // Cookie httpOnly — não acessível via JavaScript do browser
    res.setHeader("Set-Cookie", [
      `portal_token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${COOKIE_MAX_AGE}; Path=/`,
    ]);

    // Retorna apenas dados públicos do usuário (sem password_hash)
    return res.status(200).json({
      user: {
        id: String(user.id),
        name: user.name,
        email: user.email,
        cnpj: user.cnpj,
        company: user.company ?? "",
        userType: user.user_type as "standard" | "premium",
        registeredAt: user.created_at ?? "",
      },
    });
  } catch (err) {
    console.error("[auth/login] Erro interno:", err);
    return res.status(500).json({ error: "Erro interno. Tente novamente." });
  }
}
