import { Home, FileText, FolderOpen, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Fill the Form", path: "/form", icon: FileText },
  { name: "Access Reports", path: "/reports", icon: FolderOpen },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();
  const isCollapsed = ["/form", "/reports", "/settings"].includes(location.pathname);

  return (
    <motion.aside
      className="fixed left-0 top-0 h-screen bg-[#0c1222] border-r border-cyan-400/20"
      animate={{ width: isCollapsed ? "80px" : "250px" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Logo */}
      <div className="px-6 py-8 border-b border-cyan-400/20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.h1
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-2xl font-bold text-cyan-400 tracking-tight"
            >
              DD
            </motion.h1>
          ) : (
            <motion.div key="expanded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl font-bold text-cyan-400 tracking-tight">DefaultDetect</h1>
              <p className="text-xs text-cyan-400/60 mt-1">Financial Intelligence</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="px-4 mt-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const navContent = ({ isActive }: { isActive: boolean }) => (
              <>
                {/* Active indicator - left border */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover background effect */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl transition-all duration-300",
                    "bg-cyan-500/5 opacity-0",
                    "group-hover:opacity-100",
                    isActive && "opacity-100 bg-cyan-500/10",
                  )}
                />

                {/* Glow effect on hover */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl blur-xl transition-opacity duration-300 opacity-0",
                    "group-hover:opacity-30 bg-cyan-400/40",
                    isActive && "opacity-20 bg-cyan-400/30",
                  )}
                />

                {/* Icon */}
                <Icon
                  className={cn(
                    "relative z-10 transition-all duration-300 shrink-0",
                    isCollapsed ? "w-12 h-12" : "w-5 h-5",
                    "text-gray-400",
                    "group-hover:text-cyan-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]",
                    isActive && "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]",
                  )}
                />

                {/* Text */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className={cn(
                        "font-medium relative z-10 transition-colors duration-300 overflow-hidden whitespace-nowrap",
                        "text-gray-400",
                        "group-hover:text-cyan-400",
                        isActive && "text-cyan-400",
                      )}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            );

            return (
              <li key={item.path}>
                {isCollapsed ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "relative flex items-center justify-center px-5 py-4 rounded-xl transition-all duration-300",
                            "text-gray-400 group overflow-hidden",
                            isActive && "text-cyan-400",
                          )
                        }
                      >
                        {navContent}
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-[#1e293b] border-cyan-400/30 text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "relative flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300",
                        "text-gray-400 group overflow-hidden",
                        isActive && "text-cyan-400",
                      )
                    }
                  >
                    {navContent}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-4 right-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>
    </motion.aside>
  );
};
