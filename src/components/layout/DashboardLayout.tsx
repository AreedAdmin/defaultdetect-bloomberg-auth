import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const isCollapsed = ["/form", "/reports", "/analytics", "/settings"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <motion.main 
        className="min-h-screen"
        animate={{ marginLeft: isCollapsed ? "80px" : "250px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.main>
    </div>
  );
};
