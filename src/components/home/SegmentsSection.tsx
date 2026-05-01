import {
  ShoppingCart,
  Network,
  ShoppingBasket,
  ChefHat,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FlipCard } from "@/components/FlipCard";

const segments = [
  {
    icon: ShoppingCart,
    label: "Varejo",
    desc: "Sistemas de PDV, controle de estoque, gestão financeira e integração com e-commerce para lojas de todos os portes.",
    detalhe: "PDV completo, Estoque, Fiscal, Relatórios e mais",
    benefits: [
      "Sistema completo de PDV e gestão de estoque",
      "Controle fiscal integrado e emissão de notas",
      "Integração com e-commerce e marketplaces",
      "Relatórios detalhados de vendas e performance",
    ],
    link: "/sistemas/varejo",
    cor: "#FF4757",
  },
  {
    icon: Network,
    label: "Multiloja",
    desc: "Gestão centralizada de múltiplas unidades com relatórios consolidados e controle unificado de estoque.",
    detalhe: "ERP centralizado, Dashboard, Sincronização",
    benefits: [
      "Gestão centralizada de múltiplas unidades",
      "Sincronização automática de estoque e preços",
      "Dashboard unificado com métricas consolidadas",
      "Controle de permissões por filial",
    ],
    link: "/sistemas/multiloja",
    cor: "#FF4757",
  },
  {
    icon: ShoppingBasket,
    label: "Supermercados",
    desc: "Automação completa com balanças integradas, PDV rápido, controle de perecíveis e gestão de gôndolas.",
    detalhe: "Balanças, Etiquetas, Promoções, Fidelidade",
    benefits: [
      "Controle de perecíveis e validades automáticas",
      "Integração com balanças e etiquetas",
      "Gestão de promoções e ofertas dinâmicas",
      "Sistema de fidelidade e cashback integrado",
    ],
    link: "/sistemas/multiloja",
    cor: "#FF4757",
  },
  {
    icon: ChefHat,
    label: "Restaurantes",
    desc: "KDS (Kitchen Display System), controle de produção, fichas técnicas e gestão de custos.",
    detalhe: "Comandas, Delivery, Cardápio Digital",
    benefits: [
      "Controle de comandas e mesas digitais",
      "Integração com delivery (iFood, Rappi, Uber Eats)",
      "Gestão de cardápio e precificação inteligente",
      "Relatórios de performance por prato e garçom",
    ],
    link: "/sistemas/gastronomia",
    cor: "#E63946",
  },
];

export default function SegmentsSection() {
  return (
    <section
      className="relative overflow-hidden py-16 transition-colors duration-300 md:py-20 lg:py-24"
      style={{
        background: "#12141A",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-32"
        style={{
          background: "linear-gradient(180deg, #0A0C10 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-[10%] -top-[20%] z-0"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 40%, transparent 80%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-[15%] -left-[10%] z-0"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.06) 0%, rgba(255, 71, 87, 0.02) 40%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(255, 71, 87, 0.06) 0%, transparent 80%)",
          filter: "blur(72px)",
        }}
      />

      <div className="relative z-10 px-4 md:px-6 lg:px-8">
        <div className="container-narrow mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-extrabold text-gray-200 md:text-3xl lg:text-4xl">
              Segmentos que Atendemos
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-gray-300 md:text-base">
              Soluções especializadas para cada tipo de negócio
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-4 min-h-0">
            {segments.map((seg) => {
              const IconComponent = seg.icon;
              return (
                <div key={seg.label} className="min-h-[300px] md:min-h-[320px]">
                <FlipCard
                  className="h-[300px] md:h-[320px] w-full"
                  front={
                    <div
                      className="relative h-full rounded-2xl border p-5 pt-5 pb-5 md:p-8 flex flex-col items-center justify-center text-center"
                      style={{
                        background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                        borderColor: "rgba(255, 71, 87, 0.25)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      }}
                    >
                      <div
                        className="pointer-events-none absolute left-0 right-0 top-0 h-px rounded-t-2xl"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(230, 57, 70, 0.8), transparent)",
                          boxShadow: "0 0 8px rgba(230, 57, 70, 0.6)",
                        }}
                      />
                      <div
                        className="mb-4 p-3 md:mb-6 md:p-4 rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, ${seg.cor}20, ${seg.cor}10)`,
                          border: `2px solid ${seg.cor}40`,
                        }}
                      >
                        <IconComponent
                          className="h-11 w-11 text-[#E63946] md:h-14 md:w-14"
                          style={{
                            color: seg.cor,
                            filter: `drop-shadow(0 0 8px ${seg.cor}60)`,
                          }}
                        />
                      </div>
                      <h3 className="text-base font-bold text-gray-200 md:text-xl">
                        {seg.label}
                      </h3>
                      <p className="mt-2 text-center text-xs text-gray-500 line-clamp-4 md:line-clamp-3">
                        {seg.desc}
                      </p>
                      <p className="text-[#FF4757] text-sm mt-4 md:mt-6 font-medium">
                        <span className="hidden md:inline">
                          Passe o mouse para saber mais
                        </span>
                        <span className="md:hidden">
                          Toque para saber mais
                        </span>
                      </p>
                    </div>
                  }
                  back={
                    <div
                      className="h-full rounded-2xl border p-5 md:p-8 flex flex-col items-center justify-center text-center overflow-y-auto"
                      style={{
                        background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                        borderColor: "rgba(255, 71, 87, 0.25)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      }}
                    >
                      <div className="mb-3 shrink-0">
                        <IconComponent
                          className="h-10 w-10"
                          style={{ color: seg.cor }}
                        />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 shrink-0 text-gray-200">
                        {seg.label}
                      </h3>
                      <p className="text-xs md:text-sm mb-3 shrink-0 text-gray-300">
                        {seg.detalhe}
                      </p>
                      <ul className="text-left text-xs space-y-1 mb-4 w-full max-w-[200px] shrink-0 text-gray-400">
                        {seg.benefits.slice(0, 3).map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: seg.cor }}
                            />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={seg.link}
                        className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-bold transition-opacity hover:opacity-90 active:opacity-80 shrink-0 min-h-[44px] items-center justify-center"
                        style={{
                          background: "#FF4757",
                          color: "#FFFFFF",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Saiba Mais
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                      <p className="text-xs mt-3 md:hidden shrink-0 text-gray-500">
                        Toque novamente para voltar
                      </p>
                    </div>
                  }
                />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
