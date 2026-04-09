import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePremium?: boolean;
}

export default function ProtectedRoute({
  children,
  requirePremium = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isPremium, isLoading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "#000000" }}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-[#FF4757]" />
          <p className="text-gray-400">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/portal/login" replace />;
  }

  // Se requer premium mas usuário não é premium
  if (requirePremium && !isPremium()) {
    return <Navigate to="/portal/dashboard" replace />;
  }

  // Usuário autenticado e com permissões corretas
  return <>{children}</>;
}
