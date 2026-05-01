import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { syncFromSupabase } from "@/hooks/useSiteContent";

const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppFloat = lazy(() => import("@/components/WhatsAppFloat"));
import ProtectedRoute from "@/components/portal/ProtectedRoute";
import PortalLayout from "@/components/portal/PortalLayout";

// Lazy loading de todas as páginas
const Index = lazy(() => import("./pages/Index"));
const Sistemas = lazy(() => import("./pages/Sistemas"));
const SistemaVarejo = lazy(() => import("./pages/SistemaVarejo"));
const SistemaGastronomia = lazy(() => import("./pages/SistemaGastronomia"));
const SistemaMultiloja = lazy(() => import("./pages/SistemaMultiloja"));
const SistemaTratamentoPonto = lazy(() => import("./pages/SistemaTratamentoPonto"));
const SistemaOnDesk = lazy(() => import("./pages/SistemaOnDesk"));
const Equipamentos = lazy(() => import("./pages/Equipamentos"));
const EquipamentoBalancas = lazy(() => import("./pages/EquipamentoBalancas"));
const EquipamentoImpressoras = lazy(() => import("./pages/EquipamentoImpressoras"));
const EquipamentoRelogioPonto = lazy(() => import("./pages/EquipamentoRelogioPonto"));
const EquipamentoLeitorCodigo = lazy(() => import("./pages/EquipamentoLeitorCodigo"));
const EquipamentoEmbaladoras = lazy(() => import("./pages/EquipamentoEmbaladoras"));
const EquipamentoComputadores = lazy(() => import("./pages/EquipamentoComputadores"));
const Servicos = lazy(() => import("./pages/Servicos"));
const Contato = lazy(() => import("./pages/Contato"));
const Obrigado = lazy(() => import("./pages/Obrigado"));
const BlogHome = lazy(() => import("./pages/blog/BlogHome"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const BlogCategory = lazy(() => import("./pages/blog/BlogCategory"));
const Login = lazy(() => import("./pages/portal/Login"));
const SolicitarAcesso = lazy(() => import("./pages/portal/SolicitarAcesso"));
const Dashboard = lazy(() => import("./pages/portal/Dashboard"));
const BaseConhecimento = lazy(() => import("./pages/portal/BaseConhecimento"));
const Treinamentos = lazy(() => import("./pages/portal/Treinamentos"));
const TreinamentosPremium = lazy(() => import("./pages/portal/TreinamentosPremium"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin
const AdminLayout = lazy(() => import("./admin/components/AdminLayout"));
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminEditor = lazy(() => import("./admin/pages/AdminEditor"));
const AdminSettings = lazy(() => import("./admin/pages/AdminSettings"));

const PageLoader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#fff",
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        border: "3px solid #e5e7eb",
        borderTop: "3px solid #111827",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isPortal = location.pathname.startsWith("/portal");
  const isAdmin = location.pathname.startsWith("/admin");

  // Sincroniza conteúdo do Supabase para o cache local na inicialização
  useEffect(() => {
    syncFromSupabase();
  }, []);

  return (
    <>
      {!isPortal && !isAdmin && <Header />}
      <main className="min-h-screen" style={{ background: isAdmin ? undefined : "#06080A" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isPortal ? "portal" : location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/sistemas" element={<Sistemas />} />
              <Route path="/sistemas/varejo" element={<SistemaVarejo />} />
              <Route path="/sistemas/gastronomia" element={<SistemaGastronomia />} />
              <Route path="/sistemas/multiloja" element={<SistemaMultiloja />} />
              <Route path="/sistemas/tratamento-ponto" element={<SistemaTratamentoPonto />} />
              <Route path="/sistemas/ondesk" element={<SistemaOnDesk />} />
              <Route path="/equipamentos" element={<Equipamentos />} />
              <Route path="/equipamentos/balancas" element={<EquipamentoBalancas />} />
              <Route path="/equipamentos/impressoras" element={<EquipamentoImpressoras />} />
              <Route path="/equipamentos/relogio-ponto" element={<EquipamentoRelogioPonto />} />
              <Route path="/equipamentos/leitor-codigo" element={<EquipamentoLeitorCodigo />} />
              <Route path="/equipamentos/embaladoras" element={<EquipamentoEmbaladoras />} />
              <Route path="/equipamentos/computadores" element={<EquipamentoComputadores />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/obrigado" element={<Obrigado />} />
              <Route path="/blog" element={<BlogHome />} />
              <Route path="/blog/categoria/:categorySlug" element={<BlogCategory />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="portal" element={<Outlet />}>
                <Route index element={<Navigate to="/portal/dashboard" replace />} />
                <Route path="login" element={<Login />} />
                <Route path="solicitar-acesso" element={<SolicitarAcesso />} />
                <Route element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="base-conhecimento" element={<BaseConhecimento />} />
                  <Route path="treinamentos" element={<Treinamentos />} />
                  <Route path="treinamentos-premium" element={<ProtectedRoute requirePremium><TreinamentosPremium /></ProtectedRoute>} />
                </Route>
              </Route>
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/editor" replace />} />
                <Route path="editor" element={<AdminEditor />} />
                <Route path="conteudo" element={<Navigate to="/admin/editor" replace />} />
                <Route path="configuracoes" element={<AdminSettings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      {!isPortal && !isAdmin && (
        <Suspense fallback={<div>Carregando...</div>}>
          <Footer />
          <WhatsAppFloat />
        </Suspense>
      )}
      {/* Desfoque fixo no rodapé – apenas no site principal */}
      {!isAdmin && !isPortal && (
        <div
          className="pointer-events-none fixed bottom-0 left-0 right-0 z-50"
          style={{
            height: "64px",
            background:
              "linear-gradient(to top, rgba(6, 8, 10, 0.92) 0%, rgba(6, 8, 10, 0.5) 45%, rgba(6, 8, 10, 0.15) 75%, transparent 100%)",
            backdropFilter: "blur(32px) saturate(120%)",
            WebkitBackdropFilter: "blur(32px) saturate(120%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.55) 55%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.55) 55%, black 100%)",
          }}
        />
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <AdminAuthProvider>
            <AppContent />
          </AdminAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
