import { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Building2,
  BarChart3,
  Monitor,
  Wrench,
  Phone,
  AlignVerticalJustifyEnd,
  Settings2,
  Package,
  FileText,
  Lock,
  CheckCircle,
  Type,
  ImageIcon,
  Palette,
  ToggleLeft,
  ArrowLeft,
  Save,
  RotateCcw,
  ChevronRight,
  Upload,
  Globe,
  Link as LinkIcon,
  LayoutGrid,
  Layers,
  Boxes,
} from "lucide-react";
import { defaultContent, type ContentField } from "@/data/defaultContent";
import { loadContent, saveContent } from "@/hooks/useSiteContent";
import { uploadImageToStorage } from "@/lib/supabase";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import DynamicItemsPanel, { type DynamicItem, type FieldSchema } from "@/admin/components/DynamicItemsPanel";
import {
  getSistemasExtras,
  saveSistemasExtras,
  getEquipamentosExtras,
  saveEquipamentosExtras,
  getServicosExtras,
  saveServicosExtras,
  getModelosCustom,
  saveModelosCustom,
  slugify,
  type SistemaCard,
  type EquipamentoCategoria,
  type ServicoBloco,
  type ModeloCustom,
} from "@/lib/dynamicItems";

// ─── Section metadata ────────────────────────────────────────────────────────

const SECTION_META: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; label: string; description: string }
> = {
  hero:        { icon: Sparkles,                  label: "Hero / Banner Principal",   description: "Títulos, badges e banners" },
  sobre:       { icon: Building2,                 label: "Sobre a Empresa",           description: "História, missão e valores" },
  numeros:     { icon: BarChart3,                 label: "Números de Impacto",        description: "Estatísticas da empresa" },
  sistemas:    { icon: Monitor,                   label: "Sistemas de Gestão",        description: "Cards e textos da página" },
  servicos:    { icon: Wrench,                    label: "Serviços",                  description: "Assistência, data center e suporte" },
  contato:     { icon: Phone,                     label: "Contato",                   description: "Telefones, emails e endereços" },
  rodape:      { icon: AlignVerticalJustifyEnd,   label: "Rodapé",                    description: "Descrição e copyright" },
  geral:       { icon: Settings2,                 label: "Geral / Identidade Visual", description: "Nome, logo e cores globais" },
  equipamentos:{ icon: Package,                   label: "Equipamentos",              description: "Cards e páginas de produtos" },
  blog:        { icon: FileText,                  label: "Blog & Notícias",           description: "Títulos e textos do blog" },
  portal:      { icon: Lock,                      label: "Portal do Cliente",         description: "Login, dashboard e formulários" },
  obrigado:    { icon: CheckCircle,               label: "Página Obrigado",           description: "Mensagem pós-envio" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getSectionDefaults(section: string): Record<string, string> {
  const fields = defaultContent[section] ?? {};
  return Object.fromEntries(Object.entries(fields).map(([k, f]) => [k, f.value]));
}

function getFieldCounts(section: string) {
  const entries = Object.values(defaultContent[section] ?? {});
  return {
    total: entries.length,
    text:  entries.filter((f) => f.type === "text" || f.type === "link").length,
    image: entries.filter((f) => f.type === "image_url").length,
    color: entries.filter((f) => f.type === "color").length,
  };
}

// ─── Shared props type ────────────────────────────────────────────────────────

interface CardProps {
  fields: [string, ContentField][];
  values: Record<string, string>;
  modifiedFields: Set<string>;
  onChange: (key: string, value: string) => void;
}

// ─── Card: Textos e Links ─────────────────────────────────────────────────────

function TextCard({ fields, values, modifiedFields, onChange }: CardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/60">
      <div className="flex items-center gap-2.5 border-b border-gray-800/40 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          <Type className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-gray-200">Textos e Links</h3>
        <span className="ml-auto rounded-full bg-gray-800/80 px-2 py-0.5 text-xs text-gray-600">
          {fields.length} campo{fields.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="divide-y divide-gray-800/30 px-5">
        {fields.map(([key, meta]) => {
          const val = values[key] ?? meta.value;
          const isModified = modifiedFields.has(key);
          const isLink = meta.type === "link";
          const isLong = meta.value.length > 80 || meta.value.includes("\n") || val.length > 80;

          const inputClass = `w-full rounded-lg border bg-gray-950/50 px-3 py-2 text-sm text-white outline-none transition ${
            isModified
              ? "border-amber-500/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
              : "border-gray-800 focus:border-red-600/50 focus:ring-1 focus:ring-red-600/15"
          }`;

          return (
            <div key={key} className="py-4">
              <div className="mb-1.5 flex items-center gap-2">
                <label className="text-sm font-medium text-gray-400">{meta.label}</label>
                {isLink && <LinkIcon className="h-3 w-3 text-gray-600" />}
                {isModified && (
                  <span
                    className="ml-auto h-2 w-2 flex-shrink-0 rounded-full bg-amber-400"
                    title="Campo modificado"
                  />
                )}
              </div>

              {isLink ? (
                <input
                  type="url"
                  value={val}
                  onChange={(e) => onChange(key, e.target.value)}
                  aria-label={meta.label}
                  className={inputClass}
                />
              ) : isLong ? (
                <textarea
                  value={val}
                  onChange={(e) => onChange(key, e.target.value)}
                  rows={3}
                  aria-label={meta.label}
                  className={`${inputClass} resize-none`}
                />
              ) : (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => onChange(key, e.target.value)}
                  aria-label={meta.label}
                  className={inputClass}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Card: Imagens ────────────────────────────────────────────────────────────

function ImageCard({ fields, values, modifiedFields, onChange }: CardProps) {
  const [urlMode, setUrlMode] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFile = async (key: string, file: File) => {
    setUploading((prev) => ({ ...prev, [key]: true }));
    try {
      const publicUrl = await uploadImageToStorage(file);
      if (publicUrl) {
        onChange(key, publicUrl);
        toast.success("Imagem enviada! Clique em 'Salvar Alterações'.");
      } else {
        // Fallback: base64 apenas local (salvo só no localStorage)
        const reader = new FileReader();
        reader.onload = () => {
          onChange(key, reader.result as string);
          toast.warning("Imagem salva localmente. Para publicar para todos, use uma URL.");
        };
        reader.readAsDataURL(file);
      }
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }));
    }
  };


  return (
    <div className="overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/60">
      <div className="flex items-center gap-2.5 border-b border-gray-800/40 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
          <ImageIcon className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-gray-200">Imagens</h3>
        <span className="ml-auto rounded-full bg-gray-800/80 px-2 py-0.5 text-xs text-gray-600">
          {fields.length} campo{fields.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map(([key, meta]) => {
          const val = values[key] ?? meta.value;
          const isModified = modifiedFields.has(key);
          const showUrl = urlMode[key] ?? false;

          return (
            <div
              key={key}
              className={`rounded-xl border p-4 transition ${
                isModified
                  ? "border-amber-500/30 bg-gray-800/60"
                  : "border-gray-800/40 bg-gray-800/20"
              }`}
            >
              <div className="mb-3 overflow-hidden rounded-lg border border-gray-800/50 bg-gray-950/60">
                {val ? (
                  <img
                    src={val}
                    alt={meta.label}
                    className="h-24 w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-24 items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-700" />
                  </div>
                )}
              </div>

              <p className="mb-3 text-xs font-medium text-gray-400">{meta.label}</p>

              {showUrl && (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => onChange(key, e.target.value)}
                  placeholder="https:// ou /img/..."
                  aria-label={meta.label}
                  className="mb-2 w-full rounded-lg border border-gray-800 bg-gray-950/60 px-3 py-1.5 text-xs text-white outline-none focus:border-red-600/50"
                />
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileRefs.current[key]?.click()}
                  disabled={uploading[key]}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-800/70 bg-gray-900/60 px-2 py-1.5 text-xs text-gray-500 transition hover:border-gray-700 hover:text-gray-200 disabled:opacity-50"
                >
                  <Upload className="h-3 w-3" />
                  {uploading[key] ? "Enviando…" : "Upload"}
                </button>
                <button
                  type="button"
                  onClick={() => setUrlMode((prev) => ({ ...prev, [key]: !prev[key] }))}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition ${
                    showUrl
                      ? "border-red-600/40 bg-red-600/10 text-red-400"
                      : "border-gray-800/70 bg-gray-900/60 text-gray-500 hover:border-gray-700 hover:text-gray-200"
                  }`}
                >
                  <Globe className="h-3 w-3" />
                  URL
                </button>
                <input
                  ref={(el) => (fileRefs.current[key] = el)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(key, f);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Card: Cores ─────────────────────────────────────────────────────────────

function ColorCard({ fields, values, modifiedFields, onChange }: CardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/60">
      <div className="flex items-center gap-2.5 border-b border-gray-800/40 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
          <Palette className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-gray-200">Cores</h3>
        <span className="ml-auto rounded-full bg-gray-800/80 px-2 py-0.5 text-xs text-gray-600">
          {fields.length} campo{fields.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 p-5">
        {fields.map(([key, meta]) => {
          const val = values[key] ?? meta.value;
          const isModified = modifiedFields.has(key);
          const safeHex = /^#[0-9A-Fa-f]{6}$/.test(val) ? val : "#000000";

          return (
            <div
              key={key}
              className={`flex min-w-[200px] flex-1 flex-col gap-3 rounded-xl border p-4 transition ${
                isModified
                  ? "border-amber-500/30 bg-gray-800/60"
                  : "border-gray-800/40 bg-gray-800/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 flex-shrink-0 rounded-full border-4 border-gray-800 shadow-lg"
                  style={{ background: val }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-300">{meta.label}</p>
                  <p className="font-mono text-xs text-gray-600">{val}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={safeHex}
                  onChange={(e) => onChange(key, e.target.value)}
                  aria-label={`Seletor de cor: ${meta.label}`}
                  className="h-9 w-12 flex-shrink-0 cursor-pointer rounded border border-gray-800 bg-gray-900 p-0.5"
                />
                <input
                  type="text"
                  value={val}
                  onChange={(e) => onChange(key, e.target.value)}
                  aria-label={`Valor hex: ${meta.label}`}
                  className="w-full rounded-lg border border-gray-800 bg-gray-950/50 px-3 py-2 font-mono text-xs text-white outline-none focus:border-red-600/50"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Card: Configurações (boolean) ────────────────────────────────────────────

function BoolCard({ fields, values, modifiedFields, onChange }: CardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/60">
      <div className="flex items-center gap-2.5 border-b border-gray-800/40 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
          <ToggleLeft className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-gray-200">Configurações</h3>
      </div>
      <div className="divide-y divide-gray-800/30 px-5">
        {fields.map(([key, meta]) => {
          const val = values[key] ?? meta.value;
          const isModified = modifiedFields.has(key);
          return (
            <div key={key} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-400">{meta.label}</label>
                {isModified && (
                  <span className="h-2 w-2 rounded-full bg-amber-400" title="Campo modificado" />
                )}
              </div>
              <Switch
                checked={val === "true"}
                onCheckedChange={(checked) => onChange(key, checked ? "true" : "false")}
                aria-label={meta.label}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── VIEW A: Grade de seções ─────────────────────────────────────────────────

function SectionGrid({ onSelect }: { onSelect: (section: string) => void }) {
  const sections = Object.keys(defaultContent);
  const [sistemasExtras, setSistemasExtras] = useState<SistemaCard[]>(() => getSistemasExtras());
  const [equipExtras, setEquipExtras]       = useState<EquipamentoCategoria[]>(() => getEquipamentosExtras());

  useEffect(() => {
    const refresh = () => {
      setSistemasExtras(getSistemasExtras());
      setEquipExtras(getEquipamentosExtras());
    };
    window.addEventListener("cms-content-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("cms-content-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  /** Card reutilizável para seções estáticas */
  const StaticCard = ({ section }: { section: string }) => {
    const meta = SECTION_META[section] ?? { icon: FileText, label: section, description: "" };
    const counts = getFieldCounts(section);
    const Icon = meta.icon;
    return (
      <button
        onClick={() => onSelect(section)}
        className="group flex flex-col gap-3 rounded-xl border border-gray-800/50 bg-gray-900/50 p-5 text-left transition-all duration-200 hover:border-red-600/30 hover:bg-gray-900/80"
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(220,38,38,0.1), 0 1px 3px rgba(0,0,0,0.3)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
      >
        <div className="flex items-start justify-between">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/10 text-red-400 transition-all duration-200 group-hover:bg-red-600/20"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 14px rgba(220,38,38,0.18)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <ChevronRight className="h-4 w-4 text-gray-700 transition-all duration-200 group-hover:text-red-500" />
        </div>
        <div>
          <p className="font-semibold text-gray-300 group-hover:text-white">{meta.label}</p>
          <p className="mt-0.5 text-xs text-gray-600">{meta.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-600">{counts.total} campos</span>
          {counts.text  > 0 && <span className="flex items-center gap-1 text-xs text-gray-700"><Type className="h-3 w-3" />{counts.text}</span>}
          {counts.image > 0 && <span className="flex items-center gap-1 text-xs text-gray-700"><ImageIcon className="h-3 w-3" />{counts.image}</span>}
          {counts.color > 0 && <span className="flex items-center gap-1 text-xs text-gray-700"><Palette className="h-3 w-3" />{counts.color}</span>}
        </div>
      </button>
    );
  };

  /** Card para um sistema criado dinamicamente */
  const SistemaCard_UI = ({ s }: { s: SistemaCard }) => (
    <button
      onClick={() => onSelect(`_sistema_${s.id}`)}
      className="group flex flex-col gap-3 rounded-xl border border-gray-800/50 bg-gray-900/50 p-5 text-left transition-all duration-200 hover:border-violet-600/40 hover:bg-gray-900/80"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(139,92,246,0.12), 0 1px 3px rgba(0,0,0,0.3)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400 text-xl transition-all duration-200 group-hover:bg-violet-600/20">
          {s.emoji || "🖥️"}
        </div>
        <ChevronRight className="h-4 w-4 text-gray-700 transition-all duration-200 group-hover:text-violet-400" />
      </div>
      <div>
        <p className="font-semibold text-gray-300 group-hover:text-white">{s.nome}</p>
        <p className="mt-0.5 text-xs text-gray-600">Sistema personalizado · /sistemas/{s.slug}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-violet-600/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-400">
          Sistema
        </span>
        {s.badge && (
          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
            {s.badge}
          </span>
        )}
      </div>
    </button>
  );

  /** Card para uma linha de equipamentos criada dinamicamente */
  const EquipCard_UI = ({ eq }: { eq: EquipamentoCategoria }) => (
    <button
      onClick={() => onSelect(`_equip_${eq.id}`)}
      className="group flex flex-col gap-3 rounded-xl border border-gray-800/50 bg-gray-900/50 p-5 text-left transition-all duration-200 hover:border-emerald-600/40 hover:bg-gray-900/80"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(16,185,129,0.1), 0 1px 3px rgba(0,0,0,0.3)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-400 transition-all duration-200 group-hover:bg-emerald-600/20">
          <Boxes className="h-5 w-5" />
        </div>
        <ChevronRight className="h-4 w-4 text-gray-700 transition-all duration-200 group-hover:text-emerald-400" />
      </div>
      <div>
        <p className="font-semibold text-gray-300 group-hover:text-white">{eq.nome}</p>
        <p className="mt-0.5 text-xs text-gray-600">Linha de equipamentos · /equipamentos/{eq.slug}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-emerald-600/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
          Equipamentos
        </span>
        {eq.categoria && (
          <span className="text-[10px] text-gray-600">{eq.categoria}</span>
        )}
      </div>
    </button>
  );

  const hasDynamic = sistemasExtras.length > 0 || equipExtras.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Editor de Seções</h1>
        <div className="mt-1.5 flex items-center gap-2.5">
          <div className="h-px w-6 rounded-full bg-red-600/70" />
          <p className="text-sm text-gray-600">Selecione uma seção para editar seu conteúdo</p>
        </div>
      </div>

      {/* Seções estáticas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => <StaticCard key={section} section={section} />)}
      </div>

      {/* Seções dinâmicas criadas pelo admin */}
      {hasDynamic && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 rounded-full bg-gray-800" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Páginas criadas por você
            </span>
            <div className="h-px flex-1 rounded-full bg-gray-800" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sistemasExtras.map((s) => <SistemaCard_UI key={s.id} s={s} />)}
            {equipExtras.map((eq)    => <EquipCard_UI  key={eq.id} eq={eq} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Schemas dos painéis dinâmicos ───────────────────────────────────────────

const SCHEMA_SISTEMA: FieldSchema[] = [
  { key: "nome",           label: "Nome do sistema",          type: "text",     required: true, placeholder: "Ex: Sistema para Padaria" },
  { key: "descricao",      label: "Descrição curta (card)",   type: "textarea", required: true, placeholder: "Texto exibido no card da página Sistemas" },
  { key: "slug",           label: "Slug (URL)",               type: "text",     required: true, placeholder: "ex: padaria (será /sistemas/padaria)", hint: "Letras minúsculas, sem espaços, sem acentos." },
  { key: "emoji",          label: "Emoji do sistema",         type: "text",     placeholder: "Ex: 🍞 (opcional)" },
  { key: "badge",          label: "Badge (tag no card)",      type: "text",     placeholder: "Ex: NOVO, EM BREVE (opcional)" },
  { key: "hero_badge",     label: "Badge da página de detalhe", type: "text",  placeholder: "Ex: Sistema para Padaria & Confeitaria" },
  { key: "hero_titulo",    label: "Título da página de detalhe", type: "text", placeholder: "Título principal da página do sistema" },
  { key: "hero_subtitulo", label: "Subtítulo / introdução",   type: "textarea", placeholder: "Texto introdutório da página" },
  { key: "features",       label: "Vantagens / Funcionalidades", type: "textarea", placeholder: "Uma vantagem por linha. Ex:\nGestão de estoque\nEmissão de NF-e\nRelógio de ponto", hint: "Cada linha vira um card de vantagem na página do sistema." },
  { key: "imagem",         label: "Imagem de destaque",       type: "image" },
];

const SCHEMA_EQUIPAMENTO_CATEGORIA: FieldSchema[] = [
  { key: "nome",            label: "Nome da linha/categoria",    type: "text",     required: true, placeholder: "Ex: Terminais de Autoatendimento" },
  { key: "descricao",       label: "Descrição curta (card)",     type: "textarea", required: true, placeholder: "Texto exibido no card da página Equipamentos" },
  { key: "slug",            label: "Slug (URL)",                 type: "text",     required: true, placeholder: "ex: terminais (será /equipamentos/terminais)", hint: "Letras minúsculas, sem espaços, sem acentos." },
  { key: "categoria",       label: "Categoria (filtro)",         type: "text",     placeholder: "Ex: Automação, Informática…" },
  { key: "tipo",            label: "Tipo (filtro)",              type: "text",     placeholder: "Ex: Hardware, Automação…" },
  { key: "imagem",          label: "Imagem do card",             type: "image" },
  { key: "hero_titulo",     label: "Título da página de detalhe", type: "text",   placeholder: "Ex: Terminais de Autoatendimento" },
  { key: "hero_subtitulo",  label: "Subtítulo / descrição longa", type: "textarea", placeholder: "Texto da seção hero da página de detalhe" },
];

const SCHEMA_SERVICO: FieldSchema[] = [
  { key: "titulo",         label: "Título do serviço",        type: "text",     required: true, placeholder: "Ex: Treinamento e Capacitação" },
  { key: "descricao",      label: "Descrição",                type: "textarea", required: true, placeholder: "Parágrafo explicativo sobre o serviço" },
  { key: "itens",          label: "Lista de itens",           type: "textarea", placeholder: "Um item por linha. Ex:\nTreinamento presencial\nTreinamento online", hint: "Cada linha vira um item da lista com ✓ vermelho." },
  { key: "imagem",         label: "Imagem ilustrativa",       type: "image" },
  { key: "whatsapp_texto", label: "Texto de abertura do WhatsApp", type: "text", placeholder: "Ex: Olá! Quero saber mais sobre treinamento." },
];

const SCHEMA_MODELO: FieldSchema[] = [
  { key: "nome",         label: "Nome do modelo",                    type: "text",     required: true, placeholder: "Ex: Balança Toledo Prix 5 Pro" },
  { key: "descricao",    label: "Descrição do modelo",               type: "textarea", required: true, placeholder: "Características, diferenciais, aplicação…" },
  { key: "subcategoria", label: "Subcategoria (filtro)",             type: "text",     placeholder: "Ex: Etiquetadoras, Plataforma, Bancada…" },
  { key: "imagem",       label: "Foto do produto",                   type: "image" },
  { key: "video_url",    label: "Vídeo YouTube deste modelo (URL)",  type: "url",      placeholder: "https://www.youtube.com/watch?v=...", hint: "Cole a URL completa do YouTube. O vídeo aparecerá na página de detalhes deste modelo." },
];

// Mapa: seção do editor → categoria do catálogo de modelos
const CATALOG_SECTION_TO_CATEGORIA: Record<string, string> = {
  catalogo_balancas:   "balancas",
  catalogo_leitores:   "leitores",
  catalogo_impressoras:"impressoras",
  catalogo_relogio:    "relogio-ponto",
  catalogo_computadores:"computadores-hardware",
  catalogo_embaladoras:"embaladoras",
};

// ─── VIEW B: Editor de seção ─────────────────────────────────────────────────

function SectionEditor({
  section,
  onBack,
}: {
  section: string;
  onBack: () => void;
}) {
  const meta = SECTION_META[section] ?? { icon: FileText, label: section, description: "" };
  const fields = defaultContent[section] ?? {};
  const Icon = meta.icon;

  const [values, setValues] = useState<Record<string, string>>(() => {
    const saved = loadContent();
    return { ...getSectionDefaults(section), ...(saved[section] ?? {}) };
  });

  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const originalRef = useRef<Record<string, string> | null>(null);
  if (originalRef.current === null) {
    const saved = loadContent();
    originalRef.current = { ...getSectionDefaults(section), ...(saved[section] ?? {}) };
  }

  const isDirty = modifiedFields.size > 0;

  const handleChange = useCallback(
    (key: string, val: string) => {
      setValues((prev) => ({ ...prev, [key]: val }));
      setModifiedFields((prev) => {
        const next = new Set(prev);
        if (val !== (originalRef.current ?? {})[key]) {
          next.add(key);
        } else {
          next.delete(key);
        }
        return next;
      });
    },
    []
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      const content = loadContent();
      content[section] = { ...(content[section] ?? {}), ...values };
      await saveContent(content);
      originalRef.current = { ...values };
      setModifiedFields(new Set());
      toast.success("Alterações salvas com sucesso!");
    } catch {
      toast.error("Erro ao salvar. Verifique a conexão e tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleRestore = () => {
    if (!window.confirm("Restaurar todos os campos desta seção para os valores padrão?")) return;
    const defaults = getSectionDefaults(section);
    setValues(defaults);
    const orig = originalRef.current ?? {};
    const newModified = new Set<string>();
    for (const key of Object.keys(defaults)) {
      if (defaults[key] !== orig[key]) {
        newModified.add(key);
      }
    }
    setModifiedFields(newModified);
  };

  const textFields = Object.entries(fields).filter(
    ([, f]) => f.type === "text" || f.type === "link"
  ) as [string, ContentField][];
  const imageFields = Object.entries(fields).filter(
    ([, f]) => f.type === "image_url"
  ) as [string, ContentField][];
  const colorFields = Object.entries(fields).filter(
    ([, f]) => f.type === "color"
  ) as [string, ContentField][];
  const boolFields = Object.entries(fields).filter(
    ([, f]) => f.type === "boolean"
  ) as [string, ContentField][];

  const cardProps: Omit<CardProps, "fields"> = {
    values,
    modifiedFields,
    onChange: handleChange,
  };

  // ── Painéis dinâmicos: dados e handlers específicos por seção ─────────────
  const [sistemaItems, setSistemaItems]  = useState<DynamicItem[]>(() =>
    section === "sistemas" ? (getSistemasExtras() as unknown as DynamicItem[]) : []
  );
  const [equipItems, setEquipItems] = useState<DynamicItem[]>(() =>
    section === "equipamentos" ? (getEquipamentosExtras() as unknown as DynamicItem[]) : []
  );
  const [servicoItems, setServicoItems] = useState<DynamicItem[]>(() =>
    section === "servicos" ? (getServicosExtras() as unknown as DynamicItem[]) : []
  );
  const catalogoCategoria = CATALOG_SECTION_TO_CATEGORIA[section] ?? null;
  const [modeloItems, setModeloItems] = useState<DynamicItem[]>(() =>
    catalogoCategoria ? (getModelosCustom(catalogoCategoria) as unknown as DynamicItem[]) : []
  );

  const handleSaveSistemas = async (items: DynamicItem[]) => {
    await saveSistemasExtras(
      items.map((it) => ({ ...it, slug: it.slug || slugify(it.nome) } as SistemaCard))
    );
    setSistemaItems(items);
  };
  const handleSaveEquipamentos = async (items: DynamicItem[]) => {
    await saveEquipamentosExtras(
      items.map((it) => ({ ...it, slug: it.slug || slugify(it.nome) } as EquipamentoCategoria))
    );
    setEquipItems(items);
  };
  const handleSaveServicos = async (items: DynamicItem[]) => {
    await saveServicosExtras(items as unknown as ServicoBloco[]);
    setServicoItems(items);
  };
  const handleSaveModelos = async (items: DynamicItem[]) => {
    if (!catalogoCategoria) return;
    await saveModelosCustom(catalogoCategoria, items as unknown as ModeloCustom[]);
    setModeloItems(items);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button
          onClick={onBack}
          className="mt-0.5 flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-gray-800/60 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-gray-700 hover:text-gray-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <div className="min-w-0 flex-1">
          <nav
            className="mb-1 flex items-center gap-1.5 text-xs text-gray-600"
            aria-label="Breadcrumb"
          >
            <span>Editor</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-500">{meta.label}</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-600/10 text-red-400">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">{meta.label}</h1>
              <p className="text-xs text-gray-600">
                {Object.keys(fields).length} campos editáveis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Field type cards */}
      {textFields.length > 0 && <TextCard fields={textFields} {...cardProps} />}
      {imageFields.length > 0 && <ImageCard fields={imageFields} {...cardProps} />}
      {colorFields.length > 0 && <ColorCard fields={colorFields} {...cardProps} />}
      {boolFields.length > 0 && <BoolCard fields={boolFields} {...cardProps} />}

      {/* ── Painéis dinâmicos ─────────────────────────────────────── */}
      {section === "sistemas" && (
        <DynamicItemsPanel
          title="Novos Sistemas"
          subtitle="Crie cards de novos sistemas que aparecerão na página /sistemas e gerarão sua própria página de detalhe"
          icon={<Monitor className="h-4 w-4" />}
          accentColor="#FF4757"
          items={sistemaItems}
          schema={SCHEMA_SISTEMA}
          onSave={handleSaveSistemas}
          addLabel="+ Novo Sistema"
          emptyState="Nenhum sistema extra criado ainda. Adicione quando a Lógica começar a revender um novo sistema."
          createsPage
        />
      )}

      {section === "equipamentos" && (
        <DynamicItemsPanel
          title="Novas Linhas de Equipamentos"
          subtitle="Crie novas categorias que aparecerão na página /equipamentos e gerarão sua própria página de catálogo"
          icon={<Boxes className="h-4 w-4" />}
          accentColor="#FF4757"
          items={equipItems}
          schema={SCHEMA_EQUIPAMENTO_CATEGORIA}
          onSave={handleSaveEquipamentos}
          addLabel="+ Nova Linha"
          emptyState="Nenhuma linha extra criada. Adicione quando a Lógica começar a trabalhar com uma nova categoria de equipamentos."
          createsPage
        />
      )}

      {section === "servicos" && (
        <DynamicItemsPanel
          title="Novos Serviços"
          subtitle="Adicione novos blocos de serviço que aparecerão na página /servicos"
          icon={<Layers className="h-4 w-4" />}
          accentColor="#FF4757"
          items={servicoItems}
          schema={SCHEMA_SERVICO}
          onSave={handleSaveServicos}
          addLabel="+ Novo Serviço"
          emptyState="Nenhum serviço extra cadastrado. Adicione quando a Lógica oferecer um novo serviço."
        />
      )}

      {catalogoCategoria && (
        <DynamicItemsPanel
          title="Adicionar Modelos ao Catálogo"
          subtitle={`Cadastre novos modelos de ${meta.label} além dos que já aparecem por padrão. Eles serão exibidos ao final do catálogo.`}
          icon={<LayoutGrid className="h-4 w-4" />}
          accentColor="#FF4757"
          items={modeloItems}
          schema={SCHEMA_MODELO}
          onSave={handleSaveModelos}
          addLabel="+ Novo Modelo"
          emptyState="Nenhum modelo extra cadastrado. Adicione novos produtos conforme o estoque for crescendo."
        />
      )}

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:left-64">
        {/* Red reflection line at top of bar */}
        <div
          className="h-px w-full"
          style={{
            background:
              isDirty
                ? "linear-gradient(90deg, transparent, rgba(220,38,38,0.4), rgba(220,38,38,0.2), transparent)"
                : "linear-gradient(90deg, transparent, rgba(55,65,81,0.5), transparent)",
          }}
        />
        <div className="bg-gray-950/95 px-4 py-3 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
            <p className="text-sm">
              {isDirty ? (
                <span className="text-amber-400">
                  {modifiedFields.size} campo{modifiedFields.size !== 1 ? "s" : ""} alterado
                  {modifiedFields.size !== 1 ? "s" : ""}
                </span>
              ) : (
                <span className="text-gray-600">Sem alterações pendentes</span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRestore}
                className="flex items-center gap-1.5 rounded-lg border border-gray-800/60 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-gray-700 hover:text-gray-300"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Restaurar padrões</span>
              </button>
              <button
                onClick={handleSave}
                disabled={!isDirty || saving}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                  isDirty
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "bg-gray-800 text-gray-500"
                }`}
                style={
                  isDirty
                    ? { boxShadow: "0 0 16px rgba(220,38,38,0.25)" }
                    : {}
                }
              >
                <Save className="h-4 w-4" />
                {saving ? "Salvando…" : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Editor para item dinâmico (sistema ou equipamento criado pelo admin) ─────

type DynamicEditorMode = "sistema" | "equip";

function DynamicItemSectionEditor({
  mode,
  itemId,
  onBack,
}: {
  mode: DynamicEditorMode;
  itemId: string;
  onBack: () => void;
}) {
  const isSistema = mode === "sistema";
  const schema = isSistema ? SCHEMA_SISTEMA : SCHEMA_EQUIPAMENTO_CATEGORIA;

  /* ── Carrega o item atual ─────────────────────────────────────── */
  const loadItem = useCallback((): DynamicItem | null => {
    const arr = isSistema
      ? (getSistemasExtras() as unknown as DynamicItem[])
      : (getEquipamentosExtras() as unknown as DynamicItem[]);
    return arr.find((it) => it.id === itemId) ?? null;
  }, [isSistema, itemId]);

  const [values, setValues] = useState<DynamicItem | null>(loadItem);
  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const originalRef = useRef<DynamicItem | null>(null);
  if (originalRef.current === null) originalRef.current = loadItem();

  /* Modelos embutidos para equipamentos */
  const [modeloItems, setModeloItems] = useState<DynamicItem[]>(() => {
    if (isSistema) return [];
    try { return JSON.parse(loadItem()?.modelos_json ?? "[]") as DynamicItem[]; } catch { return []; }
  });

  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [urlMode, setUrlMode]     = useState<Record<string, boolean>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  if (!values) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-gray-500">Item não encontrado.</p>
        <button onClick={onBack} className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:text-white">
          Voltar
        </button>
      </div>
    );
  }

  const isDirty = modifiedFields.size > 0;

  const handleChange = (key: string, val: string) => {
    setValues((prev) => prev ? { ...prev, [key]: val } : prev);
    setModifiedFields((prev) => {
      const next = new Set(prev);
      if (val !== (originalRef.current ?? {})[key]) next.add(key);
      else next.delete(key);
      return next;
    });
  };

  const handleFile = async (key: string, file: File) => {
    setUploading((p) => ({ ...p, [key]: true }));
    try {
      const url = await uploadImageToStorage(file);
      if (url) {
        handleChange(key, url);
        toast.success("Imagem enviada!");
      } else {
        const reader = new FileReader();
        reader.onload = () => handleChange(key, reader.result as string);
        reader.readAsDataURL(file);
        toast.warning("Imagem salva localmente.");
      }
    } finally {
      setUploading((p) => ({ ...p, [key]: false }));
    }
  };

  const handleSave = async () => {
    if (!values) return;
    setSaving(true);
    try {
      const updatedItem = { ...values, slug: values.slug || slugify(values.nome) };
      if (isSistema) {
        const arr = getSistemasExtras() as unknown as DynamicItem[];
        await saveSistemasExtras(arr.map((it) => it.id === itemId ? updatedItem as SistemaCard : it as SistemaCard));
      } else {
        const arr = getEquipamentosExtras() as unknown as DynamicItem[];
        await saveEquipamentosExtras(
          arr.map((it) => it.id === itemId ? { ...updatedItem, modelos_json: JSON.stringify(modeloItems) } as EquipamentoCategoria : it as EquipamentoCategoria)
        );
      }
      originalRef.current = updatedItem;
      setModifiedFields(new Set());
      toast.success("Alterações salvas!");
    } catch {
      toast.error("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveModelos = async (items: DynamicItem[]) => {
    setModeloItems(items);
    if (!values) return;
    const updatedItem = { ...values, modelos_json: JSON.stringify(items) };
    const arr = getEquipamentosExtras() as unknown as DynamicItem[];
    await saveEquipamentosExtras(
      arr.map((it) => it.id === itemId ? updatedItem as EquipamentoCategoria : it as EquipamentoCategoria)
    );
    toast.success("Modelos salvos!");
  };

  const inputClass = (key: string) =>
    `w-full rounded-lg border bg-gray-950/50 px-3 py-2 text-sm text-white outline-none transition ${
      modifiedFields.has(key)
        ? "border-amber-500/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
        : "border-gray-800 focus:border-red-600/50 focus:ring-1 focus:ring-red-600/15"
    }`;

  const textFields  = schema.filter((f) => f.type === "text" || f.type === "textarea" || f.type === "url");
  const imageFields = schema.filter((f) => f.type === "image");

  return (
    <div className="space-y-5 pb-24">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button
          onClick={onBack}
          className="mt-0.5 flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-gray-800/60 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-gray-700 hover:text-gray-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <div className="min-w-0 flex-1">
          <nav className="mb-1 flex items-center gap-1.5 text-xs text-gray-600">
            <span>Editor</span>
            <ChevronRight className="h-3 w-3" />
            <span>{isSistema ? "Sistemas" : "Equipamentos"}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-500">{values.nome || "(sem nome)"}</span>
          </nav>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl"
              style={{ background: isSistema ? "rgba(139,92,246,0.15)" : "rgba(16,185,129,0.15)" }}
            >
              {isSistema ? (values.emoji || "🖥️") : <Boxes className="h-5 w-5 text-emerald-400" />}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                {values.nome || "(sem nome)"}
              </h1>
              <p className="text-xs text-gray-600">
                {isSistema ? "Sistema personalizado" : "Linha de equipamentos"} ·{" "}
                {isSistema ? `/sistemas/${values.slug}` : `/equipamentos/${values.slug}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card: Textos */}
      {textFields.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/60">
          <div className="flex items-center gap-2.5 border-b border-gray-800/40 px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Type className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-gray-200">Textos e Configurações</h3>
            <span className="ml-auto rounded-full bg-gray-800/80 px-2 py-0.5 text-xs text-gray-600">
              {textFields.length} campo{textFields.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="divide-y divide-gray-800/30 px-5">
            {textFields.map((field) => {
              const val = (values as Record<string, string>)[field.key] ?? "";
              const isModified = modifiedFields.has(field.key);
              return (
                <div key={field.key} className="py-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-400">{field.label}</label>
                    {field.required && <span className="text-xs text-red-500">*</span>}
                    {isModified && <span className="ml-auto h-2 w-2 rounded-full bg-amber-400" title="Modificado" />}
                  </div>
                  {field.type === "textarea" ? (
                    <textarea
                      value={val}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      rows={field.key === "features" || field.key === "itens" ? 6 : 3}
                      placeholder={field.placeholder}
                      className={`${inputClass(field.key)} resize-none`}
                    />
                  ) : (
                    <input
                      type={field.type === "url" ? "url" : "text"}
                      value={val}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className={inputClass(field.key)}
                    />
                  )}
                  {field.hint && <p className="mt-1 text-xs text-gray-600">{field.hint}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Card: Imagens */}
      {imageFields.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/60">
          <div className="flex items-center gap-2.5 border-b border-gray-800/40 px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <ImageIcon className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-gray-200">Imagens</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
            {imageFields.map((field) => {
              const val = (values as Record<string, string>)[field.key] ?? "";
              const isModified = modifiedFields.has(field.key);
              const showUrl = urlMode[field.key] ?? false;
              return (
                <div
                  key={field.key}
                  className={`rounded-xl border p-4 transition ${isModified ? "border-amber-500/30 bg-gray-800/60" : "border-gray-800/40 bg-gray-800/20"}`}
                >
                  <div className="mb-3 overflow-hidden rounded-lg border border-gray-800/50 bg-gray-950/60">
                    {val ? (
                      <img src={val} alt={field.label} className="h-28 w-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                    ) : (
                      <div className="flex h-28 items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-700" />
                      </div>
                    )}
                  </div>
                  <p className="mb-3 text-xs font-medium text-gray-400">{field.label}</p>
                  {showUrl && (
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder="https:// ou /img/..."
                      className="mb-2 w-full rounded-lg border border-gray-800 bg-gray-950/60 px-3 py-1.5 text-xs text-white outline-none focus:border-red-600/50"
                    />
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileRefs.current[field.key]?.click()}
                      disabled={uploading[field.key]}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-800/70 bg-gray-900/60 px-2 py-1.5 text-xs text-gray-500 transition hover:text-gray-200 disabled:opacity-50"
                    >
                      <Upload className="h-3 w-3" />
                      {uploading[field.key] ? "Enviando…" : "Upload"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrlMode((p) => ({ ...p, [field.key]: !p[field.key] }))}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition ${showUrl ? "border-red-600/40 bg-red-600/10 text-red-400" : "border-gray-800/70 bg-gray-900/60 text-gray-500 hover:text-gray-200"}`}
                    >
                      <Globe className="h-3 w-3" />
                      URL
                    </button>
                    <input
                      ref={(el) => (fileRefs.current[field.key] = el)}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(field.key, f); }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Painel de modelos (apenas para equipamentos) */}
      {!isSistema && (
        <DynamicItemsPanel
          title="Modelos desta linha"
          subtitle="Adicione os produtos/modelos que aparecem na página desta linha de equipamentos"
          icon={<LayoutGrid className="h-4 w-4" />}
          accentColor="#10b981"
          items={modeloItems}
          schema={SCHEMA_MODELO}
          onSave={handleSaveModelos}
          addLabel="+ Novo Modelo"
          emptyState="Nenhum modelo cadastrado ainda. Adicione os produtos desta linha."
        />
      )}

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:left-64">
        <div
          className="h-px w-full"
          style={{
            background: isDirty
              ? "linear-gradient(90deg, transparent, rgba(220,38,38,0.4), rgba(220,38,38,0.2), transparent)"
              : "linear-gradient(90deg, transparent, rgba(55,65,81,0.5), transparent)",
          }}
        />
        <div className="bg-gray-950/95 px-4 py-3 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
            <p className="text-sm">
              {isDirty
                ? <span className="text-amber-400">{modifiedFields.size} campo{modifiedFields.size !== 1 ? "s" : ""} alterado{modifiedFields.size !== 1 ? "s" : ""}</span>
                : <span className="text-gray-600">Sem alterações pendentes</span>
              }
            </p>
            <button
              onClick={handleSave}
              disabled={!isDirty || saving}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40 ${isDirty ? "bg-red-600 text-white hover:bg-red-500" : "bg-gray-800 text-gray-500"}`}
              style={isDirty ? { boxShadow: "0 0 16px rgba(220,38,38,0.25)" } : {}}
            >
              <Save className="h-4 w-4" />
              {saving ? "Salvando…" : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminEditor() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get("section");

  const handleSelect = (section: string) => {
    setSearchParams({ section });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Seção estática do defaultContent
  if (activeSection && defaultContent[activeSection]) {
    return <SectionEditor key={activeSection} section={activeSection} onBack={handleBack} />;
  }

  // Seção dinâmica: sistema criado pelo admin
  if (activeSection?.startsWith("_sistema_")) {
    const itemId = activeSection.slice("_sistema_".length);
    return <DynamicItemSectionEditor key={activeSection} mode="sistema" itemId={itemId} onBack={handleBack} />;
  }

  // Seção dinâmica: linha de equipamentos criada pelo admin
  if (activeSection?.startsWith("_equip_")) {
    const itemId = activeSection.slice("_equip_".length);
    return <DynamicItemSectionEditor key={activeSection} mode="equip" itemId={itemId} onBack={handleBack} />;
  }

  return <SectionGrid onSelect={handleSelect} />;
}
