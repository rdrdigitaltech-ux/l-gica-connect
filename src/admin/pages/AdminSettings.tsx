import { useState } from "react";
import { Save, Check, RotateCcw } from "lucide-react";
import { defaultContent } from "@/data/defaultContent";
import { loadContent, saveContent } from "@/hooks/useSiteContent";
import { toast } from "sonner";

type SaveStatus = "idle" | "saving" | "saved";

const settingsSection = "geral";

export default function AdminSettings() {
  const defaults = defaultContent[settingsSection];
  const current = loadContent()[settingsSection] ?? {};

  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {};
    for (const key of Object.keys(defaults)) {
      v[key] = current[key] ?? defaults[key].value;
    }
    return v;
  });
  const [status, setStatus] = useState<SaveStatus>("idle");

  const handleSave = async () => {
    setStatus("saving");
    try {
      const content = loadContent();
      content[settingsSection] = { ...(content[settingsSection] ?? {}), ...values };
      await saveContent(content);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      toast.error("Erro ao salvar. Tente novamente.");
      setStatus("idle");
    }
  };

  const handleReset = async () => {
    const v: Record<string, string> = {};
    for (const key of Object.keys(defaults)) {
      v[key] = defaults[key].value;
    }
    setValues(v);
    setStatus("saving");
    try {
      const content = loadContent();
      content[settingsSection] = v;
      await saveContent(content);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      toast.error("Erro ao restaurar. Tente novamente.");
      setStatus("idle");
    }
  };

  const colorKeys = new Set(
    Object.entries(defaults)
      .filter(([, m]) => m.type === "color")
      .map(([k]) => k)
  );
  const imageKeys = new Set(
    Object.entries(defaults)
      .filter(([, m]) => m.type === "image_url")
      .map(([k]) => k)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configurações do Site</h1>
        <p className="mt-1 text-sm text-gray-500">
          Nome da empresa, logo, cores principais
        </p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <div className="space-y-5">
          {Object.entries(defaults).map(([key, meta]) => (
            <div key={key}>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                {meta.label}
              </label>

              {colorKeys.has(key) ? (
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={values[key] || "#000000"}
                    onChange={(e) => setValues((p) => ({ ...p, [key]: e.target.value }))}
                    className="h-10 w-16 cursor-pointer rounded-lg border border-gray-700 bg-gray-800 p-1"
                  />
                  <input
                    type="text"
                    value={values[key] || ""}
                    onChange={(e) => setValues((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-32 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 font-mono text-sm text-white outline-none focus:border-red-500"
                  />
                  <div
                    className="h-8 w-8 rounded-full border border-gray-700"
                    style={{ background: values[key] }}
                  />
                </div>
              ) : imageKeys.has(key) ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={values[key] || ""}
                    onChange={(e) => setValues((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                  />
                  {values[key] && (
                    <img
                      src={values[key]}
                      alt="preview"
                      className="h-10 rounded object-contain"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={values[key] || ""}
                  onChange={(e) => setValues((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-gray-800 pt-6">
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
              status === "saved"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white hover:bg-red-500"
            }`}
          >
            {status === "saved" ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {status === "saving" ? "Salvando…" : status === "saved" ? "Salvo!" : "Salvar configurações"}
          </button>
          <button
            onClick={handleReset}
            disabled={status === "saving"}
            className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2.5 text-sm text-gray-400 transition hover:border-gray-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RotateCcw className="h-4 w-4" />
            Restaurar padrões
          </button>
        </div>
      </div>
    </div>
  );
}
