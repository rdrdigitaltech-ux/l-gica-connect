/**
 * dynamicItems.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Tipagem e helpers para itens dinâmicos (sistemas, equipamentos, serviços, modelos).
 * Todos os dados são persistidos no mesmo site_content (section/key/value),
 * usando um key especial "_items_json" que armazena um array JSON.
 */

import { loadContent, saveContent } from "@/hooks/useSiteContent";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface SistemaCard {
  id: string;
  nome: string;
  descricao: string;
  slug: string;
  badge: string;
  emoji: string;
  /** Conteúdo da página de detalhe gerado pelo admin */
  hero_titulo: string;
  hero_subtitulo: string;
  hero_badge: string;
  features: string; // separadas por \n
  imagem: string;
}

export interface EquipamentoCategoria {
  id: string;
  nome: string;
  descricao: string;
  slug: string;
  imagem: string;
  categoria: string;
  tipo: string;
  /** Conteúdo da página de detalhe */
  hero_titulo: string;
  hero_subtitulo: string;
  modelos_json: string; // JSON de ModeloCustom[]
}

export interface ServicoBloco {
  id: string;
  titulo: string;
  descricao: string;
  itens: string; // separados por \n
  imagem: string;
  whatsapp_texto: string;
}

export interface ModeloCustom {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  subcategoria: string;
  video_url?: string;
}

// ─── Keys de armazenamento ────────────────────────────────────────────────────

export const DYNAMIC_KEYS = {
  sistemas:    { section: "sistemas_extras",     key: "_items_json" },
  equipamentos:{ section: "equipamentos_extras", key: "_items_json" },
  servicos:    { section: "servicos_extras",     key: "_items_json" },
  modelos: (categoria: string) => ({
    section: `catalogo_${categoria}`,
    key: "_custom_models_json",
  }),
} as const;

// ─── Helpers de leitura síncrona ──────────────────────────────────────────────

function readJson<T>(section: string, key: string, fallback: T[]): T[] {
  try {
    const content = loadContent();
    const raw = content[section]?.[key];
    if (!raw) return fallback;
    return JSON.parse(raw) as T[];
  } catch {
    return fallback;
  }
}

export function getSistemasExtras(): SistemaCard[] {
  const { section, key } = DYNAMIC_KEYS.sistemas;
  return readJson<SistemaCard>(section, key, []);
}

export function getEquipamentosExtras(): EquipamentoCategoria[] {
  const { section, key } = DYNAMIC_KEYS.equipamentos;
  return readJson<EquipamentoCategoria>(section, key, []);
}

export function getServicosExtras(): ServicoBloco[] {
  const { section, key } = DYNAMIC_KEYS.servicos;
  return readJson<ServicoBloco>(section, key, []);
}

export function getModelosCustom(categoria: string): ModeloCustom[] {
  const { section, key } = DYNAMIC_KEYS.modelos(categoria);
  return readJson<ModeloCustom>(section, key, []);
}

// ─── Helpers de escrita ───────────────────────────────────────────────────────

async function writeJson(section: string, key: string, items: unknown[]): Promise<void> {
  const content = loadContent();
  if (!content[section]) content[section] = {};
  content[section][key] = JSON.stringify(items);
  await saveContent(content);
}

export async function saveSistemasExtras(items: SistemaCard[]): Promise<void> {
  const { section, key } = DYNAMIC_KEYS.sistemas;
  await writeJson(section, key, items);
}

export async function saveEquipamentosExtras(items: EquipamentoCategoria[]): Promise<void> {
  const { section, key } = DYNAMIC_KEYS.equipamentos;
  await writeJson(section, key, items);
}

export async function saveServicosExtras(items: ServicoBloco[]): Promise<void> {
  const { section, key } = DYNAMIC_KEYS.servicos;
  await writeJson(section, key, items);
}

export async function saveModelosCustom(
  categoria: string,
  items: ModeloCustom[]
): Promise<void> {
  const { section, key } = DYNAMIC_KEYS.modelos(categoria);
  await writeJson(section, key, items);
}

// ─── Hook de reatividade ──────────────────────────────────────────────────────

import { useState, useEffect } from "react";

function useDynamicItems<T>(reader: () => T[]): T[] {
  const [items, setItems] = useState<T[]>(reader);

  useEffect(() => {
    const refresh = () => setItems(reader());
    window.addEventListener("cms-content-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("cms-content-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return items;
}

export function useSistemasExtras() {
  return useDynamicItems(getSistemasExtras);
}

export function useEquipamentosExtras() {
  return useDynamicItems(getEquipamentosExtras);
}

export function useServicosExtras() {
  return useDynamicItems(getServicosExtras);
}

export function useModelosCustom(categoria: string) {
  return useDynamicItems(() => getModelosCustom(categoria));
}

// ─── Utilitários ──────────────────────────────────────────────────────────────

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
