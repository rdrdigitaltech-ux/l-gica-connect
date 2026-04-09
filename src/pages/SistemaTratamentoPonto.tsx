import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Calculator,
  CalendarClock,
  Clock,
  FileWarning,
  FileUp,
  ShieldCheck,
  Smartphone,
  Timer,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

const ACCENT = "#FF4757";

const funcionalidades = [
  {
    icon: Calculator,
    title: "Apuração Automática de Ponto",
    desc: "Cálculo automático de horas trabalhadas, extras, faltas e atrasos com precisão e consistência.",
  },
  {
    icon: CalendarClock,
    title: "Gestão de Jornadas",
    desc: "Controle de escalas, turnos e horários flexíveis, com parametrizações adaptadas à sua operação.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Gerenciais",
    desc: "Indicadores e visões consolidadas para produtividade, absenteísmo, horas extras e tendências.",
  },
  {
    icon: FileUp,
    title: "Integração com Folha",
    desc: "Exportação de dados para sistemas de folha de pagamento, reduzindo retrabalho e inconsistências.",
  },
  {
    icon: ShieldCheck,
    title: "Conformidade Legal",
    desc: "Apoio à conformidade com a Portaria 671 e rotinas do departamento pessoal, com trilhas e relatórios.",
  },
  {
    icon: FileWarning,
    title: "Tratamento de Exceções",
    desc: "Gestão de atestados, férias, folgas e justificativas com fluxo de validação e histórico.",
  },
  {
    icon: Smartphone,
    title: "Acesso Web e Mobile",
    desc: "Gestores e colaboradores acessam de qualquer lugar para consultas, ajustes e aprovações.",
  },
  {
    icon: Timer,
    title: "Banco de Horas",
    desc: "Controle de banco de horas positivo e negativo com regras claras e visibilidade por período.",
  },
] as const;

const beneficios = [
  {
    icon: Clock,
    title: "Fechamento muito mais rápido",
    desc: "Reduza drasticamente o tempo de fechamento do ponto com apuração automatizada.",
  },
  {
    icon: ShieldCheck,
    title: "Mais segurança e conformidade",
    desc: "Padronize rotinas e tenha rastreabilidade para auditorias e conferências internas.",
  },
  {
    icon: BarChart3,
    title: "Decisões com dados",
    desc: "Acompanhe indicadores para agir rápido em atrasos, faltas e gargalos operacionais.",
  },
  {
    icon: FileUp,
    title: "Menos retrabalho no RH",
    desc: "Evite cálculos manuais e exporte informações prontas para a folha de pagamento.",
  },
] as const;

export default function SistemaTratamentoPonto() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatsappText =
    "Olá! Tenho interesse no Sistema de Tratamento de Ponto. Gostaria de falar com um especialista sobre funcionalidades, valores e implantação.";

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
            <span style={{ color: "var(--text-secondary)" }}>
              Tratamento de Ponto
            </span>
          </nav>

          <Link
            to="/sistemas"
            className="mb-8 inline-flex items-center gap-2 transition-colors"
            style={{ color: "rgba(255, 255, 255, 0.8)" }}
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar para Sistemas
          </Link>

          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
            style={{
              background: `${ACCENT}14`,
              borderColor: `${ACCENT}55`,
            }}
          >
            <Clock className="h-4 w-4" style={{ color: ACCENT }} />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "rgba(255, 255, 255, 0.92)" }}
            >
              Sistema de Tratamento de Ponto
            </span>
          </div>

          <h1
            className="mb-6 font-extrabold leading-tight text-gray-200"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            Tratamento de Ponto{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #FF6B7A 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              profissional e automático
            </span>
          </h1>

          <p
            className="mb-10 max-w-3xl text-gray-300/80"
            style={{ fontSize: "clamp(14px, 1.6vw, 18px)" }}
          >
            Sistema profissional de tratamento de ponto que automatiza a gestão
            de jornadas, reduz erros e reforça a conformidade com a legislação
            trabalhista. Relatórios inteligentes e integração com folha de
            pagamento.
          </p>

          <button
            type="button"
            onClick={() =>
              window.open(
                "https://wa.me/5547984218275?text=" +
                  encodeURIComponent(whatsappText),
                "_blank"
              )
            }
            className="inline-flex items-center gap-3 rounded-lg px-8 py-4 text-base font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
            }}
          >
            <MessageCircle className="h-6 w-6" />
            Falar no WhatsApp
          </button>
        </div>
      </section>

      {/* PLACEHOLDER IMAGEM */}
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
              <Clock className="h-14 w-14" style={{ color: ACCENT }} />
            </div>

            <h2
              style={{
                fontSize: "clamp(22px, 3vw, 34px)",
              }}
              className="mb-4 font-extrabold text-gray-200"
            >
              Fotos do sistema em breve
            </h2>
            <p
              className="mx-auto mb-6 max-w-2xl text-base md:text-lg"
              style={{ color: "#9CA3AF" }}
            >
              Estamos preparando imagens e demonstrações da interface. Em breve
              você poderá visualizar o sistema completo por aqui.
            </p>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: `${ACCENT}22`,
                border: `1px solid ${ACCENT}55`,
                color: ACCENT,
              }}
            >
              Conteúdo em produção
            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="px-6 py-24" style={{ background: "#12141A" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
              Funcionalidades principais
            </h2>
            <p
              className="mx-auto max-w-3xl text-base text-gray-400 lg:text-lg"
            >
              Tudo o que você precisa para uma apuração completa e uma rotina de
              RH mais eficiente.
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
                  <h3 className="relative z-10 mb-2 text-center text-base font-bold text-gray-200">
                    {item.title}
                  </h3>
                  <p className="relative z-10 text-center text-sm leading-relaxed text-gray-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="px-6 py-24" style={{ background: "#0A0C10" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
              Benefícios reais para o RH
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 lg:text-lg">
              Menos tempo com planilhas, mais controle e mais previsibilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="text-center">
                  <div
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}26, ${ACCENT}12)`,
                      border: `2px solid ${ACCENT}55`,
                    }}
                  >
                    <Icon className="h-9 w-9" style={{ color: ACCENT }} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-200">
                    {b.title}
                  </h3>
                  <p className="text-gray-400">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          background: `linear-gradient(135deg, ${ACCENT}2B 0%, rgba(0,0,0,0) 40%), #0A0C10`,
        }}
      >
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
            Quer automatizar o fechamento do ponto?
          </h2>
          <p className="mb-8 text-lg text-gray-400">
            A Lógica comercializa e implanta soluções de tratamento de ponto com
            foco em resultado, conformidade e suporte de verdade.
          </p>
          <button
            type="button"
            onClick={() =>
              window.open(
                "https://wa.me/5547984218275?text=" +
                  encodeURIComponent(whatsappText),
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
            Falar no WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}

