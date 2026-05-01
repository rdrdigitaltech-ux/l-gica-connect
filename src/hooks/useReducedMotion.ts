import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Retorna true quando o usuário configurou o sistema para reduzir animações
 * (prefers-reduced-motion: reduce). Não desabilita animações em mobile —
 * usuários de dispositivos móveis também merecem uma experiência fluida.
 */
export function useReducedMotion(): boolean {
  // Usa o hook nativo do Framer Motion que respeita a preferência do SO
  return useFramerReducedMotion() ?? false;
}
