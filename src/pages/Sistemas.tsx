import {
  UtensilsCrossed,
  ShoppingCart,
  Store,
  Coffee,
  ShoppingBasket,
  Building2,
  Clock,
  Headset,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSistemasExtras } from "@/lib/dynamicItems";

const cardBaseStyle = {
  background:
    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
  boxShadow:
    "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 71, 87, 0.1)",
} as const;

const cardHoverEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.borderColor = "rgba(255, 71, 87, 0.6)";
  e.currentTarget.style.boxShadow =
    "0 16px 48px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 71, 87, 0.3)";
};

const cardHoverLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.borderColor = "rgba(255, 71, 87, 0.25)";
  e.currentTarget.style.boxShadow =
    "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 71, 87, 0.1)";
};

const segmentCardsBase = [
  { id: "varejo",      href: "/sistemas/varejo",      key: "varejo_titulo",      icons: [ShoppingCart, Store]       },
  { id: "gastronomia", href: "/sistemas/gastronomia",  key: "gastronomia_titulo", icons: [UtensilsCrossed, Coffee]   },
  { id: "multiloja",   href: "/sistemas/multiloja",    key: "multiloja_titulo",   icons: [ShoppingBasket, Building2] },
];

const solutionCardsBase = [
  { id: "tratamento-ponto", href: "/sistemas/tratamento-ponto", titleKey: "ponto_titulo",  descKey: "ponto_descricao",   sloganKey: null,           badge: null,   accent: "#FF4757", icon: Clock   },
  { id: "ondesk",           href: "/sistemas/ondesk",           titleKey: "ondesk_titulo", descKey: "ondesk_descricao",  sloganKey: "ondesk_slogan", badge: "NOVO", accent: "#FF4757", icon: Headset },
];

export default function Sistemas() {
  const { content: s } = useSiteContent("sistemas");
  const sistemasExtras = useSistemasExtras();

  return (
    <div className="min-h-screen bg-[#12141A]">
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-16"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
          borderTop: "1px solid rgba(255, 71, 87, 0.08)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] z-0"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition-colors hover:text-[#FF4757]">
              Início
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-300">Sistemas</span>
          </nav>
          <h1 className="mb-6 text-4xl font-extrabold text-gray-200 lg:text-5xl">
            {s.hero_titulo ?? "Sistemas de Gestão Completos"}
          </h1>
          <p className="max-w-3xl text-base text-gray-400 lg:text-lg">
            {s.hero_subtitulo ?? "Escolha a solução ideal para o seu segmento"}
          </p>
        </div>
      </section>

      {/* Seção Principal */}
      <section
        className="relative overflow-hidden pt-24 pb-12"
        style={{ background: "#12141A" }}
      >
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-32"
          style={{
            background: "linear-gradient(180deg, #0A0C10 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute -left-[10%] -top-[15%] z-0"
          style={{
            width: 550,
            height: 550,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-[12%] -right-[10%] z-0"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.06) 0%, rgba(255, 71, 87, 0.02) 50%, transparent 70%)",
            filter: "blur(110px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
              {s.secao_titulo ?? "A Lógica tem o sistema ideal para você"}
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 lg:text-lg">
              {s.secao_subtitulo ?? "Qual o segmento do seu negócio? Nossos sistemas abrangem estas áreas."}
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {segmentCardsBase.map((card) => (
              <div
                key={card.id}
                role="button"
                tabIndex={0}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border p-8 transition-all duration-500"
                style={cardBaseStyle}
                onMouseEnter={cardHoverEnter}
                onMouseLeave={cardHoverLeave}
                onClick={() => (window.location.href = card.href)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.location.href = card.href;
                  }
                }}
              >
                <div
                  className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.6), transparent)",
                  }}
                />
                <div
                  className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 71, 87, 0.15) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />
                <div className="relative z-10 mb-6 flex items-center justify-center gap-4">
                  {card.icons.map((Icon, i) => (
                    <div
                      key={i}
                      className="flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 71, 87, 0.15) 0%, rgba(255, 71, 87, 0.05) 100%)",
                        boxShadow: "0 4px 12px rgba(255, 71, 87, 0.2)",
                      }}
                    >
                      <Icon
                        className="h-8 w-8 text-[#FF4757]"
                        style={{ filter: "drop-shadow(0 0 8px rgba(255, 71, 87, 0.5))" }}
                      />
                    </div>
                  ))}
                </div>
                <h3 className="mb-3 text-center text-xl font-bold text-gray-200">
                  {s[card.key] ?? card.key}
                </h3>
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500 transition-colors group-hover:text-[#FF4757]">
                  <span>Ver Detalhes</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
              {s.outras_titulo ?? "Outras Soluções da Lógica"}
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 lg:text-lg">
              {s.outras_subtitulo ?? "Ferramentas para RH, gestão de ponto e organização de atendimentos."}
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {solutionCardsBase.map((card) => (
              <div
                key={card.id}
                role="button"
                tabIndex={0}
                className="group relative flex min-h-[320px] cursor-pointer flex-col justify-center overflow-hidden rounded-2xl border p-8 transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                  borderColor: "rgba(255, 71, 87, 0.25)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${card.accent}AA`;
                  e.currentTarget.style.boxShadow = `0 16px 48px rgba(0, 0, 0, 0.6), 0 0 40px ${card.accent}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 71, 87, 0.25)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
                }}
                onClick={() => (window.location.href = card.href)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.location.href = card.href;
                  }
                }}
              >
                <div
                  className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.accent}99, transparent)`,
                  }}
                />
                <div
                  className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, ${card.accent}26 0%, transparent 70%)`,
                    filter: "blur(30px)",
                  }}
                />
                <div className="relative z-10 mb-4 flex min-h-[28px] justify-center">
                  {card.badge != null && (
                    <div
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider"
                      style={{
                        background: `${card.accent}22`,
                        border: `1px solid ${card.accent}55`,
                        color: card.accent,
                      }}
                    >
                      {card.badge}
                    </div>
                  )}
                </div>
                <div className="relative z-10 mb-6 flex items-center justify-center">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${card.accent}26 0%, ${card.accent}12 100%)`,
                      border: `2px solid ${card.accent}55`,
                      boxShadow: `0 10px 26px ${card.accent}1F`,
                    }}
                  >
                    <card.icon
                      className="h-10 w-10"
                      style={{
                        color: card.accent,
                        filter: `drop-shadow(0 0 10px ${card.accent}55)`,
                      }}
                    />
                  </div>
                </div>
                <h3 className="mb-3 text-center text-2xl font-extrabold text-gray-200 transition-colors">
                  {s[card.titleKey] ?? card.titleKey}
                </h3>
                {card.sloganKey && (
                  <p className="mb-2 text-center text-sm font-semibold text-gray-300">
                    {s[card.sloganKey] ?? ""}
                  </p>
                )}
                <p className="mb-6 text-center text-sm leading-relaxed text-gray-400 md:text-base">
                  {s[card.descKey] ?? card.descKey}
                </p>
                <div
                  className="flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
                  style={{ color: card.accent }}
                >
                  <span>Saiba Mais</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

          {/* ── Cards de sistemas extras (criados pelo admin) ─────── */}
          {sistemasExtras.length > 0 && (
            <div className="mb-16">
              <div className="mb-10 text-center">
                <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
                  Mais Sistemas Disponíveis
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {sistemasExtras.map((sistema) => (
                  <div
                    key={sistema.id}
                    role="button"
                    tabIndex={0}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border p-8 transition-all duration-500"
                    style={{
                      background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                      borderColor: "rgba(255,71,87,0.25)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,71,87,0.6)";
                      e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.6), 0 0 40px rgba(255,71,87,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,71,87,0.25)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
                    }}
                    onClick={() => (window.location.href = `/sistemas/${sistema.slug}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        window.location.href = `/sistemas/${sistema.slug}`;
                      }
                    }}
                  >
                    <div
                      className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,71,87,0.6), transparent)" }}
                    />
                    {sistema.badge && (
                      <div className="mb-4 flex justify-center">
                        <span
                          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider"
                          style={{ background: "rgba(255,71,87,0.2)", border: "1px solid rgba(255,71,87,0.4)", color: "#FF4757" }}
                        >
                          {sistema.badge}
                        </span>
                      </div>
                    )}
                    <div className="relative z-10 mb-6 flex items-center justify-center">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-xl text-3xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,71,87,0.15) 0%, rgba(255,71,87,0.05) 100%)",
                          boxShadow: "0 4px 12px rgba(255,71,87,0.2)",
                        }}
                      >
                        {sistema.emoji || "🖥️"}
                      </div>
                    </div>
                    <h3 className="mb-3 text-center text-xl font-bold text-gray-200">{sistema.nome}</h3>
                    <p className="mb-4 text-center text-sm leading-relaxed text-gray-400">{sistema.descricao}</p>
                    <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500 transition-colors group-hover:text-[#FF4757]">
                      <span>Ver Detalhes</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="mb-6 text-base text-gray-400">
              {s.ajuda_texto ?? "Não encontrou um sistema pra você ou precisa da nossa ajuda para escolhê-lo?"}
            </p>
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://wa.me/5547984218275?text=" +
                    encodeURIComponent(
                      "Olá! Preciso de ajuda para escolher o sistema ideal para o meu negócio. Pode me orientar?"
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
      </section>
    </div>
  );
}