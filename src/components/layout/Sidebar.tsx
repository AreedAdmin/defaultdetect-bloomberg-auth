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

// Thèmes EXACTS alignés sur tes FeatureCards
const THEMES = [
  {
    // Real-time Risk Analysis (sky)
    hoverGrad: "from-sky-500/20 to-sky-800/5",
    glowColor: "rgba(14, 165, 233, 0.4)",
    iconHover: "text-sky-400",
    activeBar: "bg-sky-400",
  },
  {
    // Advanced Analytics (blue)
    hoverGrad: "from-blue-600/20 to-blue-800/5",
    glowColor: "rgba(37, 99, 235, 0.4)",
    iconHover: "text-blue-400",
    activeBar: "bg-blue-400",
  },
  {
    // Secure Platform (indigo)
    hoverGrad: "from-indigo-600/20 to-indigo-800/5",
    glowColor: "rgba(99, 102, 241, 0.4)",
    iconHover: "text-indigo-400",
    activeBar: "bg-indigo-400",
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const isCollapsed = ["/form", "/reports", "/settings"].includes(location.pathname);

  return (
    <motion.aside
      className="
        fixed left-0 top-0 h-screen z-50
        bg-gradient-to-b from-[#0b1220] via-[#0a1222] to-[#0b1528]
        backdrop-blur-md
        border-r border-blue-400/15
      "
      animate={{ width: isCollapsed ? "80px" : "250px" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Logo */}
      <div className="px-6 py-8 border-b border-blue-400/15 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.h1
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent tracking-tight"
            >
              DD
            </motion.h1>
          ) : (
            <motion.div key="expanded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                DefaultDetect
              </h1>
              <p className="text-xs text-blue-200/70 mt-1">Financial Intelligence</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="px-4 mt-6">
        <ul className="space-y-2">
          {navigationItems.map((item, idx) => {
            const Icon = item.icon;
            // Répartition des thèmes : 0=sky, 1=blue, 2=indigo, 3=blue
            const theme = idx === 0 ? THEMES[0] : idx === 1 ? THEMES[1] : idx === 2 ? THEMES[2] : THEMES[1];

            const navContent = ({ isActive }: { isActive: boolean }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={cn("absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full", theme.activeBar)}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Active background */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none",
                    "backdrop-blur-sm border border-white/5",
                    "bg-gradient-to-br",
                    theme.hoverGrad,
                    "opacity-0",
                    isActive && "opacity-100",
                  )}
                />

                {/* Glow doux EXACT (rgba de tes cards) */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 pointer-events-none",
                  )}
                  style={{
                    background: `radial-gradient(140px 90px at 75% 50%, ${theme.glowColor}, transparent 70%)`,
                    opacity: isActive ? 0.6 : undefined,
                  }}
                />

                {/* Icone */}
                <Icon
                  size={22}
                  className={cn(
                    "relative z-10 transition-transform duration-300 shrink-0",
                    "text-blue-200/90",
                    isActive && theme.iconHover,
                    !isCollapsed && "size-5",
                  )}
                />

                {/* Label */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className={cn(
                        "font-medium relative z-10 transition-colors duration-300 overflow-hidden whitespace-nowrap",
                        "text-blue-100/90",
                        isActive && "text-white",
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
                            "relative flex items-center justify-center px-5 py-4 rounded-xl transition-all duration-300 min-h-[64px]",
                            "text-blue-200/80 overflow-hidden",
                            isActive && "text-white",
                          )
                        }
                      >
                        {navContent}
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-[#0b1220] border-blue-400/20 text-blue-100">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "relative flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300",
                        "text-blue-200/80 overflow-hidden",
                        isActive && "text-white",
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
        <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      </div>
    </motion.aside>
  );
};
