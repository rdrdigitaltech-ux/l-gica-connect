/**
 * DynamicItemsPanel.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Painel reutilizável para gerenciar listas dinâmicas de itens (sistemas,
 * equipamentos, serviços, modelos). Integrado dentro do AdminEditor em cada
 * seção que suporta criação de novos itens.
 */

import { useState, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  X,
  Save,
  ImageIcon,
  Upload,
  Globe,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { uploadImageToStorage } from "@/lib/supabase";
import { generateId } from "@/lib/dynamicItems";

// ─── Tipos genéricos ──────────────────────────────────────────────────────────

export interface FieldSchema {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "url";
  placeholder?: string;
  hint?: string;
  required?: boolean;
}

export interface DynamicItem {
  id: string;
  [key: string]: string;
}

interface DynamicItemsPanelProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor?: string;
  items: DynamicItem[];
  schema: FieldSchema[];
  onSave: (items: DynamicItem[]) => Promise<void>;
  emptyState?: string;
  addLabel?: string;
  /** Se definido, exibe aviso de que o item criará uma página */
  createsPage?: boolean;
}

// ─── Sub-componente: formulário de edição ─────────────────────────────────────

function ItemForm({
  schema,
  initial,
  onSubmit,
  onCancel,
  accentColor = "#FF4757",
}: {
  schema: FieldSchema[];
  initial: DynamicItem;
  onSubmit: (item: DynamicItem) => void;
  onCancel: () => void;
  accentColor?: string;
}) {
  const [values, setValues] = useState<DynamicItem>(initial);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [urlMode, setUrlMode] = useState<Record<string, boolean>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const set = (key: string, val: string) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleFile = async (key: string, file: File) => {
    setUploading((p) => ({ ...p, [key]: true }));
    try {
      const url = await uploadImageToStorage(file);
      if (url) {
        set(key, url);
        toast.success("Imagem enviada!");
      } else {
        const reader = new FileReader();
        reader.onload = () => set(key, reader.result as string);
        reader.readAsDataURL(file);
        toast.warning("Imagem salva localmente. Use uma URL para publicar para todos.");
      }
    } finally {
      setUploading((p) => ({ ...p, [key]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = schema.filter((f) => f.required && !values[f.key]?.trim());
    if (missing.length) {
      toast.error(`Preencha: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }
    onSubmit(values);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-700/60 bg-gray-950/60 px-3 py-2 text-sm text-white outline-none transition focus:border-red-600/50 focus:ring-1 focus:ring-red-600/15 placeholder:text-gray-600";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5">
      {schema.map((field) => (
        <div key={field.key}>
          <label className="mb-1.5 block text-xs font-medium text-gray-400">
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </label>

          {field.type === "image" ? (
            <div className="space-y-2">
              {values[field.key] && (
                <div className="relative overflow-hidden rounded-lg border border-gray-800/50">
                  <img
                    src={values[field.key]}
                    alt={field.label}
                    className="h-32 w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
              {urlMode[field.key] && (
                <input
                  type="text"
                  value={values[field.key] ?? ""}
                  onChange={(e) => set(field.key, e.target.value)}
                  placeholder="https:// ou /img/..."
                  className={inputClass}
                />
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileRefs.current[field.key]?.click()}
                  disabled={uploading[field.key]}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-700/60 bg-gray-900/60 px-3 py-2 text-xs text-gray-400 transition hover:text-gray-200 disabled:opacity-50"
                >
                  <Upload className="h-3.5 w-3.5" />
                  {uploading[field.key] ? "Enviando…" : "Upload"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setUrlMode((p) => ({ ...p, [field.key]: !p[field.key] }))
                  }
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs transition ${
                    urlMode[field.key]
                      ? "border-red-600/40 bg-red-600/10 text-red-400"
                      : "border-gray-700/60 bg-gray-900/60 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Globe className="h-3.5 w-3.5" />
                  URL
                </button>
              </div>
              <input
                ref={(el) => (fileRefs.current[field.key] = el)}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(field.key, f);
                }}
              />
              {!values[field.key] && (
                <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-gray-700/50">
                  <ImageIcon className="h-6 w-6 text-gray-600" />
                </div>
              )}
            </div>
          ) : field.type === "textarea" ? (
            <textarea
              value={values[field.key] ?? ""}
              onChange={(e) => set(field.key, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className={`${inputClass} resize-none`}
            />
          ) : (
            <input
              type={field.type === "url" ? "url" : "text"}
              value={values[field.key] ?? ""}
              onChange={(e) => set(field.key, e.target.value)}
              placeholder={field.placeholder}
              className={inputClass}
            />
          )}

          {field.hint && (
            <p className="mt-1 text-xs text-gray-600">{field.hint}</p>
          )}
        </div>
      ))}

      <div className="flex gap-2 border-t border-gray-800/40 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-700/60 py-2 text-sm text-gray-500 transition hover:text-gray-300"
        >
          <X className="h-4 w-4" />
          Cancelar
        </button>
        <button
          type="submit"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold text-white transition"
          style={{ background: accentColor }}
        >
          <Save className="h-4 w-4" />
          Salvar Item
        </button>
      </div>
    </form>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function DynamicItemsPanel({
  title,
  subtitle,
  icon,
  accentColor = "#FF4757",
  items,
  schema,
  onSave,
  emptyState = "Nenhum item criado ainda. Clique em '+ Adicionar' para começar.",
  addLabel = "Adicionar",
  createsPage = false,
}: DynamicItemsPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const blankItem = (): DynamicItem => ({
    id: generateId(),
    ...Object.fromEntries(schema.map((f) => [f.key, ""])),
  });

  const handleAdd = async (newItem: DynamicItem) => {
    setSaving(true);
    try {
      await onSave([...items, newItem]);
      setAdding(false);
      toast.success("Item adicionado com sucesso!");
    } catch {
      toast.error("Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (updated: DynamicItem) => {
    setSaving(true);
    try {
      await onSave(items.map((it) => (it.id === updated.id ? updated : it)));
      setEditingId(null);
      toast.success("Item atualizado!");
    } catch {
      toast.error("Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este item?")) return;
    setSaving(true);
    try {
      await onSave(items.filter((it) => it.id !== id));
      toast.success("Item removido.");
    } catch {
      toast.error("Erro ao remover. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleMove = async (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((it) => it.id === id);
    if (idx < 0) return;
    const next = idx + dir;
    if (next < 0 || next >= items.length) return;
    const reordered = [...items];
    [reordered[idx], reordered[next]] = [reordered[next], reordered[idx]];
    setSaving(true);
    try {
      await onSave(reordered);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/60">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-gray-800/40 px-5 py-4">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: `${accentColor}18`, color: accentColor }}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-200">{title}</h3>
          <p className="text-xs text-gray-600">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setAdding(true);
            setEditingId(null);
          }}
          disabled={saving || adding}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition disabled:opacity-50"
          style={{ background: accentColor }}
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </button>
      </div>

      {/* Aviso: criará página */}
      {createsPage && (
        <div className="mx-5 mt-4 flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/8 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
          <p className="text-xs leading-relaxed text-amber-300/80">
            Cada item criado aqui gera automaticamente uma <strong>nova página</strong> no
            site com o conteúdo que você preencher no formulário.
          </p>
        </div>
      )}

      {/* Formulário de adição */}
      {adding && (
        <div className="border-b border-gray-800/40 bg-gray-950/40">
          <div className="border-b border-gray-800/30 px-5 py-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Novo item
            </p>
          </div>
          <ItemForm
            schema={schema}
            initial={blankItem()}
            onSubmit={handleAdd}
            onCancel={() => setAdding(false)}
            accentColor={accentColor}
          />
        </div>
      )}

      {/* Lista de itens */}
      {items.length === 0 && !adding ? (
        <div className="flex flex-col items-center justify-center gap-3 px-5 py-10 text-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: `${accentColor}12` }}
          >
            {icon}
          </div>
          <p className="max-w-xs text-sm text-gray-600">{emptyState}</p>
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="mt-1 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition"
            style={{ background: accentColor }}
          >
            <Plus className="h-4 w-4" />
            {addLabel}
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-gray-800/30">
          {items.map((item, idx) => (
            <li key={item.id}>
              {editingId === item.id ? (
                <div className="bg-gray-950/40">
                  <div className="border-b border-gray-800/30 px-5 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Editando item
                    </p>
                  </div>
                  <ItemForm
                    schema={schema}
                    initial={item}
                    onSubmit={handleEdit}
                    onCancel={() => setEditingId(null)}
                    accentColor={accentColor}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 px-5 py-4">
                  {/* Imagem em miniatura, se houver */}
                  {schema.some((f) => f.type === "image") &&
                    item[schema.find((f) => f.type === "image")!.key] && (
                      <img
                        src={item[schema.find((f) => f.type === "image")!.key]}
                        alt=""
                        className="h-12 w-16 flex-shrink-0 rounded-lg object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-200">
                      {item[schema[0].key] || "(sem título)"}
                    </p>
                    {schema[1] && item[schema[1].key] && (
                      <p className="mt-0.5 truncate text-xs text-gray-600">
                        {item[schema[1].key]}
                      </p>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex flex-shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMove(item.id, -1)}
                      disabled={idx === 0 || saving}
                      className="rounded p-1.5 text-gray-600 transition hover:bg-gray-800/60 hover:text-gray-300 disabled:opacity-30"
                      title="Mover para cima"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(item.id, 1)}
                      disabled={idx === items.length - 1 || saving}
                      className="rounded p-1.5 text-gray-600 transition hover:bg-gray-800/60 hover:text-gray-300 disabled:opacity-30"
                      title="Mover para baixo"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(item.id);
                        setAdding(false);
                      }}
                      disabled={saving}
                      className="rounded p-1.5 text-gray-600 transition hover:bg-gray-800/60 hover:text-blue-400 disabled:opacity-30"
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={saving}
                      className="rounded p-1.5 text-gray-600 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-30"
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
