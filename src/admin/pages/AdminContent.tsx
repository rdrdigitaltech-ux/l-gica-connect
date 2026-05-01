import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Save,
  Check,
  RotateCcw,
  ImageIcon,
} from "lucide-react";
import { defaultContent, type ContentType } from "@/data/defaultContent";
import { loadContent, updateField } from "@/hooks/useSiteContent";

const sectionLabels: Record<string, string> = {
  hero: "Banner Principal",
  sobre: "Sobre a Empresa",
  numeros: "Números de Impacto",
  contato: "Informações de Contato",
  rodape: "Rodapé",
  geral: "Geral / Cores e Logo",
};

type FieldStatus = "idle" | "saved";

function FieldEditor({
  section,
  fieldKey,
  label,
  type,
  defaultValue,
}: {
  section: string;
  fieldKey: string;
  label: string;
  type: ContentType;
  defaultValue: string;
}) {
  const current = loadContent();
  const [value, setValue] = useState<string>(
    current[section]?.[fieldKey] ?? defaultValue
  );
  const [status, setStatus] = useState<FieldStatus>("idle");
  const fileRef = useRef<HTMLInputElement>(null);
  const hasChanged = value !== (loadContent()[section]?.[fieldKey] ?? defaultValue);

  const save = () => {
    updateField(section, fieldKey, value);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  };

  const reset = () => {
    setValue(defaultValue);
    updateField(section, fieldKey, defaultValue);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  };

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setValue(url);
      updateField(section, fieldKey, url);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-gray-200">{label}</p>
        <span className="shrink-0 rounded-full bg-gray-800 px-2 py-0.5 text-[10px] text-gray-500">
          {type}
        </span>
      </div>

      {type === "text" && (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={value.length > 80 ? 3 : 2}
          className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
        />
      )}

      {type === "link" && (
        <input
          type="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
        />
      )}

      {type === "color" && (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-10 w-16 cursor-pointer rounded-lg border border-gray-700 bg-gray-800 p-1 outline-none"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-32 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 font-mono text-sm text-white outline-none"
          />
          <div
            className="h-8 w-8 rounded-full border border-gray-700"
            style={{ background: value }}
          />
        </div>
      )}

      {type === "image_url" && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="/img/exemplo.webp"
              className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none transition focus:border-red-500"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-xs text-gray-400 hover:text-white"
            >
              Arquivo
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImageFile(f);
              }}
            />
          </div>
          {value && (
            <div className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-950 p-2">
              <ImageIcon className="h-4 w-4 shrink-0 text-gray-600" />
              <img
                src={value}
                alt="preview"
                className="h-10 w-16 rounded object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <p className="truncate text-xs text-gray-500">{value.slice(0, 40)}</p>
            </div>
          )}
        </div>
      )}

      {type === "boolean" && (
        <label className="flex cursor-pointer items-center gap-3">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={value === "true"}
              onChange={(e) => setValue(e.target.checked ? "true" : "false")}
            />
            <div className={`h-6 w-11 rounded-full transition-colors ${value === "true" ? "bg-red-600" : "bg-gray-700"}`} />
            <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value === "true" ? "translate-x-5" : "translate-x-0.5"}`} />
          </div>
          <span className="text-sm text-gray-400">{value === "true" ? "Ativado" : "Desativado"}</span>
        </label>
      )}

      {/* Actions */}
      {type !== "image_url" && (
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={save}
            disabled={!hasChanged && status === "idle"}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
              status === "saved"
                ? "bg-green-600/20 text-green-400"
                : "bg-red-600 text-white hover:bg-red-500"
            }`}
          >
            {status === "saved" ? <Check className="h-3 w-3" /> : <Save className="h-3 w-3" />}
            {status === "saved" ? "Salvo!" : "Salvar"}
          </button>
          {value !== defaultValue && (
            <button
              onClick={reset}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300"
            >
              <RotateCcw className="h-3 w-3" />
              Restaurar padrão
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminContent() {
  const [searchParams] = useSearchParams();
  const initialSection = searchParams.get("section") || null;
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(initialSection ? [initialSection] : [])
  );

  const toggle = (section: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });

  const sections = Object.keys(defaultContent);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Conteúdo do Site</h1>
        <p className="mt-1 text-sm text-gray-500">
          Edite textos, imagens e cores. As alterações são salvas automaticamente no navegador.
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((section) => {
          const fields = defaultContent[section];
          const isOpen = expanded.has(section);

          return (
            <div key={section} className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
              <button
                onClick={() => toggle(section)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/10 text-xs font-bold uppercase text-red-400">
                    {section.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-200">
                      {sectionLabels[section] || section}
                    </p>
                    <p className="text-xs text-gray-600">
                      {Object.keys(fields).length} campos
                    </p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>

              {isOpen && (
                <div className="grid gap-3 border-t border-gray-800 p-4 sm:grid-cols-2">
                  {Object.entries(fields).map(([key, meta]) => (
                    <FieldEditor
                      key={`${section}.${key}`}
                      section={section}
                      fieldKey={key}
                      label={meta.label}
                      type={meta.type}
                      defaultValue={meta.value}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
