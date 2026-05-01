import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipos de usuário
export type UserType = "standard" | "premium";

// Interface do usuário
export interface User {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  company: string;
  userType: UserType;
  registeredAt: string;
}

// Interface do contexto
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (cnpj: string, password: string) => Promise<boolean>;
  logout: () => void;
  isPremium: () => boolean;
}

// Criar contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider do contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há usuário logado ao carregar
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("logica_portal_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Erro ao recuperar usuário:", error);
          localStorage.removeItem("logica_portal_user");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Função de login (MOCK - substituir por API real)
  const login = async (cnpj: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // SIMULAÇÃO DE API (remover quando tiver backend real)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Usuários MOCK para testes
    const mockUsers: Record<string, { password: string; user: User }> = {
      "12345678000199": {
        password: "demo123",
        user: {
          id: "1",
          name: "João Silva",
          email: "joao@empresa.com",
          cnpj: "12.345.678/0001-99",
          company: "Empresa Demo Ltda",
          userType: "standard",
          registeredAt: "2025-01-15",
        },
      },
      "98765432000188": {
        password: "premium123",
        user: {
          id: "2",
          name: "Maria Santos",
          email: "maria@empresapremium.com",
          cnpj: "98.765.432/0001-88",
          company: "Empresa Premium S/A",
          userType: "premium",
          registeredAt: "2024-06-20",
        },
      },
    };

    // Remover pontuação do CNPJ
    const cleanCnpj = cnpj.replace(/\D/g, "");

    // Verificar credenciais
    const mockUser = mockUsers[cleanCnpj];

    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem("logica_portal_user", JSON.stringify(mockUser.user));
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }

    /*
    // SUBSTITUIR POR CHAMADA REAL DE API:
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cnpj, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('logica_portal_user', JSON.stringify(userData));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setIsLoading(false);
      return false;
    }
    */
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("logica_portal_user");
    window.location.href = "/portal/login";
  };

  // Verificar se é usuário premium
  const isPremium = (): boolean => {
    return user?.userType === "premium";
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    isPremium,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
