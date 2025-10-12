import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { User, Users, GraduationCap, Briefcase, Heart, Calendar } from "lucide-react";

interface BasicInfoProps {
  skIdCurr: string | null;
}

interface BasicInfoData {
  age_years: number | null;
  code_gender: string | null;
  cnt_children: number | null;
  name_income_type: string | null;
  name_education_type: string | null;
  name_family_status: string | null;
}

export const BasicInformation = ({ skIdCurr }: BasicInfoProps) => {
  const [data, setData] = useState<BasicInfoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!skIdCurr) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchBasicInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: result, error: fetchError } = await supabase
          .from("loan_staging")
          .select(
            `age_years,
            code_gender,
            cnt_children,
            name_income_type,
            name_education_type,
            name_family_status`
          )
          .eq("sk_id_curr", parseInt(skIdCurr))
          .limit(1)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!result) {
          setError("No basic information found for this SK_ID_CURR");
          setData(null);
        } else {
          setData(result);
        }
      } catch (err) {
        console.error("Error fetching basic information:", err);
        setError("Failed to fetch basic information. Please try again.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBasicInfo();
  }, [skIdCurr]);

  if (loading) {
    return (
      <Card className="bg-[#0b1220]/50 border-blue-400/20 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
        </div>
      </Card>
    );
  }

  const getDisplayValue = (value: any, defaultText: string = "Not specified") => {
    if (!skIdCurr) return "—";
    if (loading) return "Loading...";
    if (error) return "Error";
    return value !== null && value !== undefined ? value : defaultText;
  };

  const formatGender = (gender: string | null) => {
    if (!gender) return "Not specified";
    return gender === "M" ? "Male" : gender === "F" ? "Female" : gender;
  };

  const infoItems = [
    {
      icon: Calendar,
      label: "Age",
      value: data?.age_years ? `${Math.round(data.age_years)} years` : getDisplayValue(null),
      color: "text-sky-400",
    },
    {
      icon: User,
      label: "Gender",
      value: getDisplayValue(data?.code_gender ? formatGender(data.code_gender) : null),
      color: "text-indigo-400",
    },
    {
      icon: Users,
      label: "Children",
      value: getDisplayValue(data?.cnt_children),
      color: "text-blue-400",
    },
    {
      icon: Briefcase,
      label: "Income Type",
      value: getDisplayValue(data?.name_income_type),
      color: "text-purple-400",
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: getDisplayValue(data?.name_education_type),
      color: "text-cyan-400",
    },
    {
      icon: Heart,
      label: "Family Status",
      value: getDisplayValue(data?.name_family_status),
      color: "text-pink-400",
    },
  ];

  return (
    <Card className="bg-[#0b1220]/50 border-blue-400/20 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
          Basic Information
        </h2>
        <p className="text-blue-200/70 text-sm mt-1">
          Personal and demographic details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-[#0a1222]/50 rounded-lg p-4 border border-blue-400/10 hover:border-blue-400/30 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-[#0b1220]/50 ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-blue-200/60 text-xs mb-1">{item.label}</p>
                  <p className="text-white font-medium text-base truncate" title={item.value}>
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
