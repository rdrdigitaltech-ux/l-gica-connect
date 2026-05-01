import { useEffect } from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageZoom } from "@/components/ImageZoom";
import { getModelosPorCategoria } from "@/data/equipamentosDetalhados";
import { useSiteContent } from "@/hooks/useSiteContent";

const EquipamentoImpressoras = () => {
  const { content: eq } = useSiteContent("equipamentos");


const EquipamentoImpressoras = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const modelos = getModelosPorCategoria("impressoras");

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
            {eq.impressoras_page_titulo ?? "Impressoras Fiscais"}
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            {eq.impressoras_page_descricao ?? "Impressoras homologadas e térmicas para emissão fiscal"}
            Impressoras Fiscais
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Impressoras homologadas e térmicas para emissão fiscal
          </p>
        </div>
      </section>

      {/* Grid de Modelos */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-12">
            {modelos.map((modelo) => (
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
                  <h2 className="text-2xl font-bold text-white lg:text-3xl">
                    {modelo.nome}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-400 lg:text-lg">
                    {modelo.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Vídeos "Em Breve" */}
      <section className="bg-[#0A0C10] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-12 text-center font-bold text-white"
            style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
          >
            Veja em Funcionamento
          </h2>
          <div className="mx-auto max-w-4xl">
            <div
              className="relative overflow-hidden rounded-2xl border p-12 text-center"
              style={{
                background:
                  "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                borderColor: "rgba(255, 71, 87, 0.3)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                minHeight: "400px",
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
                  background:
                    "linear-gradient(135deg, rgba(255, 71, 87, 0.2), rgba(255, 71, 87, 0.1))",
                  border: "2px solid rgba(255, 71, 87, 0.4)",
                }}
              >
                <svg
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#FF4757"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className="mb-4 font-bold text-white"
                style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
              >
                Em Breve
              </h3>
              <p className="mb-6 max-w-2xl text-lg text-gray-400">
                Estamos produzindo vídeos tutoriais detalhados mostrando estes
                equipamentos em funcionamento. Em breve você poderá ver todas as
                funcionalidades na prática.
              </p>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  background: "rgba(255, 71, 87, 0.15)",
                  border: "1px solid rgba(255, 71, 87, 0.3)",
                  color: "#FF4757",
                }}
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Conteúdo em Produção
              </div>
            </div>
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
            Interessado em nossas impressoras?
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
                      "Olá, gostaria de um orçamento para Impressora de Notas Fiscais!"
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

export default EquipamentoImpressoras;
