import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/portal/ProtectedRoute";
import PortalLayout from "@/components/portal/PortalLayout";
import Login from "@/pages/portal/Login";
import SolicitarAcesso from "@/pages/portal/SolicitarAcesso";
import Dashboard from "@/pages/portal/Dashboard";
import BaseConhecimento from "@/pages/portal/BaseConhecimento";
import Treinamentos from "@/pages/portal/Treinamentos";
import TreinamentosPremium from "@/pages/portal/TreinamentosPremium";

/**
 * Rotas da área restrita (/portal/*).
 * Renderize este componente quando pathname começar com /portal,
 * sem Header/Footer do site principal.
 */
export default function PortalRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/portal/dashboard" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="solicitar-acesso" element={<SolicitarAcesso />} />
      <Route
        element={
          <ProtectedRoute>
            <PortalLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="base-conhecimento" element={<BaseConhecimento />} />
        <Route path="treinamentos" element={<Treinamentos />} />
        <Route path="treinamentos-premium" element={<TreinamentosPremium />} />
      </Route>
    </Routes>
  );
}
