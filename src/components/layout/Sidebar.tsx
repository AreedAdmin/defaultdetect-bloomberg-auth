import { Home, FileText, FolderOpen, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Fill the Form", path: "/form", icon: FileText },
  { name: "Access Reports", path: "/reports", icon: FolderOpen },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[250px] bg-[hsl(217,33%,7%)] border-r border-border">
      {/* Logo */}
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          DefaultDetect
        </h1>
      </div>

      {/* Navigation */}
      <nav className="px-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-5 py-4 rounded-lg transition-all duration-300",
                      "hover:bg-[hsl(217,25%,12%)] text-foreground/80 hover:text-foreground",
                      isActive && "bg-[hsl(217,25%,12%)] text-foreground border-l-[3px] border-accent"
                    )
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
