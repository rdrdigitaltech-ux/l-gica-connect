import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, MessageCircle, Info } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ImageZoom } from "@/components/ImageZoom";
import { CardEmBreve } from "@/components/CardEmBreve";
import { FiltroEquipamentos } from "@/components/FiltroEquipamentos";
import {
  findCategoriaBySlug,
  useEquipamentosCatalog,
  type EquipamentoProdutoV2,
} from "@/lib/equipamentosCatalog";

export default function EquipamentoDinamico() {
  const { slug } = useParams<{ slug: string }>();
  const catalog = useEquipamentosCatalog();
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
            <div id="grid-produtos" className="space-y-12 transition-all duration-300">
              {modelosFiltrados.map((modelo) => (
                <div
                  key={modelo.id}
                  className="grid grid-cols-1 items-center gap-8 rounded-2xl border p-8 lg:grid-cols-2 lg:gap-12"
                  style={{
                    background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                    borderColor: "rgba(255, 71, 87, 0.25)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="w-full">
                    {modelo.foto_principal ? (
                      <ImageZoom src={modelo.foto_principal} alt={modelo.nome} />
                    ) : (
                      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-500">
                        Sem foto
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {modelo.subcategoria?.trim() && (
                      <div
                        className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                        style={{
                          background: "rgba(255, 71, 87, 0.15)",
                          border: "1px solid rgba(255, 71, 87, 0.3)",
                          color: "#FF4757",
                        }}
                      >
                        {modelo.subcategoria}
                      </div>
                    )}

                    <h2 className="text-2xl font-bold text-white lg:text-3xl">
                      {modelo.nome}
                    </h2>

                    <p className="pt-1 whitespace-pre-wrap text-base leading-relaxed text-gray-400 lg:text-lg">
                      {modelo.texto_resumido ||
                        "Confira mais detalhes deste equipamento."}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link
                        to={`/equipamentos/${slug}/${modelo.id}`}
                        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{
                          background: "linear-gradient(135deg, #FF4757 0%, #c9384a 100%)",
                          boxShadow: "0 4px 14px rgba(255,71,87,0.35)",
                        }}
                      >
                        <Info className="h-4 w-4" />
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
                        className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white"
                        style={{
                          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                          boxShadow: "0 6px 20px rgba(37,211,102,0.35)",
                        }}
                      >
                        <MessageCircle className="h-4 w-4" />
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
          <h2 className="mb-6 text-3xl font-extrabold text-gray-200 lg:text-4xl">
            Interessado em {categoria.nome}?
          </h2>
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
                    encodeURIComponent(
                      `Olá, gostaria de um orçamento para ${categoria.nome}!`
                    ),
                  "_blank"
                )
              }
            >
              <MessageCircle className="h-5 w-5" />
              Orçar pelo WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
