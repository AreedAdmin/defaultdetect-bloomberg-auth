import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Smartphone,
  Phone,
  Mail,
  Briefcase,
  Building2,
  PhoneCall,
  Clock,
  Shield,
  BarChart3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface ContactAnalysisProps {
  skIdCurr: string | null;
}

interface ContactData {
  flag_mobil: number | null;
  flag_emp_phone: number | null;
  flag_work_phone: number | null;
  flag_cont_mobile: number | null;
  flag_phone: number | null;
  flag_email: number | null;
  has_work_contact: number | null;
  num_active_contacts: number | null;
  days_last_phone_change: number | null;
  phone_change_years_ago: number | null;
}

export const ContactAnalysis = ({ skIdCurr }: ContactAnalysisProps) => {
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!skIdCurr) {
        setData(null);
        return;
      }

      setLoading(true);
      try {
        const { data: result, error } = await supabase
          .from("loan_staging")
          .select(`
            flag_mobil,
            flag_emp_phone,
            flag_work_phone,
            flag_cont_mobile,
            flag_phone,
            flag_email,
            has_work_contact,
            num_active_contacts,
            days_last_phone_change,
            phone_change_years_ago
          `)
          .eq("sk_id_curr", parseInt(skIdCurr))
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        setData(result);
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [skIdCurr]);

  const calculateContactScore = (data: ContactData | null): number => {
    if (!data) return 0;
    const total = (data.flag_mobil || 0) + (data.flag_emp_phone || 0) + 
                  (data.flag_work_phone || 0) + (data.flag_phone || 0) + 
                  (data.flag_email || 0) + (data.flag_cont_mobile || 0);
    return Math.round((total / 6) * 100);
  };

  const getPhoneStabilityLevel = (yearsAgo: number | null): { level: string; color: string; bgColor: string } => {
    if (yearsAgo === null || yearsAgo === undefined) return { level: "Unknown", color: "text-gray-400", bgColor: "bg-gray-500/20" };
    if (yearsAgo >= 3) return { level: "Excellent", color: "text-green-400", bgColor: "bg-green-500/20" };
    if (yearsAgo >= 1) return { level: "Good", color: "text-yellow-400", bgColor: "bg-yellow-500/20" };
    if (yearsAgo >= 0.5) return { level: "Fair", color: "text-orange-400", bgColor: "bg-orange-500/20" };
    return { level: "Poor", color: "text-red-400", bgColor: "bg-red-500/20" };
  };

  const calculateContactabilityRisk = (data: ContactData | null): { score: number; level: string; color: string } => {
    if (!data) return { score: 0, level: "High Risk", color: "text-red-400" };
    
    const coverageScore = calculateContactScore(data) * 0.4;
    const stabilityScore = (data.phone_change_years_ago && data.phone_change_years_ago >= 1 ? 100 : 
                           data.phone_change_years_ago && data.phone_change_years_ago >= 0.5 ? 50 : 0) * 0.3;
    const workScore = (data.has_work_contact === 1 ? 100 : 0) * 0.2;
    const digitalScore = (data.flag_email === 1 ? 100 : 0) * 0.1;
    
    const totalScore = Math.round(coverageScore + stabilityScore + workScore + digitalScore);
    
    if (totalScore >= 80) return { score: totalScore, level: "Low Risk", color: "text-green-400" };
    if (totalScore >= 50) return { score: totalScore, level: "Medium Risk", color: "text-yellow-400" };
    return { score: totalScore, level: "High Risk", color: "text-red-400" };
  };

  const getContactDiversityBreakdown = (data: ContactData | null) => {
    if (!data) return { personal: 0, professional: 0, digital: 0, verified: 0 };
    
    const personal = ((data.flag_mobil || 0) + (data.flag_phone || 0)) / 2;
    const professional = ((data.flag_work_phone || 0) + (data.flag_emp_phone || 0)) / 2;
    const digital = data.flag_email || 0;
    const verified = data.flag_cont_mobile || 0;
    
    const total = personal + professional + digital + verified || 1;
    
    return {
      personal: Math.round((personal / total) * 100),
      professional: Math.round((professional / total) * 100),
      digital: Math.round((digital / total) * 100),
      verified: Math.round((verified / total) * 100),
    };
  };

  const contactScore = calculateContactScore(data);
  const scoreColor = contactScore >= 67 ? "text-green-400" : contactScore >= 34 ? "text-yellow-400" : "text-red-400";
  const scoreBgColor = contactScore >= 67 ? "bg-green-500/20" : contactScore >= 34 ? "bg-yellow-500/20" : "bg-red-500/20";
  const stabilityInfo = getPhoneStabilityLevel(data?.phone_change_years_ago || null);
  const riskInfo = calculateContactabilityRisk(data);
  const diversity = getContactDiversityBreakdown(data);

  const contactChannels = [
    {
      name: "Mobile Phone",
      icon: Smartphone,
      available: data?.flag_mobil === 1,
      badge: data?.flag_cont_mobile === 1 ? "Contactable" : null,
    },
    {
      name: "Home Phone",
      icon: Phone,
      available: data?.flag_phone === 1,
      badge: "Landline",
    },
    {
      name: "Work Phone",
      icon: Briefcase,
      available: data?.flag_work_phone === 1,
      badge: data?.has_work_contact === 1 ? "Verified" : null,
    },
    {
      name: "Employer Phone",
      icon: Building2,
      available: data?.flag_emp_phone === 1,
      badge: "Company",
    },
    {
      name: "Email",
      icon: Mail,
      available: data?.flag_email === 1,
      badge: "Digital",
    },
    {
      name: "Mobile Reachability",
      icon: PhoneCall,
      available: data?.flag_cont_mobile === 1,
      badge: data?.flag_cont_mobile === 1 ? "Direct Access" : null,
    },
  ];

  const availableCount = contactChannels.filter(c => c.available).length;

  if (!skIdCurr) {
    return (
      <Card className="bg-[#0b1220]/50 border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Contact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-200/50 text-center py-8">
            Enter an SK_ID_CURR above to view contact analysis
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="bg-[#0b1220]/50 border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Contact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-48 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-32 w-full" />)}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0b1220]/50 border-blue-400/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
          Contact Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Contact Coverage Overview */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-blue-900/30"
              />
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${contactScore * 5.03} 503`}
                className={scoreColor}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Smartphone className={`h-8 w-8 mb-2 ${scoreColor}`} />
              <span className={`text-4xl font-bold ${scoreColor}`}>{contactScore}%</span>
              <span className="text-sm text-blue-200/70">Contact Score</span>
            </div>
          </div>
          <p className="text-blue-200/70 text-center">
            {availableCount} out of 6 contact methods available
          </p>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-blue-400/30">
              {data?.num_active_contacts || 0} Active Contacts
            </Badge>
            {data?.has_work_contact === 1 && (
              <Badge variant="outline" className="border-green-400/30 text-green-400">
                Work Contact ✓
              </Badge>
            )}
          </div>
        </div>

        {/* Contact Channel Details Grid */}
        <div>
          <h3 className="text-lg font-semibold text-blue-200 mb-4">Contact Channels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactChannels.map((channel, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  channel.available
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-red-500/30 bg-red-500/5"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <channel.icon
                    className={`h-6 w-6 ${channel.available ? "text-green-400" : "text-red-400"}`}
                  />
                  {channel.available ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <h4 className="text-sm font-medium text-white mb-1">{channel.name}</h4>
                <p className={`text-xs ${channel.available ? "text-green-400" : "text-red-400"}`}>
                  {channel.available ? "Available" : "Not Available"}
                </p>
                {channel.badge && channel.available && (
                  <Badge variant="outline" className="mt-2 text-xs border-blue-400/30">
                    {channel.badge}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Quality Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Phone Stability Timeline */}
          <div className="p-6 rounded-lg bg-[#0a1222]/50 border border-blue-400/20">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-sky-400" />
              <h3 className="text-lg font-semibold text-blue-200">Phone Stability</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-blue-200/70 mb-2">Last phone change</p>
                <p className="text-2xl font-bold text-white">
                  {data?.phone_change_years_ago !== null && data?.phone_change_years_ago !== undefined
                    ? `${data.phone_change_years_ago.toFixed(1)} years ago`
                    : "—"}
                </p>
              </div>
              <div className="relative pt-2">
                <div className="h-3 bg-blue-900/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stabilityInfo.bgColor} transition-all duration-500`}
                    style={{
                      width: `${Math.min(((data?.phone_change_years_ago || 0) / 5) * 100, 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-blue-200/50">
                  <span>0yr</span>
                  <span>1yr</span>
                  <span>3yr</span>
                  <span>5yr+</span>
                </div>
              </div>
              <Badge variant="outline" className={`${stabilityInfo.color} border-current`}>
                Stability: {stabilityInfo.level}
              </Badge>
            </div>
          </div>

          {/* Contact Diversity Score */}
          <div className="p-6 rounded-lg bg-[#0a1222]/50 border border-blue-400/20">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-sky-400" />
              <h3 className="text-lg font-semibold text-blue-200">Contact Diversity</h3>
            </div>
            <div className="space-y-4">
              <div className="h-8 flex rounded-full overflow-hidden">
                {diversity.personal > 0 && (
                  <div
                    className="bg-blue-500"
                    style={{ width: `${diversity.personal}%` }}
                    title={`Personal: ${diversity.personal}%`}
                  />
                )}
                {diversity.professional > 0 && (
                  <div
                    className="bg-purple-500"
                    style={{ width: `${diversity.professional}%` }}
                    title={`Professional: ${diversity.professional}%`}
                  />
                )}
                {diversity.digital > 0 && (
                  <div
                    className="bg-green-500"
                    style={{ width: `${diversity.digital}%` }}
                    title={`Digital: ${diversity.digital}%`}
                  />
                )}
                {diversity.verified > 0 && (
                  <div
                    className="bg-yellow-500"
                    style={{ width: `${diversity.verified}%` }}
                    title={`Verified: ${diversity.verified}%`}
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span className="text-blue-200/70">Personal {diversity.personal}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded" />
                  <span className="text-blue-200/70">Professional {diversity.professional}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span className="text-blue-200/70">Digital {diversity.digital}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded" />
                  <span className="text-blue-200/70">Verified {diversity.verified}%</span>
                </div>
              </div>
              {availableCount >= 3 && (
                <Badge variant="outline" className="border-green-400/30 text-green-400">
                  Multi-channel Coverage
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Contactability Risk Assessment */}
        <div className="p-6 rounded-lg bg-gradient-to-br from-[#0a1222] to-[#0b1528] border-2 border-blue-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className={`h-8 w-8 ${riskInfo.color}`} />
              <div>
                <h3 className="text-lg font-semibold text-blue-200">Contactability Risk</h3>
                <p className="text-sm text-blue-200/70">Overall reachability assessment</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-white">{riskInfo.score}</p>
              <p className={`text-sm font-semibold ${riskInfo.color}`}>{riskInfo.level}</p>
            </div>
          </div>
          <Progress value={riskInfo.score} className="mt-4" />
        </div>
      </CardContent>
    </Card>
  );
};
