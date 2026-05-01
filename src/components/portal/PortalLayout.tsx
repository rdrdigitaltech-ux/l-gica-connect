import { Outlet } from "react-router-dom";
import PortalHeader from "./PortalHeader";
import PortalSidebar from "./PortalSidebar";

export default function PortalLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#0A0C10" }}>
      <PortalHeader />
      <div className="flex">
        <PortalSidebar />
        <main className="min-h-[calc(100vh-4rem)] min-w-0 flex-1 overflow-auto pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
