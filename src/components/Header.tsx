import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Settings } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const navItems = [
  { label: "Início", path: "/" },
  { label: "Sistemas", path: "/sistemas" },
  { label: "Equipamentos", path: "/equipamentos" },
  { label: "Serviços", path: "/servicos" },
  { label: "Contato", path: "/contato" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 header-glass"
      style={{
        border: "1px solid rgba(229, 231, 235, 0.25)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        borderBottomLeftRadius: "24px",
        borderBottomRightRadius: "24px",
      }}
    >
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20 lg:h-24">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/img/logo.webp"
                alt="Lógica Informática"
                width={200}
                height={60}
                loading="eager"
                fetchPriority="low"
                decoding="async"
                className="h-11 w-auto md:h-16 lg:h-[4.5rem]"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(230, 57, 70, 0.2))",
                }}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`min-h-[44px] min-w-[44px] flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-200 active:opacity-70 ${
                    location.pathname === item.path
                      ? "bg-white/10 text-white"
                      : "hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/portal/login"
                className={`min-h-[44px] flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-200 active:opacity-70 ${
                  location.pathname.startsWith("/portal")
                    ? "bg-white/10 text-white"
                    : "hover:bg-white/10 hover:text-white"
                }`}
              >
                <User className="h-4 w-4" />
                Portal do Cliente
              </Link>
              <Link
                to="/admin"
                title="Painel Administrativo"
                className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors active:opacity-70 ${
                  location.pathname.startsWith("/admin")
                    ? "bg-white/10 text-white"
                    : "text-gray-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Settings className="h-6 w-6" />
              </Link>
            </nav>

            <div className="hidden md:block">
              <button
                type="button"
                className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[#FF4757] px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 active:opacity-90"
                onClick={() =>
                  window.open(
                    "https://wa.me/5547984218275?text=Olá,%20gostaria%20de%20falar%20com%20a%20Lógica!",
                    "_blank"
                  )
                }
              >
                <WhatsAppIcon className="h-5 w-5" />
                Fale Conosco
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 min-h-[44px] min-w-[44px] flex-shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-[rgba(230,57,70,0.2)] bg-[rgba(15,17,21,0.8)] p-2 backdrop-blur-md transition-all hover:border-[rgba(230,57,70,0.4)] active:scale-95 active:opacity-90 md:hidden"
              aria-label="Menu"
            >
              <span
                className={`h-0.5 w-6 bg-gray-200 transition-all ${
                  mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-gray-200 transition-all ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-gray-200 transition-all ${
                  mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            background: "rgba(15, 17, 21, 0.98)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(230, 57, 70, 0.15)",
          }}
        >
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`border-b border-[rgba(255,255,255,0.05)] py-4 text-sm font-medium text-gray-300 transition-colors hover:text-[#E63946] last:border-0 min-h-[44px] flex items-center active:opacity-70 ${
                  location.pathname === item.path ? "text-[#E63946]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/portal/login"
              onClick={() => setMobileMenuOpen(false)}
              className={`border-b border-[rgba(255,255,255,0.05)] py-4 min-h-[44px] flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-[#E63946] active:opacity-70 ${
                location.pathname.startsWith("/portal") ? "text-[#E63946]" : ""
              }`}
            >
              <User className="h-5 w-5" />
              Portal do Cliente
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`border-b border-[rgba(255,255,255,0.05)] py-4 min-h-[44px] flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-300 active:opacity-70 ${
                location.pathname.startsWith("/admin") ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <Settings className="h-5 w-5" />
              Painel Admin
            </Link>
            <button
              type="button"
              className="mt-4 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#FF4757] py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95 active:opacity-90"
              onClick={() => {
                setMobileMenuOpen(false);
                window.open(
                  "https://wa.me/5547984218275?text=Olá,%20gostaria%20de%20falar%20com%20a%20Lógica!",
                  "_blank"
                );
              }}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Fale Conosco
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
