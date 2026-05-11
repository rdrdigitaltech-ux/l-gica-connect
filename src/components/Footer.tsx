import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

function abrirEmailVagas(e: React.MouseEvent) {
  e.preventDefault();
  const destino = "vagas@logica.inf.br";
  const assunto = encodeURIComponent("Candidatura - Trabalhe Conosco");
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isIOS) {
    // Tenta abrir app Gmail; fallback para mailto: após 600ms
    window.location.href = `googlegmail://co?to=${destino}&subject=${assunto}`;
    setTimeout(() => {
      window.location.href = `mailto:${destino}?subject=${assunto}`;
    }, 600);
  } else if (isAndroid) {
    // Android: mailto abre Gmail se for app padrão, ou mostra seletor
    window.location.href = `mailto:${destino}?subject=${assunto}`;
  } else {
    // Desktop: abre Gmail Web em nova aba
    window.open(
      `https://mail.google.com/mail/?view=cm&to=${destino}&su=${assunto}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
}

export default function Footer() {
  const { content: rodape } = useSiteContent("rodape");
  const { content: geral } = useSiteContent("geral");
  const { content: contato } = useSiteContent("contato");

  const logoRodape = geral?.logo_rodape ?? "/img/logorodape.webp";
  const descricao = rodape?.descricao ?? "Conectando negócios com tecnologia desde 1988. Sua parceira em automação comercial e informática.";
  const horario = rodape?.horario ?? "Seg-Sex: 08h às 18h";
  const copyright = rodape?.copyright ?? "© 2026 Lógica Informática e Automação Comercial. Todos os direitos reservados.";
  const email = contato?.email ?? "atendimento@logica.inf.br";
  const telBrusque = contato?.telefone_brusque ?? "(47) 3351-5497";
  const telBlumenau = contato?.telefone_blumenau ?? "(47) 3328-0077";

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(255,255,255,0.06)] py-16 md:py-20" style={{ background: "#06080A" }}>
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-16" style={{ background: "linear-gradient(180deg, #0C0E12 0%, transparent 100%)" }} />
      <div className="pointer-events-none absolute -left-[10%] -top-[20%] z-0" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 40%, transparent 80%)", filter: "blur(54px)" }} />
      <div className="pointer-events-none absolute -bottom-[20%] -right-[10%] z-0" style={{ width: 450, height: 450, background: "radial-gradient(circle, rgba(255, 71, 87, 0.06) 0%, rgba(255, 71, 87, 0.02) 40%, transparent 80%)", filter: "blur(57px)" }} />
      <div className="pointer-events-none absolute left-[20%] top-0 z-0 h-px w-[60%]" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.25), transparent)", boxShadow: "0 0 12px rgba(255, 71, 87, 0.2)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* COLUNA 1 - SOBRE + LOGO */}
          <div>
            <img src={logoRodape} alt="Lógica Informática" width={200} height={60} loading="lazy" decoding="async" className="mb-6 h-10 w-auto md:h-12" style={{ filter: "drop-shadow(0 0 12px rgba(230, 57, 70, 0.3))" }} />
            <p className="mb-6 text-sm leading-relaxed text-gray-400">{descricao}</p>
            <div className="rounded-lg border border-[rgba(255,255,255,0.08)] p-3" style={{ background: "rgba(255, 71, 87, 0.05)" }}>
              <p className="text-xs font-semibold text-gray-200">Atendimento</p>
              <p className="mt-1 text-xs text-gray-400">{horario}</p>
            </div>
          </div>

          {/* COLUNA 2 - SOLUÇÕES */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-200">Soluções</h4>
            <ul className="space-y-3">
              <li><Link to="/sistemas" className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"><span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />Sistemas de Gestão</Link></li>
              <li><Link to="/equipamentos" className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"><span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />Equipamentos</Link></li>
              <li><Link to="/servicos" className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"><span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />Serviços Técnicos</Link></li>
            </ul>
          </div>

          {/* COLUNA 3 - CONTATO */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-200">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a href={`mailto:${email}`} className="text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70">{email}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                <div>
                  <p className="text-xs text-gray-500">Brusque</p>
                  <a href={`tel:${telBrusque.replace(/\D/g, "")}`} className="text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70">{telBrusque}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E63946]" />
                <div>
                  <p className="text-xs text-gray-500">Blumenau</p>
                  <a href={`tel:${telBlumenau.replace(/\D/g, "")}`} className="text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70">{telBlumenau}</a>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUNA 4 - OUTROS */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-200">Outros</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={abrirEmailVagas} className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"><span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />Trabalhe Conosco</a></li>
              <li><Link to="/politica-privacidade" className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"><span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />Política de Privacidade</Link></li>
              <li><Link to="/contato" className="group flex min-h-[44px] items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#E63946] active:opacity-70"><span className="h-1 w-1 rounded-full bg-gray-600 transition-all group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-[#E63946]" />Contato</Link></li>
            </ul>
          </div>
        </div>

        <div className="mb-8 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.35), transparent)", boxShadow: "0 0 12px rgba(255, 71, 87, 0.2)" }} />

        <div className="flex flex-col items-center gap-4 pt-6 text-center text-xs text-gray-500 sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p>{copyright}</p>
            <p className="mt-1">CNPJ: 07.982.400/0001-99</p>
          </div>
          <div className="flex gap-6">
            <Link to="/politica-privacidade" className="flex min-h-[44px] items-center text-gray-500 transition-colors hover:text-[#E63946] active:opacity-70">Política de Privacidade</Link>
            <a href="#" onClick={abrirEmailVagas} className="flex min-h-[44px] items-center text-gray-500 transition-colors hover:text-[#E63946] active:opacity-70">Trabalhe Conosco</a>
          </div>
        </div>
      </div>
    </footer>
  );
}