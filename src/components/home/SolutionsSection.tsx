import { Monitor, Cpu, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: Monitor,
    title: "Sistemas de Gestão",
    desc: "Soluções completas para Gastronomia, Varejo e Multiloja com tecnologia de ponta.",
    link: "/sistemas",
    cta: "Conhecer Sistemas",
  },
  {
    icon: Cpu,
    title: "Equipamentos",
    desc: "Balanças, impressoras fiscais, leitores de código de barras, relógios ponto e mais.",
    link: "/equipamentos",
    cta: "Ver Equipamentos",
  },
  {
    icon: Wrench,
    title: "Serviços Técnicos",
    desc: "Manutenção, instalação, suporte técnico e treinamento especializado.",
    link: "/servicos",
    cta: "Nossos Serviços",
  },
];

export default function SolutionsSection() {
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
        className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2"
        style={{
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 40%, transparent 80%)",
          filter: "blur(72px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[10%] z-0"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(230, 57, 70, 0.12) 0%, transparent 80%)",
          filter: "blur(54px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[10%] z-0"
        style={{
          width: 450,
          height: 450,
          background:
            "radial-gradient(circle, rgba(230, 57, 70, 0.09) 0%, transparent 80%)",
          filter: "blur(57px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(230, 57, 70, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(230, 57, 70, 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10">
        <div className="container-narrow mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-extrabold text-gray-200 md:text-3xl lg:text-4xl">
              Nossas Soluções
            </h2>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
              Tecnologia completa para automatizar e otimizar seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {solutions.map((sol) => {
              const IconComponent = sol.icon;
              return (
                <div
                  key={sol.title}
                  className="rounded-2xl"
                  style={{
                    padding: "2px",
                    overflow: "visible",
                  }}
                >
                  <div
                    className="group relative h-full overflow-hidden rounded-2xl border p-6 md:p-8"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                      border: "1px solid rgba(230, 57, 70, 0.3)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(230, 57, 70, 0.7), transparent)",
                        boxShadow: "0 0 8px rgba(230, 57, 70, 0.5)",
                      }}
                    />
                    <div className="mb-6 flex items-center justify-center">
                      <IconComponent
                        className="h-12 w-12 md:h-16 md:w-16"
                        style={{
                          color: "#E63946",
                          filter:
                            "drop-shadow(0 0 12px rgba(230, 57, 70, 0.6))",
                        }}
                      />
                    </div>
                    <h3 className="mb-3 text-center text-lg font-bold text-gray-200 md:text-xl">
                      {sol.title}
                    </h3>
                    <p className="mb-6 text-center text-sm leading-relaxed text-gray-400">
                      {sol.desc}
                    </p>
                    <Link to={sol.link} className="block">
                      <button
                        type="button"
                        className="mx-auto flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-colors hover:opacity-90 active:opacity-80"
                        style={{ background: "#FF4757", color: "#FFFFFF" }}
                      >
                        {sol.cta}
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
