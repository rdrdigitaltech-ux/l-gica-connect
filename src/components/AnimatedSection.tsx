import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Atraso antes da animação iniciar (segundos) */
  delay?: number;
  /** Direção de entrada do elemento */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Duração da animação (segundos) */
  duration?: number;
  /** Porcentagem do elemento visível para disparar (0–1) */
  amount?: number;
}

const offsetMap: Record<NonNullable<AnimatedSectionProps["direction"]>, [number, number]> = {
  up:    [0,   28],
  down:  [0,  -28],
  left:  [28,   0],
  right: [-28,  0],
  none:  [0,    0],
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.55,
  amount = 0.08,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [x, y] = offsetMap[direction];

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x, y };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: prefersReducedMotion ? 0.25 : duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
