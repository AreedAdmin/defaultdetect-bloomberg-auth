import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { AlertCircle, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface SocialCircleData {
  obs_30_cnt_social_circle: number | null;
  def_30_cnt_social_circle: number | null;
  obs_60_cnt_social_circle: number | null;
  def_60_cnt_social_circle: number | null;
  obs_30_cnt_social_circle_missing: number | null;
  def_30_cnt_social_circle_missing: number | null;
  obs_60_cnt_social_circle_missing: number | null;
  def_60_cnt_social_circle_missing: number | null;
}

interface SocialCircleDefaultRiskProps {
  skIdCurr: string;
}

export const SocialCircleDefaultRisk = ({ skIdCurr }: SocialCircleDefaultRiskProps) => {
  const [data, setData] = useState<SocialCircleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: result, error: fetchError } = await supabase
          .from("loan_staging")
          .select(
            `obs_30_cnt_social_circle,
            def_30_cnt_social_circle,
            obs_60_cnt_social_circle,
            def_60_cnt_social_circle,
            obs_30_cnt_social_circle_missing,
            def_30_cnt_social_circle_missing,
            obs_60_cnt_social_circle_missing,
            def_60_cnt_social_circle_missing`
          )
          .eq("sk_id_curr", parseInt(skIdCurr))
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!result) {
          setError("No data found for this SK_ID_CURR");
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (skIdCurr) {
      fetchData();
    }
  }, [skIdCurr]);

  const calculateRate = (defaults: number | null, observations: number | null): number => {
    if (!observations || observations === 0 || !defaults) return 0;
    return (defaults / observations) * 100;
  };

  const getRiskLevel = (rate: number): { level: string; color: string; icon: JSX.Element } => {
    if (rate === 0) return { level: "No Risk", color: "#10b981", icon: <Minus className="h-4 w-4" /> };
    if (rate <= 10) return { level: "Low Risk", color: "#10b981", icon: <TrendingDown className="h-4 w-4" /> };
    if (rate <= 25) return { level: "Moderate Risk", color: "#f59e0b", icon: <Minus className="h-4 w-4" /> };
    if (rate <= 50) return { level: "High Risk", color: "#f97316", icon: <TrendingUp className="h-4 w-4" /> };
    return { level: "Critical Risk", color: "#ef4444", icon: <AlertCircle className="h-4 w-4" /> };
  };

  if (loading) {
    return (
      <Card className="p-6 bg-[#0b1220]/50 border-blue-400/20">
        <Skeleton className="h-8 w-64 mb-4 bg-blue-400/10" />
        <Skeleton className="h-[350px] w-full bg-blue-400/10" />
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="p-6 bg-[#0b1220]/50 border-blue-400/20">
        <div className="flex items-center gap-2 text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p>{error || "No data available"}</p>
        </div>
      </Card>
    );
  }

  const rate30 = calculateRate(data.def_30_cnt_social_circle, data.obs_30_cnt_social_circle);
  const rate60 = calculateRate(data.def_60_cnt_social_circle, data.obs_60_cnt_social_circle);
  
  const risk30 = getRiskLevel(rate30);
  const risk60 = getRiskLevel(rate60);

  const isIncreasing = rate60 > rate30;
  const trend = isIncreasing ? "Increasing" : rate60 < rate30 ? "Decreasing" : "Stable";

  const chartData = [
    {
      period: "30 Days",
      observations: data.obs_30_cnt_social_circle || 0,
      defaults: data.def_30_cnt_social_circle || 0,
      rate: rate30,
    },
    {
      period: "60 Days",
      observations: data.obs_60_cnt_social_circle || 0,
      defaults: data.def_60_cnt_social_circle || 0,
      rate: rate60,
    },
  ];

  const hasData = chartData.some((d) => d.observations > 0 || d.defaults > 0);

  if (!hasData) {
    return (
      <Card className="p-6 bg-[#0b1220]/50 border-blue-400/20">
        <h3 className="text-xl font-semibold text-white mb-2">Social Circle Default Risk</h3>
        <p className="text-blue-200/70 text-sm mb-6">Network exposure to defaulted loans</p>
        <div className="flex items-center justify-center h-[300px] text-blue-200/50">
          <p>No defaults observed in social circle</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-[#0b1220]/50 border-blue-400/20">
      <h3 className="text-xl font-semibold text-white mb-2">Social Circle Default Risk</h3>
      <p className="text-blue-200/70 text-sm mb-6">Network exposure to defaulted loans</p>

      {/* Summary Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0b1220]/80 rounded-lg p-4 border border-blue-400/10">
          <div className="flex items-center gap-2 mb-1">
            {risk30.icon}
            <p className="text-xs text-blue-200/70">30-Day Rate</p>
          </div>
          <p className="text-2xl font-bold text-white">{rate30.toFixed(1)}%</p>
          <p className="text-xs mt-1" style={{ color: risk30.color }}>
            {risk30.level}
          </p>
        </div>

        <div className="bg-[#0b1220]/80 rounded-lg p-4 border border-blue-400/10">
          <div className="flex items-center gap-2 mb-1">
            {risk60.icon}
            <p className="text-xs text-blue-200/70">60-Day Rate</p>
          </div>
          <p className="text-2xl font-bold text-white">{rate60.toFixed(1)}%</p>
          <p className="text-xs mt-1" style={{ color: risk60.color }}>
            {risk60.level}
          </p>
        </div>

        <div className="bg-[#0b1220]/80 rounded-lg p-4 border border-blue-400/10">
          <div className="flex items-center gap-2 mb-1">
            {isIncreasing ? (
              <TrendingUp className="h-4 w-4 text-orange-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-400" />
            )}
            <p className="text-xs text-blue-200/70">Risk Trend</p>
          </div>
          <p className="text-2xl font-bold text-white">{trend}</p>
          <p
            className="text-xs mt-1"
            style={{ color: isIncreasing ? "#f97316" : "#10b981" }}
          >
            {isIncreasing ? "↑" : "↓"} {Math.abs(rate60 - rate30).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" opacity={0.1} />
          <XAxis 
            dataKey="period" 
            stroke="#93c5fd" 
            tick={{ fill: "#93c5fd" }}
          />
          <YAxis stroke="#93c5fd" tick={{ fill: "#93c5fd" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0b1220",
              border: "1px solid rgba(96, 165, 250, 0.2)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#93c5fd" }}
            itemStyle={{ color: "#ffffff" }}
            formatter={(value: number, name: string) => {
              if (name === "observations") return [value, "Observations"];
              if (name === "defaults") return [value, "Defaults"];
              return [value, name];
            }}
          />
          <Legend 
            wrapperStyle={{ color: "#93c5fd" }}
            formatter={(value) => {
              if (value === "observations") return "Observations";
              if (value === "defaults") return "Defaults";
              return value;
            }}
          />
          <Bar dataKey="observations" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="defaults" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Data Quality Warning */}
      {(data.obs_30_cnt_social_circle_missing === 1 ||
        data.def_30_cnt_social_circle_missing === 1 ||
        data.obs_60_cnt_social_circle_missing === 1 ||
        data.def_60_cnt_social_circle_missing === 1) && (
        <div className="mt-4 flex items-start gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <AlertCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-orange-200">
            Some social circle data is missing or incomplete for this application
          </p>
        </div>
      )}
    </Card>
  );
};
