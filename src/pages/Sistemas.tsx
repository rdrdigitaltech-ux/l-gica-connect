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
<<<<<<< HEAD
import { useSiteContent } from "@/hooks/useSiteContent";
=======
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752

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

<<<<<<< HEAD
// títulos dos cards são substituídos pelo hook dentro do componente
const segmentCardsBase = [
  { id: "varejo",      href: "/sistemas/varejo",      key: "varejo_titulo",     icons: [ShoppingCart, Store]          },
  { id: "gastronomia", href: "/sistemas/gastronomia",  key: "gastronomia_titulo",icons: [UtensilsCrossed, Coffee]      },
  { id: "multiloja",   href: "/sistemas/multiloja",    key: "multiloja_titulo",  icons: [ShoppingBasket, Building2]    },
];

const solutionCardsBase = [
  { id: "tratamento-ponto", href: "/sistemas/tratamento-ponto", titleKey: "ponto_titulo",  descKey: "ponto_descricao",  sloganKey: null,          badge: null,   accent: "#FF4757", icon: Clock   },
  { id: "ondesk",           href: "/sistemas/ondesk",           titleKey: "ondesk_titulo", descKey: "ondesk_descricao", sloganKey: "ondesk_slogan", badge: "NOVO", accent: "#FF4757", icon: Headset },
];

export default function Sistemas() {
  const { content: s } = useSiteContent("sistemas");

=======
const segmentCards = [
  {
    id: "varejo",
    href: "/sistemas/varejo",
    title: "Comércio & Varejo",
    icons: [ShoppingCart, Store],
  },
  {
    id: "gastronomia",
    href: "/sistemas/gastronomia",
    title: "Bares & Restaurantes",
    icons: [UtensilsCrossed, Coffee],
  },
  {
    id: "multiloja",
    href: "/sistemas/multiloja",
    title: "Supermercados & Multilojas",
    icons: [ShoppingBasket, Building2],
  },
];

const solutionCards = [
  {
    id: "tratamento-ponto",
    href: "/sistemas/tratamento-ponto",
    title: "Tratamento de Ponto",
    description:
      "Sistema completo de gestão e apuração de ponto eletrônico com relatórios avançados e integração total.",
    accent: "#FF4757",
    icon: Clock,
  },
  {
    id: "ondesk",
    href: "/sistemas/ondesk",
    title: "Lógica.OnDesk",
    description:
      "Central de comando para WhatsApp. Métricas reais, controle total da equipe e produtividade em tempo real.",
    accent: "#FF4757",
    icon: Headset,
    badge: "NOVO",
    slogan: "Pare de adivinhar. Organize seu atendimento.",
  },
] as const;

export default function Sistemas() {
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
  return (
    <div className="min-h-screen bg-[#12141A]">
      {/* Hero - mantido */}
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
<<<<<<< HEAD
            {s.hero_titulo ?? "Sistemas de Gestão Completos"}
          </h1>
          <p className="max-w-3xl text-base text-gray-400 lg:text-lg">
            {s.hero_subtitulo ?? "Escolha a solução ideal para o seu segmento"}
=======
            Sistemas de Gestão Completos
          </h1>
          <p className="max-w-3xl text-base text-gray-400 lg:text-lg">
            Escolha a solução ideal para o seu segmento
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
          </p>
        </div>
      </section>

      {/* Seção Principal - Seletor de Segmento (background consistente até o footer) */}
      <section
        className="relative overflow-hidden pt-24 pb-12"
        style={{ background: "#12141A" }}
      >
        {/* Overlay de transição suave do hero */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-32"
          style={{
            background:
              "linear-gradient(180deg, #0A0C10 0%, transparent 100%)",
          }}
        />
        {/* Flashes de luz vermelha - opacidade reduzida */}
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
          {/* Título da Pergunta */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
<<<<<<< HEAD
              {s.secao_titulo ?? "A Lógica tem o sistema ideal para você"}
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 lg:text-lg">
              {s.secao_subtitulo ?? "Qual o segmento do seu negócio? Nossos sistemas abrangem estas áreas."}
=======
              A Lógica tem o sistema ideal para você
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 lg:text-lg">
              Qual o segmento do seu negócio? Nossos sistemas abrangem estas
              áreas.
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
            </p>
          </div>

          {/* Grid de 3 Cards de Segmentos (categorias unidas, ícones duplos) */}
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
<<<<<<< HEAD
            {segmentCardsBase.map((card) => (
=======
            {segmentCards.map((card) => (
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
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

                {/* Container dos 2 ícones lado a lado */}
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
                        style={{
                          filter:
                            "drop-shadow(0 0 8px rgba(255, 71, 87, 0.5))",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <h3 className="mb-3 text-center text-xl font-bold text-gray-200">
<<<<<<< HEAD
                  {s[card.key] ?? card.key}
=======
                  {card.title}
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
                </h3>
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500 transition-colors group-hover:text-[#FF4757]">
                  <span>Ver Detalhes</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Novas Soluções */}
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
<<<<<<< HEAD
              {s.outras_titulo ?? "Outras Soluções da Lógica"}
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 lg:text-lg">
              {s.outras_subtitulo ?? "Ferramentas para RH, gestão de ponto e organização de atendimentos."}
=======
              Outras Soluções da Lógica
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 lg:text-lg">
              Ferramentas para RH, gestão de ponto e organização de atendimentos.
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
<<<<<<< HEAD
            {solutionCardsBase.map((card) => (
=======
            {solutionCards.map((card) => (
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
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
<<<<<<< HEAD
                  {card.badge != null && (
=======
                  {card.badge && (
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
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

<<<<<<< HEAD
                <h3 className="mb-3 text-center text-2xl font-extrabold text-gray-200 transition-colors">
                  {s[card.titleKey] ?? card.titleKey}
                </h3>

                {card.sloganKey && (
                  <p className="mb-2 text-center text-sm font-semibold text-gray-300">
                    {s[card.sloganKey] ?? ""}
=======
                <h3
                  className="mb-3 text-center text-2xl font-extrabold text-gray-200 transition-colors"
                >
                  {card.title}
                </h3>

                {card.slogan && (
                  <p className="mb-2 text-center text-sm font-semibold text-gray-300">
                    {card.slogan}
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
                  </p>
                )}

                <p className="mb-6 text-center text-sm leading-relaxed text-gray-400 md:text-base">
<<<<<<< HEAD
                  {s[card.descKey] ?? card.descKey}
=======
                  {card.description}
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
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

          {/* Seção de Ajuda */}
          <div className="text-center">
            <p className="mb-6 text-base text-gray-400">
<<<<<<< HEAD
              {s.ajuda_texto ?? "Não encontrou um sistema pra você ou precisa da nossa ajuda para escolhê-lo?"}
=======
              Não encontrou um sistema pra você ou precisa da nossa ajuda para
              escolhê-lo?
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
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
