import { useEffect } from "react";
import { ArrowLeft, MessageCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageZoom } from "@/components/ImageZoom";
import { useSiteContent, useEquipamentoCatalogo } from "@/hooks/useSiteContent";
import { textoCardModelo } from "@/lib/equipamentoDisplay";

const EquipamentoImpressoras = () => {
  const { content: eq } = useSiteContent("equipamentos");
  const { modelos } = useEquipamentoCatalogo("impressoras");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                  <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-400 lg:text-lg">
                    {textoCardModelo(modelo)}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      to={`/equipamentos/impressoras/${modelo.id}`}
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
