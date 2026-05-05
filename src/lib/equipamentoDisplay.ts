/**
 * Textos e estruturas auxiliares para cards e página "Mais detalhes" de equipamentos.
 */

import type { ModeloEquipamento } from "@/data/equipamentosDetalhados";

export type SecaoEquipamentoDetalhe = { titulo: string; texto: string };

/** Texto exibido no card da listagem */
export function textoCardModelo(
  m: Pick<ModeloEquipamento, "descricao" | "descricao_resumo">
): string {
  const r = m.descricao_resumo?.trim();
  if (r) return r;
  return m.descricao;
}

/** Texto principal da página de detalhes */
export function textoDetalheModelo(
  m: Pick<ModeloEquipamento, "descricao" | "descricao_detalhe">
): string {
  const d = m.descricao_detalhe?.trim();
  if (d) return d;
  return m.descricao;
}

/** URLs extras (uma por linha no CMS) */
export function parseImagensExtraDeCampo(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** JSON: [{"titulo":"...","texto":"..."}] */
export function parseSecoesExtrasJson(raw: string | undefined): SecaoEquipamentoDetalhe[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const o = item as Record<string, unknown>;
        const titulo = typeof o.titulo === "string" ? o.titulo.trim() : "";
        const texto = typeof o.texto === "string" ? o.texto : "";
        if (!titulo && !texto.trim()) return null;
        return { titulo: titulo || "Seção", texto };
      })
      .filter(Boolean) as SecaoEquipamentoDetalhe[];
  } catch {
    return [];
  }
}

export function mergeImagensGaleria(principal: string, extras: string[] | undefined): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of [principal, ...(extras ?? [])]) {
    const s = u?.trim();
    if (!s || seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}
