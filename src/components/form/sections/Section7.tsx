import { useState } from "react";
import { useFormContext } from "@/contexts/FormContext";

export default function Section7() {
  const { formData, updateFormData } = useFormContext();
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);

  const colors = ['indigo', 'blue', 'sky', 'cyan', 'teal', 'emerald', 'green', 'lime', 'yellow', 'amber'];
  const rgbValues: Record<string, string> = {
    indigo: '99, 102, 241',
    blue: '37, 99, 235',
    sky: '14, 165, 233',
    cyan: '6, 182, 212',
    teal: '20, 184, 166',
    emerald: '16, 185, 129',
    green: '34, 197, 94',
    lime: '163, 230, 53',
    yellow: '234, 179, 8',
    amber: '251, 191, 36'
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          {/* Document Flags Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 20 }, (_, i) => i + 2).map((n, idx) => {
              const field = `FLAG_DOCUMENT_${n}` as keyof typeof formData;
              const colorIndex = idx % colors.length;
              const color = colors[colorIndex];
              const rgb = rgbValues[color];
              
              return (
                <div
                  key={field}
                  className="group/input relative"
                  onMouseEnter={() => setHoveredInput(field)}
                  onMouseLeave={() => setHoveredInput(null)}
                >
                  <div className={`flex items-center justify-between p-3 rounded-md transition-all duration-300 border-${color}-400/30 hover:border-${color}-400/50 hover:shadow-[0_0_20px_rgba(${rgb},0.15)] bg-slate-900/50 border`}>
                    <label
                      htmlFor={field}
                      className={`text-xs font-semibold text-${color}-300 group-hover/input:text-${color}-400 transition-all duration-300 cursor-pointer`}
                    >
                      Doc {n}
                    </label>
                    <input
                      id={field}
                      type="checkbox"
                      checked={formData[field] as boolean}
                      onChange={(e) => updateFormData({ [field]: e.target.checked })}
                      className={`w-10 h-5 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-${color}-500`}
                      style={{
                        boxShadow: formData[field] ? `0 0 10px rgba(${rgb},0.5)` : "none",
                      }}
                    />
                  </div>
                  {hoveredInput === field && (
                    <div
                      className="absolute inset-0 rounded-md pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(${rgb}, 0.2), transparent)`,
                        animation: "borderGlow 2s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Contract Type */}
          <div className="group/input relative" onMouseEnter={() => setHoveredInput("NAME_CONTRACT_TYPE_x")} onMouseLeave={() => setHoveredInput(null)}>
            <label htmlFor="NAME_CONTRACT_TYPE_x" className="required text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1">
              Contract Type (Current)
            </label>
            <div className="relative mt-2">
              <select
                id="NAME_CONTRACT_TYPE_x"
                value={formData.NAME_CONTRACT_TYPE_x || ""}
                onChange={(e) => updateFormData({ NAME_CONTRACT_TYPE_x: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 border focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900">Select type</option>
                <option value="Cash loans" className="bg-slate-900">Cash Loans</option>
                <option value="Revolving loans" className="bg-slate-900">Revolving Loans</option>
              </select>
            </div>
          </div>

          {/* Suite Type */}
          <div className="group/input relative" onMouseEnter={() => setHoveredInput("NAME_TYPE_SUITE_x")} onMouseLeave={() => setHoveredInput(null)}>
            <label htmlFor="NAME_TYPE_SUITE_x" className="required text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 inline-block group-hover/input:translate-x-1">
              Suite Type
            </label>
            <div className="relative mt-2">
              <input
                id="NAME_TYPE_SUITE_x"
                type="text"
                placeholder="Enter suite type"
                value={formData.NAME_TYPE_SUITE_x || ""}
                onChange={(e) => updateFormData({ NAME_TYPE_SUITE_x: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-blue-400/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 text-blue-100 placeholder:text-blue-300/30 border focus:outline-none"
              />
            </div>
          </div>

          {/* Weekday */}
          <div className="group/input relative" onMouseEnter={() => setHoveredInput("WEEKDAY_APPR_PROCESS_START_x")} onMouseLeave={() => setHoveredInput(null)}>
            <label htmlFor="WEEKDAY_APPR_PROCESS_START_x" className="required text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 inline-block group-hover/input:translate-x-1">
              Weekday Approval Process Start
            </label>
            <div className="relative mt-2">
              <select
                id="WEEKDAY_APPR_PROCESS_START_x"
                value={formData.WEEKDAY_APPR_PROCESS_START_x || ""}
                onChange={(e) => updateFormData({ WEEKDAY_APPR_PROCESS_START_x: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-sky-400/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-400/20 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 text-sky-100 border focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900">Select day</option>
                <option value="MONDAY" className="bg-slate-900">Monday</option>
                <option value="TUESDAY" className="bg-slate-900">Tuesday</option>
                <option value="WEDNESDAY" className="bg-slate-900">Wednesday</option>
                <option value="THURSDAY" className="bg-slate-900">Thursday</option>
                <option value="FRIDAY" className="bg-slate-900">Friday</option>
                <option value="SATURDAY" className="bg-slate-900">Saturday</option>
                <option value="SUNDAY" className="bg-slate-900">Sunday</option>
              </select>
            </div>
          </div>

          {/* Hour */}
          <div className="group/input relative" onMouseEnter={() => setHoveredInput("HOUR_APPR_PROCESS_START_x")} onMouseLeave={() => setHoveredInput(null)}>
            <label htmlFor="HOUR_APPR_PROCESS_START_x" className="text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 inline-block group-hover/input:translate-x-1">
              Hour Approval Process Start
            </label>
            <div className="relative mt-2">
              <input
                id="HOUR_APPR_PROCESS_START_x"
                type="number"
                min="0"
                max="23"
                placeholder="Enter hour (0-23)"
                value={formData.HOUR_APPR_PROCESS_START_x || ""}
                onChange={(e) => updateFormData({ HOUR_APPR_PROCESS_START_x: Number(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-cyan-400/30 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 text-cyan-100 placeholder:text-cyan-300/30 border focus:outline-none"
              />
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
