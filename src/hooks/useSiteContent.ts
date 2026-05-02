import { useState, useEffect, useMemo } from "react";
import { getDefaultValues, type ContentValues } from "@/data/defaultContent";
import {
  getModelosPorCategoria,
  type ModeloEquipamento,
} from "@/data/equipamentosDetalhados";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "logica_cms_content";

// ─── Leitura (síncrona, localStorage como cache) ────────────────────────────

/** Lê o conteúdo salvo no localStorage, mesclado com os defaults. */
export function loadContent(): ContentValues {
  const defaults = getDefaultValues();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const saved = JSON.parse(raw) as Partial<ContentValues>;
    const merged: ContentValues = { ...defaults };
    for (const section of Object.keys(saved)) {
      merged[section] = { ...defaults[section], ...saved[section] };
    }
    return merged;
  } catch {
    return defaults;
  }
}

// ─── Escrita (localStorage imediato + Supabase async) ───────────────────────

/**
 * Salva o conteúdo completo.
 * 1. Grava no localStorage imediatamente (UI reage na hora).
 * 2. Sincroniza com o Supabase em background (todos os usuários verão).
 */
export async function saveContent(content: ContentValues): Promise<void> {
  // Persiste localmente e notifica componentes
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event("cms-content-updated"));

  if (!supabase) return;

  // Monta array de upsert — ignora base64 (muito grande para o banco; fica só no localStorage)
  const rows: Array<{ section: string; key: string; value: string }> = [];
  for (const [section, fields] of Object.entries(content)) {
    for (const [key, val] of Object.entries(fields)) {
      const strVal = String(val);
      if (strVal.startsWith("data:")) continue;
      rows.push({ section, key, value: strVal });
    }
  }

  if (rows.length === 0) return;

  const { error } = await supabase
    .from("site_content")
    .upsert(rows, { onConflict: "section,key" });

  if (error) {
    // Log técnico somente no console (não expõe detalhes ao usuário final)
    console.error("[CMS] Erro ao salvar:", error.code, error.message);
    throw new Error("Não foi possível salvar as alterações. Tente novamente.");
  }
}

/** Atualiza um único campo e persiste. */
export async function updateField(
  section: string,
  key: string,
  value: string
): Promise<void> {
  const current = loadContent();
  if (!current[section]) current[section] = {};
  current[section][key] = value;
  await saveContent(current);
}

// ─── Sincronização inicial (Supabase → localStorage) ────────────────────────

/**
 * Busca todo o conteúdo do Supabase e atualiza o cache local.
 * Deve ser chamado uma vez no boot da aplicação.
 */
export async function syncFromSupabase(): Promise<void> {
  if (!supabase) return;

  const { data, error } = await supabase
    .from("site_content")
    .select("section, key, value");

  if (error) {
    console.warn("[CMS] Sincronização falhou:", error.message);
    return;
  }

  if (!data || data.length === 0) return;

  const base = getDefaultValues();
  for (const row of data) {
    if (!base[row.section]) base[row.section] = {};
    base[row.section][row.key] = row.value;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(base));
  window.dispatchEvent(new Event("cms-content-updated"));
}

// ─── Hooks React ─────────────────────────────────────────────────────────────

/**
 * Hook que retorna o conteúdo de uma seção específica.
 * Reage automaticamente quando o painel admin salva alterações.
 */
export function useSiteContent(section: string): { content: Record<string, string> } {
  const [content, setContent] = useState<Record<string, string>>(() => {
    return loadContent()[section] ?? {};
  });

  useEffect(() => {
    const refresh = () => setContent(loadContent()[section] ?? {});
    window.addEventListener("cms-content-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("cms-content-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [section]);

  return { content };
}

// ─── Hook: catálogo de equipamentos ─────────────────────────────────────────

const CATALOGO_SECTION: Record<string, string> = {
  balancas:              "catalogo_balancas",
  leitores:              "catalogo_leitores",
  impressoras:           "catalogo_impressoras",
  "relogio-ponto":       "catalogo_relogio",
  "computadores-hardware": "catalogo_computadores",
  embaladoras:           "catalogo_embaladoras",
};

export function useEquipamentoCatalogo(
  categoria: string
): { modelos: ModeloEquipamento[] } {
  const sectionKey = CATALOGO_SECTION[categoria] ?? `catalogo_${categoria}`;
  const { content } = useSiteContent(sectionKey);

  const modelos = useMemo(() => {
    const base = getModelosPorCategoria(categoria as ModeloEquipamento["categoria"]);
    const editados = base.map((modelo, idx) => {
      const i = idx + 1;
      return {
        ...modelo,
        nome:      content[`m${i}_nome`] ?? modelo.nome,
        imagem:    content[`m${i}_img`]  ?? modelo.imagem,
        descricao: content[`m${i}_desc`] ?? modelo.descricao,
      };
    });

    // Modelos customizados adicionados pelo admin (armazenados como JSON)
    let custom: ModeloEquipamento[] = [];
    try {
      const raw = content["_custom_models_json"];
      if (raw) {
        const parsed = JSON.parse(raw) as Array<{
          id: string; nome: string; imagem: string; descricao: string; subcategoria?: string;
        }>;
        custom = parsed.map((m) => ({
          id: m.id,
          nome: m.nome,
          imagem: m.imagem,
          descricao: m.descricao,
          categoria: categoria as ModeloEquipamento["categoria"],
          subcategoria: m.subcategoria,
        }));
      }
    } catch { /* ignora JSON inválido */ }

    return [...editados, ...custom];
  }, [content, categoria]);

  return { modelos };
}

// ─── Hook: todo o conteúdo ───────────────────────────────────────────────────

export function useAllContent(): { content: ContentValues } {
  const [content, setContent] = useState<ContentValues>(loadContent);

  useEffect(() => {
    const refresh = () => setContent(loadContent());
    window.addEventListener("cms-content-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("cms-content-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return { content };
}
