import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

function AnimatedCounter({
  end,
  duration = 2,
}: {
  end: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count.toLocaleString("pt-BR")}</span>;
}

const lightLineStyle = {
  background:
    "linear-gradient(90deg, transparent, rgba(230, 57, 70, 0.8) 20%, rgba(230, 57, 70, 0.8) 80%, transparent)",
  boxShadow:
    "0 0 8px rgba(230, 57, 70, 0.6), 0 0 16px rgba(230, 57, 70, 0.3)",
};

export default function ImpactNumbers() {
  const { content: nums } = useSiteContent("numeros");

  const anos      = parseInt(nums.anos            ?? "36",    10) || 36;
  const clientes  = parseInt(nums.clientes_ativos ?? "1250",  10) || 1250;
  const estados   = parseInt(nums.estados         ?? "3",     10) || 3;
  const empresas  = parseInt(nums.empresas        ?? "52200", 10) || 52200;

  return (
    <section
      className="relative overflow-hidden py-16 transition-colors duration-300 md:py-20 lg:py-24"
      style={{
        background: "#0A0C10",
      }}
    >
      {/* Overlay de transição da seção anterior */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-32"
        style={{
          background: "linear-gradient(180deg, #12141A 0%, transparent 100%)",
        }}
      />
      {/* Divisor superior - destaque para separar da seção de cima */}
      <div
        className="absolute left-1/2 top-0 z-10 h-[2px] w-2/3 -translate-x-1/2"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(230, 57, 70, 0.5) 20%, rgba(230, 57, 70, 0.8) 50%, rgba(230, 57, 70, 0.5) 80%, transparent 100%)",
          boxShadow: "0 0 24px rgba(230, 57, 70, 0.4)",
        }}
      />
      {/* Divisor inferior - destaque para separar da seção de baixo */}
      <div
        className="absolute bottom-0 left-1/2 z-10 h-[2px] w-2/3 -translate-x-1/2"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(230, 57, 70, 0.5) 20%, rgba(230, 57, 70, 0.8) 50%, rgba(230, 57, 70, 0.5) 80%, transparent 100%)",
          boxShadow: "0 0 24px rgba(230, 57, 70, 0.4)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="mb-4 text-2xl font-extrabold text-gray-200 md:text-3xl lg:text-4xl">
            Nossas soluções estão por todo o estado de Santa Catarina
          </h2>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
            Oferecemos soluções completas em automação comercial e informática,
            garantindo mais eficiência, segurança e produtividade para o seu
            negócio. Inove e automatize com tecnologia de ponta.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
            hidden: {},
          }}
        >
          <motion.div
            className="relative"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } }}
          >
            <div
              className="absolute right-0 top-1/4 hidden h-1/2 w-px lg:block"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              }}
            />
            <div
              className="mx-auto mb-6 h-[2px] w-[80px] lg:w-[120px]"
              style={lightLineStyle}
            />
            <p
              className="text-center text-4xl font-extrabold md:text-5xl lg:text-6xl"
              style={{
                color: "#E63946",
                textShadow:
                  "0 0 20px rgba(230, 57, 70, 0.4), 0 0 40px rgba(230, 57, 70, 0.2)",
              }}
            >
              +<AnimatedCounter end={anos} />
            </p>
            <p className="mt-4 text-center text-sm font-medium uppercase tracking-wider text-gray-500">
              Anos de atuação
            </p>
          </motion.div>

          <motion.div
            className="relative"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } }}
          >
            <div
              className="absolute right-0 top-1/4 hidden h-1/2 w-px lg:block"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              }}
            />
            <div
              className="mx-auto mb-6 h-[2px] w-[80px] lg:w-[120px]"
              style={lightLineStyle}
            />
            <p
              className="text-center text-4xl font-extrabold md:text-5xl lg:text-6xl"
              style={{
                color: "#E63946",
                textShadow:
                  "0 0 20px rgba(230, 57, 70, 0.4), 0 0 40px rgba(230, 57, 70, 0.2)",
              }}
            >
              +<AnimatedCounter end={clientes} duration={2.2} />
            </p>
            <p className="mt-4 text-center text-sm font-medium uppercase tracking-wider text-gray-500">
              Clientes ativos
            </p>
          </motion.div>

          <motion.div
            className="relative"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } }}
          >
            <div
              className="absolute right-0 top-1/4 hidden h-1/2 w-px lg:block"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              }}
            />
            <div
              className="mx-auto mb-6 h-[2px] w-[80px] lg:w-[120px]"
              style={lightLineStyle}
            />
            <p
              className="text-center text-4xl font-extrabold md:text-5xl lg:text-6xl"
              style={{
                color: "#E63946",
                textShadow:
                  "0 0 20px rgba(230, 57, 70, 0.4), 0 0 40px rgba(230, 57, 70, 0.2)",
              }}
            >
              +<AnimatedCounter end={estados} />
            </p>
            <p className="mt-4 text-center text-sm font-medium uppercase tracking-wider text-gray-500">
              Estados ativos
            </p>
          </motion.div>

          <motion.div
            className="relative"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } }}
          >
            <div
              className="mx-auto mb-6 h-[2px] w-[80px] lg:w-[120px]"
              style={lightLineStyle}
            />
            <p
              className="text-center text-4xl font-extrabold md:text-5xl lg:text-6xl"
              style={{
                color: "#E63946",
                textShadow:
                  "0 0 20px rgba(230, 57, 70, 0.4), 0 0 40px rgba(230, 57, 70, 0.2)",
              }}
            >
              +<AnimatedCounter end={empresas} duration={2.2} />
            </p>
            <p className="mt-4 text-center text-sm font-medium uppercase tracking-wider text-gray-500">
              Empresas atendidas
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
