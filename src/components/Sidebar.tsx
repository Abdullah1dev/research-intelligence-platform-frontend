import { NavLink } from "react-router-dom";

function Sidebar() {
  const navItems = [
    {
      label: "Dashboard",
      path: "/",
    },
    {
      label: "Papers",
      path: "/papers",
    },
    {
      label: "AI Assistant",
      path: "/assistant",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950">
      {/* Brand */}
      <div className="border-b border-slate-800 px-6 py-5">
        <h1 className="text-lg font-semibold text-white">
          Research Intelligence
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Research workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <p className="px-3 text-xs font-medium uppercase tracking-wider text-slate-500">
          Workspace
        </p>

        <div className="mt-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-800 p-4">
        <div className="rounded-lg px-3 py-2">
          <p className="text-sm font-medium text-white">
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