import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DollarSign, 
  CreditCard, 
  Package, 
  Users, 
  TrendingUp, 
  Calendar,
  Activity,
  AlertCircle
} from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface FinancialAnalysisProps {
  skIdCurr: string | null;
}

interface FinancialData {
  credit_income_ratio: number | null;
  annuity_income_ratio: number | null;
  credit_goods_ratio: number | null;
  income_per_person: number | null;
  payment_rate: number | null;
  cnt_payment: number | null;
}

export const FinancialAnalysis = ({ skIdCurr }: FinancialAnalysisProps) => {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinancialData = async () => {
      if (!skIdCurr) {
        setData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data: result, error: fetchError } = await supabase
          .from("loan_staging")
          .select(`
            credit_income_ratio,
            annuity_income_ratio,
            credit_goods_ratio,
            income_per_person,
            payment_rate,
            cnt_payment
          `)
          .eq("sk_id_curr", parseInt(skIdCurr))
          .limit(1)
          .maybeSingle();

        if (fetchError) throw fetchError;
        setData(result);
      } catch (err) {
        console.error("Error fetching financial data:", err);
        setError("Failed to load financial analysis data");
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, [skIdCurr]);

  const getRiskLevel = (value: number | null, metric: string) => {
    if (value === null) return { level: "unknown", color: "text-gray-400", bgColor: "bg-gray-400" };

    switch (metric) {
      case "credit_income_ratio":
        if (value < 1) return { level: "Excellent", color: "text-green-400", bgColor: "bg-green-400" };
        if (value < 2) return { level: "Moderate", color: "text-yellow-400", bgColor: "bg-yellow-400" };
        if (value < 3) return { level: "High", color: "text-orange-400", bgColor: "bg-orange-400" };
        return { level: "Critical", color: "text-red-400", bgColor: "bg-red-400" };

      case "annuity_income_ratio":
        const percent = value * 100;
        if (percent < 20) return { level: "Affordable", color: "text-green-400", bgColor: "bg-green-400" };
        if (percent < 35) return { level: "Moderate", color: "text-yellow-400", bgColor: "bg-yellow-400" };
        if (percent < 50) return { level: "High Burden", color: "text-orange-400", bgColor: "bg-orange-400" };
        return { level: "Excessive", color: "text-red-400", bgColor: "bg-red-400" };

      case "credit_goods_ratio":
        if (Math.abs(value - 1) < 0.05) return { level: "Perfect", color: "text-green-400", bgColor: "bg-green-400" };
        if (value < 1) return { level: "Under-financed", color: "text-blue-400", bgColor: "bg-blue-400" };
        return { level: "Over-financed", color: "text-yellow-400", bgColor: "bg-yellow-400" };

      case "payment_rate":
        const rate = value * 100;
        if (rate < 2) return { level: "Manageable", color: "text-green-400", bgColor: "bg-green-400" };
        if (rate < 4) return { level: "Moderate", color: "text-yellow-400", bgColor: "bg-yellow-400" };
        if (rate < 6) return { level: "Aggressive", color: "text-orange-400", bgColor: "bg-orange-400" };
        return { level: "Very Aggressive", color: "text-red-400", bgColor: "bg-red-400" };

      default:
        return { level: "Normal", color: "text-blue-400", bgColor: "bg-blue-400" };
    }
  };

  const calculateHealthScore = (data: FinancialData | null): number => {
    if (!data) return 0;

    let score = 0;
    let weights = 0;

    // Credit-to-Income ratio (30%)
    if (data.credit_income_ratio !== null) {
      const cir = data.credit_income_ratio;
      if (cir < 1) score += 30;
      else if (cir < 2) score += 20;
      else if (cir < 3) score += 10;
      weights += 30;
    }

    // Annuity-to-Income ratio (30%)
    if (data.annuity_income_ratio !== null) {
      const air = data.annuity_income_ratio * 100;
      if (air < 20) score += 30;
      else if (air < 35) score += 20;
      else if (air < 50) score += 10;
      weights += 30;
    }

    // Payment Rate (20%)
    if (data.payment_rate !== null) {
      const pr = data.payment_rate * 100;
      if (pr < 2) score += 20;
      else if (pr < 4) score += 15;
      else if (pr < 6) score += 8;
      weights += 20;
    }

    // Payments Made (20%) - assume higher is better
    if (data.cnt_payment !== null) {
      if (data.cnt_payment > 12) score += 20;
      else if (data.cnt_payment > 6) score += 15;
      else if (data.cnt_payment > 0) score += 10;
      weights += 20;
    }

    return weights > 0 ? Math.round((score / weights) * 100) : 0;
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return "—";
    return new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const healthScore = calculateHealthScore(data);
  const healthColor = healthScore >= 70 ? "text-green-400" : healthScore >= 40 ? "text-yellow-400" : "text-red-400";

  if (loading) {
    return (
      <Card className="bg-[#0b1220]/50 border-blue-400/20">
        <CardHeader>
          <Skeleton className="h-8 w-64" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="text-red-200">{error}</p>
        </div>
      )}

      <Card className="bg-[#0b1220]/50 border-blue-400/20 hover:border-blue-400/30 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Financial Analysis
          </CardTitle>
          {!skIdCurr && (
            <p className="text-blue-200/60 text-sm">
              Enter an SK_ID_CURR above to view detailed financial metrics
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Credit-to-Income Ratio */}
            <div className="bg-[#0a1222]/50 border border-blue-400/10 rounded-lg p-5 hover:border-blue-400/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-200/70">Credit-to-Income Ratio</h3>
                  <p className="text-2xl font-bold text-white">
                    {data?.credit_income_ratio !== null && data?.credit_income_ratio !== undefined
                      ? `${data.credit_income_ratio.toFixed(2)}:1` 
                      : "—"}
                  </p>
                </div>
              </div>
              <Progress 
                value={data?.credit_income_ratio ? Math.min((data.credit_income_ratio / 4) * 100, 100) : 0} 
                className="h-3 mb-2"
              />
              <p className={`text-sm font-medium ${getRiskLevel(data?.credit_income_ratio ?? null, "credit_income_ratio").color}`}>
                {getRiskLevel(data?.credit_income_ratio ?? null, "credit_income_ratio").level}
              </p>
            </div>

            {/* Annuity-to-Income Ratio */}
            <div className="bg-[#0a1222]/50 border border-blue-400/10 rounded-lg p-5 hover:border-blue-400/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <CreditCard className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-200/70">Annuity-to-Income Ratio</h3>
                  <p className="text-2xl font-bold text-white">
                    {data?.annuity_income_ratio !== null && data?.annuity_income_ratio !== undefined
                      ? `${(data.annuity_income_ratio * 100).toFixed(1)}%` 
                      : "—"}
                  </p>
                </div>
              </div>
              <div className="h-24 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="60%" 
                    outerRadius="90%" 
                    barSize={10}
                    data={[{ 
                      value: data?.annuity_income_ratio ? Math.min(data.annuity_income_ratio * 100, 100) : 0,
                      fill: data?.annuity_income_ratio ? getRiskLevel(data.annuity_income_ratio, "annuity_income_ratio").color.replace('text-', '') : 'gray'
                    }]}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar
                      background
                      dataKey="value"
                      fill="#3b82f6"
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <p className={`text-sm font-medium text-center ${getRiskLevel(data?.annuity_income_ratio ?? null, "annuity_income_ratio").color}`}>
                {getRiskLevel(data?.annuity_income_ratio ?? null, "annuity_income_ratio").level}
              </p>
            </div>

            {/* Credit-to-Goods Ratio */}
            <div className="bg-[#0a1222]/50 border border-blue-400/10 rounded-lg p-5 hover:border-blue-400/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Package className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-200/70">Credit-to-Goods Ratio</h3>
                  <p className="text-2xl font-bold text-white">
                    {data?.credit_goods_ratio !== null && data?.credit_goods_ratio !== undefined
                      ? data.credit_goods_ratio.toFixed(2) 
                      : "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-3 bg-blue-400/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getRiskLevel(data?.credit_goods_ratio ?? null, "credit_goods_ratio").bgColor} transition-all`}
                    style={{ width: data?.credit_goods_ratio ? `${Math.min(data.credit_goods_ratio * 50, 100)}%` : "0%" }}
                  />
                </div>
                <div className={`w-3 h-3 rounded-full ${getRiskLevel(data?.credit_goods_ratio ?? null, "credit_goods_ratio").bgColor}`} />
              </div>
              <p className={`text-sm font-medium ${getRiskLevel(data?.credit_goods_ratio ?? null, "credit_goods_ratio").color}`}>
                {getRiskLevel(data?.credit_goods_ratio ?? null, "credit_goods_ratio").level}
              </p>
            </div>

            {/* Income Per Person */}
            <div className="bg-[#0a1222]/50 border border-blue-400/10 rounded-lg p-5 hover:border-blue-400/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-200/70">Income Per Person</h3>
                  <p className="text-2xl font-bold text-white">
                    ₽{formatCurrency(data?.income_per_person ?? null)}
                  </p>
                </div>
              </div>
              <div className="text-center py-4">
                <p className="text-blue-200/60 text-sm">
                  {data?.income_per_person ? `~$${Math.round(data.income_per_person / 75)} USD` : "No data"}
                </p>
              </div>
              <p className="text-sm font-medium text-blue-400">per family member</p>
            </div>

            {/* Payment Rate */}
            <div className="bg-[#0a1222]/50 border border-blue-400/10 rounded-lg p-5 hover:border-blue-400/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-200/70">Payment Rate</h3>
                  <p className="text-2xl font-bold text-white">
                    {data?.payment_rate !== null && data?.payment_rate !== undefined
                      ? `${(data.payment_rate * 100).toFixed(2)}%` 
                      : "—"}
                  </p>
                </div>
              </div>
              <div className="h-24 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { value: data?.payment_rate ? data.payment_rate * 100 : 0 },
                        { value: data?.payment_rate ? 100 - (data.payment_rate * 100) : 100 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell fill={getRiskLevel(data?.payment_rate ?? null, "payment_rate").bgColor.replace('bg-', '#')} />
                      <Cell fill="#1e293b" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className={`text-sm font-medium text-center ${getRiskLevel(data?.payment_rate ?? null, "payment_rate").color}`}>
                {getRiskLevel(data?.payment_rate ?? null, "payment_rate").level}
              </p>
            </div>

            {/* Payments Made */}
            <div className="bg-[#0a1222]/50 border border-blue-400/10 rounded-lg p-5 hover:border-blue-400/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-200/70">Payments Made</h3>
                  <p className="text-2xl font-bold text-white">
                    {data?.cnt_payment ?? "—"}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`flex-1 h-2 rounded ${
                      data?.cnt_payment && i < data.cnt_payment 
                        ? "bg-blue-400" 
                        : "bg-blue-400/10"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-blue-400">payment installments</p>
            </div>
          </div>

          {/* Financial Health Score */}
          <div className="mt-8 bg-gradient-to-br from-[#0a1222]/80 to-[#0b1528]/80 border border-blue-400/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Activity className="h-8 w-8 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Financial Health Score</h3>
                  <p className="text-blue-200/60 text-sm">
                    Overall assessment based on key financial ratios
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-5xl font-bold ${healthColor}`}>
                  {skIdCurr && data ? healthScore : "—"}
                </p>
                <p className="text-blue-200/70 text-sm mt-1">out of 100</p>
              </div>
            </div>
            {skIdCurr && data && (
              <div className="mt-4">
                <Progress value={healthScore} className="h-3" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
