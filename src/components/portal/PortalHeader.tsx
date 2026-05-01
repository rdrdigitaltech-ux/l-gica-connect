import { Link } from "react-router-dom";
import { LogOut, User, Building2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const headerStyle = {
  background:
    "linear-gradient(145deg, rgba(15, 17, 21, 0.98) 0%, rgba(12, 14, 17, 0.98) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
};

export default function PortalHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b" style={headerStyle}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link to="/portal/dashboard" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-[#FF4757]" />
          <span className="text-lg font-bold text-gray-200">Área Restrita</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-sm text-gray-400 sm:flex">
            <User className="h-4 w-4" />
            <span className="text-gray-300">{user?.name}</span>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{
                background: "rgba(255, 71, 87, 0.2)",
                color: "#FF4757",
              }}
            >
              {user?.userType === "premium" ? "Premium" : "Standard"}
            </span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-[#FF4757]"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
