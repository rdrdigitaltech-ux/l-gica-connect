import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  Crown,
  UserPlus,
} from "lucide-react";
import PremiumBadge from "./PremiumBadge";

const navStyle = {
  background:
    "linear-gradient(145deg, rgba(15, 17, 21, 0.95) 0%, rgba(12, 14, 17, 0.95) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
};

const baseLink =
  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors";
const activeLink = "bg-[#FF4757]/20 text-[#FF4757]";
const inactiveLink = "text-gray-400 hover:bg-white/5 hover:text-gray-200";

const mobileLinkBase =
  "flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium transition-colors";
const mobileLinkActive = "text-[#FF4757]";
const mobileLinkInactive = "text-gray-500 hover:text-gray-300";

export default function PortalSidebar() {
  return (
    <>
      {/* Sidebar — visível apenas em md+ */}
      <aside className="hidden w-56 shrink-0 border-r py-6 md:block" style={navStyle}>
        <nav className="flex flex-col gap-1 px-3">
          <NavLink
            to="/portal/dashboard"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </NavLink>
          <NavLink
            to="/portal/base-conhecimento"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <BookOpen className="h-5 w-5" />
            Base de Conhecimento
          </NavLink>
          <NavLink
            to="/portal/treinamentos"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <Video className="h-5 w-5" />
            Treinamentos
          </NavLink>
          <NavLink
            to="/portal/treinamentos-premium"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <Crown className="h-5 w-5" />
            Treinamentos Premium
            <PremiumBadge />
          </NavLink>
          <NavLink
            to="/portal/solicitar-acesso"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <UserPlus className="h-5 w-5" />
            Solicitar Acesso
          </NavLink>
        </nav>
      </aside>

      {/* Barra de navegação inferior — visível apenas em mobile */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex border-t md:hidden"
        style={{
          background:
            "linear-gradient(145deg, rgba(10, 12, 16, 0.98) 0%, rgba(12, 14, 17, 0.98) 100%)",
          borderColor: "rgba(255, 71, 87, 0.2)",
        }}
      >
        <NavLink
          to="/portal/dashboard"
          className={({ isActive }) =>
            `${mobileLinkBase} ${isActive ? mobileLinkActive : mobileLinkInactive}`
          }
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/portal/base-conhecimento"
          className={({ isActive }) =>
            `${mobileLinkBase} ${isActive ? mobileLinkActive : mobileLinkInactive}`
          }
        >
          <BookOpen className="h-5 w-5" />
          <span>Artigos</span>
        </NavLink>
        <NavLink
          to="/portal/treinamentos"
          className={({ isActive }) =>
            `${mobileLinkBase} ${isActive ? mobileLinkActive : mobileLinkInactive}`
          }
        >
          <Video className="h-5 w-5" />
          <span>Treinos</span>
        </NavLink>
        <NavLink
          to="/portal/treinamentos-premium"
          className={({ isActive }) =>
            `${mobileLinkBase} ${isActive ? mobileLinkActive : mobileLinkInactive}`
          }
        >
          <Crown className="h-5 w-5" />
          <span>Premium</span>
        </NavLink>
        <NavLink
          to="/portal/solicitar-acesso"
          className={({ isActive }) =>
            `${mobileLinkBase} ${isActive ? mobileLinkActive : mobileLinkInactive}`
          }
        >
          <UserPlus className="h-5 w-5" />
          <span>Acesso</span>
        </NavLink>
      </nav>

    </>
  );
}
