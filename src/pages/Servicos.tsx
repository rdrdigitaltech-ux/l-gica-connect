import { Link } from "react-router-dom";
import { ChevronRight, Check, MessageCircle } from "lucide-react";

const checkItemStyle = {
  background: "rgba(255, 71, 87, 0.2)",
};

export default function Servicos() {
  return (
    <div className="min-h-screen bg-[#0A0C10]">
      {/* ========== 1. HERO SECTION ========== */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] z-0"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.1) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition-colors hover:text-[#FF4757]">
              Início
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-300">Serviços</span>
          </nav>
          <h1 className="mb-6 text-4xl font-extrabold text-gray-200 lg:text-5xl">
            SERVIÇOS
          </h1>
          <p className="max-w-3xl text-base text-gray-400 lg:text-lg">
            Ser parceiro da LÓGICA significa ter a certeza e a confiança de que
            com nossos serviços sua empresa estará continuamente segura e
            atualizada.
          </p>
        </div>
      </section>

      {/* ========== 2. ASSISTÊNCIA TÉCNICA ESPECIALIZADA ========== */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#12141A" }}
      >
        <div
          className="pointer-events-none absolute -right-[8%] -top-[12%] z-0"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.1) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
            filter: "blur(110px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-3xl font-extrabold text-gray-200 lg:text-4xl">
                Assistência técnica especializada
              </h2>
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-4">
                  {[
                    "Informática em geral",
                    "Automação comercial em geral",
                    "Contrato de manutenção",
                  ].map((label) => (
                    <div key={label} className="flex items-start gap-3">
                      <div
                        className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                        style={checkItemStyle}
                      >
                        <Check className="h-4 w-4 text-[#FF4757]" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[
                    "Balanças",
                    "Impressoras Térmicas",
                    "Nobreak",
                    "Notebook",
                  ].map((label) => (
                    <div key={label} className="flex items-start gap-3">
                      <div
                        className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                        style={checkItemStyle}
                      >
                        <Check className="h-4 w-4 text-[#FF4757]" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://wa.me/5547984218275?text=" +
                      encodeURIComponent(
                        "Olá! Preciso de assistência técnica / manutenção com equipamentos de automação. Pode me ajudar?"
                      ),
                    "_blank"
                  )
                }
                className="inline-flex items-center gap-3 rounded-lg px-8 py-3 text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
                }}
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </button>
            </div>
            <div>
              <div
                className="overflow-hidden rounded-2xl"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                }}
              >
                <img
                  src="/img/assistencia-tecnica.webp"
                  alt="Assistência Técnica"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. SOLUÇÕES DE DATA CENTER ========== */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#0A0C10" }}
      >
        <div
          className="pointer-events-none absolute -left-[10%] -top-[15%] z-0"
          style={{
            width: 550,
            height: 550,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.12) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div
                className="overflow-hidden rounded-2xl"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                }}
              >
                <img
                  src="/img/solucoes-datacenter.webp"
                  alt="Soluções de Data Center"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-8 text-3xl font-extrabold text-gray-200 lg:text-4xl">
                Soluções de Data Center
              </h2>
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  "Servidores",
                  "Banco de Dados",
                  "Soluções de backup",
                  "Antivírus",
                  "Redes e cabeamento estruturado",
                  "Estruturas em Rack",
                ].map((label) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={checkItemStyle}
                    >
                      <Check className="h-4 w-4 text-[#FF4757]" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://wa.me/5547984218275?text=" +
                      encodeURIComponent(
                        "Olá! Preciso de ajuda com soluções em Data Center / infraestrutura de TI. Pode me atender?"
                      ),
                    "_blank"
                  )
                }
                className="inline-flex items-center gap-3 rounded-lg px-8 py-3 text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
                }}
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. SUPORTE DE SOFTWARE ========== */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#12141A" }}
      >
        <div
          className="pointer-events-none absolute -left-[10%] -bottom-[15%] z-0"
          style={{
            width: 550,
            height: 550,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.12) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div
                className="overflow-hidden rounded-2xl"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                }}
              >
                <img
                  src="/img/suporte-software.webp"
                  alt="Suporte de Software"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-6 text-3xl font-extrabold text-gray-200 lg:text-4xl">
                Suporte de software
              </h2>
              <p className="mb-8 text-base leading-relaxed text-gray-400">
                Evite a frustração dos suportes 0800. Aqui, com nosso suporte
                próprio, estamos prontos para atender às suas necessidades
                tecnológicas, assegurando eficiência e segurança. Entre em
                contato e experimente a diferença que oferecemos.
              </p>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://wa.me/5547984218275?text=" +
                      encodeURIComponent(
                        "Olá! Preciso de suporte de software da Lógica. Pode me atender?"
                      ),
                    "_blank"
                  )
                }
                className="inline-flex items-center gap-3 rounded-lg px-8 py-3 text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
                }}
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5. CTA FINAL ========== */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#0A0C10" }}
      >
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-extrabold text-gray-200 lg:text-4xl">
            Precisa de ajuda com algum serviço?
          </h2>
          <p className="mb-8 text-base text-gray-400 lg:text-lg">
            Nossa equipe especializada está pronta para atender você com
            agilidade e eficiência
          </p>
          <button
            type="button"
            onClick={() =>
              window.open(
                "https://wa.me/5547984218275?text=" +
                  encodeURIComponent(
                    "Olá! Preciso de ajuda com os serviços da Lógica e gostaria de falar com um especialista."
                  ),
                "_blank"
              )
            }
            className="inline-flex items-center gap-3 rounded-lg px-10 py-4 text-base font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
            }}
          >
            <MessageCircle className="h-5 w-5" />
            Falar no WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}
