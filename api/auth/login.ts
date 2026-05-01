import { createHash } from "crypto";
import { prisma } from "../_lib/prisma";
import { signToken, cors } from "../_lib/auth";

function hashPassword(password: string): string {
  return createHash("sha256")
    .update(password + (process.env.JWT_SECRET || "dev-secret-change-me"))
    .digest("hex");
}

export default async function handler(req: any, res: any) {
  cors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const hash = hashPassword(password);
    if (hash !== user.passwordHash) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = signToken({ userId: user.id, email: user.email });

    return res.status(200).json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("[POST /api/auth/login]", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
