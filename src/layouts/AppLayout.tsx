import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;