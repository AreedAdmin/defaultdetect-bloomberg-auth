import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { StatsCards } from "@/components/dashboard/StatsCards";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <HeroSection />
      <StatsCards />
    </DashboardLayout>
  );
};

export default Dashboard;
