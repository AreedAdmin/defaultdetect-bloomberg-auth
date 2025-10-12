import { useState } from "react";

export default function Section7() {
  const [formData, setFormData] = useState({
    FLAG_DOCUMENT_2: false,
    FLAG_DOCUMENT_3: false,
    FLAG_DOCUMENT_4: false,
    FLAG_DOCUMENT_5: false,
    FLAG_DOCUMENT_6: false,
    FLAG_DOCUMENT_7: false,
    FLAG_DOCUMENT_8: false,
    FLAG_DOCUMENT_9: false,
    FLAG_DOCUMENT_10: false,
    FLAG_DOCUMENT_11: false,
    FLAG_DOCUMENT_12: false,
    FLAG_DOCUMENT_13: false,
    FLAG_DOCUMENT_14: false,
    FLAG_DOCUMENT_15: false,
    FLAG_DOCUMENT_16: false,
    FLAG_DOCUMENT_17: false,
    FLAG_DOCUMENT_18: false,
    FLAG_DOCUMENT_19: false,
    FLAG_DOCUMENT_20: false,
    FLAG_DOCUMENT_21: false,
    WEEKDAY_APPR_PROCESS_START_x: "",
    HOUR_APPR_PROCESS_START_x: 0,
    DAYS_DECISION: null,
  });
  const [hoveredInput, setHoveredInput] = useState(null);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const documentFlags = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
  ];

  const colorMap = {
    0: { color: "indigo", rgb: "99,102,241" },
    1: { color: "blue", rgb: "37,99,235" },
    2: { color: "sky", rgb: "14,165,233" },
    3: { color: "cyan", rgb: "6,182,212" },
    4: { color: "teal", rgb: "20,184,166" },
    5: { color: "emerald", rgb: "16,185,129" },
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-4">
          {/* Document Flags in 2-column grid */}
          <div className="grid grid-cols-2 gap-4">
            {documentFlags.map((docNum, idx) => {
              const key = `FLAG_DOCUMENT_${docNum}`;
              const colorInfo = colorMap[idx % 6];
              return (
                <div
                  key={key}
                  className="group/input relative"
                  onMouseEnter={() => setHoveredInput(key)}
                  onMouseLeave={() => setHoveredInput(null)}
                >
                  <div className={`flex items-center justify-between p-4 rounded-md transition-all duration-300 border-${colorInfo.color}-400/30 hover:border-${colorInfo.color}-400/50 hover:shadow-[0_0_20px_rgba(${colorInfo.rgb},0.15)] bg-slate-900/50 border`}>
                    <label
                      htmlFor={key}
                      className={`text-sm font-semibold text-${colorInfo.color}-300 group-hover/input:text-${colorInfo.color}-400 transition-all duration-300 cursor-pointer`}
                    >
                      Document {docNum}
                    </label>
                    <input
                      id={key}
                      type="checkbox"
                      checked={formData[key]}
                      onChange={(e) => updateFormData({ [key]: e.target.checked })}
                      className={`w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-${colorInfo.color}-500`}
                      style={{
                        boxShadow: formData[key] ? `0 0 10px rgba(${colorInfo.rgb},0.5)` : "none",
                      }}
                    />
                  </div>
                  {hoveredInput === key && (
                    <div
                      className="absolute inset-0 rounded-md pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(${colorInfo.rgb}, 0.2), transparent)`,
                        animation: "borderGlow 2s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Weekday Application Process Start - Indigo */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("WEEKDAY_APPR_PROCESS_START_x")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="WEEKDAY_APPR_PROCESS_START_x"
              className="text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Application Weekday
            </label>
            <div className="relative mt-2">
              <select
                id="WEEKDAY_APPR_PROCESS_START_x"
                value={formData.WEEKDAY_APPR_PROCESS_START_x}
                onChange={(e) => updateFormData({ WEEKDAY_APPR_PROCESS_START_x: e.target.value })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 border focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900">Select weekday</option>
                <option value="MONDAY" className="bg-slate-900">Monday</option>
                <option value="TUESDAY" className="bg-slate-900">Tuesday</option>
                <option value="WEDNESDAY" className="bg-slate-900">Wednesday</option>
                <option value="THURSDAY" className="bg-slate-900">Thursday</option>
                <option value="FRIDAY" className="bg-slate-900">Friday</option>
                <option value="SATURDAY" className="bg-slate-900">Saturday</option>
                <option value="SUNDAY" className="bg-slate-900">Sunday</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-300">▼</div>
              {hoveredInput === "WEEKDAY_APPR_PROCESS_START_x" && (
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

          {/* Hour Application Process Start - Blue */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("HOUR_APPR_PROCESS_START_x")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="HOUR_APPR_PROCESS_START_x"
              className="text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Application Hour (0-23)
            </label>
            <div className="relative mt-2">
              <input
                id="HOUR_APPR_PROCESS_START_x"
                type="number"
                placeholder="Enter application hour"
                value={formData.HOUR_APPR_PROCESS_START_x}
                onChange={(e) => updateFormData({ HOUR_APPR_PROCESS_START_x: Math.max(0, Math.min(23, Number(e.target.value))) })}
                min={0}
                max={23}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-blue-400/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 text-blue-100 placeholder:text-blue-300/30 border focus:outline-none"
              />
              {hoveredInput === "HOUR_APPR_PROCESS_START_x" && (
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

          {/* Days Decision - Sky */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_DECISION")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_DECISION"
              className="text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days Since Decision (negative value)
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_DECISION"
                type="number"
                placeholder="Enter days since decision (e.g., -30)"
                value={formData.DAYS_DECISION || ""}
                onChange={(e) => updateFormData({ DAYS_DECISION: Number(e.target.value) || null })}
                max={0}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-sky-400/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-400/20 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 text-sky-100 placeholder:text-sky-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_DECISION" && (
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
