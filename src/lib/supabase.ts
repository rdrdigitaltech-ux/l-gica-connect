import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Cliente Supabase — null quando as variáveis de ambiente não estão configuradas.
 * Nesse caso o sistema continua funcionando via localStorage (modo offline).
 */
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

const BUCKET = "cms-images";

/**
 * Faz upload de um arquivo para o Supabase Storage e retorna a URL pública.
 * Requer que o bucket "cms-images" exista com acesso público no Supabase.
 * Em caso de erro, retorna null e o chamador deve usar fallback (base64 / URL manual).
 */
/**
 * Upload genérico para o bucket cms-images (imagens, PDF, etc.).
 * Ajuste `allowed_mime_types` do bucket no Supabase se necessário.
 */
export async function uploadCmsFileToStorage(file: File): Promise<string | null> {
  if (!supabase) return null;

  const ext = file.name.split(".").pop() ?? "bin";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { upsert: true, cacheControl: "3600" });

  if (error || !data) {
    console.error("[Storage] Erro no upload:", error?.message);
    return null;
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
  return urlData?.publicUrl ?? null;
}

/** @deprecated use uploadCmsFileToStorage */
export async function uploadImageToStorage(file: File): Promise<string | null> {
  return uploadCmsFileToStorage(file);
}
