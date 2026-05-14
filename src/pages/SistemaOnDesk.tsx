import { useEffect } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { ImageZoom } from "@/components/ImageZoom";
import type { SistemaBloco } from "@/lib/dynamicItems";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Bot,
  ChevronRight,
  FileChartColumn,
  Headset,
  History,
  LayoutDashboard,
  LineChart,
  MessageCircle,
  Users,
  UserPlus,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const ACCENT = "#FF4757";

const FUNC_ICONS = [LayoutDashboard, LineChart, Users, Bot, History, FileChartColumn, Headset, UserPlus];

export default function SistemaOnDesk() {
  const { content: cms } = useSiteContent("sistema_ondesk");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const funcionalidades = [1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => ({
    icon: FUNC_ICONS[i],
    title: cms[`f${n}_titulo`] ?? "",
    desc:  cms[`f${n}_desc`]  ?? "",
  }));

  const beneficios = [1, 2, 3, 4].map((n) => ({
    value: cms[`b${n}_valor`]  ?? "",
    title: cms[`b${n}_titulo`] ?? "",
    desc:  cms[`b${n}_desc`]  ?? "",
  }));

  const antesDepois = [1, 2, 3, 4].map((n) => ({
    antes:  cms[`ad${n}_antes`]  ?? "",
    depois: cms[`ad${n}_depois`] ?? "",
  }));

  const whatsappText =
    "Olá! Tenho interesse no Lógica.OnDesk. Gostaria de conhecer as funcionalidades e agendar uma demonstração.";

  const blocos: SistemaBloco[] = (() => {
    try { return JSON.parse(cms.blocos || "[]") as SistemaBloco[]; }
    catch { return []; }
  })().sort((a, b) => a.ordem - b.ordem);

  return (
    <div className="min-h-screen bg-[#0A0C10]">
      {/* HERO */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 71, 87, 0.28) 0%, rgba(17, 24, 39, 0.0) 55%), linear-gradient(180deg, #000000 0%, #0A0C10 55%, #12141A 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] z-0"
          style={{
            width: 520,
            height: 520,
            background: `radial-gradient(circle, ${ACCENT}1F 0%, ${ACCENT}0D 45%, transparent 70%)`,
            filter: "blur(110px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition-colors hover:text-[#FF4757]">
              Início
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              to="/sistemas"
              className="transition-colors hover:text-[#FF4757]"
            >
              Sistemas
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-300">Lógica.OnDesk</span>
          </nav>

          <Link
            to="/sistemas"
            className="mb-8 inline-flex items-center gap-2 text-gray-300/80 transition-colors hover:text-gray-200"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar para Sistemas
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
              style={{
                background: `${ACCENT}14`,
                borderColor: `${ACCENT}55`,
              }}
            >
              <Headset className="h-4 w-4" style={{ color: ACCENT }} />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
                {cms.hero_badge ?? "Lógica.OnDesk"}
              </span>
            </div>
            <div
              className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold tracking-wider"
              style={{
                background: `${ACCENT}22`,
                borderColor: `${ACCENT}66`,
                color: ACCENT,
              }}
            >
              LANÇAMENTO
            </div>
          </div>

          <h1
            className="mb-5 font-extrabold leading-tight text-gray-200"
            style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}
          >
            {cms.hero_titulo ?? "Pare de adivinhar. Organize seu atendimento e acelere resultados."}
          </h1>

          <p
            className="mb-10 max-w-3xl whitespace-pre-wrap text-gray-300/80"
            style={{ fontSize: "clamp(14px, 1.6vw, 18px)" }}
          >
            {cms.hero_subtitulo ?? "Transforme o caos do WhatsApp em métricas reais. Tenha controle total da equipe em uma única tela, monitore produtividade em tempo real e tome decisões rápidas com a sua nova central de comando."}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://wa.me/5547984218275?text=" +
                    encodeURIComponent(whatsappText),
                  "_blank"
                )
              }
              className="inline-flex items-center justify-center gap-3 rounded-lg px-8 py-4 text-base font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
              }}
            >
              <MessageCircle className="h-6 w-6" />
              Falar no WhatsApp
            </button>

            <a
              href="#beneficios"
              className="inline-flex items-center justify-center gap-3 rounded-lg border px-8 py-4 text-base font-bold text-gray-200 transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255, 255, 255, 0.12)" }}
            >
              Ver benefícios
            </a>
          </div>
        </div>
      </section>

      {/* GALERIA DE IMAGENS DO SISTEMA */}
      {(() => {
        const imgs = [cms.img1, cms.img2, cms.img3, cms.img4].filter(Boolean) as string[];
        if (imgs.length === 0) return (
          <section className="px-6 py-20" style={{ background: "#0A0C10" }}>
            <div className="mx-auto max-w-7xl">
              <div
                className="relative overflow-hidden rounded-2xl border p-12 text-center"
                style={{
                  background: `linear-gradient(145deg, ${ACCENT}12 0%, rgba(12, 14, 17, 0.92) 70%)`,
                  borderColor: `${ACCENT}33`,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.45)",
                  minHeight: "360px",
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
                    background: `linear-gradient(135deg, ${ACCENT}2B, ${ACCENT}14)`,
                    border: `2px solid ${ACCENT}66`,
                  }}
                >
                  <LayoutDashboard className="h-14 w-14" style={{ color: ACCENT }} />
                </div>
                <h2 className="mb-4 font-extrabold text-gray-200" style={{ fontSize: "clamp(22px, 3vw, 34px)" }}>
                  Fotos do sistema em breve
                </h2>
                <p className="mx-auto mb-6 max-w-2xl text-base md:text-lg" style={{ color: "#9CA3AF" }}>
                  Estamos finalizando as capturas e demonstrações do dashboard. Em breve você poderá visualizar a interface completa por aqui.
                </p>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                  style={{ background: `${ACCENT}22`, border: `1px solid ${ACCENT}55`, color: ACCENT }}
                >
                  Conteúdo em produção
                </div>
              </div>
            </div>
          </section>
        );
        return (
          <section className="px-6 py-20" style={{ background: "#0A0C10" }}>
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-10 text-center font-extrabold text-gray-200" style={{ fontSize: "clamp(22px, 3vw, 34px)" }}>
                {cms.galeria_titulo || "Conheça o Sistema"}
              </h2>
              <div className={`grid gap-6 ${imgs.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                {imgs.map((src, i) => (
                  <div key={i} className="flex items-center justify-center overflow-hidden rounded-2xl">
                    <img src={src} alt={`${cms.galeria_titulo || "Sistema"} — Imagem ${i + 1}`} className="h-auto object-contain" style={{ maxHeight: "1170px", width: "auto", maxWidth: "100%" }} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ANTES x DEPOIS */}
      <section className="px-6 py-24" style={{ background: "#12141A" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
              Do caos ao controle
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 lg:text-lg">
              Organize a operação e enxergue performance de verdade.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {antesDepois.map((item) => (
              <div
                key={item.antes}
                className="rounded-2xl border p-8"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                }}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr] md:items-start">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-extrabold text-red-500">
                        ANTES
                      </span>
                    </div>
                    <p className="text-gray-400">{item.antes}</p>
                  </div>

                  <div className="hidden justify-center md:flex">
                    <ChevronRight className="mt-2 h-6 w-6 text-gray-600" />
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" style={{ color: ACCENT }} />
                      <span
                        className="text-sm font-extrabold"
                        style={{ color: ACCENT }}
                      >
                        DEPOIS
                      </span>
                    </div>
                    <p className="font-semibold text-gray-200">
                      {item.depois}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="px-6 py-24" style={{ background: "#0A0C10" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
              {cms.func_secao_titulo ?? "Funcionalidades completas"}
            </h2>
            <p className="mx-auto max-w-3xl whitespace-pre-wrap text-base text-gray-400 lg:text-lg">
              {cms.func_secao_desc ?? "Tudo o que você precisa para atender melhor e medir performance."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {funcionalidades.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border p-7 transition-all duration-500 hover:scale-[1.01]"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                    borderColor: `${ACCENT}22`,
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${ACCENT}99, transparent)`,
                    }}
                  />
                  <div className="relative z-10 mb-5 flex justify-center">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{
                        background: `${ACCENT}1F`,
                        border: `1px solid ${ACCENT}3D`,
                      }}
                    >
                      <Icon className="h-7 w-7" style={{ color: ACCENT }} />
                    </div>
                  </div>
                  <h3
                    className="relative z-10 mb-2 text-center text-base font-bold text-gray-200"
                  >
                    {item.title}
                  </h3>
                  <p
                    className="relative z-10 text-center text-sm leading-relaxed"
                    style={{ color: "#9CA3AF" }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section
        id="beneficios"
        className="px-6 py-24"
        style={{ background: "#12141A" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
              {cms.ben_secao_titulo ?? "Resultados em números"}
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 lg:text-lg">
              Indicadores para acompanhar produtividade e conversão.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((b) => (
              <div key={b.title} className="text-center">
                <div className="mb-4 text-6xl font-extrabold" style={{ color: ACCENT }}>
                  {b.value}
                </div>
                <h3
                  className="mb-2 text-xl font-bold text-gray-200"
                >
                  {b.title}
                </h3>
                <p className="text-gray-400">{b.desc}</p>
              </div>
            ))}
          </div>

          <div
            className="mx-auto mt-16 max-w-4xl rounded-2xl border p-10 text-center"
            style={{
              background:
                "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
              borderColor: `${ACCENT}26`,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.45)",
            }}
          >
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                background: `${ACCENT}1F`,
                border: `1px solid ${ACCENT}3D`,
              }}
            >
              <BarChart3 className="h-8 w-8" style={{ color: ACCENT }} />
            </div>
            <h3 className="mb-3 text-2xl font-extrabold text-gray-200">
              Desenvolvido pela Lógica Informática
            </h3>
            <p className="text-gray-400 md:text-lg">
              Sistema próprio, pensado para resolver a desorganização do WhatsApp
              empresarial e dar visibilidade real da operação de atendimento.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCOS EXTRAS */}
      {blocos.map((sec, idx) => {
        const hasImage = Boolean(sec.imagem?.trim());
        const hasTitulo = Boolean(sec.titulo?.trim());
        const hasTexto = Boolean(sec.texto?.trim());
        if (!hasImage && !hasTitulo && !hasTexto) return null;
        const bg = idx % 2 === 0 ? "#12141A" : "#0A0C10";
        return (
          <section key={sec.id} className="relative overflow-hidden py-24" style={{ background: bg }}>
            <div
              className="pointer-events-none absolute z-0"
              style={{
                width: 500, height: 500, top: "-15%",
                [idx % 2 === 0 ? "right" : "left"]: "-10%",
                background: "radial-gradient(circle, rgba(255, 71, 87, 0.07) 0%, transparent 70%)",
                filter: "blur(100px)",
              }}
            />
            <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                {hasImage ? (
                  <ImageZoom src={sec.imagem} alt={sec.titulo || "Seção"} />
                ) : (
                  <span className="hidden lg:block" aria-hidden />
                )}
                <div className="flex flex-col justify-center space-y-4">
                  {hasTitulo && (
                    <h2 className="text-3xl font-extrabold text-gray-200 lg:text-4xl">{sec.titulo}</h2>
                  )}
                  {hasTexto && (
                    <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-400 lg:text-lg">{sec.texto}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA FINAL */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          background: `linear-gradient(135deg, ${ACCENT}2B 0%, rgba(0,0,0,0) 40%), #0A0C10`,
        }}
      >
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
            {cms.cta_titulo ?? "Quer organizar seu atendimento no WhatsApp?"}
          </h2>
          <p className="mb-8 whitespace-pre-wrap text-lg text-gray-400">
            {cms.cta_desc ?? "Agende uma demonstração e veja como o Lógica.OnDesk transforma volume em produtividade, métricas e resultado."}
          </p>
          <button
            type="button"
            onClick={() =>
              window.open(
                cms.cta_link || "https://wa.me/5547984218275?text=" + encodeURIComponent(whatsappText),
                "_blank"
              )
            }
            className="inline-flex items-center gap-3 rounded-lg px-10 py-5 text-lg font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
            }}
          >
            <MessageCircle className="h-6 w-6" />
            {cms.cta_btn || "Quero conhecer o OnDesk"}
          </button>
        </div>
      </section>
    </div>
  );
}

