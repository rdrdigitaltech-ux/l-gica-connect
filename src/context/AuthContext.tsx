import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserType = "standard" | "premium";

export interface User {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  company: string;
  userType: UserType;
  registeredAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (cnpj: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  isPremium: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ao carregar, verifica a sessão via cookie httpOnly (sem ler localStorage)
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/verify", { credentials: "include" });
        if (res.ok) {
          const { user: userData } = await res.json() as { user: User };
          setUser(userData);
        }
      } catch {
        // Sem sessão ativa — comportamento normal
      } finally {
        setIsLoading(false);
      }
    }
    checkSession();
  }, []);

  /**
   * Autentica via CNPJ + senha.
   * A verificação ocorre no servidor (api/auth/login);
   * o token JWT fica num cookie httpOnly — jamais acessível pelo browser JS.
   */
  const login = async (
    cnpj: string,
    password: string
  ): Promise<{ ok: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cnpj, password }),
      });

      const data = (await res.json()) as { user?: User; error?: string };

      if (res.ok && data.user) {
        setUser(data.user);
        return { ok: true };
      }

      return { ok: false, error: data.error ?? "Erro ao autenticar." };
    } catch {
      return { ok: false, error: "Sem conexão com o servidor. Tente novamente." };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {
      // Ignora falha de rede; o estado local já será limpo
    }
    setUser(null);
    window.location.href = "/portal/login";
  };

  const isPremium = (): boolean => user?.userType === "premium";

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout, isPremium }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
