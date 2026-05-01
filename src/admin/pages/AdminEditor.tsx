import { useState, useRef, useCallback } from "react";
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
} from "lucide-react";
import { defaultContent, type ContentField } from "@/data/defaultContent";
import { loadContent, saveContent } from "@/hooks/useSiteContent";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

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
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFile = (key: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => onChange(key, reader.result as string);
    reader.readAsDataURL(file);
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
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-800/70 bg-gray-900/60 px-2 py-1.5 text-xs text-gray-500 transition hover:border-gray-700 hover:text-gray-200"
                >
                  <Upload className="h-3 w-3" />
                  Upload
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

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Editor de Seções</h1>
        <div className="mt-1.5 flex items-center gap-2.5">
          <div className="h-px w-6 rounded-full bg-red-600/70" />
          <p className="text-sm text-gray-600">Selecione uma seção para editar seu conteúdo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const meta = SECTION_META[section] ?? {
            icon: FileText,
            label: section,
            description: "",
          };
          const counts = getFieldCounts(section);
          const Icon = meta.icon;

          return (
            <button
              key={section}
              onClick={() => onSelect(section)}
              className="group flex flex-col gap-3 rounded-xl border border-gray-800/50 bg-gray-900/50 p-5 text-left transition-all duration-200 hover:border-red-600/30 hover:bg-gray-900/80"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 24px rgba(220,38,38,0.1), 0 1px 3px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/10 text-red-400 transition-all duration-200 group-hover:bg-red-600/20"
                  style={{ transition: "box-shadow 0.2s, background 0.2s" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 14px rgba(220,38,38,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-gray-700 transition-all duration-200 group-hover:text-red-500" />
              </div>

              <div>
                <p className="font-semibold text-gray-300 group-hover:text-white">
                  {meta.label}
                </p>
                <p className="mt-0.5 text-xs text-gray-600">{meta.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600">{counts.total} campos</span>
                {counts.text > 0 && (
                  <span className="flex items-center gap-1 text-xs text-gray-700">
                    <Type className="h-3 w-3" />
                    {counts.text}
                  </span>
                )}
                {counts.image > 0 && (
                  <span className="flex items-center gap-1 text-xs text-gray-700">
                    <ImageIcon className="h-3 w-3" />
                    {counts.image}
                  </span>
                )}
                {counts.color > 0 && (
                  <span className="flex items-center gap-1 text-xs text-gray-700">
                    <Palette className="h-3 w-3" />
                    {counts.color}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

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

  if (activeSection && defaultContent[activeSection]) {
    return (
      <SectionEditor
        key={activeSection}
        section={activeSection}
        onBack={handleBack}
      />
    );
  }

  return <SectionGrid onSelect={handleSelect} />;
}
