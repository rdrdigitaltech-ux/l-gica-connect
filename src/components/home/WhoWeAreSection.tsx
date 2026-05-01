import {
  Building2,
  Target,
  Heart,
  Award,
  Shield,
  FileCheck,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const cardStyle = {
  background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
};

const cardLightTop = {
  background:
    "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.6), transparent)",
  boxShadow: "0 0 8px rgba(255, 71, 87, 0.5)",
};

const cardGlowHover = {
  background:
    "radial-gradient(circle at 0% 0%, rgba(255, 71, 87, 0.2) 0%, transparent 70%)",
  filter: "blur(20px)",
};

export default function WhoWeAreSection() {
  const { content: s } = useSiteContent("sobre");

  return (
    <section
      className="relative overflow-hidden py-24 transition-colors duration-300"
      style={{
        background: "#0A0C10",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Overlay de transição do hero */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-32"
        style={{
          background: "linear-gradient(180deg, #12141A 0%, transparent 100%)",
        }}
      />
      {/* Flash de luz - opacidade reduzida */}
      <div
        className="pointer-events-none absolute -left-[10%] -top-[15%] z-0"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Flash de luz - canto inferior direito */}
      <div
        className="pointer-events-none absolute -bottom-[12%] -right-[10%] z-0"
        style={{
          width: 550,
          height: 550,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.06) 0%, rgba(255, 71, 87, 0.02) 50%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      {/* Linha horizontal de luz */}
      <div
        className="pointer-events-none absolute left-[20%] top-1/2 z-0 h-px w-[60%] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.15), transparent)",
          boxShadow: "0 0 20px rgba(255, 71, 87, 0.2)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
              style={{
                background: "rgba(255, 71, 87, 0.15)",
                borderColor: "rgba(255, 71, 87, 0.25)",
              }}
            >
              <Building2 className="h-4 w-4 text-[#FF4757]" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Quem Somos
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-extrabold leading-tight text-gray-200 lg:text-4xl">
              {s.titulo ?? "Mais de 3 Décadas Transformando Negócios em Santa Catarina"}
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>{s.paragrafo_1 ?? "Fundada em 1988, a Lógica Informática e Automação Comercial nasceu com um propósito claro: levar tecnologia de ponta para empresas de todos os portes em Santa Catarina."}</p>
              <p>{s.paragrafo_2 ?? "Ao longo de mais de 36 anos, construímos uma trajetória sólida baseada em confiança, inovação e atendimento personalizado."}</p>
              <p>{s.paragrafo_3 ?? "Como empresa autorizada pelo INMETRO e credenciada pela SEFAZ-SC, garantimos tecnologia de qualidade e conformidade legal."}</p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="group relative overflow-hidden rounded-2xl border p-6"
              style={cardStyle}
            >
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                style={cardLightTop}
              />
              <div
                className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={cardGlowHover}
              />
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{
                    background: "rgba(255, 71, 87, 0.15)",
                    border: "1px solid rgba(255, 71, 87, 0.25)",
                  }}
                >
                  <Target className="h-6 w-6 text-[#FF4757]" />
                </div>
                <h3 className="text-lg font-bold text-gray-200">{s.missao_titulo ?? "Nossa Missão"}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                {s.missao_texto ?? "Fornecer soluções tecnológicas que simplifiquem a gestão comercial, aumentem a produtividade e impulsionem o crescimento dos nossos clientes."}
              </p>
            </div>

            <div
              className="group relative overflow-hidden rounded-2xl border p-6"
              style={cardStyle}
            >
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                style={cardLightTop}
              />
              <div
                className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={cardGlowHover}
              />
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{
                    background: "rgba(255, 71, 87, 0.15)",
                    border: "1px solid rgba(255, 71, 87, 0.25)",
                  }}
                >
                  <Heart className="h-6 w-6 text-[#FF4757]" />
                </div>
                <h3 className="text-lg font-bold text-gray-200">{s.valores_titulo ?? "Nossos Valores"}</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4757]" />
                  <span><strong className="text-gray-300">Confiança:</strong>{" "}{s.valor_confianca ?? "Relacionamentos duradouros baseados em transparência"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4757]" />
                  <span><strong className="text-gray-300">Inovação:</strong>{" "}{s.valor_inovacao ?? "Sempre à frente com as melhores tecnologias"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4757]" />
                  <span><strong className="text-gray-300">Compromisso:</strong>{" "}{s.valor_compromisso ?? "Suporte dedicado em todas as etapas"}</span>
                </li>
              </ul>
            </div>

            <div
              className="group relative overflow-hidden rounded-2xl border p-6"
              style={cardStyle}
            >
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                style={cardLightTop}
              />
              <div
                className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={cardGlowHover}
              />
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{
                    background: "rgba(255, 71, 87, 0.15)",
                    border: "1px solid rgba(255, 71, 87, 0.25)",
                  }}
                >
                  <Award className="h-6 w-6 text-[#FF4757]" />
                </div>
                <h3 className="text-lg font-bold text-gray-200">Certificações</h3>
              </div>
              <div className="flex flex-col gap-3">
                <div
                  className="flex items-center gap-3 rounded-lg border p-3"
                  style={{
                    borderColor: "rgba(255, 71, 87, 0.25)",
                    background: "rgba(255, 71, 87, 0.15)",
                  }}
                >
                  <Shield className="h-5 w-5 shrink-0 text-[#FF4757]" />
                  <div>
                    <p className="text-xs font-bold text-gray-200">
                      Autorizado INMETRO
                    </p>
                    <p className="text-xs text-gray-500">{s.cert_inmetro ?? "Balanças certificadas"}</p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-3 rounded-lg border p-3"
                  style={{
                    borderColor: "rgba(255, 71, 87, 0.25)",
                    background: "rgba(255, 71, 87, 0.15)",
                  }}
                >
                  <FileCheck className="h-5 w-5 shrink-0 text-[#FF4757]" />
                  <div>
                    <p className="text-xs font-bold text-gray-200">
                      Credenciado SEFAZ-SC
                    </p>
                    <p className="text-xs text-gray-500">{s.cert_sefaz ?? "Impressoras fiscais"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
