import { Award, FileCheck } from "lucide-react";

const certifications = [
  {
    icon: Award,
    title: "Autorizada INMETRO",
    desc: "Credenciamento oficial para comercialização e manutenção de balanças comerciais.",
  },
  {
    icon: FileCheck,
    title: "Credenciada SEFAZ-SC",
    desc: "Habilitação para comercialização e suporte de impressoras fiscais no estado.",
  },
];

export default function CertificationsSection() {
  return (
    <section
      className="relative overflow-hidden py-16 transition-colors duration-300 md:py-20 lg:py-24"
      style={{
        background: "#0A0C10",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Overlay de transição da seção anterior (Solutions #151820) */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-32"
        style={{
          background: "linear-gradient(180deg, #151820 0%, transparent 100%)",
        }}
      />
      {/* Flash de luz vermelha - opacidade reduzida */}
      <div
        className="pointer-events-none absolute -right-[5%] -top-[10%] z-0"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 40%, transparent 80%)",
          filter: "blur(51px)",
        }}
      />

      {/* Flash de luz vermelha - canto inferior esquerdo */}
      <div
        className="pointer-events-none absolute -bottom-[8%] -left-[5%] z-0"
        style={{
          width: 450,
          height: 450,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.06) 0%, rgba(255, 71, 87, 0.02) 40%, transparent 80%)",
          filter: "blur(57px)",
        }}
      />

      {/* Linha horizontal de luz sutil (diferenciador) */}
      <div
        className="pointer-events-none absolute left-[20%] top-1/3 z-0 h-px w-[60%]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(230, 57, 70, 0.15), transparent)",
          boxShadow: "0 0 20px rgba(230, 57, 70, 0.2)",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10">
        <div className="container-narrow mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-xl font-extrabold text-gray-200 md:text-2xl lg:text-4xl">
              Certificações e Credenciais
            </h2>
            <p className="text-sm text-gray-400">
              Autorizada e credenciada pelos principais órgãos reguladores
            </p>
          </div>

          <div
            className="mx-auto max-w-5xl rounded-2xl border p-4 md:p-6 lg:p-10"
            style={{
              background: "rgba(15, 17, 21, 0.4)",
              borderColor: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {certifications.map((cert) => {
                const IconComponent = cert.icon;
                return (
                  <div
                    key={cert.title}
                    className="rounded-2xl"
                    style={{ padding: "2px", overflow: "visible" }}
                  >
                    <div
                      className="group relative h-full overflow-hidden rounded-2xl border p-4 md:p-6"
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(15, 17, 21, 0.6) 0%, rgba(12, 14, 17, 0.6) 100%)",
                        borderColor: "rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                    {/* Reflexo de luz superior */}
                    <div
                      className="pointer-events-none absolute left-0 right-0 top-0 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                      }}
                    />

                    {/* Reflexo diagonal animado */}
                    <div
                      className="pointer-events-none absolute -right-[100%] -top-[100%] h-[200%] w-[200%] opacity-0 transition-all duration-700 group-hover:-right-[40%] group-hover:opacity-100 group-hover:-top-[40%]"
                      style={{
                        background:
                          "linear-gradient(135deg, transparent 30%, rgba(230, 57, 70, 0.12) 50%, transparent 70%)",
                        transform: "rotate(45deg)",
                      }}
                    />

                    {/* Glow sutil no hover */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 0%, rgba(230, 57, 70, 0.08) 0%, transparent 70%)",
                      }}
                    />

                    <div className="relative z-10 flex items-start gap-5">
                      <div
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: "rgba(230, 57, 70, 0.1)",
                          border: "1px solid rgba(230, 57, 70, 0.2)",
                        }}
                      >
                        <IconComponent
                          className="h-8 w-8"
                          style={{ color: "#E63946" }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-3 text-lg font-bold text-gray-200 md:text-xl">
                          {cert.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400 md:text-base">
                          {cert.desc}
                        </p>
                      </div>
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
