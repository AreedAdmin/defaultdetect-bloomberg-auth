import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { SocialCircleDefaultRisk } from "@/components/analytics/SocialCircleDefaultRisk";
import { BasicInformation } from "@/components/analytics/BasicInformation";
import { FinancialAnalysis } from "@/components/analytics/FinancialAnalysis";

const Analytics = () => {
  const [skIdCurr, setSkIdCurr] = useState("");
  const [searchedId, setSearchedId] = useState<string | null>(null);

  const handleSearch = () => {
    if (skIdCurr.trim()) {
      setSearchedId(skIdCurr.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-[#0a1222] to-[#0b1528] text-white">
        <div className="px-6 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-blue-200/70">
              Search by SK_ID_CURR to view detailed analytics and visualizations
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mb-8">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Enter SK_ID_CURR..."
                  value={skIdCurr}
                  onChange={(e) => setSkIdCurr(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 bg-[#0b1220]/50 border-blue-400/20 text-white placeholder:text-blue-200/40 focus:border-blue-400/40 pl-4"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          {/* Results Area */}
          <div className="space-y-6">
            {searchedId && (
              <div className="bg-[#0b1220]/50 border border-blue-400/20 rounded-xl p-4">
                <p className="text-blue-200/70">
                  Displaying analytics for <span className="text-sky-400 font-semibold">{searchedId}</span>
                </p>
              </div>
            )}

            {/* Basic Information */}
            <BasicInformation skIdCurr={searchedId} />

            {/* Financial Analysis */}
            <FinancialAnalysis skIdCurr={searchedId} />

            {/* Social Circle Default Risk Visualization */}
            <SocialCircleDefaultRisk skIdCurr={searchedId} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
