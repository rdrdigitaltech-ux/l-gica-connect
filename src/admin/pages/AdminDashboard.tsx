import { Link } from "react-router-dom";
import { LayoutGrid, ArrowRight, Download, Upload } from "lucide-react";
import { defaultContent } from "@/data/defaultContent";
import { loadContent, saveContent } from "@/hooks/useSiteContent";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const sectionLabels: Record<string, string> = {
  hero:         "Hero / Banner Principal",
  sobre:        "Sobre a Empresa",
  numeros:      "Números de Impacto",
  sistemas:     "Sistemas de Gestão",
  servicos:     "Serviços",
  contato:      "Contato",
  rodape:       "Rodapé",
  geral:        "Geral / Identidade Visual",
  equipamentos: "Equipamentos",
  blog:         "Blog & Notícias",
  portal:       "Portal do Cliente",
  obrigado:     "Página Obrigado",
};

export default function AdminDashboard() {
  const sections = Object.keys(defaultContent);
  const totalFields = sections.reduce(
    (acc, s) => acc + Object.keys(defaultContent[s]).length,
    0
  );

  const handleExport = () => {
    const content = loadContent();
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "logica-cms-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (typeof data !== "object" || Array.isArray(data)) {
            toast.error("Arquivo JSON inválido: formato incorreto.");
            return;
          }
          saveContent(data)
            .then(() => toast.success("Conteúdo importado com sucesso!"))
            .catch(() => toast.error("Erro ao importar: falha ao salvar."));
        } catch {
          toast.error("Arquivo JSON inválido: não foi possível analisar.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="space-y-7">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
          <div className="mt-1.5 flex items-center gap-2.5">
            <div className="h-px w-6 rounded-full bg-red-600/70" />
            <p className="text-sm text-gray-600">Visão geral do conteúdo do site</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleImport}
            className="flex items-center gap-2 rounded-lg border border-gray-800/70 px-3 py-2 text-sm text-gray-600 transition hover:border-gray-700 hover:text-gray-300"
          >
            <Upload className="h-4 w-4" />
            Importar
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg border border-gray-800/70 px-3 py-2 text-sm text-gray-600 transition hover:border-gray-700 hover:text-gray-300"
          >
            <Download className="h-4 w-4" />
            Exportar backup
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="relative overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/50 p-5">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-px"
            style={{ background: "linear-gradient(180deg, transparent, rgba(220,38,38,0.7), transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(220,38,38,0.05) 0%, transparent 60%)" }}
          />
          <p className="text-xs font-medium uppercase tracking-widest text-gray-600">Seções editáveis</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">{sections.length}</p>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/50 p-5">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-600">Total de campos</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">{totalFields}</p>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/50 p-5">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-600">Armazenamento</p>
          <div className="mt-3 flex items-center gap-2">
            {supabase ? (
              <>
                <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                <span className="text-base font-semibold text-green-400">Supabase</span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                <span className="text-base font-semibold text-amber-400">Local (offline)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Section cards */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Seções de conteúdo
          </h2>
          <Link
            to="/admin/editor"
            className="flex items-center gap-1 text-xs text-red-500 transition hover:text-red-400"
          >
            Ver tudo <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s}
              to={`/admin/editor?section=${s}`}
              className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/40 p-4 transition-all duration-200 hover:border-red-600/25 hover:bg-gray-900/70"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(220,38,38,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div>
                <p className="text-sm font-medium text-gray-300 group-hover:text-white">
                  {sectionLabels[s] || s}
                </p>
                <p className="mt-0.5 text-xs text-gray-600">
                  {Object.keys(defaultContent[s]).length} campos
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-700 transition-colors group-hover:text-red-500" />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
          Acesso rápido
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            to="/admin/editor"
            className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/40 p-5 transition-all duration-200 hover:border-red-600/25"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(220,38,38,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-red-400 transition-all duration-200 group-hover:bg-red-600/20">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200 group-hover:text-white">
                Editor de Seções
              </p>
              <p className="mt-0.5 text-xs text-gray-600">Textos, imagens e cores do site</p>
            </div>
          </Link>

          <button
            onClick={handleExport}
            className="group flex items-center gap-4 overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/40 p-5 text-left transition-all duration-200 hover:border-gray-700/60 hover:bg-gray-900/70"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200 group-hover:text-white">
                Exportar Backup
              </p>
              <p className="mt-0.5 text-xs text-gray-600">Salvar cópia do conteúdo atual</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
