import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolla para o topo da página em toda mudança de rota.
 * Evita que o usuário permaneça no meio da página ao navegar.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
