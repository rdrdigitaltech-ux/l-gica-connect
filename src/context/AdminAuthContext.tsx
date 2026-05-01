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
    if (!supabase)
      return {
        error: "Supabase não configurado. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.",
      };

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: "E-mail ou senha incorretos." };
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
