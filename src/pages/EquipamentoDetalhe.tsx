import { useEffect } from "react";
import { ArrowLeft, MessageCircle, Play } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ImageZoom } from "@/components/ImageZoom";
import { useEquipamentoCatalogo } from "@/hooks/useSiteContent";
import { getYoutubeEmbedUrl } from "@/lib/utils";
import type { ModeloEquipamento } from "@/data/equipamentosDetalhados";

// Mapeia slug da URL → categoria interna + label para CTA
const CATEGORIA_MAP: Record<string, { cat: ModeloEquipamento["categoria"]; label: string; backPath: string }> = {
  balancas:       { cat: "balancas",            label: "Balança",               backPath: "/equipamentos/balancas" },
  impressoras:    { cat: "impressoras",          label: "Impressora",            backPath: "/equipamentos/impressoras" },
  "leitor-codigo":{ cat: "leitores",            label: "Leitor de Código",      backPath: "/equipamentos/leitor-codigo" },
  "relogio-ponto":{ cat: "relogio-ponto",       label: "Relógio de Ponto",      backPath: "/equipamentos/relogio-ponto" },
  embaladoras:    { cat: "embaladoras",          label: "Embaladora",            backPath: "/equipamentos/embaladoras" },
  computadores:   { cat: "computadores-hardware",label: "Equipamento",           backPath: "/equipamentos/computadores" },
};

const EquipamentoDetalhe = () => {
  const { categoriaSlug, modeloId } = useParams<{ categoriaSlug: string; modeloId: string }>();
  const navigate = useNavigate();

  const categoriaInfo = CATEGORIA_MAP[categoriaSlug ?? ""] ?? null;
  const { modelos } = useEquipamentoCatalogo(categoriaInfo?.cat ?? "balancas");

  const modelo = modelos.find((m) => m.id === modeloId) ?? null;
  const videoEmbedUrl = getYoutubeEmbedUrl(modelo?.video_url ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [modeloId]);

  // Modelo não encontrado → redireciona de volta à categoria
  useEffect(() => {
    if (categoriaInfo === null) {
      navigate("/equipamentos", { replace: true });
    }
  }, [categoriaInfo, navigate]);

  if (!categoriaInfo) return null;

  const whatsappMsg = modelo
    ? `Olá, gostaria de um orçamento para ${modelo.nome}!`
    : `Olá, gostaria de um orçamento!`;

  return (
    <div className="min-h-screen bg-[#06080A]">
      {/* Header com Voltar */}
      <section className="bg-[#000000] px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <Link
            to={categoriaInfo.backPath}
            className="mb-6 inline-flex items-center gap-2 text-[#FF4757] transition-colors hover:text-[#FF4757]/80"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar para {categoriaSlug === "leitor-codigo" ? "Leitores de Código" : categoriaSlug?.charAt(0).toUpperCase() + (categoriaSlug?.slice(1) ?? "")}
          </Link>

          {modelo ? (
            <>
              {modelo.subcategoria && (
                <div
                  className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                  style={{
                    background: "rgba(255, 71, 87, 0.15)",
                    border: "1px solid rgba(255, 71, 87, 0.3)",
                    color: "#FF4757",
                  }}
                >
                  {modelo.subcategoria}
                </div>
              )}
              <h1
                className="font-bold text-white"
                style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}
              >
                {modelo.nome}
              </h1>
            </>
          ) : (
            <h1 className="text-2xl font-bold text-white">Produto não encontrado</h1>
          )}
        </div>
      </section>

      {modelo ? (
        <>
          {/* Conteúdo principal */}
          <section className="px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Imagem */}
                <div className="w-full">
                  <ImageZoom src={modelo.imagem} alt={modelo.nome} />
                </div>

                {/* Detalhes */}
                <div className="flex flex-col justify-center space-y-6">
                  <h2 className="text-3xl font-bold text-white lg:text-4xl">
                    {modelo.nome}
                  </h2>

                  <p className="text-lg leading-relaxed text-gray-400">
                    {modelo.descricao}
                  </p>

                  <div className="pt-4">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                        boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
                      }}
                      onClick={() =>
                        window.open(
                          "https://wa.me/5547984218275?text=" + encodeURIComponent(whatsappMsg),
                          "_blank"
                        )
                      }
                    >
                      <MessageCircle className="h-5 w-5" />
                      Orçar pelo WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seção Vídeo — específico deste modelo */}
          <section className="bg-[#0A0C10] px-6 py-20">
            <div className="mx-auto max-w-7xl">
              <h2
                className="mb-4 text-center font-bold text-white"
                style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
              >
                Veja o {modelo.nome} em Funcionamento
              </h2>
              <p className="mb-12 text-center text-gray-400">
                Assista ao tutorial específico deste equipamento
              </p>

              <div className="mx-auto max-w-4xl">
                {videoEmbedUrl ? (
                  <div
                    className="overflow-hidden rounded-2xl border"
                    style={{
                      borderColor: "rgba(255,71,87,0.3)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div className="relative" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        src={videoEmbedUrl}
                        title={`Vídeo tutorial — ${modelo.nome}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative overflow-hidden rounded-2xl border p-12 text-center"
                    style={{
                      background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                      borderColor: "rgba(255, 71, 87, 0.3)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      minHeight: "380px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="mb-6 inline-flex items-center justify-center rounded-full"
                      style={{
                        width: "100px",
                        height: "100px",
                        background: "linear-gradient(135deg, rgba(255, 71, 87, 0.2), rgba(255, 71, 87, 0.1))",
                        border: "2px solid rgba(255, 71, 87, 0.4)",
                      }}
                    >
                      <Play className="h-12 w-12 text-[#FF4757]" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-white">Vídeo em Produção</h3>
                    <p className="mb-6 max-w-xl text-base text-gray-400">
                      Estamos produzindo o tutorial específico para o <strong className="text-gray-300">{modelo.nome}</strong>.
                      Em breve você poderá ver este equipamento em funcionamento aqui.
                    </p>
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                      style={{
                        background: "rgba(255, 71, 87, 0.15)",
                        border: "1px solid rgba(255, 71, 87, 0.3)",
                        color: "#FF4757",
                      }}
                    >
                      Em Breve
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* CTA WhatsApp */}
          <section className="relative overflow-hidden py-24" style={{ background: "#12141A" }}>
            <div className="relative z-10 mx-auto max-w-5xl px-4 text-center md:px-6 lg:px-8">
              <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
                Interessado no {modelo.nome}?
              </h2>
              <p className="mb-8 text-lg text-gray-400">
                Fale com nossa equipe e receba um orçamento personalizado.
              </p>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
                  }}
                  onClick={() =>
                    window.open(
                      "https://wa.me/5547984218275?text=" + encodeURIComponent(whatsappMsg),
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
        </>
      ) : (
        /* Produto não encontrado */
        <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
          <p className="mb-4 text-lg text-gray-400">Este produto não foi encontrado.</p>
          <Link
            to={categoriaInfo.backPath}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white"
            style={{ background: "#FF4757" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </section>
      )}
    </div>
  );
};

export default EquipamentoDetalhe;
