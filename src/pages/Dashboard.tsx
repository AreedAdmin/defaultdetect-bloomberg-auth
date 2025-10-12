import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DefaultedApplicationsTable } from "@/components/dashboard/DefaultedApplicationsTable";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <HeroSection />
      <StatsCards />
      <div className="mt-8">
        <DefaultedApplicationsTable />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
