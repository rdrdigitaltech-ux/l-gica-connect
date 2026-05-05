import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, MessageCircle, X, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageZoom } from "@/components/ImageZoom";
import { CardEmBreve } from "@/components/CardEmBreve";
import { FiltroEquipamentos } from "@/components/FiltroEquipamentos";
import {
  SubcategoriaRelogioPonto,
} from "@/data/equipamentosDetalhados";
import { textoCardModelo } from "@/lib/equipamentoDisplay";
import { useSiteContent, useEquipamentoCatalogo } from "@/hooks/useSiteContent";
import { getYoutubeEmbedUrl } from "@/lib/utils";

const EquipamentoRelogioPonto = () => {
  const { content: eq } = useSiteContent("equipamentos");
  const { modelos: todosModelos } = useEquipamentoCatalogo("relogio-ponto");
  const { content: catalogo } = useSiteContent("catalogo_relogio");
  const videoEmbedUrl = getYoutubeEmbedUrl(catalogo.video_url ?? "");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setShowPopup(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const [filtroAtivo, setFiltroAtivo] = useState<string>("todos");

  const opcoesBase: readonly SubcategoriaRelogioPonto[] = [
    "Relógio de Ponto com Facial",
    "Relógio de Ponto sem Facial",
    "Catraca com Facial",
    "Catraca sem Facial",
  ];

  const opcoesSubcategorias = useMemo((): readonly string[] => {
    const fromData = [
      ...new Set(todosModelos.map((m) => m.subcategoria).filter(Boolean)),
    ] as string[];
    return [...new Set([...opcoesBase, ...fromData])];
  }, [todosModelos]);

  const modelosFiltrados = useMemo(
    () => filtroAtivo === "todos" ? todosModelos : todosModelos.filter((m) => m.subcategoria === filtroAtivo),
    [filtroAtivo, todosModelos]
  );

  const handleFiltroChange = (novoFiltro: string) => {
    setFiltroAtivo(novoFiltro);
  };

  return (
    <div className="min-h-screen bg-[#06080A]">
      {/* Popup - Sistema RH + Relógio de Ponto */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl p-8"
            style={{
              background: "linear-gradient(145deg, #0F1115 0%, #0C0E11 100%)",
              border: "1px solid rgba(255, 71, 87, 0.35)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(255, 71, 87, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:text-white"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
              style={{
                background: "rgba(255, 71, 87, 0.15)",
                border: "1px solid rgba(255, 71, 87, 0.3)",
                color: "#FF4757",
              }}
            >
              Oferta Exclusiva
            </div>

            <h2 className="mb-3 text-2xl font-extrabold text-white">
              Complete sua solução de RH
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-400">
              Além dos relógios de ponto, a Lógica oferece o{" "}
              <span className="font-semibold text-gray-200">
                Sistema de Controle de Ponto para RH
              </span>
              : automatize a apuração de jornadas, tratamento de exceções,
              banco de horas e integração com folha de pagamento — tudo
              integrado ao seu equipamento.
            </p>

            <ul className="mb-8 space-y-2">
              {[
                "Apuração automática de horas e faltas",
                "Gestão de escalas e banco de horas",
                "Relatórios gerenciais para o DP",
                "Conformidade com a Portaria 671",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: "rgba(255, 71, 87, 0.2)", color: "#FF4757" }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://wa.me/5547984218275?text=" +
                      encodeURIComponent(
                        "Olá! Tenho interesse no pacote completo: Relógio de Ponto + Sistema de RH da Lógica. Pode me ajudar?"
                      ),
                    "_blank"
                  )
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
                }}
              >
                <MessageCircle className="h-4 w-4" />
                Falar com especialista
              </button>
              <Link
                to="/sistemas/tratamento-ponto"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:text-white"
                style={{ borderColor: "rgba(255, 71, 87, 0.3)" }}
                onClick={() => setShowPopup(false)}
              >
                Ver sistema de RH
              </Link>
            </div>
          </div>
        </div>
      )}

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
            {eq.relogio_page_titulo ?? "Relógios de Ponto"}
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            {eq.relogio_page_descricao ?? "Controle de acesso e ponto eletrônico para sua empresa"}
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
            titulo="Filtrar por tipo (ponto e acesso)"
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
                        to={`/equipamentos/relogio-ponto/${modelo.id}`}
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

      {/* Seção Vídeo Tutorial */}
      <section className="bg-[#0A0C10] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-bold text-white" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
            Veja em Funcionamento
          </h2>
          <div className="mx-auto max-w-4xl">
            {videoEmbedUrl ? (
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(255,71,87,0.3)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  <iframe src={videoEmbedUrl} title="Vídeo tutorial do equipamento" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" />
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl border p-12 text-center" style={{ background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)", borderColor: "rgba(255, 71, 87, 0.3)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", minHeight: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="mb-6 inline-flex items-center justify-center rounded-full" style={{ width: "120px", height: "120px", background: "linear-gradient(135deg, rgba(255, 71, 87, 0.2), rgba(255, 71, 87, 0.1))", border: "2px solid rgba(255, 71, 87, 0.4)" }}>
                  <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="#FF4757" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-4 font-bold text-white" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>Em Breve</h3>
                <p className="mb-6 max-w-2xl text-lg text-gray-400">Estamos produzindo vídeos tutoriais detalhados mostrando estes equipamentos em funcionamento. Em breve você poderá ver todas as funcionalidades na prática.</p>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold" style={{ background: "rgba(255, 71, 87, 0.15)", border: "1px solid rgba(255, 71, 87, 0.3)", color: "#FF4757" }}>
                  Conteúdo em Produção
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#12141A" }}
      >
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-extrabold text-gray-200 lg:text-4xl">
            Interessado em relógio de ponto?
          </h2>
          <div className="flex justify-center">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
              }}
              onClick={() =>
                window.open(
                  "https://wa.me/5547984218275?text=" +
                    encodeURIComponent(
                      "Olá, gostaria de um orçamento para Relógio Ponto!"
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
};

export default EquipamentoRelogioPonto;
