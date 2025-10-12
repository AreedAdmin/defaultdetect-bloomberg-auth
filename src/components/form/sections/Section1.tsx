import { useFormContext } from "@/contexts/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const Section1 = () => {
  const { formData, updateFormData } = useFormContext();
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Section header box with hover effect */}
      <div className="group relative overflow-hidden px-6 py-5 rounded-xl backdrop-blur-xl bg-gradient-to-br from-indigo-600/20 to-indigo-800/5 border border-indigo-400/30 transition-all duration-500 ease-out hover:border-indigo-400/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.4)]">
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.2), transparent 70%)",
          }}
        />

        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-card/30 backdrop-blur-md" />

        {/* Content */}
        <div className="relative">
          <h2 className="text-2xl font-bold text-indigo-400 mb-2">Section 1: Client Identification</h2>
          <p className="text-indigo-300/70 text-sm">Basic identification information</p>
        </div>

        {/* Animated shine effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
            animation: "slideRight 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Form inputs with enhanced hover effects */}
      <div className="space-y-4">
        {/* Client ID */}
        <div
          className="group/input relative"
          onMouseEnter={() => setHoveredInput("SK_ID_CURR")}
          onMouseLeave={() => setHoveredInput(null)}
        >
          <Label
            htmlFor="SK_ID_CURR"
            className="required text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
          >
            Client ID
          </Label>
          <div className="relative mt-2">
            <Input
              id="SK_ID_CURR"
              type="number"
              placeholder="Enter client ID"
              value={formData.SK_ID_CURR || ""}
              onChange={(e) => updateFormData({ SK_ID_CURR: Number(e.target.value) || null })}
              min={1}
              required
              className="transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30"
            />
            {/* Animated border glow on hover */}
            {hoveredInput === "SK_ID_CURR" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>
        </div>

        {/* Previous Application ID */}
        <div
          className="group/input relative"
          onMouseEnter={() => setHoveredInput("SK_ID_PREV")}
          onMouseLeave={() => setHoveredInput(null)}
        >
          <Label
            htmlFor="SK_ID_PREV"
            className="text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
          >
            Previous Application ID
          </Label>
          <div className="relative mt-2">
            <Input
              id="SK_ID_PREV"
              type="number"
              placeholder="Enter previous application ID (optional)"
              value={formData.SK_ID_PREV || ""}
              onChange={(e) => updateFormData({ SK_ID_PREV: Number(e.target.value) || null })}
              min={1}
              className="transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30"
            />
            {hoveredInput === "SK_ID_PREV" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>
        </div>

        {/* Community ID */}
        <div
          className="group/input relative"
          onMouseEnter={() => setHoveredInput("community_id")}
          onMouseLeave={() => setHoveredInput(null)}
        >
          <Label
            htmlFor="community_id"
            className="required text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
          >
            Community ID
          </Label>
          <div className="relative mt-2">
            <Input
              id="community_id"
              type="number"
              placeholder="Enter community ID"
              value={formData.community_id || ""}
              onChange={(e) => updateFormData({ community_id: Number(e.target.value) || null })}
              min={1}
              required
              className="transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30"
            />
            {hoveredInput === "community_id" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes borderGlow {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
