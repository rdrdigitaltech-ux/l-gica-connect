import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Home } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function Obrigado() {
  const { content: ob } = useSiteContent("obrigado");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "#000000" }}
    >
      {/* Background com gradiente */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
        }}
      />

      {/* Flashes de luz */}
      <div
        className="pointer-events-none absolute -left-[20%] top-[20%] z-0"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.15) 0%, rgba(255, 71, 87, 0.05) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-[15%] bottom-[15%] z-0"
        style={{
          width: 550,
          height: 550,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.12) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      {/* Conteúdo Principal */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 md:px-6 lg:px-8">
        <div className="text-center">
          {/* Ícone de Sucesso */}
          <div className="mb-8 flex justify-center">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)",
                boxShadow:
                  "0 0 60px rgba(34, 197, 94, 0.3), 0 0 100px rgba(34, 197, 94, 0.15)",
              }}
            >
              <CheckCircle2
                className="h-14 w-14 text-green-500"
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* Título Principal */}
          <h1 className="mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
            {ob.titulo ?? "Mensagem Enviada!"}
          </h1>

          {/* Subtítulo */}
          <p className="mb-4 text-lg text-gray-300 md:text-xl">
            Obrigado por entrar em contato com a Lógica Automação Comercial!
          </p>

          {/* Descrição */}
          <p className="mb-12 text-base text-gray-400 md:text-lg">
            Recebemos sua mensagem e nossa equipe entrará em contato em breve.
            <br />
            Normalmente respondemos em até 24 horas úteis.
          </p>

          {/* Cards de Informação - APENAS 2 CARDS */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              className="rounded-2xl border p-6"
              style={{
                background:
                  "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                borderColor: "rgba(255, 71, 87, 0.25)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div className="mb-3 text-3xl font-bold text-[#FF4757]">24h</div>
              <p className="text-sm text-gray-400">Tempo médio de resposta</p>
            </div>

            <div
              className="rounded-2xl border p-6"
              style={{
                background:
                  "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                borderColor: "rgba(255, 71, 87, 0.25)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div className="mb-3 text-3xl font-bold text-green-500">✓</div>
              <p className="text-sm text-gray-400">
                E-mail de confirmação enviado
              </p>
            </div>
          </div>

          {/* Botão Voltar ao Início - CENTRALIZADO */}
          <div className="flex justify-center">
            <Link to="/">
              <span
                className="flex items-center justify-center gap-2 rounded-lg border-2 px-8 py-4 text-base font-bold"
                style={{
                  borderColor: "#FF4757",
                  color: "#FF4757",
                  background: "transparent",
                }}
              >
                <Home className="h-5 w-5" />
                {ob.botao_voltar ?? "Voltar ao início"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
