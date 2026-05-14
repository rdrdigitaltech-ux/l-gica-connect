import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, MessageCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageZoom } from "@/components/ImageZoom";
import { CardEmBreve } from "@/components/CardEmBreve";
import { FiltroEquipamentos } from "@/components/FiltroEquipamentos";
import {
  SubcategoriaBalanca,
} from "@/data/equipamentosDetalhados";
import { textoCardModelo } from "@/lib/equipamentoDisplay";
import { useSiteContent, useEquipamentoCatalogo } from "@/hooks/useSiteContent";

const EquipamentoBalancas = () => {
  const { content: eq } = useSiteContent("equipamentos");
  const { modelos: todosModelos } = useEquipamentoCatalogo("balancas");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filtroAtivo, setFiltroAtivo] = useState<string>("todos");

  const opcoesBase: readonly SubcategoriaBalanca[] = [
    "Etiquetadoras",
    "Bancada",
    "Plataforma",
    "Checkout",
    "Precisão",
  ];

  const opcoesSubcategorias = useMemo((): readonly string[] => {
    const fromData = [
      ...new Set(todosModelos.map((m) => m.subcategoria).filter(Boolean)),
    ] as string[];
    return [...new Set([...opcoesBase, ...fromData])];
  }, [todosModelos]);

  const modelosFiltrados = useMemo(() => {
    if (filtroAtivo === "todos") return todosModelos;
    return todosModelos.filter((m) => m.subcategoria === filtroAtivo);
  }, [filtroAtivo, todosModelos]);


  const handleFiltroChange = (novoFiltro: string) => {
    setFiltroAtivo(novoFiltro);
  };

  return (
    <div className="min-h-screen bg-[#06080A]">
      {/* Header com Voltar */}
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
            {eq.balancas_page_titulo ?? "Balanças"}
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            {eq.balancas_page_descricao ?? "Balanças eletrônicas de alta precisão para pesagem comercial"}
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="px-6 pb-6 pt-10">
        <div className="mx-auto max-w-7xl">
          <FiltroEquipamentos
            opcoes={opcoesSubcategorias as readonly string[]}
            filtroAtivo={filtroAtivo}
            onFiltroChange={handleFiltroChange}
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

      {/* Grid de Modelos */}
      <section className="px-6 pb-20 pt-8">
        <div className="mx-auto max-w-7xl">
          {modelosFiltrados.length > 0 ? (
            <div id="grid-produtos" className="space-y-12 transition-all duration-300">
              {modelosFiltrados.map((modelo) => (
                <div
                  key={modelo.id}
                  className="grid grid-cols-1 items-center gap-8 rounded-2xl border p-8 lg:grid-cols-2 lg:gap-12"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                    borderColor: "rgba(255, 71, 87, 0.25)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="w-full">
                    <ImageZoom src={modelo.imagem} alt={modelo.nome} />
                  </div>

                  <div className="space-y-4">
                    {modelo.subcategoria && (
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

                    <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-400 lg:text-lg">
                      {textoCardModelo(modelo)}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link
                        to={`/equipamentos/balancas/${modelo.id}`}
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
                        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{
                          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                          boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
                        }}
                        onClick={() =>
                          window.open(
                            "https://wa.me/5547984218275?text=" +
                              encodeURIComponent(`Olá, gostaria de um orçamento para ${modelo.nome}!`),
                            "_blank"
                          )
                        }
                      >
                        <MessageCircle className="h-4 w-4" />
                        Orçar
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

      {/* CTA WhatsApp */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#12141A" }}
      >
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
            {eq.cta_cat_titulo ?? "Interessado em nossas balanças?"}
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
                    encodeURIComponent("Olá, gostaria de um orçamento para Balanças!"),
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
};

export default EquipamentoBalancas;
