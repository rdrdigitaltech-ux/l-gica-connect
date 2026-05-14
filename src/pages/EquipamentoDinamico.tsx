import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, MessageCircle, Info } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CardEmBreve } from "@/components/CardEmBreve";
import { FiltroEquipamentos } from "@/components/FiltroEquipamentos";
import {
  findCategoriaBySlug,
  useEquipamentosCatalog,
  type EquipamentoProdutoV2,
} from "@/lib/equipamentosCatalog";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function EquipamentoDinamico() {
  const { slug } = useParams<{ slug: string }>();
  const catalog = useEquipamentosCatalog();
  const { content: eq } = useSiteContent("equipamentos");
  const categoria = useMemo(
    () => (slug ? findCategoriaBySlug(slug, catalog) : undefined),
    [slug, catalog]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const [filtroAtivo, setFiltroAtivo] = useState<string>("todos");

  const produtosAtivos = useMemo<EquipamentoProdutoV2[]>(() => {
    if (!categoria?.produtos?.length) return [];
    return categoria.produtos.filter((p) => p.ativo);
  }, [categoria]);

  const subcategorias = useMemo<string[]>(() => {
    const set = new Set(
      produtosAtivos.map((m) => m.subcategoria?.trim()).filter(Boolean) as string[]
    );
    return Array.from(set);
  }, [produtosAtivos]);

  const modelosFiltrados = useMemo(() => {
    if (filtroAtivo === "todos") return produtosAtivos;
    return produtosAtivos.filter((m) => m.subcategoria === filtroAtivo);
  }, [filtroAtivo, produtosAtivos]);

  if (!categoria) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#06080A] px-4 text-center">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "rgba(255,71,87,0.12)" }}
        >
          <span className="text-4xl">🔍</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Categoria não encontrada</h1>
        <p className="text-gray-500">
          Esta categoria não existe ou foi removida.
        </p>
        <Link
          to="/equipamentos"
          className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white"
          style={{ background: "#FF4757" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Equipamentos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080A]">
      <section className="bg-[#000000] py-8 px-6">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/equipamentos"
            className="mb-6 inline-flex items-center gap-2 text-[#FF4757] transition-colors hover:text-[#FF4757]/80"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar para Equipamentos
          </Link>

          <h1
            className="font-bold text-white"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            {categoria.nome}
          </h1>
          {categoria.texto_apresentacao?.trim() && (
            <p className="mt-4 max-w-4xl whitespace-pre-wrap text-lg text-gray-400">
              {categoria.texto_apresentacao}
            </p>
          )}
        </div>
      </section>

      {subcategorias.length > 0 && (
        <section className="px-6 pb-6 pt-10">
          <div className="mx-auto max-w-7xl">
            <FiltroEquipamentos
              opcoes={subcategorias as readonly string[]}
              filtroAtivo={filtroAtivo}
              onFiltroChange={setFiltroAtivo}
            />

            <div className="text-sm text-gray-400 md:text-base">
              {filtroAtivo === "todos" ? (
                <p>
                  Exibindo{" "}
                  <span className="font-semibold text-gray-200">
                    {modelosFiltrados.length}
                  </span>{" "}
                  produto(s)
                </p>
              ) : (
                <p>
                  Encontrado(s){" "}
                  <span className="font-semibold text-gray-200">
                    {modelosFiltrados.length}
                  </span>{" "}
                  produto(s) em{" "}
                  <span className="font-semibold text-[#FF4757]">
                    {filtroAtivo}
                  </span>
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 pb-20 pt-8">
        <div className="mx-auto max-w-7xl">
          {produtosAtivos.length === 0 ? (
            <div
              className="relative overflow-hidden rounded-2xl border p-12 text-center"
              style={{
                background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                borderColor: "rgba(255, 71, 87, 0.3)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                minHeight: "320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="mb-6 inline-flex items-center justify-center rounded-full"
                style={{
                  width: "120px",
                  height: "120px",
                  background: "linear-gradient(135deg, rgba(255,71,87,0.2), rgba(255,71,87,0.1))",
                  border: "2px solid rgba(255,71,87,0.4)",
                }}
              >
                <span className="text-5xl">📦</span>
              </div>
              <h3
                className="mb-4 font-bold text-white"
                style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
              >
                Nenhum produto ativo
              </h3>
              <p className="mb-6 max-w-2xl text-base text-gray-400">
                Ajuste os produtos no painel ou marque itens como ativos para exibi-los aqui.
              </p>
            </div>
          ) : modelosFiltrados.length > 0 ? (
            <div id="grid-produtos" className="flex flex-col gap-4 transition-all duration-300">
              {modelosFiltrados.map((modelo) => (
                <div
                  key={modelo.id}
                  className="group relative flex flex-row overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.005]"
                  style={{
                    background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                    borderColor: "rgba(255, 71, 87, 0.22)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute left-0 top-0 bottom-0 w-px opacity-60"
                    style={{
                      background: "linear-gradient(180deg, transparent, rgba(255,71,87,0.6), transparent)",
                    }}
                  />

                  {/* Imagem */}
                  <div className="flex w-48 shrink-0 items-center justify-center p-4 sm:w-56">
                    {modelo.foto_principal ? (
                      <img
                        src={modelo.foto_principal}
                        alt={modelo.nome}
                        className="h-full w-full object-contain"
                        style={{ maxHeight: "160px", filter: "drop-shadow(0 4px 10px rgba(255,71,87,0.15))" }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-36 w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-gray-500">
                        Sem foto
                      </div>
                    )}
                  </div>

                  {/* Separador */}
                  <div className="w-px self-stretch shrink-0" style={{ background: "rgba(255,71,87,0.12)" }} />

                  {/* Conteúdo */}
                  <div className="flex flex-1 flex-col justify-between gap-3 p-5">
                    <div className="flex flex-col gap-2">
                      {modelo.subcategoria?.trim() && (
                        <span
                          className="w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold"
                          style={{
                            background: "rgba(255, 71, 87, 0.15)",
                            border: "1px solid rgba(255, 71, 87, 0.3)",
                            color: "#FF4757",
                          }}
                        >
                          {modelo.subcategoria}
                        </span>
                      )}

                      <h3 className="text-base font-bold leading-snug text-white">
                        {modelo.nome}
                      </h3>

                      <p className="text-sm leading-relaxed text-gray-400">
                        {modelo.texto_resumido || "Confira mais detalhes deste equipamento."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/equipamentos/${slug}/${modelo.id}`}
                        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{
                          background: "linear-gradient(135deg, #FF4757 0%, #c9384a 100%)",
                          boxShadow: "0 3px 10px rgba(255,71,87,0.3)",
                        }}
                      >
                        <Info className="h-3.5 w-3.5" />
                        Mais Detalhes
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          window.open(
                            "https://wa.me/5547984218275?text=" +
                              encodeURIComponent(
                                `Olá! Gostaria de solicitar um orçamento para o produto: ${modelo.nome}`
                              ),
                            "_blank"
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
                        style={{
                          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                          boxShadow: "0 3px 10px rgba(37,211,102,0.3)",
                        }}
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Orçar pelo WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div id="grid-produtos">
              <CardEmBreve filtroAtivo={filtroAtivo} />
            </div>
          )}
        </div>
      </section>

      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#12141A" }}
      >
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
            {eq.cta_cat_titulo ?? `Interessado em ${categoria.nome}?`}
          </h2>
          {eq.cta_cat_subtitulo && (
            <p className="mb-6 text-lg text-gray-400">{eq.cta_cat_subtitulo}</p>
          )}
          <div className="flex justify-center">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
              }}
              onClick={() =>
                window.open(
                  "https://wa.me/5547984218275?text=" +
                    encodeURIComponent(`Olá, gostaria de um orçamento para ${categoria.nome}!`),
                  "_blank"
                )
              }
            >
              <MessageCircle className="h-5 w-5" />
              {eq.cta_cat_btn ?? "Orçar pelo WhatsApp"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
