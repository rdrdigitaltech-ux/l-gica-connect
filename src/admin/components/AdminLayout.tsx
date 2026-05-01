import { useState } from "react";
import { Link, useLocation, Outlet, Navigate } from "react-router-dom";
import {
  LayoutGrid,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

const navItems = [
  { label: "Editor de Seções", href: "/admin/editor", icon: LayoutGrid },
];

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAdminAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location.pathname === href;
    if (href === "/admin/editor") {
      return location.pathname.startsWith("/admin/editor");
    }
    return location.pathname.startsWith(href);
  };

  const Sidebar = () => (
    <aside className="relative flex h-full w-64 flex-col overflow-hidden border-r border-gray-800/40 bg-gray-950">
      {/* Red ambient light from logo area */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-52"
        style={{
          background:
            "radial-gradient(ellipse at 38% -15%, rgba(220,38,38,0.16) 0%, transparent 68%)",
        }}
      />

      {/* Brand */}
      <div className="relative flex flex-col items-center border-b border-gray-800/40 px-6 py-5">
        <img
          src="/img/logorodape.webp"
          alt="Lógica Informática"
          className="h-8 w-auto"
          style={{
            filter: "drop-shadow(0 0 10px rgba(220,38,38,0.5))",
          }}
        />
        <p className="mt-2 text-xs text-gray-600">Painel Administrativo</p>
      </div>

      <nav className="relative flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
              isActive(item.href, item.exact)
                ? "bg-red-600/10 text-red-400 ring-1 ring-red-600/20"
                : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
            }`}
            style={
              isActive(item.href, item.exact)
                ? { boxShadow: "0 0 14px rgba(220,38,38,0.07)" }
                : {}
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
            {isActive(item.href, item.exact) && (
              <ChevronRight className="ml-auto h-3.5 w-3.5 text-red-400/70" />
            )}
          </Link>
        ))}
      </nav>

      <div className="relative border-t border-gray-800/40 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-white/[0.04] hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#090909] text-white">
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 shadow-2xl shadow-black/80">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        {/* Top bar */}
        <header className="relative sticky top-0 z-40 flex h-14 items-center gap-4 bg-[#090909]/90 px-4 backdrop-blur-md lg:px-6">
          {/* Gradient bottom border — red reflection from sidebar */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(220,38,38,0.18) 0%, rgba(55,65,81,0.4) 35%, rgba(55,65,81,0.2) 100%)",
            }}
          />

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-gray-600 transition hover:bg-white/[0.04] hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">
              {navItems.find((n) => isActive(n.href, n.exact))?.label ?? "Admin"}
            </p>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-800/70 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-gray-700 hover:text-gray-300"
          >
            Ver site →
          </a>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
