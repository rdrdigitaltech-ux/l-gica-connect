/**
 * Catálogo hierárquico de equipamentos (CMS v2).
 * Persistência: site_content — section equipamentos_catalog, key _catalog_v2_json
 */

import { useEffect, useState } from "react";
import { loadContent, saveContent, buildEquipamentoModelosMerged } from "@/hooks/useSiteContent";
import type { ModeloEquipamento } from "@/data/equipamentosDetalhados";
import { textoCardModelo, textoDetalheModelo, parseSecoesExtrasJson } from "@/lib/equipamentoDisplay";
import type { EquipamentoCategoria as LegacyEquipCategoria } from "@/lib/dynamicItems";
import { getEquipamentosExtras } from "@/lib/dynamicItems";

export const EQUIPAMENTOS_CATALOG_SECTION = "equipamentos_catalog";
export const EQUIPAMENTOS_CATALOG_KEY = "_catalog_v2_json";

export interface EquipamentoBlocoDetalhe {
  id: string;
  titulo: string;
  texto: string;
  imagem: string;
  ordem: number;
}

export interface EquipamentoProdutoV2 {
  id: string;
  nome: string;
  foto_principal: string;
  galeria: string[];
  texto_resumido: string;
  texto_detalhado: string;
  subcategoria: string;
  marca: string;
  video_url: string;
  pdf_url: string;
  /** Reservado e-commerce futuro */
  preco_venda: string;
  preco_promocional: string;
  peso: string;
  dimensoes: string;
  estoque: string;
  ativo: boolean;
  blocos: EquipamentoBlocoDetalhe[];
  ordem: number;
}

export interface EquipamentoCategoriaV2 {
  id: string;
  nome: string;
  slug: string;
  imagem: string;
  /** Texto curto no card da página /equipamentos */
  resumo_card: string;
  /** Texto de apresentação no topo da página da categoria */
  texto_apresentacao: string;
  ordem: number;
  produtos: EquipamentoProdutoV2[];
  /** Metadados opcionais para filtros na página principal (legado) */
  categoria_filtro?: string;
  tipo_filtro?: string;
}

function sortOrdem<T extends { ordem: number }>(arr: T[]): T[] {
  return [...arr].sort((a, b) => a.ordem - b.ordem);
}

function readStored(): EquipamentoCategoriaV2[] {
  try {
    const raw = loadContent()[EQUIPAMENTOS_CATALOG_SECTION]?.[EQUIPAMENTOS_CATALOG_KEY];
    if (!raw?.trim()) return [];
    const parsed = JSON.parse(raw) as EquipamentoCategoriaV2[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeCategoria);
  } catch {
    return [];
  }
}

function normalizeCategoria(c: EquipamentoCategoriaV2): EquipamentoCategoriaV2 {
  return {
    ...c,
    produtos: sortOrdem(
      (c.produtos ?? []).map((p) => ({
        ...p,
        galeria: Array.isArray(p.galeria) ? p.galeria : [],
        ativo: p.ativo !== false,
        blocos: sortOrdem(
          (p.blocos ?? []).map((b) => ({
            ...b,
            imagem: b.imagem ?? "",
          }))
        ),
      }))
    ),
  };
}

let cachedMigration: EquipamentoCategoriaV2[] | null = null;

function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function legacyJsonRowToModelo(row: unknown, slug: string): ModeloEquipamento {
  const m = row as Record<string, unknown>;
  let imagens_extra: string[] | undefined;
  const g = m.imagens_extra;
  if (Array.isArray(g)) imagens_extra = g.filter((x) => typeof x === "string") as string[];
  else if (typeof g === "string" && g.trim()) {
    imagens_extra = g.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  }
  let secoes: ModeloEquipamento["secoes"];
  if (typeof m.secoes_json === "string" && m.secoes_json.trim()) {
    secoes = parseSecoesExtrasJson(m.secoes_json);
  }
  return {
    id: String(m.id ?? ""),
    nome: String(m.nome ?? ""),
    imagem: String(m.imagem ?? ""),
    descricao: String(m.descricao ?? ""),
    descricao_resumo: m.descricao_resumo ? String(m.descricao_resumo) : undefined,
    descricao_detalhe: m.descricao_detalhe ? String(m.descricao_detalhe) : undefined,
    categoria: slug,
    subcategoria: m.subcategoria ? String(m.subcategoria) : undefined,
    video_url: m.video_url ? String(m.video_url) : undefined,
    imagens_extra,
    secoes,
  };
}

function modeloLegacyToProduto(m: ModeloEquipamento, ordem: number): EquipamentoProdutoV2 {
  const blocos: EquipamentoBlocoDetalhe[] = (m.secoes ?? []).map((s, i) => ({
    id: newId(),
    titulo: s.titulo,
    texto: s.texto,
    imagem: "",
    ordem: i,
  }));
  return {
    id: m.id,
    nome: m.nome,
    foto_principal: m.imagem,
    galeria: [...(m.imagens_extra ?? [])],
    texto_resumido: textoCardModelo(m),
    texto_detalhado: textoDetalheModelo(m),
    subcategoria: m.subcategoria ?? "",
    marca: "",
    video_url: m.video_url ?? "",
    pdf_url: "",
    preco_venda: "",
    preco_promocional: "",
    peso: "",
    dimensoes: "",
    estoque: "",
    ativo: true,
    ordem,
    blocos,
  };
}

/** Migração a partir dos catálogos legados (catálogo_* + seção equipamentos). */
function buildLegacyMigrationCatalog(): EquipamentoCategoriaV2[] {
  const content = loadContent();
  const eq = content.equipamentos ?? {};

  /* Valores padrão se as chaves legadas já tiverem sido removidas do CMS */
  const EQ_FALLBACK: Record<
    string,
    { nome: string; resumo: string; titulo: string; desc: string; img: string }
  > = {
    balancas: {
      nome: "Balanças",
      resumo: "Balanças eletrônicas de alta precisão",
      titulo: "Balanças",
      desc: "Balanças eletrônicas de alta precisão para pesagem comercial",
      img: "/img/balança.webp",
    },
    impressoras: {
      nome: "Impressoras Fiscais",
      resumo: "Impressoras homologadas e térmicas",
      titulo: "Impressoras Fiscais",
      desc: "Impressoras homologadas e térmicas para emissão fiscal",
      img: "/img/impressora_fiscal.webp",
    },
    "relogio-ponto": {
      nome: "Relógios de Ponto",
      resumo: "Controle de acesso e ponto eletrônico",
      titulo: "Relógios de Ponto",
      desc: "Controle de acesso e ponto eletrônico para empresas",
      img: "/img/relogio_ponto.webp",
    },
    "leitor-codigo": {
      nome: "Leitores de Código de Barras",
      resumo: "Scanners e leitores de alta performance",
      titulo: "Leitores de Código de Barras",
      desc: "Scanners e leitores de alta performance para automação",
      img: "/img/leitor_codigo_barras.webp",
    },
    embaladoras: {
      nome: "Embaladoras",
      resumo: "Seladoras e máquinas de embalar",
      titulo: "Embaladoras",
      desc: "Seladoras e máquinas de embalar para seu negócio",
      img: "/img/embaladoras.webp",
    },
    computadores: {
      nome: "Computadores e Hardwares",
      resumo: "PCs, nobreaks, teclados e periféricos",
      titulo: "Computadores e Hardwares",
      desc: "PCs, nobreaks, teclados e periféricos para sua empresa",
      img: "/img/computadores.webp",
    },
  };

  const staticDefs: Array<{
    slug: string;
    catMerge: string;
    nomeKey: string;
    resumoKey: string;
    imgKey: string;
    apresentacaoTituloKey: string;
    apresentacaoDescKey: string;
    categoriaHub: string;
    tipoHub: string;
  }> = [
    {
      slug: "balancas",
      catMerge: "balancas",
      nomeKey: "balancas_nome",
      resumoKey: "balancas_descricao",
      imgKey: "balancas_imagem",
      apresentacaoTituloKey: "balancas_page_titulo",
      apresentacaoDescKey: "balancas_page_descricao",
      categoriaHub: "Pesagem",
      tipoHub: "Automação",
    },
    {
      slug: "impressoras",
      catMerge: "impressoras",
      nomeKey: "impressoras_nome",
      resumoKey: "impressoras_descricao",
      imgKey: "impressoras_imagem",
      apresentacaoTituloKey: "impressoras_page_titulo",
      apresentacaoDescKey: "impressoras_page_descricao",
      categoriaHub: "Impressão",
      tipoHub: "Fiscal",
    },
    {
      slug: "relogio-ponto",
      catMerge: "relogio-ponto",
      nomeKey: "relogio_nome",
      resumoKey: "relogio_descricao",
      imgKey: "relogio_imagem",
      apresentacaoTituloKey: "relogio_page_titulo",
      apresentacaoDescKey: "relogio_page_descricao",
      categoriaHub: "Controle de ponto",
      tipoHub: "Gestão",
    },
    {
      slug: "leitor-codigo",
      catMerge: "leitores",
      nomeKey: "leitor_nome",
      resumoKey: "leitor_descricao",
      imgKey: "leitor_imagem",
      apresentacaoTituloKey: "leitor_page_titulo",
      apresentacaoDescKey: "leitor_page_descricao",
      categoriaHub: "Identificação",
      tipoHub: "Automação",
    },
    {
      slug: "embaladoras",
      catMerge: "embaladoras",
      nomeKey: "embaladoras_nome",
      resumoKey: "embaladoras_descricao",
      imgKey: "embaladoras_imagem",
      apresentacaoTituloKey: "embaladoras_page_titulo",
      apresentacaoDescKey: "embaladoras_page_descricao",
      categoriaHub: "Embalagem",
      tipoHub: "Automação",
    },
    {
      slug: "computadores",
      catMerge: "computadores-hardware",
      nomeKey: "computadores_nome",
      resumoKey: "computadores_descricao",
      imgKey: "computadores_imagem",
      apresentacaoTituloKey: "computadores_page_titulo",
      apresentacaoDescKey: "computadores_page_descricao",
      categoriaHub: "Informática",
      tipoHub: "Hardware",
    },
  ];

  const out: EquipamentoCategoriaV2[] = [];

  staticDefs.forEach((def, idx) => {
    const sectionMap: Record<string, string> = {
      balancas: "catalogo_balancas",
      leitores: "catalogo_leitores",
      impressoras: "catalogo_impressoras",
      "relogio-ponto": "catalogo_relogio",
      "computadores-hardware": "catalogo_computadores",
      embaladoras: "catalogo_embaladoras",
    };
    const sec = sectionMap[def.catMerge];
    const secContent = sec ? (content[sec] ?? {}) : {};
    const modelos = buildEquipamentoModelosMerged(def.catMerge, secContent);
    const fb = EQ_FALLBACK[def.slug];
    const titulo = eq[def.apresentacaoTituloKey] || fb.titulo;
    const desc = eq[def.apresentacaoDescKey] || fb.desc;
    const apresentacao = desc ? `${titulo}\n\n${desc}`.trim() : titulo;

    out.push({
      id: `legacy-${def.slug}`,
      nome: eq[def.nomeKey] || fb.nome,
      slug: def.slug,
      imagem: eq[def.imgKey] || fb.img,
      resumo_card: eq[def.resumoKey] || fb.resumo,
      texto_apresentacao: apresentacao,
      ordem: idx,
      categoria_filtro: def.categoriaHub,
      tipo_filtro: def.tipoHub,
      produtos: modelos.map((m, i) => modeloLegacyToProduto(m, i)),
    });
  });

  const extras = getEquipamentosExtras();
  extras.forEach((ex: LegacyEquipCategoria, i) => {
    let produtos: EquipamentoProdutoV2[] = [];
    try {
      const raw = JSON.parse(ex.modelos_json || "[]") as unknown[];
      produtos = raw.map((m, j) =>
        modeloLegacyToProduto(legacyJsonRowToModelo(m, ex.slug), j)
      );
    } catch {
      produtos = [];
    }
    out.push({
      id: ex.id,
      nome: ex.nome,
      slug: ex.slug || ex.nome.toLowerCase().replace(/\s+/g, "-"),
      imagem: ex.imagem,
      resumo_card: ex.descricao,
      texto_apresentacao: [ex.hero_titulo, ex.hero_subtitulo].filter(Boolean).join("\n\n"),
      ordem: 100 + i,
      categoria_filtro: ex.categoria,
      tipo_filtro: ex.tipo,
      produtos,
    });
  });

  return sortOrdem(out);
}

/** Catálogo atual (lê storage; se vazio, migra legado uma vez e persiste). */
export function getEquipamentosCatalog(): EquipamentoCategoriaV2[] {
  const stored = readStored();
  if (stored.length > 0) return sortOrdem(stored.map(normalizeCategoria));
  if (cachedMigration) return sortOrdem(cachedMigration.map(normalizeCategoria));
  const mig = buildLegacyMigrationCatalog();
  if (mig.length === 0) return [];
  cachedMigration = mig;
  void saveEquipamentosCatalog(mig);
  return sortOrdem(mig.map(normalizeCategoria));
}

export async function saveEquipamentosCatalog(categories: EquipamentoCategoriaV2[]): Promise<void> {
  const normalized = sortOrdem(categories.map(normalizeCategoria));
  cachedMigration = null;
  const all = loadContent();
  if (!all[EQUIPAMENTOS_CATALOG_SECTION]) all[EQUIPAMENTOS_CATALOG_SECTION] = {};
  all[EQUIPAMENTOS_CATALOG_SECTION][EQUIPAMENTOS_CATALOG_KEY] = JSON.stringify(normalized);
  await saveContent(all);
}

export function findCategoriaBySlug(
  slug: string,
  catalog?: EquipamentoCategoriaV2[]
): EquipamentoCategoriaV2 | undefined {
  const c = catalog ?? getEquipamentosCatalog();
  return c.find((x) => x.slug === slug);
}

export function findProdutoInCategoria(
  categoria: EquipamentoCategoriaV2,
  produtoId: string
): EquipamentoProdutoV2 | undefined {
  return categoria.produtos.find((p) => p.id === produtoId);
}

/** Hook: catálogo reativo (localStorage + Supabase) */
export function useEquipamentosCatalog(): EquipamentoCategoriaV2[] {
  const [cats, setCats] = useState<EquipamentoCategoriaV2[]>(() => getEquipamentosCatalog());

  useEffect(() => {
    const refresh = () => setCats(getEquipamentosCatalog());
    window.addEventListener("cms-content-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("cms-content-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return cats;
}
