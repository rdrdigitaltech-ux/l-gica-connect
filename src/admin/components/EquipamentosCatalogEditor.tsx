/**
 * CMS Equipamentos — 3 níveis: categorias → produtos → edição de produto (com blocos).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRightLeft,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Plus,
  Save,
  Trash2,
  Upload,
  FileText,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { uploadCmsFileToStorage } from "@/lib/supabase";
import { slugify, generateId } from "@/lib/dynamicItems";
import {
  type EquipamentoBlocoDetalhe,
  type EquipamentoCategoriaV2,
  type EquipamentoProdutoV2,
  getEquipamentosCatalog,
  saveEquipamentosCatalog,
} from "@/lib/equipamentosCatalog";
import { Switch } from "@/components/ui/switch";

function newBloco(ordem: number): EquipamentoBlocoDetalhe {
  return { id: generateId(), titulo: "", texto: "", imagem: "", ordem };
}

function newProduto(ordem: number): EquipamentoProdutoV2 {
  return {
    id: generateId(),
    nome: "",
    foto_principal: "",
    galeria: [],
    texto_resumido: "",
    texto_detalhado: "",
    subcategoria: "",
    marca: "",
    video_url: "",
    pdf_url: "",
    cta_titulo: "",
    cta_subtitulo: "",
    cta_texto: "",
    cta_link: "",
    preco_venda: "",
    preco_promocional: "",
    peso: "",
    dimensoes: "",
    estoque: "",
    ativo: true,
    blocos: [],
    ordem,
  };
}

function newCategoria(ordem: number): EquipamentoCategoriaV2 {
  return {
    id: generateId(),
    nome: "",
    slug: "",
    imagem: "",
    resumo_card: "",
    texto_apresentacao: "",
    ordem,
    produtos: [],
    categoria_filtro: "",
    tipo_filtro: "",
  };
}

const inputClass =
  "w-full rounded-lg border border-gray-700/60 bg-gray-950/60 px-3 py-2 text-sm text-white outline-none focus:border-red-600/50";

export default function EquipamentosCatalogEditor({ onBack }: { onBack: () => void }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const ecat = searchParams.get("ecat") ?? "";
  const eprod = searchParams.get("eprod") ?? "";

  const [catalog, setCatalog] = useState<EquipamentoCategoriaV2[]>(() => getEquipamentosCatalog());
  const [showEco, setShowEco] = useState(false);


  const persist = async (next: EquipamentoCategoriaV2[]) => {
    try {
      await saveEquipamentosCatalog(next);
      setCatalog(getEquipamentosCatalog());
      toast.success("Catálogo salvo.");
    } catch {
      toast.error("Erro ao salvar.");
    }
  };

  const cat = useMemo(() => catalog.find((c) => c.id === ecat), [catalog, ecat]);
  const prod = useMemo(() => cat?.produtos.find((p) => p.id === eprod), [cat, eprod]);

  const goHubTextos = () => {
    setSearchParams({ section: "_equipamentos_textos" });
  };

  const setCatParam = (id: string, prodId = "") => {
    const p: Record<string, string> = { section: "equipamentos" };
    if (id) p.ecat = id;
    if (prodId) p.eprod = prodId;
    setSearchParams(p);
  };

  /* ─── Nível 1 ─── */
  if (!ecat) {
    return (
      <div className="space-y-6 pb-28">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <span className="text-gray-400">Painel</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">Equipamentos</span>
        </nav>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Categorias de equipamentos</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie categorias e produtos. URL pública: <code className="text-gray-400">/equipamentos/{"{slug}"}</code>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={goHubTextos}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
            >
              Textos da página /equipamentos
            </button>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={async () => {
            const next = [...catalog, newCategoria(catalog.length)];
            await persist(next);
            const added = next[next.length - 1];
            setCatParam(added.id);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          Adicionar categoria
        </button>

        <div className="overflow-hidden rounded-xl border border-gray-800/60">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 bg-gray-900/80 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Ordem</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Produtos</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {[...catalog].sort((a, b) => a.ordem - b.ordem).map((c) => (
                <tr key={c.id} className="text-gray-300">
                  <td className="px-4 py-3">{c.ordem}</td>
                  <td className="px-4 py-3 font-medium text-white">{c.nome || "(sem nome)"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{c.slug || "—"}</td>
                  <td className="px-4 py-3">{c.produtos.length}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setCatParam(c.id)}
                      className="mr-2 text-red-400 hover:underline"
                    >
                      Abrir
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirm(`Excluir a categoria "${c.nome}" e todos os produtos?`)) return;
                        await persist(catalog.filter((x) => x.id !== c.id));
                      }}
                      className="text-gray-500 hover:text-red-400"
                    >
                      <Trash2 className="inline h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* ─── Edição categoria (lista produtos) ─── */
  if (!eprod && cat) {
    return (
      <CategoryProductsView
        catalog={catalog}
        cat={cat}
        onBack={() => setSearchParams({ section: "equipamentos" })}
        onPersist={persist}
        onOpenProd={(pid) => setCatParam(cat.id, pid)}
      />
    );
  }

  /* ─── Edição produto ─── */
  if (cat && prod) {
    return (
      <ProductEditorView
        catalog={catalog}
        cat={cat}
        prod={prod}
        showEco={showEco}
        setShowEco={setShowEco}
        onBack={() => setCatParam(cat.id)}
        onPersist={persist}
      />
    );
  }

  return (
    <div className="p-6 text-gray-400">
      <p>Item não encontrado.</p>
      <button type="button" onClick={() => setSearchParams({ section: "equipamentos" })} className="mt-4 text-red-400">
        Voltar às categorias
      </button>
    </div>
  );
}

function CategoryProductsView({
  catalog,
  cat,
  onBack,
  onPersist,
  onOpenProd,
}: {
  catalog: EquipamentoCategoriaV2[];
  cat: EquipamentoCategoriaV2;
  onBack: () => void;
  onPersist: (c: EquipamentoCategoriaV2[]) => Promise<void>;
  onOpenProd: (id: string) => void;
}) {
  const [nome, setNome] = useState(cat.nome);
  const [slug, setSlug] = useState(cat.slug);
  const [imagem, setImagem] = useState(cat.imagem);
  const [resumoCard, setResumoCard] = useState(cat.resumo_card);
  const [apresentacao, setApresentacao] = useState(cat.texto_apresentacao);
  const [ordem, setOrdem] = useState(String(cat.ordem));
  const [cf, setCf] = useState(cat.categoria_filtro ?? "");
  const [tf, setTf] = useState(cat.tipo_filtro ?? "");
  const fileRef = useRef<HTMLInputElement>(null);
  const [dirty, setDirty] = useState(false);

  // Transferência de produto
  const [transferProdId, setTransferProdId] = useState<string | null>(null);
  const [transferDestId, setTransferDestId] = useState("");

  const otherCategories = catalog.filter((c) => c.id !== cat.id);

  const doTransfer = async () => {
    if (!transferProdId || !transferDestId) return;
    const produto = cat.produtos.find((p) => p.id === transferProdId);
    if (!produto) return;
    const next = catalog.map((c) => {
      if (c.id === cat.id) return { ...c, produtos: c.produtos.filter((p) => p.id !== transferProdId) };
      if (c.id === transferDestId) return { ...c, produtos: [...c.produtos, { ...produto, ordem: c.produtos.length }] };
      return c;
    });
    await onPersist(next);
    setTransferProdId(null);
    setTransferDestId("");
  };

  const saveCatMeta = async () => {
    const o = parseInt(ordem, 10) || 0;
    const next = catalog.map((c) =>
      c.id === cat.id
        ? {
            ...c,
            nome,
            slug: slug || slugify(nome),
            imagem,
            resumo_card: resumoCard,
            texto_apresentacao: apresentacao,
            ordem: o,
            categoria_filtro: cf,
            tipo_filtro: tf,
          }
        : c
    );
    await onPersist(next);
    setDirty(false);
  };

  const prods = [...cat.produtos].sort((a, b) => a.ordem - b.ordem);

  return (
    <div className="space-y-6 pb-28">
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
        <span className="text-gray-400">Painel</span>
        <ChevronRight className="h-3 w-3" />
        <button type="button" onClick={onBack} className="hover:text-white">
          Equipamentos
        </button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">{cat.nome || "Categoria"}</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-white">Editar categoria</h1>
        <div className="flex gap-2">
          <button type="button" onClick={onBack} className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-400">
            <ArrowLeft className="mr-1 inline h-4 w-4" />
            Voltar
          </button>
          <button
            type="button"
            disabled={!dirty}
            onClick={() => void saveCatMeta()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            <Save className="h-4 w-4" />
            Salvar categoria
          </button>
        </div>
      </div>

      <div className="grid gap-4 rounded-xl border border-gray-800/60 bg-gray-900/40 p-5 md:grid-cols-2">
        <label className="block text-xs text-gray-400">
          Nome da categoria
          <input
            className={`mt-1 ${inputClass}`}
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setDirty(true);
            }}
          />
        </label>
        <label className="block text-xs text-gray-400">
          Slug (URL)
          <input
            className={`mt-1 ${inputClass}`}
            value={slug}
            placeholder={slugify(nome || "categoria")}
            onChange={(e) => {
              setSlug(e.target.value);
              setDirty(true);
            }}
          />
        </label>
        <label className="block text-xs text-gray-400">
          Ordem de exibição
          <input
            type="number"
            className={`mt-1 ${inputClass}`}
            value={ordem}
            onChange={(e) => {
              setOrdem(e.target.value);
              setDirty(true);
            }}
          />
        </label>
        <div className="text-xs text-gray-400">
          Imagem / ícone
          <div className="mt-1 flex gap-2">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const url = await uploadCmsFileToStorage(f);
              if (url) {
                setImagem(url);
                setDirty(true);
                toast.success("Imagem enviada.");
              } else toast.error("Falha no upload.");
            }} />
            <button type="button" onClick={() => fileRef.current?.click()} className={inputClass}>
              <Upload className="mr-1 inline h-3.5 w-3.5" />
              Upload
            </button>
            <input
              className={inputClass}
              value={imagem}
              placeholder="URL"
              onChange={(e) => {
                setImagem(e.target.value);
                setDirty(true);
              }}
            />
          </div>
          {imagem && <img src={imagem} alt="" className="mt-2 h-20 rounded object-cover" />}
        </div>
        <label className="md:col-span-2 block text-xs text-gray-400">
          Resumo (card na página /equipamentos)
          <textarea
            className={`mt-1 ${inputClass} min-h-[72px]`}
            value={resumoCard}
            onChange={(e) => {
              setResumoCard(e.target.value);
              setDirty(true);
            }}
          />
        </label>
        <label className="md:col-span-2 block text-xs text-gray-400">
          Texto de apresentação (topo da página da categoria)
          <textarea
            className={`mt-1 ${inputClass} min-h-[100px]`}
            value={apresentacao}
            onChange={(e) => {
              setApresentacao(e.target.value);
              setDirty(true);
            }}
          />
        </label>
        <label className="block text-xs text-gray-400">
          Filtro — categoria (hub, opcional)
          <input className={`mt-1 ${inputClass}`} value={cf} onChange={(e) => { setCf(e.target.value); setDirty(true); }} />
        </label>
        <label className="block text-xs text-gray-400">
          Filtro — tipo (hub, opcional)
          <input className={`mt-1 ${inputClass}`} value={tf} onChange={(e) => { setTf(e.target.value); setDirty(true); }} />
        </label>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Produtos desta categoria</h2>
        <button
          type="button"
          onClick={async () => {
            const p = newProduto(cat.produtos.length);
            const next = catalog.map((c) =>
              c.id === cat.id ? { ...c, produtos: [...c.produtos, p] } : c
            );
            await onPersist(next);
            onOpenProd(p.id);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-700/80 px-3 py-2 text-sm text-white"
        >
          <Plus className="h-4 w-4" />
          Adicionar produto
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-800/60">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-800 bg-gray-900/80 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Ordem</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Subcategoria</th>
              <th className="px-4 py-3">Ativo</th>
              <th className="px-4 py-3 text-right">Ações</th>
              {otherCategories.length > 0 && <th className="px-4 py-3 text-right">Transferir</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {prods.map((p, idx) => (
              <tr key={p.id} className="text-gray-300">
                <td className="px-3 py-3">
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={async () => {
                        const arr = [...prods];
                        [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                        const next = catalog.map((c) =>
                          c.id === cat.id
                            ? { ...c, produtos: arr.map((x, i) => ({ ...x, ordem: i })) }
                            : c
                        );
                        await onPersist(next);
                      }}
                      className="rounded border border-gray-700 p-0.5 disabled:opacity-30 hover:bg-gray-800"
                      title="Mover para cima"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx >= prods.length - 1}
                      onClick={async () => {
                        const arr = [...prods];
                        [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
                        const next = catalog.map((c) =>
                          c.id === cat.id
                            ? { ...c, produtos: arr.map((x, i) => ({ ...x, ordem: i })) }
                            : c
                        );
                        await onPersist(next);
                      }}
                      className="rounded border border-gray-700 p-0.5 disabled:opacity-30 hover:bg-gray-800"
                      title="Mover para baixo"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-white">{p.nome || "(sem nome)"}</td>
                <td className="px-4 py-3">{p.subcategoria || "—"}</td>
                <td className="px-4 py-3">{p.ativo !== false ? "Sim" : "Não"}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => onOpenProd(p.id)} className="text-red-400 hover:underline">
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!confirm("Excluir este produto?")) return;
                      const next = catalog.map((c) =>
                        c.id === cat.id ? { ...c, produtos: c.produtos.filter((x) => x.id !== p.id) } : c
                      );
                      await onPersist(next);
                    }}
                    className="ml-3 text-gray-500 hover:text-red-400"
                  >
                    <Trash2 className="inline h-4 w-4" />
                  </button>
                </td>
                {otherCategories.length > 0 && (
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => { setTransferProdId(p.id); setTransferDestId(""); }}
                      className="text-blue-400 hover:text-blue-300"
                      title="Transferir para outra categoria"
                    >
                      <ArrowRightLeft className="inline h-4 w-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de transferência */}
      {transferProdId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Transferir produto</h3>
              <button type="button" onClick={() => setTransferProdId(null)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-1 text-sm text-gray-400">
              Produto: <span className="font-medium text-white">{cat.produtos.find((p) => p.id === transferProdId)?.nome || "(sem nome)"}</span>
            </p>
            <p className="mb-4 text-sm text-gray-400">
              Categoria atual: <span className="font-medium text-white">{cat.nome}</span>
            </p>
            <label className="block text-xs text-gray-400">
              Mover para a categoria:
              <select
                className={`mt-1 ${inputClass}`}
                value={transferDestId}
                onChange={(e) => setTransferDestId(e.target.value)}
              >
                <option value="">Selecione a categoria destino...</option>
                {otherCategories.sort((a, b) => a.ordem - b.ordem).map((c) => (
                  <option key={c.id} value={c.id}>{c.nome || "(sem nome)"}</option>
                ))}
              </select>
            </label>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setTransferProdId(null)}
                className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={!transferDestId}
                onClick={() => void doTransfer()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40 hover:bg-blue-500"
              >
                <ArrowRightLeft className="h-4 w-4" />
                Transferir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductEditorView({
  catalog,
  cat,
  prod,
  showEco,
  setShowEco,
  onBack,
  onPersist,
}: {
  catalog: EquipamentoCategoriaV2[];
  cat: EquipamentoCategoriaV2;
  prod: EquipamentoProdutoV2;
  showEco: boolean;
  setShowEco: (v: boolean) => void;
  onBack: () => void;
  onPersist: (c: EquipamentoCategoriaV2[]) => Promise<void>;
}) {
  const [, setSearchParams] = useSearchParams();
  const withCtaDefaults = useCallback((p: EquipamentoProdutoV2): EquipamentoProdutoV2 => {
    const defaultLink = `https://wa.me/5547984218275?text=${encodeURIComponent(
      `Olá! Gostaria de solicitar um orçamento para o produto: ${p.nome}`
    )}`;
    return {
      ...p,
      galeria: [...p.galeria],
      cta_titulo:    p.cta_titulo    ?? `Interessado no ${p.nome}?`,
      cta_subtitulo: p.cta_subtitulo ?? "Fale com nossa equipe e receba um orçamento personalizado.",
      cta_texto:     p.cta_texto     ?? "Orçar pelo WhatsApp",
      cta_link:      p.cta_link      ?? defaultLink,
    };
  }, []);

  const [draft, setDraft] = useState<EquipamentoProdutoV2>(() => withCtaDefaults(prod));
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDraft(withCtaDefaults(prod));
    setDirty(false);
  }, [prod.id, cat.id, withCtaDefaults]);
  const mainRef = useRef<HTMLInputElement>(null);
  const galRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);

  const patch = (partial: Partial<EquipamentoProdutoV2>) => {
    setDraft((d) => ({ ...d, ...partial }));
    setDirty(true);
  };

  const saveProd = async () => {
    const next = catalog.map((c) => {
      if (c.id !== cat.id) return c;
      return {
        ...c,
        produtos: c.produtos.map((p) => (p.id === prod.id ? { ...draft, blocos: draft.blocos.map((b, i) => ({ ...b, ordem: i })) } : p)),
      };
    });
    await onPersist(next);
    setDirty(false);
  };

  const blocos = [...draft.blocos].sort((a, b) => a.ordem - b.ordem);

  return (
    <div className="space-y-6 pb-32">
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
        <span className="text-gray-400">Painel</span>
        <ChevronRight className="h-3 w-3" />
        <button type="button" onClick={() => setSearchParams({ section: "equipamentos" })} className="hover:text-white">
          Equipamentos
        </button>
        <ChevronRight className="h-3 w-3" />
        <button type="button" onClick={onBack} className="hover:text-white">
          {cat.nome}
        </button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">{draft.nome || "Produto"}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-300">Editar</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-white">Editar produto</h1>
        <div className="flex gap-2">
          <button type="button" onClick={onBack} className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-400">
            Voltar
          </button>
          <button
            type="button"
            disabled={!dirty}
            onClick={() => void saveProd()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            <Save className="h-4 w-4" />
            Salvar produto
          </button>
        </div>
      </div>

      <div className="grid gap-4 rounded-xl border border-gray-800/60 bg-gray-900/40 p-5 md:grid-cols-2">
        <label className="block text-xs text-gray-400">
          Nome do produto *
          <input
            className={`mt-1 ${inputClass}`}
            value={draft.nome}
            onChange={(e) => {
              const newNome = e.target.value;
              const defaultLink = (nome: string) =>
                `https://wa.me/5547984218275?text=${encodeURIComponent(
                  `Olá! Gostaria de solicitar um orçamento para o produto: ${nome}`
                )}`;
              const isDefaultLink   = draft.cta_link   === defaultLink(draft.nome);
              const isDefaultTitulo = draft.cta_titulo === `Interessado no ${draft.nome}?`;
              patch({
                nome: newNome,
                ...(isDefaultLink   ? { cta_link:   defaultLink(newNome) }            : {}),
                ...(isDefaultTitulo ? { cta_titulo: `Interessado no ${newNome}?` }    : {}),
              });
            }}
          />
        </label>
        <label className="block text-xs text-gray-400">
          Marca
          <input className={`mt-1 ${inputClass}`} value={draft.marca} onChange={(e) => patch({ marca: e.target.value })} />
        </label>
        <label className="block text-xs text-gray-400">
          Subcategoria / tipo (filtro na listagem)
          <input className={`mt-1 ${inputClass}`} value={draft.subcategoria} onChange={(e) => patch({ subcategoria: e.target.value })} />
        </label>
        <div className="flex items-end gap-3">
          <span className="text-xs text-gray-400">Ativo na loja</span>
          <Switch checked={draft.ativo !== false} onCheckedChange={(c) => patch({ ativo: c })} />
        </div>

        <div className="md:col-span-2 text-xs text-gray-400">
          Foto principal
          <div className="mt-1 flex flex-wrap gap-2">
            <input ref={mainRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const url = await uploadCmsFileToStorage(f);
              if (url) patch({ foto_principal: url });
            }} />
            <button type="button" onClick={() => mainRef.current?.click()} className={inputClass}>
              <Upload className="inline h-3.5 w-3.5" />
            </button>
            <input className={`flex-1 ${inputClass}`} value={draft.foto_principal} onChange={(e) => patch({ foto_principal: e.target.value })} />
          </div>
          {draft.foto_principal && <img src={draft.foto_principal} alt="" className="mt-2 h-24 rounded object-cover" />}
        </div>

        <label className="md:col-span-2 block text-xs text-gray-400">
          Texto resumido (card na listagem da categoria)
          <textarea className={`mt-1 ${inputClass} min-h-[80px]`} value={draft.texto_resumido} onChange={(e) => patch({ texto_resumido: e.target.value })} />
        </label>
        <label className="md:col-span-2 block text-xs text-gray-400">
          Texto detalhado (página Mais detalhes — independente do resumo)
          <textarea className={`mt-1 ${inputClass} min-h-[120px]`} value={draft.texto_detalhado} onChange={(e) => patch({ texto_detalhado: e.target.value })} />
        </label>

        <label className="md:col-span-2 block text-xs text-gray-400">
          Vídeo YouTube (embed na página de detalhes)
          <input className={`mt-1 ${inputClass}`} value={draft.video_url} onChange={(e) => patch({ video_url: e.target.value })} placeholder="https://youtube.com/..." />
        </label>

        <div className="md:col-span-2 text-xs text-gray-400">
          Galeria de fotos (detalhes)
          <input ref={galRef} type="file" accept="image/*" multiple className="hidden" onChange={async (e) => {
            const fs = e.target.files;
            if (!fs?.length) return;
            const urls: string[] = [];
            for (let i = 0; i < fs.length; i++) {
              const u = await uploadCmsFileToStorage(fs[i]);
              if (u) urls.push(u);
            }
            if (urls.length) patch({ galeria: [...draft.galeria, ...urls] });
          }} />
          <div className="mt-1 flex flex-wrap gap-2">
            <button type="button" onClick={() => galRef.current?.click()} className={inputClass}>
              Adicionar imagens
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {draft.galeria.map((u) => (
              <div key={u} className="relative">
                <img src={u} alt="" className="h-16 w-16 rounded object-cover" />
                <button
                  type="button"
                  className="absolute -right-1 -top-1 rounded bg-red-600 p-0.5 text-[10px] text-white"
                  onClick={() => patch({ galeria: draft.galeria.filter((x) => x !== u) })}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 text-xs text-gray-400">
          PDF de especificações
          <input ref={pdfRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const url = await uploadCmsFileToStorage(f);
            if (url) patch({ pdf_url: url });
            else toast.error("Upload PDF falhou. Verifique o bucket no Supabase (permitir PDF).");
          }} />
          <div className="mt-1 flex flex-wrap gap-2">
            <button type="button" onClick={() => pdfRef.current?.click()} className={inputClass}>
              <FileText className="inline h-3.5 w-3.5" /> Enviar PDF
            </button>
            <input className={`flex-1 ${inputClass}`} value={draft.pdf_url} onChange={(e) => patch({ pdf_url: e.target.value })} placeholder="URL do PDF se já estiver hospedado" />
          </div>
        </div>

        {/* ── CTA do produto ───────────────────────────────────────────── */}
        <div className="md:col-span-2 overflow-hidden rounded-xl border border-green-900/30 bg-green-950/10">
          <div className="flex items-center gap-2 border-b border-green-900/20 px-4 py-3">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-green-400">CTA — Chamada para Ação deste produto</span>
          </div>
          <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2">
            <label className="md:col-span-2 block text-xs text-gray-400">
              Título (h1)
              <input
                className={`mt-1 ${inputClass}`}
                value={draft.cta_titulo ?? ""}
                onChange={(e) => patch({ cta_titulo: e.target.value })}
                placeholder={`Interessado no ${draft.nome}?`}
              />
            </label>
            <label className="md:col-span-2 block text-xs text-gray-400">
              Subtítulo / descrição
              <input
                className={`mt-1 ${inputClass}`}
                value={draft.cta_subtitulo ?? ""}
                onChange={(e) => patch({ cta_subtitulo: e.target.value })}
                placeholder="Fale com nossa equipe e receba um orçamento personalizado."
              />
            </label>
            <label className="block text-xs text-gray-400">
              Texto do botão
              <input
                className={`mt-1 ${inputClass}`}
                value={draft.cta_texto ?? ""}
                onChange={(e) => patch({ cta_texto: e.target.value })}
                placeholder="Orçar pelo WhatsApp"
              />
            </label>
            <label className="block text-xs text-gray-400">
              Link do botão (URL ou WhatsApp)
              <input
                className={`mt-1 ${inputClass}`}
                value={draft.cta_link ?? ""}
                onChange={(e) => patch({ cta_link: e.target.value })}
                placeholder="https://wa.me/5547984218275?text=..."
              />
            </label>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowEco(!showEco)}
        className="flex w-full items-center justify-between rounded-lg border border-amber-900/40 bg-amber-950/20 px-4 py-3 text-sm text-amber-200/90"
      >
        <span>Campos reservados — e-commerce futuro (preço, estoque, etc.)</span>
        {showEco ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {showEco && (
        <div className="grid gap-3 rounded-xl border border-gray-800/60 bg-gray-950/40 p-4 md:grid-cols-2">
          <label className="text-xs text-gray-400">
            Preço de venda
            <input className={`mt-1 ${inputClass}`} value={draft.preco_venda} onChange={(e) => patch({ preco_venda: e.target.value })} />
          </label>
          <label className="text-xs text-gray-400">
            Preço promocional
            <input className={`mt-1 ${inputClass}`} value={draft.preco_promocional} onChange={(e) => patch({ preco_promocional: e.target.value })} />
          </label>
          <label className="text-xs text-gray-400">
            Peso
            <input className={`mt-1 ${inputClass}`} value={draft.peso} onChange={(e) => patch({ peso: e.target.value })} />
          </label>
          <label className="text-xs text-gray-400">
            Dimensões
            <input className={`mt-1 ${inputClass}`} value={draft.dimensoes} onChange={(e) => patch({ dimensoes: e.target.value })} />
          </label>
          <label className="text-xs text-gray-400 md:col-span-2">
            Estoque
            <input className={`mt-1 ${inputClass}`} value={draft.estoque} onChange={(e) => patch({ estoque: e.target.value })} />
          </label>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Seções extras (Mais detalhes)</h2>
          <button
            type="button"
            onClick={() => {
              const nb = newBloco(blocos.length);
              patch({ blocos: [...draft.blocos, nb] });
            }}
            className="text-sm text-red-400 hover:underline"
          >
            + Adicionar bloco
          </button>
        </div>
        {blocos.map((b, idx) => (
          <BlocoRow
            key={b.id}
            b={b}
            idx={idx}
            total={blocos.length}
            onChange={(nb) => {
              const next = draft.blocos.map((x) => (x.id === b.id ? nb : x));
              patch({ blocos: next });
            }}
            onMove={(dir) => {
              const arr = [...blocos];
              const j = idx + dir;
              if (j < 0 || j >= arr.length) return;
              [arr[idx], arr[j]] = [arr[j], arr[idx]];
              patch({ blocos: arr.map((x, i) => ({ ...x, ordem: i })) });
            }}
            onRemove={() => patch({ blocos: draft.blocos.filter((x) => x.id !== b.id) })}
          />
        ))}
      </div>
    </div>
  );
}

function BlocoRow({
  b,
  idx,
  total,
  onChange,
  onMove,
  onRemove,
}: {
  b: EquipamentoBlocoDetalhe;
  idx: number;
  total: number;
  onChange: (b: EquipamentoBlocoDetalhe) => void;
  onMove: (dir: number) => void;
  onRemove: () => void;
}) {
  const imgRef = useRef<HTMLInputElement>(null);
  return (
    <div className="rounded-xl border border-gray-800/60 bg-gray-900/30 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">Bloco {idx + 1}</span>
        <div className="flex gap-1">
          <button type="button" disabled={idx === 0} onClick={() => onMove(-1)} className="rounded border border-gray-700 p-1 disabled:opacity-30">
            <ChevronUp className="h-4 w-4" />
          </button>
          <button type="button" disabled={idx >= total - 1} onClick={() => onMove(1)} className="rounded border border-gray-700 p-1 disabled:opacity-30">
            <ChevronDown className="h-4 w-4" />
          </button>
          <button type="button" onClick={onRemove} className="rounded border border-red-900/50 p-1 text-red-400">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <label className="mb-2 block text-xs text-gray-400">
        Título
        <input className={`mt-1 ${inputClass}`} value={b.titulo} onChange={(e) => onChange({ ...b, titulo: e.target.value })} />
      </label>
      <label className="mb-2 block text-xs text-gray-400">
        Texto
        <textarea className={`mt-1 ${inputClass} min-h-[72px]`} value={b.texto} onChange={(e) => onChange({ ...b, texto: e.target.value })} />
      </label>
      <div className="text-xs text-gray-400">
        Imagem opcional
        <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const url = await uploadCmsFileToStorage(f);
          if (url) onChange({ ...b, imagem: url });
        }} />
        <div className="mt-1 flex gap-2">
          <button type="button" onClick={() => imgRef.current?.click()} className={inputClass}>
            Upload
          </button>
          <input className={`flex-1 ${inputClass}`} value={b.imagem} onChange={(e) => onChange({ ...b, imagem: e.target.value })} />
        </div>
        {b.imagem && <img src={b.imagem} alt="" className="mt-2 h-20 rounded object-cover" />}
      </div>
    </div>
  );
}
