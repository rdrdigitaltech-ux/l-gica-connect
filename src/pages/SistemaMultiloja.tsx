import { Link } from "react-router-dom";
import {
  ChevronRight,
  Check,
  Store,
  Settings,
  Building2,
  FileText,
  Package,
  Monitor,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const VANTAGEM_ICONS = [Settings, Building2, FileText, Package, Monitor, DollarSign];

export default function SistemaMultiloja() {
  const { content: cms } = useSiteContent("sistema_multiloja");

  const vantagens = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    icon: VANTAGEM_ICONS[i],
    title: cms[`v${n}_titulo`] ?? "",
    desc:  cms[`v${n}_desc`]  ?? "",
  }));

  const segmentos = (cms.seg_lista ?? "").split("\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0A0C10]">
      {/* 1. HERO SECTION */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] z-0"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(255, 71, 87, 0.1) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition-colors hover:text-[#FF4757]">Início</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/sistemas" className="transition-colors hover:text-[#FF4757]">Sistemas</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-300">Supermercados & Multilojas</span>
          </nav>
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
            style={{ background: "rgba(255, 71, 87, 0.1)", borderColor: "rgba(255, 71, 87, 0.3)" }}
          >
            <Store className="h-4 w-4 text-[#FF4757]" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              {cms.hero_badge ?? "Sistema para Supermercados & Multilojas"}
            </span>
          </div>
          <h1 className="mb-6 font-extrabold leading-tight text-gray-200" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            {cms.hero_titulo ?? <>Software para{" "}
              <span style={{ background: "linear-gradient(135deg, #FF4757 0%, #FF6B7A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Supermercados & Multilojas
              </span></>}
          </h1>
          <p className="mb-8 max-w-3xl text-gray-400" style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}>
            {cms.hero_subtitulo ?? "Automação e Eficiência em Diversos Segmentos"}
          </p>
        </div>
      </section>

      {/* 2. COMO FUNCIONA */}
      <section className="relative overflow-hidden py-24" style={{ background: "#0A0C10" }}>
        <div
          className="pointer-events-none absolute -left-[10%] -top-[15%] z-0"
          style={{
            width: 550, height: 550,
            background: "radial-gradient(circle, rgba(255, 71, 87, 0.12) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-2xl border p-6"
                style={{
                  background: "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                  borderColor: "rgba(255, 71, 87, 0.25)",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                  aspectRatio: "16/9",
                }}
              >
                <div
                  className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.6), transparent)" }}
                />
                <img
                  src={cms.func_imagem ?? "/img/dashboard-multiloja.webp"}
                  alt="Sistema Multiloja - Dashboard"
                  width={1600} height={900}
                  loading="lazy" decoding="async"
                  className="h-full w-full rounded-lg object-cover"
                  style={{ filter: "drop-shadow(0 10px 30px rgba(255, 71, 87, 0.2))", objectPosition: "center" }}
                />
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-extrabold text-gray-200 lg:text-4xl">
                {cms.func_titulo ?? "Como funciona?"}
              </h2>
              <p className="mb-8 text-base leading-relaxed text-gray-400 lg:text-lg">
                {cms.func_desc ?? "Este software traz uma solução personalizada para cada negócio, por isso seu uso é considerado multiloja, buscando atender às necessidades específicas de cada empresa."}
              </p>
              <button
                type="button"
                onClick={() => window.open("https://wa.me/5547984218275?text=" + encodeURIComponent("Olá! Tenho interesse no Sistema Multiloja / ERP. Gostaria de falar com um especialista sobre funcionalidades, valores e implantação."), "_blank")}
                className="inline-flex items-center gap-3 rounded-lg px-8 py-3 text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)" }}
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VANTAGENS */}
      <section className="relative overflow-hidden py-24" style={{ background: "#12141A" }}>
        <div
          className="pointer-events-none absolute -right-[10%] -top-[15%] z-0"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-gray-200 lg:text-4xl">
              {cms.vant_secao ?? "VANTAGENS"}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vantagens.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border p-8 transition-all duration-500"
                  style={{
                    background: "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                    borderColor: "rgba(255, 71, 87, 0.25)",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <div className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.6), transparent)", boxShadow: "0 0 8px rgba(255, 71, 87, 0.5)" }} />
                  <div className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 0% 0%, rgba(255, 71, 87, 0.2) 0%, transparent 70%)", filter: "blur(20px)" }} />
                  <div className="relative z-10 mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg" style={{ background: "rgba(255, 71, 87, 0.15)", border: "1px solid rgba(255, 71, 87, 0.3)" }}>
                      <Icon className="h-8 w-8 text-[#FF4757]" />
                    </div>
                  </div>
                  <h3 className="relative z-10 mb-4 text-center text-xl font-bold text-gray-200">{item.title}</h3>
                  <p className="relative z-10 text-center text-sm leading-relaxed text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SEGMENTOS */}
      <section className="relative overflow-hidden py-24" style={{ background: "#0A0C10" }}>
        <div
          className="pointer-events-none absolute -left-[10%] -top-[15%] z-0"
          style={{
            width: 550, height: 550,
            background: "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-2xl border border-[rgba(255,71,87,0.18)]">
                <img
                  src={cms.seg_imagem ?? "/img/shopping-erp.webp"}
                  alt="Supermercados & Multilojas - ERP"
                  width={1200} height={900}
                  loading="lazy" decoding="async"
                  className="h-auto w-full object-cover"
                  style={{ filter: "brightness(0.9)", aspectRatio: "4/3" }}
                />
              </div>
            </div>
            <div>
              <h2 className="mb-8 text-3xl font-extrabold text-gray-200 lg:text-4xl">
                {cms.seg_titulo ?? "Para quem?"}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {segmentos.map((label) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(255, 71, 87, 0.2)" }}>
                      <Check className="h-4 w-4 text-[#FF4757]" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20" style={{ background: "#0A0C10" }}>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
            {cms.cta_titulo ?? "Gerencie Múltiplas Lojas com Facilidade"}
          </h2>
          <p className="mb-8 text-lg text-gray-400">
            {cms.cta_desc ?? "Entre em contato com nossa equipe especializada em ERP para redes e descubra como centralizar sua gestão."}
          </p>
          <button
            type="button"
            onClick={() => window.open("https://wa.me/5547984218275?text=" + encodeURIComponent("Olá! Tenho interesse no Sistema ERP Multi-Loja da Lógica. Gostaria de saber mais sobre gestão centralizada, integração entre filiais, valores e implantação."), "_blank")}
            className="inline-flex items-center gap-3 rounded-lg px-8 py-4 text-lg font-bold text-white"
            style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)" }}
          >
            <MessageCircle className="h-6 w-6" />
            Falar com Especialista em ERP
          </button>
        </div>
      </section>
    </div>
  );
}