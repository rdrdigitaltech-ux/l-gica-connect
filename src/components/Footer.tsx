import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-[rgba(255,255,255,0.06)] py-16 md:py-20"
      style={{
        background: "#06080A",
      }}
    >
      {/* Overlay de transição suave quando a seção acima é bg-tertiary */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-16"
        style={{
          background: "linear-gradient(180deg, #0C0E12 0%, transparent 100%)",
        }}
      />
      {/* Flash de luz vermelha - opacidade reduzida */}
      <div
        className="pointer-events-none absolute -left-[10%] -top-[20%] z-0"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 40%, transparent 80%)",
          filter: "blur(54px)",
        }}
      />

      {/* Flash de luz vermelha - canto inferior direito */}
      <div
        className="pointer-events-none absolute -bottom-[20%] -right-[10%] z-0"
        style={{
          width: 450,
          height: 450,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.06) 0%, rgba(255, 71, 87, 0.02) 40%, transparent 80%)",
          filter: "blur(57px)",
        }}
      />

      {/* Reflexo de luz superior na borda */}
      <div
        className="pointer-events-none absolute left-[20%] top-0 z-0 h-px w-[60%]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.25), transparent)",
          boxShadow: "0 0 12px rgba(255, 71, 87, 0.2)",
        }}
      />

      {/* Conteúdo do footer */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* COLUNA 1 - SOBRE + LOGO */}
          <div>
            <img
              src="/img/logorodape.webp"
              alt="Lógica Informática"
              width={200}
              height={60}
              loading="lazy"
              decoding="async"
              className="mb-6 h-10 w-auto md:h-12"
              style={{
                filter: "drop-shadow(0 0 12px rgba(230, 57, 70, 0.3))",
              }}
            />
            <p
              className="mb-6 text-sm leading-relaxed text-gray-400"
            >
              Conectando negócios com tecnologia desde 1988. Sua parceira em
              automação comercial e informática.
            </p>
            <div
              className="rounded-lg border border-[rgba(255,255,255,0.08)] p-3"
              style={{
                background: "rgba(255, 71, 87, 0.05)",
              }}
            >
              <p
                className="text-xs font-semibold text-gray-200"
              >
                Atendimento
              </p>
              <p
                className="mt-1 text-xs text-gray-400"
              >
                Seg-Sex: 08h às 18h
              </p>
            </div>
          </div>

          {/* COLUNA 2 - SOLUÇÕES */}
          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-200"
            >
              Soluções
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/sistemas"
                  className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"
                >
                  <span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />
                  Sistemas de Gestão
                </Link>
              </li>
              <li>
                <Link
                  to="/equipamentos"
                  className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"
                >
                  <span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />
                  Equipamentos
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos"
                  className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"
                >
                  <span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />
                  Serviços Técnicos
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 3 - CONTATO */}
          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-200"
            >
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]"
                />
                <div>
                  <p
                    className="text-xs text-gray-500"
                  >
                    Email
                  </p>
                  <a
                    href="mailto:atendimento@logica.inf.br"
                    className="text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"
                  >
                    atendimento@logica.inf.br
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]"
                />
                <div>
                  <p
                    className="text-xs text-gray-500"
                  >
                    Brusque
                  </p>
                  <a
                    href="tel:4733515497"
                    className="text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"
                  >
                    (47) 3351-5497
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]"
                />
                <div>
                  <p
                    className="text-xs text-gray-500"
                  >
                    Blumenau
                  </p>
                  <a
                    href="tel:4733280077"
                    className="text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"
                  >
                    (47) 3328-0077
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUNA 4 - OUTROS */}
          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-200"
            >
              Outros
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/trabalhe-conosco"
                  className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"
                >
                  <span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />
                  Trabalhe Conosco
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-privacidade"
                  className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"
                >
                  <span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"
                >
                  <span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVISOR */}
        <div
          className="mb-8 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.35), transparent)",
            boxShadow: "0 0 12px rgba(255, 71, 87, 0.2)",
          }}
        />

        {/* BARRA INFERIOR - COPYRIGHT */}
        <div
          className="flex flex-col items-center gap-4 pt-6 text-center text-xs text-gray-500 sm:flex-row sm:justify-between sm:text-left"
        >
            <p>
              © 2026 Lógica Informática e Automação Comercial. Todos os direitos
              reservados.
            </p>
            <div className="flex gap-6">
              <Link
                to="/politica-privacidade"
                className="flex min-h-[44px] items-center text-gray-500 transition-colors hover:text-[#E63946] active:opacity-70"
              >
                Política de Privacidade
              </Link>
              <Link
                to="/trabalhe-conosco"
                className="flex min-h-[44px] items-center text-gray-500 transition-colors hover:text-[#E63946] active:opacity-70"
              >
                Trabalhe Conosco
              </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
