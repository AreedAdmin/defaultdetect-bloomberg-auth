import { useState } from "react";

export default function Section1() {
  const [formData, setFormData] = useState({
    SK_ID_CURR: null,
    SK_ID_PREV: null,
    community_id: null,
  });
  const [hoveredInput, setHoveredInput] = useState(null);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Form inputs with color gradient */}
        <div className="space-y-4">
          {/* Client ID - Indigo */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("SK_ID_CURR")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="SK_ID_CURR"
              className="required text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Client ID
            </label>
            <div className="relative mt-2">
              <input
                id="SK_ID_CURR"
                type="number"
                placeholder="Enter client ID"
                value={formData.SK_ID_CURR || ""}
                onChange={(e) => updateFormData({ SK_ID_CURR: Number(e.target.value) || null })}
                min={1}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30 border focus:outline-none"
              />
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

          {/* Previous Application ID - Blue */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("SK_ID_PREV")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="SK_ID_PREV"
              className="text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Previous Application ID
            </label>
            <div className="relative mt-2">
              <input
                id="SK_ID_PREV"
                type="number"
                placeholder="Enter previous application ID (optional)"
                value={formData.SK_ID_PREV || ""}
                onChange={(e) => updateFormData({ SK_ID_PREV: Number(e.target.value) || null })}
                min={1}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-blue-400/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 text-blue-100 placeholder:text-blue-300/30 border focus:outline-none"
              />
              {hoveredInput === "SK_ID_PREV" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* Community ID - Sky/Cyan */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("community_id")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="community_id"
              className="required text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Community ID
            </label>
            <div className="relative mt-2">
              <input
                id="community_id"
                type="number"
                placeholder="Enter community ID"
                value={formData.community_id || ""}
                onChange={(e) => updateFormData({ community_id: Number(e.target.value) || null })}
                min={1}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-sky-400/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-400/20 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 text-sky-100 placeholder:text-sky-300/30 border focus:outline-none"
              />
              {hoveredInput === "community_id" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes borderGlow {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
}
