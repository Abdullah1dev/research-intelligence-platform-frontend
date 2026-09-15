import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <main className="min-h-screen lg:ml-64">
        <div className="mx-auto w-full max-w-[1600px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;