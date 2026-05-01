import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Cliente Supabase — null quando as variáveis de ambiente não estão configuradas.
 * Nesse caso o sistema continua funcionando via localStorage (modo offline).
 */
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;
