import { useState } from "react";

export default function Section6() {
  const [formData, setFormData] = useState({
    REGION_POPULATION_RELATIVE: false,
    REGION_RATING_CLIENT: 1,
    REGION_RATING_CLIENT_W_CITY: 1,
    REG_REGION_NOT_LIVE_REGION: false,
    REG_REGION_NOT_WORK_REGION: false,
    LIVE_REGION_NOT_WORK_REGION: false,
    REG_CITY_NOT_LIVE_CITY: false,
    REG_CITY_NOT_WORK_CITY: false,
    LIVE_CITY_NOT_WORK_CITY: false,
    URBAN_RURAL: false,
    CITY_REGION_MISMATCH_SCORE: 0,
    EXT_SOURCE_2: null,
    EXT_SOURCE_3: null,
    OBS_30_CNT_SOCIAL_CIRCLE: 0,
    DEF_30_CNT_SOCIAL_CIRCLE: 0,
    OBS_60_CNT_SOCIAL_CIRCLE: 0,
    DEF_60_CNT_SOCIAL_CIRCLE: 0,
    AMT_REQ_CREDIT_BUREAU_HOUR: 0,
    AMT_REQ_CREDIT_BUREAU_DAY: 0,
    AMT_REQ_CREDIT_BUREAU_WEEK: 0,
    AMT_REQ_CREDIT_BUREAU_MON: 0,
    AMT_REQ_CREDIT_BUREAU_QRT: 0,
    AMT_REQ_CREDIT_BUREAU_YEAR: 0,
  });
  const [hoveredInput, setHoveredInput] = useState(null);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          {/* Region Population Relative - Indigo */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("REGION_POPULATION_RELATIVE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-indigo-400/30 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="REGION_POPULATION_RELATIVE"
                className="text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 cursor-pointer"
              >
                Region Population Relative
              </label>
              <input
                id="REGION_POPULATION_RELATIVE"
                type="checkbox"
                checked={formData.REGION_POPULATION_RELATIVE}
                onChange={(e) => updateFormData({ REGION_POPULATION_RELATIVE: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-indigo-500"
                style={{
                  boxShadow: formData.REGION_POPULATION_RELATIVE ? "0 0 10px rgba(99,102,241,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "REGION_POPULATION_RELATIVE" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* Region Rating Client - Blue */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("REGION_RATING_CLIENT")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="REGION_RATING_CLIENT"
              className="text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Region Rating Client
            </label>
            <div className="relative mt-2">
              <input
                id="REGION_RATING_CLIENT"
                type="number"
                placeholder="Enter region rating (1-3)"
                value={formData.REGION_RATING_CLIENT}
                onChange={(e) => updateFormData({ REGION_RATING_CLIENT: Math.max(1, Math.min(3, Number(e.target.value))) })}
                min={1}
                max={3}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-blue-400/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 text-blue-100 placeholder:text-blue-300/30 border focus:outline-none"
              />
              {hoveredInput === "REGION_RATING_CLIENT" && (
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

          {/* Region Rating Client w/ City - Sky */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("REGION_RATING_CLIENT_W_CITY")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="REGION_RATING_CLIENT_W_CITY"
              className="text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Region Rating Client with City
            </label>
            <div className="relative mt-2">
              <input
                id="REGION_RATING_CLIENT_W_CITY"
                type="number"
                placeholder="Enter region rating with city (1-3)"
                value={formData.REGION_RATING_CLIENT_W_CITY}
                onChange={(e) => updateFormData({ REGION_RATING_CLIENT_W_CITY: Math.max(1, Math.min(3, Number(e.target.value))) })}
                min={1}
                max={3}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-sky-400/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-400/20 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 text-sky-100 placeholder:text-sky-300/30 border focus:outline-none"
              />
              {hoveredInput === "REGION_RATING_CLIENT_W_CITY" && (
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

          {/* Urban/Rural - Cyan */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("URBAN_RURAL")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-cyan-400/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="URBAN_RURAL"
                className="text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 cursor-pointer"
              >
                Urban/Rural Area
              </label>
              <input
                id="URBAN_RURAL"
                type="checkbox"
                checked={formData.URBAN_RURAL}
                onChange={(e) => updateFormData({ URBAN_RURAL: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-cyan-500"
                style={{
                  boxShadow: formData.URBAN_RURAL ? "0 0 10px rgba(6,182,212,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "URBAN_RURAL" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* City Region Mismatch Score - Teal */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("CITY_REGION_MISMATCH_SCORE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="CITY_REGION_MISMATCH_SCORE"
              className="text-sm font-semibold text-teal-300 group-hover/input:text-teal-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              City Region Mismatch Score
            </label>
            <div className="relative mt-2">
              <input
                id="CITY_REGION_MISMATCH_SCORE"
                type="number"
                placeholder="Enter mismatch score"
                value={formData.CITY_REGION_MISMATCH_SCORE}
                onChange={(e) => updateFormData({ CITY_REGION_MISMATCH_SCORE: Number(e.target.value) })}
                min={0}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-teal-400/30 focus:border-teal-500 focus:ring-4 focus:ring-teal-400/20 hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] bg-slate-900/50 text-teal-100 placeholder:text-teal-300/30 border focus:outline-none"
              />
              {hoveredInput === "CITY_REGION_MISMATCH_SCORE" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* Regional Mismatch Flags */}
          {[
            { key: "REG_REGION_NOT_LIVE_REGION", label: "Registration Region ≠ Living Region", color: "emerald" },
            { key: "REG_REGION_NOT_WORK_REGION", label: "Registration Region ≠ Work Region", color: "indigo" },
            { key: "LIVE_REGION_NOT_WORK_REGION", label: "Living Region ≠ Work Region", color: "blue" },
            { key: "REG_CITY_NOT_LIVE_CITY", label: "Registration City ≠ Living City", color: "sky" },
            { key: "REG_CITY_NOT_WORK_CITY", label: "Registration City ≠ Work City", color: "cyan" },
            { key: "LIVE_CITY_NOT_WORK_CITY", label: "Living City ≠ Work City", color: "teal" },
          ].map(({ key, label, color }) => (
            <div
              key={key}
              className="group/input relative"
              onMouseEnter={() => setHoveredInput(key)}
              onMouseLeave={() => setHoveredInput(null)}
            >
              <div className={`flex items-center justify-between p-4 rounded-md transition-all duration-300 border-${color}-400/30 hover:border-${color}-400/50 hover:shadow-[0_0_20px_rgba(${
                color === "emerald" ? "16,185,129" : 
                color === "indigo" ? "99,102,241" : 
                color === "blue" ? "37,99,235" : 
                color === "sky" ? "14,165,233" : 
                color === "cyan" ? "6,182,212" : 
                "20,184,166"
              },0.15)] bg-slate-900/50 border`}>
                <label
                  htmlFor={key}
                  className={`text-sm font-semibold text-${color}-300 group-hover/input:text-${color}-400 transition-all duration-300 cursor-pointer`}
                >
                  {label}
                </label>
                <input
                  id={key}
                  type="checkbox"
                  checked={formData[key]}
                  onChange={(e) => updateFormData({ [key]: e.target.checked })}
                  className={`w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-${color}-500`}
                  style={{
                    boxShadow: formData[key] ? `0 0 10px rgba(${
                      color === "emerald" ? "16,185,129" : 
                      color === "indigo" ? "99,102,241" : 
                      color === "blue" ? "37,99,235" : 
                      color === "sky" ? "14,165,233" : 
                      color === "cyan" ? "6,182,212" : 
                      "20,184,166"
                    },0.5)` : "none",
                  }}
                />
              </div>
              {hoveredInput === key && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(${
                      color === "emerald" ? "16,185,129" : 
                      color === "indigo" ? "99,102,241" : 
                      color === "blue" ? "37,99,235" : 
                      color === "sky" ? "14,165,233" : 
                      color === "cyan" ? "6,182,212" : 
                      "20,184,166"
                    }, 0.2), transparent)`,
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          ))}

          {/* External Source 2 - Emerald */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("EXT_SOURCE_2")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="EXT_SOURCE_2"
              className="text-sm font-semibold text-emerald-300 group-hover/input:text-emerald-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              External Source 2 Score
            </label>
            <div className="relative mt-2">
              <input
                id="EXT_SOURCE_2"
                type="number"
                step="0.01"
                placeholder="Enter external source 2 score (0-1)"
                value={formData.EXT_SOURCE_2 || ""}
                onChange={(e) => updateFormData({ EXT_SOURCE_2: Number(e.target.value) || null })}
                min={0}
                max={1}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-emerald-400/30 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-400/20 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-slate-900/50 text-emerald-100 placeholder:text-emerald-300/30 border focus:outline-none"
              />
              {hoveredInput === "EXT_SOURCE_2" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* External Source 3 - Indigo */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("EXT_SOURCE_3")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="EXT_SOURCE_3"
              className="text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              External Source 3 Score
            </label>
            <div className="relative mt-2">
              <input
                id="EXT_SOURCE_3"
                type="number"
                step="0.01"
                placeholder="Enter external source 3 score (0-1)"
                value={formData.EXT_SOURCE_3 || ""}
                onChange={(e) => updateFormData({ EXT_SOURCE_3: Number(e.target.value) || null })}
                min={0}
                max={1}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30 border focus:outline-none"
              />
              {hoveredInput === "EXT_SOURCE_3" && (
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

          {/* Social Circle Fields */}
          {[
            { key: "OBS_30_CNT_SOCIAL_CIRCLE", label: "Observable 30-Day Social Circle Count", color: "blue" },
            { key: "DEF_30_CNT_SOCIAL_CIRCLE", label: "Default 30-Day Social Circle Count", color: "sky" },
            { key: "OBS_60_CNT_SOCIAL_CIRCLE", label: "Observable 60-Day Social Circle Count", color: "cyan" },
            { key: "DEF_60_CNT_SOCIAL_CIRCLE", label: "Default 60-Day Social Circle Count", color: "teal" },
          ].map(({ key, label, color }) => (
            <div
              key={key}
              className="group/input relative"
              onMouseEnter={() => setHoveredInput(key)}
              onMouseLeave={() => setHoveredInput(null)}
            >
              <label
                htmlFor={key}
                className={`text-sm font-semibold text-${color}-300 group-hover/input:text-${color}-400 transition-all duration-300 inline-block group-hover/input:translate-x-1`}
              >
                {label}
              </label>
              <div className="relative mt-2">
                <input
                  id={key}
                  type="number"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={formData[key]}
                  onChange={(e) => updateFormData({ [key]: Number(e.target.value) })}
                  min={0}
                  className={`w-full px-4 py-2 rounded-md transition-all duration-300 border-${color}-400/30 focus:border-${color}-500 focus:ring-4 focus:ring-${color}-400/20 hover:border-${color}-400/50 hover:shadow-[0_0_20px_rgba(${
                    color === "blue" ? "37,99,235" : 
                    color === "sky" ? "14,165,233" : 
                    color === "cyan" ? "6,182,212" : 
                    "20,184,166"
                  },0.15)] bg-slate-900/50 text-${color}-100 placeholder:text-${color}-300/30 border focus:outline-none`}
                />
                {hoveredInput === key && (
                  <div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(${
                        color === "blue" ? "37,99,235" : 
                        color === "sky" ? "14,165,233" : 
                        color === "cyan" ? "6,182,212" : 
                        "20,184,166"
                      }, 0.2), transparent)`,
                      animation: "borderGlow 2s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Credit Bureau Queries */}
          {[
            { key: "AMT_REQ_CREDIT_BUREAU_HOUR", label: "Credit Bureau Requests (Hour)", color: "emerald" },
            { key: "AMT_REQ_CREDIT_BUREAU_DAY", label: "Credit Bureau Requests (Day)", color: "indigo" },
            { key: "AMT_REQ_CREDIT_BUREAU_WEEK", label: "Credit Bureau Requests (Week)", color: "blue" },
            { key: "AMT_REQ_CREDIT_BUREAU_MON", label: "Credit Bureau Requests (Month)", color: "sky" },
            { key: "AMT_REQ_CREDIT_BUREAU_QRT", label: "Credit Bureau Requests (Quarter)", color: "cyan" },
            { key: "AMT_REQ_CREDIT_BUREAU_YEAR", label: "Credit Bureau Requests (Year)", color: "teal" },
          ].map(({ key, label, color }) => (
            <div
              key={key}
              className="group/input relative"
              onMouseEnter={() => setHoveredInput(key)}
              onMouseLeave={() => setHoveredInput(null)}
            >
              <label
                htmlFor={key}
                className={`text-sm font-semibold text-${color}-300 group-hover/input:text-${color}-400 transition-all duration-300 inline-block group-hover/input:translate-x-1`}
              >
                {label}
              </label>
              <div className="relative mt-2">
                <input
                  id={key}
                  type="number"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={formData[key]}
                  onChange={(e) => updateFormData({ [key]: Number(e.target.value) })}
                  min={0}
                  className={`w-full px-4 py-2 rounded-md transition-all duration-300 border-${color}-400/30 focus:border-${color}-500 focus:ring-4 focus:ring-${color}-400/20 hover:border-${color}-400/50 hover:shadow-[0_0_20px_rgba(${
                    color === "emerald" ? "16,185,129" : 
                    color === "indigo" ? "99,102,241" : 
                    color === "blue" ? "37,99,235" : 
                    color === "sky" ? "14,165,233" : 
                    color === "cyan" ? "6,182,212" : 
                    "20,184,166"
                  },0.15)] bg-slate-900/50 text-${color}-100 placeholder:text-${color}-300/30 border focus:outline-none`}
                />
                {hoveredInput === key && (
                  <div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(${
                        color === "emerald" ? "16,185,129" : 
                        color === "indigo" ? "99,102,241" : 
                        color === "blue" ? "37,99,235" : 
                        color === "sky" ? "14,165,233" : 
                        color === "cyan" ? "6,182,212" : 
                        "20,184,166"
                      }, 0.2), transparent)`,
                      animation: "borderGlow 2s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
            </div>
          ))}
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
