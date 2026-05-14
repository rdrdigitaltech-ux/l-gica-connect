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
  ChevronUp,
  ChevronDown,
  Upload,
  Globe,
  Link as LinkIcon,
  Layers,
  Plus,
  Trash2,
  X as XIcon,
} from "lucide-react";
import EquipamentosCatalogEditor from "@/admin/components/EquipamentosCatalogEditor";
import { defaultContent, type ContentField } from "@/data/defaultContent";
import { loadContent, saveContent } from "@/hooks/useSiteContent";
import { uploadImageToStorage, uploadCmsFileToStorage } from "@/lib/supabase";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import DynamicItemsPanel, { type DynamicItem, type FieldSchema } from "@/admin/components/DynamicItemsPanel";
import {
  getSistemasExtras,
  saveSistemasExtras,
  getServicosExtras,
  saveServicosExtras,
  slugify,
  generateId,
  type SistemaCard,
  type SistemaBloco,
  type ServicoBloco,
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
  equipamentos:{ icon: Package,                   label: "Equipamentos",              description: "Catálogo: categorias, produtos e textos da página" },
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
  const sections = Object.keys(defaultContent).filter(
    (key) => !key.startsWith("catalogo_")
  );
  const [sistemasExtras, setSistemasExtras] = useState<SistemaCard[]>(() => getSistemasExtras());

  useEffect(() => {
    const refresh = () => {
      setSistemasExtras(getSistemasExtras());
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

  const hasDynamic = sistemasExtras.length > 0;

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
  { key: "cta_btn",        label: "CTA final — Texto do botão", type: "text",   placeholder: "Ex: Falar com um Especialista" },
  { key: "cta_link",       label: "CTA final — Link do botão",  type: "text",   placeholder: "https://wa.me/5547984218275?text=...", hint: "URL completa ou link do WhatsApp. Deixe vazio para usar o WhatsApp padrão." },
];

const SCHEMA_SERVICO: FieldSchema[] = [
  { key: "titulo",         label: "Título do serviço",        type: "text",     required: true, placeholder: "Ex: Treinamento e Capacitação" },
  { key: "descricao",      label: "Descrição",                type: "textarea", required: true, placeholder: "Parágrafo explicativo sobre o serviço" },
  { key: "itens",          label: "Lista de itens",           type: "textarea", placeholder: "Um item por linha. Ex:\nTreinamento presencial\nTreinamento online", hint: "Cada linha vira um item da lista com ✓ vermelho." },
  { key: "imagem",         label: "Imagem ilustrativa",       type: "image" },
  { key: "whatsapp_texto", label: "Texto de abertura do WhatsApp", type: "text", placeholder: "Ex: Olá! Quero saber mais sobre treinamento." },
];

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

  const STATIC_SISTEMA_SECTIONS = [
    "sistema_varejo", "sistema_gastronomia", "sistema_multiloja",
    "sistema_ponto", "sistema_ondesk",
  ];
  const isStaticSistema = STATIC_SISTEMA_SECTIONS.includes(section);

  const [values, setValues] = useState<Record<string, string>>(() => {
    const saved = loadContent();
    return { ...getSectionDefaults(section), ...(saved[section] ?? {}) };
  });

  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  // Blocos state for static sistema sections
  const [blocos, setBlocos] = useState<SistemaBloco[]>(() => {
    try {
      const saved = loadContent();
      return JSON.parse((saved[section] ?? {}).blocos || "[]") as SistemaBloco[];
    } catch { return []; }
  });

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

  const patchBlocos = useCallback((newBlocos: SistemaBloco[]) => {
    setBlocos(newBlocos);
    handleChange("blocos", JSON.stringify(newBlocos));
  }, [handleChange]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const content = loadContent();
      content[section] = { ...(content[section] ?? {}), ...values, ...(isStaticSistema ? { blocos: JSON.stringify(blocos) } : {}) };
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
  const [servicoItems, setServicoItems] = useState<DynamicItem[]>(() =>
    section === "servicos" ? (getServicosExtras() as unknown as DynamicItem[]) : []
  );

  const handleSaveSistemas = async (items: DynamicItem[]) => {
    await saveSistemasExtras(
      items.map((it) => ({ ...it, slug: it.slug || slugify(it.nome) } as SistemaCard))
    );
    setSistemaItems(items);
  };
  const handleSaveServicos = async (items: DynamicItem[]) => {
    await saveServicosExtras(items as unknown as ServicoBloco[]);
    setServicoItems(items);
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

      {/* ── Painel de Blocos para páginas de sistema estáticas ─────── */}
      {isStaticSistema && (
        <div className="overflow-hidden rounded-2xl border border-gray-800/60 bg-gray-900/20">
          <div className="flex items-center justify-between border-b border-gray-800/60 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(255,71,87,0.12)" }}>
                <Layers className="h-4 w-4 text-[#FF4757]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200">Seções Extras (Blocos)</h3>
                <p className="text-xs text-gray-500">Adicione seções com imagem e texto que aparecem antes do CTA final</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => patchBlocos([...blocos, { id: generateId(), titulo: "", texto: "", imagem: "", ordem: blocos.length }])}
              className="flex items-center gap-1.5 rounded-lg border border-red-900/40 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:border-red-700/60 hover:text-red-300"
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar bloco
            </button>
          </div>

          {blocos.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-gray-600">Nenhum bloco ainda. Clique em "Adicionar bloco" para criar uma seção com imagem e texto.</p>
            </div>
          ) : (
            <div className="space-y-4 p-5">
              {[...blocos].sort((a, b) => a.ordem - b.ordem).map((b, idx) => (
                <SistemaBlocoRow
                  key={b.id}
                  b={b}
                  idx={idx}
                  total={blocos.length}
                  onChange={(nb) => patchBlocos(blocos.map((x) => (x.id === b.id ? nb : x)))}
                  onMove={(dir) => {
                    const arr = [...blocos].sort((a, x) => a.ordem - x.ordem);
                    const j = idx + dir;
                    if (j < 0 || j >= arr.length) return;
                    [arr[idx], arr[j]] = [arr[j], arr[idx]];
                    patchBlocos(arr.map((x, i) => ({ ...x, ordem: i })));
                  }}
                  onRemove={() => patchBlocos(blocos.filter((x) => x.id !== b.id).map((x, i) => ({ ...x, ordem: i })))}
                />
              ))}
            </div>
          )}
        </div>
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

// ─── Editor para sistema criado pelo admin ───────────────────────────────────

function DynamicItemSectionEditor({
  itemId,
  onBack,
}: {
  itemId: string;
  onBack: () => void;
}) {
  const schema = SCHEMA_SISTEMA;

  const loadItem = useCallback((): DynamicItem | null => {
    const arr = getSistemasExtras() as unknown as DynamicItem[];
    return arr.find((it) => it.id === itemId) ?? null;
  }, [itemId]);

  const loadSistema = useCallback((): SistemaCard | null => {
    return getSistemasExtras().find((it) => it.id === itemId) ?? null;
  }, [itemId]);

  const [values, setValues] = useState<DynamicItem | null>(loadItem);
  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const originalRef = useRef<DynamicItem | null>(null);
  if (originalRef.current === null) originalRef.current = loadItem();

  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [urlMode, setUrlMode]     = useState<Record<string, boolean>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Galeria e blocos
  const [galeria, setGaleria] = useState<string[]>(() => loadSistema()?.galeria ?? []);
  const [blocos, setBlocos] = useState<SistemaBloco[]>(() => loadSistema()?.blocos ?? []);
  const [galeriaDirty, setGaleriaDirty] = useState(false);
  const [blocosDirty, setBlocosDirty] = useState(false);
  const [uploadingGal, setUploadingGal] = useState(false);
  const galRef = useRef<HTMLInputElement>(null);

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

  const isDirty = modifiedFields.size > 0 || galeriaDirty || blocosDirty;

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
      const updatedItem = {
        ...values,
        slug: values.slug || slugify(values.nome),
        galeria,
        blocos: blocos.map((b, i) => ({ ...b, ordem: i })),
      } as unknown as SistemaCard;
      const arr = getSistemasExtras();
      await saveSistemasExtras(arr.map((it) => it.id === itemId ? updatedItem : it));
      originalRef.current = updatedItem as unknown as DynamicItem;
      setModifiedFields(new Set());
      setGaleriaDirty(false);
      setBlocosDirty(false);
      toast.success("Alterações salvas!");
    } catch {
      toast.error("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = (key: string) =>
    `w-full rounded-lg border bg-gray-950/50 px-3 py-2 text-sm text-white outline-none transition ${
      modifiedFields.has(key)
        ? "border-amber-500/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
        : "border-gray-800 focus:border-red-600/50 focus:ring-1 focus:ring-red-600/15"
    }`;

  const inputBase = "w-full rounded-lg border border-gray-700/60 bg-gray-950/60 px-3 py-2 text-sm text-white outline-none focus:border-red-600/50";

  const textFields  = schema.filter((f) => f.type === "text" || f.type === "textarea" || f.type === "url");
  const imageFields = schema.filter((f) => f.type === "image");

  return (
    <div className="space-y-5 pb-32">
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
            <span>Sistemas</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-500">{values.nome || "(sem nome)"}</span>
          </nav>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl"
              style={{ background: "rgba(139,92,246,0.15)" }}
            >
              {values.emoji || "🖥️"}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                {values.nome || "(sem nome)"}
              </h1>
              <p className="text-xs text-gray-600">
                Sistema personalizado · /sistemas/{values.slug}
              </p>
            </div>
          </div>
        </div>
      </div>

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
                      rows={field.key === "features" || field.key === "itens" ? 6 : 4}
                      placeholder={field.placeholder}
                      className={`${inputClass(field.key)} resize-y`}
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

      {imageFields.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/60">
          <div className="flex items-center gap-2.5 border-b border-gray-800/40 px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <ImageIcon className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-gray-200">Imagem de Destaque</h3>
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

      {/* ── GALERIA DE IMAGENS ─────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/60">
        <div className="flex items-center gap-2.5 border-b border-gray-800/40 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <ImageIcon className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-200">Galeria de Imagens</h3>
            <p className="text-xs text-gray-600">Imagens adicionais exibidas na página do sistema</p>
          </div>
          <button
            type="button"
            disabled={uploadingGal}
            onClick={() => galRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600/80 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-600 disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
            {uploadingGal ? "Enviando…" : "Adicionar imagens"}
          </button>
          <input
            ref={galRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={async (e) => {
              const files = e.target.files;
              if (!files?.length) return;
              setUploadingGal(true);
              try {
                const urls: string[] = [];
                for (let i = 0; i < files.length; i++) {
                  const url = await uploadCmsFileToStorage(files[i]);
                  if (url) urls.push(url);
                }
                if (urls.length) {
                  setGaleria((prev) => [...prev, ...urls]);
                  setGaleriaDirty(true);
                  toast.success(`${urls.length} imagem(ns) adicionada(s).`);
                }
              } finally {
                setUploadingGal(false);
                if (galRef.current) galRef.current.value = "";
              }
            }}
          />
        </div>
        {galeria.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <ImageIcon className="h-8 w-8 text-gray-700" />
            <p className="text-xs text-gray-600">Nenhuma imagem na galeria. Clique em "Adicionar imagens".</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 p-5">
            {galeria.map((url, i) => (
              <div key={url + i} className="group relative">
                <img src={url} alt={`galeria ${i + 1}`} className="h-24 w-32 rounded-lg object-cover" />
                <div className="absolute inset-0 flex items-center justify-center gap-1 rounded-lg bg-black/50 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => {
                      const arr = [...galeria];
                      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                      setGaleria(arr);
                      setGaleriaDirty(true);
                    }}
                    className="rounded bg-white/20 p-1 disabled:opacity-30"
                  >
                    <ChevronUp className="h-3 w-3 text-white" />
                  </button>
                  <button
                    type="button"
                    disabled={i >= galeria.length - 1}
                    onClick={() => {
                      const arr = [...galeria];
                      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                      setGaleria(arr);
                      setGaleriaDirty(true);
                    }}
                    className="rounded bg-white/20 p-1 disabled:opacity-30"
                  >
                    <ChevronDown className="h-3 w-3 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGaleria((prev) => prev.filter((_, j) => j !== i));
                      setGaleriaDirty(true);
                    }}
                    className="rounded bg-red-600/80 p-1"
                  >
                    <Trash2 className="h-3 w-3 text-white" />
                  </button>
                </div>
                <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">{i + 1}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── SEÇÕES EXTRAS (BLOCOS) ────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Seções extras</h2>
            <p className="text-xs text-gray-500">Blocos de texto e imagem exibidos abaixo das vantagens</p>
          </div>
          <button
            type="button"
            onClick={() => {
              const nb: SistemaBloco = { id: generateId(), titulo: "", texto: "", imagem: "", ordem: blocos.length };
              setBlocos((prev) => [...prev, nb]);
              setBlocosDirty(true);
            }}
            className="text-sm text-red-400 hover:underline"
          >
            + Adicionar seção
          </button>
        </div>

        {blocos.map((bloco, idx) => (
          <div key={bloco.id} className="rounded-xl border border-gray-800/60 bg-gray-900/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Seção {idx + 1}</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => {
                    const arr = [...blocos];
                    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                    setBlocos(arr);
                    setBlocosDirty(true);
                  }}
                  className="rounded border border-gray-700 p-1 disabled:opacity-30"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  disabled={idx >= blocos.length - 1}
                  onClick={() => {
                    const arr = [...blocos];
                    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
                    setBlocos(arr);
                    setBlocosDirty(true);
                  }}
                  className="rounded border border-gray-700 p-1 disabled:opacity-30"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBlocos((prev) => prev.filter((b) => b.id !== bloco.id));
                    setBlocosDirty(true);
                  }}
                  className="rounded border border-red-900/50 p-1 text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <label className="block text-xs text-gray-400">
              Título
              <input
                className={`mt-1 ${inputBase}`}
                value={bloco.titulo}
                onChange={(e) => {
                  setBlocos((prev) => prev.map((b) => b.id === bloco.id ? { ...b, titulo: e.target.value } : b));
                  setBlocosDirty(true);
                }}
              />
            </label>

            <label className="block text-xs text-gray-400">
              Texto (suporta quebras de linha)
              <textarea
                className={`mt-1 ${inputBase} min-h-[100px] resize-y`}
                value={bloco.texto}
                onChange={(e) => {
                  setBlocos((prev) => prev.map((b) => b.id === bloco.id ? { ...b, texto: e.target.value } : b));
                  setBlocosDirty(true);
                }}
              />
            </label>

            <div className="text-xs text-gray-400">
              Imagem (opcional)
              <BlocoImageUpload
                value={bloco.imagem}
                onChange={(url) => {
                  setBlocos((prev) => prev.map((b) => b.id === bloco.id ? { ...b, imagem: url } : b));
                  setBlocosDirty(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

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
                ? <span className="text-amber-400">Alterações pendentes</span>
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

/** Componente auxiliar para upload de imagem em bloco de sistema */
function BlocoImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  const inputBase = "w-full rounded-lg border border-gray-700/60 bg-gray-950/60 px-3 py-2 text-sm text-white outline-none focus:border-red-600/50";

  return (
    <div className="mt-1 space-y-2">
      {value && (
        <img src={value} alt="" className="h-20 rounded object-cover" />
      )}
      {showUrl && (
        <input
          type="text"
          className={inputBase}
          value={value}
          placeholder="https://..."
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <div className="flex gap-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => ref.current?.click()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-700/60 bg-gray-900/60 px-2 py-1.5 text-xs text-gray-400 transition hover:text-gray-200 disabled:opacity-50"
        >
          <Upload className="h-3 w-3" />
          {uploading ? "Enviando…" : "Upload"}
        </button>
        <button
          type="button"
          onClick={() => setShowUrl((v) => !v)}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition ${showUrl ? "border-red-600/40 bg-red-600/10 text-red-400" : "border-gray-700/60 bg-gray-900/60 text-gray-400 hover:text-gray-200"}`}
        >
          <Globe className="h-3 w-3" />
          URL
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-lg border border-gray-700/60 bg-gray-900/60 px-2 py-1.5 text-xs text-gray-500 hover:text-red-400"
          >
            <XIcon className="h-3 w-3" />
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setUploading(true);
          try {
            const url = await uploadCmsFileToStorage(f);
            if (url) onChange(url);
            else toast.error("Falha no upload.");
          } finally {
            setUploading(false);
          }
        }}
      />
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

  const handleEquipamentosTextosBack = () => {
    setSearchParams({ section: "equipamentos" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (activeSection === "equipamentos") {
    return <EquipamentosCatalogEditor onBack={handleBack} />;
  }

  if (activeSection === "_equipamentos_textos") {
    return <SectionEditor key="_equipamentos_textos" section="equipamentos" onBack={handleEquipamentosTextosBack} />;
  }

  if (activeSection && defaultContent[activeSection]) {
    return <SectionEditor key={activeSection} section={activeSection} onBack={handleBack} />;
  }

  if (activeSection?.startsWith("_sistema_")) {
    const itemId = activeSection.slice("_sistema_".length);
    return <DynamicItemSectionEditor key={activeSection} itemId={itemId} onBack={handleBack} />;
  }

  return <SectionGrid onSelect={handleSelect} />;
}

// ─── BlocoRow para seções de sistema estáticas ────────────────────────────────

function SistemaBlocoRow({
  b, idx, total, onChange, onMove, onRemove,
}: {
  b: SistemaBloco;
  idx: number;
  total: number;
  onChange: (b: SistemaBloco) => void;
  onMove: (dir: number) => void;
  onRemove: () => void;
}) {
  const imgRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const inputCls =
    "w-full rounded-lg border border-gray-700/60 bg-gray-900/60 px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:border-red-700/60 focus:outline-none focus:ring-1 focus:ring-red-700/40";

  return (
    <div className="rounded-xl border border-gray-800/60 bg-gray-900/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400">Bloco {idx + 1}</span>
        <div className="flex items-center gap-1">
          <button type="button" disabled={idx === 0} onClick={() => onMove(-1)}
            className="rounded border border-gray-700/60 p-1 text-gray-400 disabled:opacity-30 hover:border-gray-600 hover:text-gray-200">
            <ChevronUp className="h-4 w-4" />
          </button>
          <button type="button" disabled={idx >= total - 1} onClick={() => onMove(1)}
            className="rounded border border-gray-700/60 p-1 text-gray-400 disabled:opacity-30 hover:border-gray-600 hover:text-gray-200">
            <ChevronDown className="h-4 w-4" />
          </button>
          <button type="button" onClick={onRemove}
            className="rounded border border-red-900/50 p-1 text-red-400 hover:border-red-700/60 hover:text-red-300">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <label className="mb-2 block text-xs text-gray-400">
        Título
        <input className={`mt-1 ${inputCls}`} value={b.titulo}
          onChange={(e) => onChange({ ...b, titulo: e.target.value })}
          placeholder="Ex: Por que escolher nosso sistema?" />
      </label>

      <label className="mb-3 block text-xs text-gray-400">
        Texto / Descrição
        <textarea className={`mt-1 ${inputCls} min-h-[80px] resize-y`} value={b.texto}
          onChange={(e) => onChange({ ...b, texto: e.target.value })}
          placeholder="Descreva o conteúdo desta seção..." />
      </label>

      <div className="text-xs text-gray-400">
        Imagem (opcional)
        <input ref={imgRef} type="file" accept="image/*" className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setUploading(true);
            try {
              const url = await uploadCmsFileToStorage(f);
              if (url) onChange({ ...b, imagem: url });
            } finally { setUploading(false); }
          }} />
        <div className="mt-1 flex gap-2">
          <button type="button" onClick={() => imgRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 rounded-lg border border-gray-700/60 px-3 py-1.5 text-xs text-gray-400 hover:border-gray-600 hover:text-gray-200 disabled:opacity-50">
            <Upload className="h-3.5 w-3.5" />
            {uploading ? "Enviando…" : "Upload"}
          </button>
          <input className={`flex-1 ${inputCls}`} value={b.imagem}
            onChange={(e) => onChange({ ...b, imagem: e.target.value })}
            placeholder="Ou cole a URL da imagem" />
        </div>
        {b.imagem && (
          <img src={b.imagem} alt="" className="mt-2 h-24 w-full rounded-lg object-cover" />
        )}
      </div>
    </div>
  );
}
