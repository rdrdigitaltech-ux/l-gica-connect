import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function HeroSection() {
  const { content } = useSiteContent("hero");

  const titulo =
    content?.titulo ??
    "Automação Comercial e Informática para Brusque, Blumenau e região";
  const subtitulo =
    content?.subtitulo ??
    "Transforme seu negócio com soluções eficientes e tecnologia avançada.";
  const badgeAnos = content?.badge_anos ?? "36 anos";
  const badgeClientes = content?.badge_clientes ?? "52 mil+";
  const bannerDesktop = content?.banner_desktop ?? "/img/novobanner-desktop.webp";
  const bannerTablet = content?.banner_tablet ?? "/img/novobanner-tablet.webp";
  const bannerMobile = content?.banner_mobile ?? "/img/novobanner-mobile.webp";


export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[72vh] flex-col items-end overflow-hidden px-0 pt-0 pb-0 md:min-h-[85vh] md:items-start md:justify-center md:px-8 md:pt-20 md:pb-20"
      style={{
        background: "linear-gradient(180deg, #06080A 0%, #0A0C10 50%, #12141A 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet={bannerMobile}
            srcSet="/img/novobanner-mobile.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 641px) and (max-width: 1024px)"
            srcSet={bannerTablet}
            srcSet="/img/novobanner-tablet.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 1025px)"
            srcSet={bannerDesktop}
            type="image/webp"
          />
          <img
            src={bannerDesktop}
            srcSet="/img/novobanner-desktop.webp"
            type="image/webp"
          />
          <img
            src="/img/novobanner-desktop.webp"
            alt="Lógica Automação Comercial - Soluções completas para gestão do seu negócio"
            width={1920}
            height={600}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center blur-0 md:blur-[2px]"
            style={{
              opacity: 0.92,
              objectPosition: "center",
            }}
          />
        </picture>
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(6, 8, 10, 0.85) 0%, rgba(6, 8, 10, 0.7) 50%, rgba(6, 8, 10, 0.5) 100%)",
          }}
        />
      </div>

      {/* Glassmorphism mobile */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 35%, rgba(0, 0, 0, 0.12) 55%, rgba(0, 0, 0, 0.25) 70%, rgba(0, 0, 0, 0.4) 85%, rgba(0, 0, 0, 0.55) 100%)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[6] md:hidden"
        style={{
          height: "55%",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(10, 12, 16, 0.08) 25%, rgba(10, 12, 16, 0.2) 50%, rgba(10, 12, 16, 0.35) 75%, rgba(10, 12, 16, 0.5) 100%)",
          backdropFilter: "blur(0.5px)",
          WebkitBackdropFilter: "blur(0.5px)",
        }}
      />

      <div className="relative z-10 flex w-full flex-1 flex-col justify-center md:justify-center">
        <div className="hero-content-offset container-narrow mx-auto mt-12 w-full max-w-7xl px-4 pt-8 pb-12 md:mt-12 md:px-6 md:pt-0 md:pb-0 lg:px-8">
          <motion.h1
            className="mt-28 mb-4 max-w-3xl text-left font-extrabold leading-tight [text-shadow:0_4px_12px_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,0.6)] mx-auto md:mx-0 md:-mt-20 md:mb-6 md:[text-shadow:none]"
            style={{ fontSize: "clamp(1.65rem, 4.8vw, 3.3rem)", color: "#F0EDE8" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {titulo}
            Automação Comercial e Informática para Brusque, Blumenau e região
          </motion.h1>

          <motion.p
            className="mb-6 max-w-3xl text-left leading-relaxed text-gray-200 [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] md:mb-10 md:[text-shadow:none]"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {subtitulo}
            Transforme seu negócio com soluções eficientes e tecnologia avançada.
          </motion.p>

          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="relative inline-flex items-center gap-3 rounded-full border px-4 py-1 md:gap-4 md:px-8 md:py-2.5"
              style={{
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(15, 17, 21, 0.8) 100%)",
                borderColor: "rgba(34, 197, 94, 0.5)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 24px rgba(34, 197, 94, 0.25), inset 0 1px 0 rgba(34, 197, 94, 0.35)",
              }}
            >
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full md:h-8 md:w-8"
                style={{
                  background: "rgba(34, 197, 94, 0.3)",
                  border: "1px solid rgba(34, 197, 94, 0.6)",
                  boxShadow: "0 0 14px rgba(34, 197, 94, 0.5)",
                }}
              >
                <CheckCircle2
                  className="h-5 w-5"
                  style={{
                    color: "#22c55e",
                    filter: "drop-shadow(0 2px 4px rgba(34, 197, 94, 0.4))",
                  }}
                />
              </div>
              <p className="flex items-center gap-2 text-sm font-semibold md:text-base text-[#F0EDE8]">
                <span className="hidden md:inline">Mais de </span>
                <span
                  className="font-extrabold"
                  style={{
                    color: "#22c55e",
                    textShadow: "0 0 20px rgba(34, 197, 94, 0.7), 0 0 40px rgba(34, 197, 94, 0.4)",
                  }}
                >
                  {badgeAnos}
                </span>
                  <span className="md:hidden">36+</span>
                  <span className="hidden md:inline">36 anos</span>
                </span>
                <span className="md:hidden"> Anos</span>
                <span className="hidden md:inline"> de mercado</span>
                <span> • </span>
                <span
                  className="font-extrabold"
                  style={{
                    color: "#22c55e",
                    textShadow: "0 0 20px rgba(34, 197, 94, 0.7), 0 0 40px rgba(34, 197, 94, 0.4)",
                  }}
                >
                  {badgeClientes}
                  52 mil+
                </span>
                <span className="hidden md:inline"> clientes atendidos</span>
                <span className="md:hidden"> Clientes</span>
              </p>
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-50"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.25) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
                aria-hidden
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
