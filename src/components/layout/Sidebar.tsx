import { Home, FileText, FolderOpen, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Fill the Form", path: "/form", icon: FileText },
  { name: "Access Reports", path: "/reports", icon: FolderOpen },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[250px] bg-[#0a0f1e] border-r border-cyan-500/10">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-cyan-500/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
          DefaultDetect
        </h1>
        <p className="text-xs text-gray-400 mt-1">Financial Intelligence</p>
      </div>

      {/* Navigation */}
      <nav className="px-4 mt-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "relative flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300",
                      "text-gray-400 group overflow-hidden",
                      isActive && "text-white",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator - left border */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-400 rounded-r-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* Hover background effect */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-xl transition-all duration-300",
                          "bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0",
                          "group-hover:opacity-100",
                          isActive && "opacity-100 from-cyan-500/10 to-blue-500/10",
                        )}
                      />

                      {/* Glow effect on hover */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-xl blur-xl transition-opacity duration-300 opacity-0",
                          "group-hover:opacity-20 bg-cyan-400/50",
                          isActive && "opacity-10",
                        )}
                      />

                      {/* Icon */}
                      <Icon
                        className={cn(
                          "w-5 h-5 relative z-10 transition-all duration-300",
                          "group-hover:text-cyan-400 group-hover:scale-110",
                          isActive && "text-cyan-400",
                        )}
                      />

                      {/* Text */}
                      <span
                        className={cn(
                          "font-medium relative z-10 transition-colors duration-300",
                          "group-hover:text-white",
                          isActive && "text-white",
                        )}
                      >
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-4 right-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>
    </aside>
  );
};
