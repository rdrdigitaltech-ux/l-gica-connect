import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    if (!supabase) {
      return { error: "Supabase não configurado. Verifique as variáveis de ambiente." };
    }

    // 1. Autentica via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return { error: "E-mail ou senha incorretos." };
    }

    // 2. SEGURANÇA: verifica se o usuário está registrado em admin_profiles.
    //    Isso bloqueia qualquer conta Supabase Auth que não seja admin explícito.
    const { data: profile, error: profileError } = await supabase
      .from("admin_profiles")
      .select("id")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (profileError || !profile) {
      // Não é admin — encerra a sessão imediatamente
      await supabase.auth.signOut();
      return { error: "Acesso não autorizado." };
    }

    return { error: null };
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated: !!session, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth deve estar dentro de AdminAuthProvider");
  return ctx;
}
