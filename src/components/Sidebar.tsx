import { NavLink } from "react-router-dom";

function Sidebar() {
  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Papers", path: "/papers" },
    { label: "AI Assistant", path: "/assistant" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      {/* Brand */}
      <div className="border-b border-slate-200 px-6 py-5">
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">
          Research Intelligence
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Research workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <div className="mt-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Account */}
      <div className="border-t border-slate-200 p-4">
        <div className="rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-slate-50">
          <p className="text-sm font-medium text-slate-800">
            Account
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Settings & profile
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;