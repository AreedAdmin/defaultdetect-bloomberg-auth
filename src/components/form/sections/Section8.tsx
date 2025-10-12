import { useState } from "react";
import { useFormContext } from "@/contexts/FormContext";

export default function Section8() {
  const { formData, updateFormData } = useFormContext();
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          {/* External Source 2 */}
          <div className="group/input relative" onMouseEnter={() => setHoveredInput("EXT_SOURCE_2")} onMouseLeave={() => setHoveredInput(null)}>
            <label htmlFor="EXT_SOURCE_2" className="text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1">
              External Source 2
            </label>
            <div className="relative mt-2">
              <input
                id="EXT_SOURCE_2"
                type="number"
                step="0.01"
                placeholder="Enter external source 2"
                value={formData.EXT_SOURCE_2 || ""}
                onChange={(e) => updateFormData({ EXT_SOURCE_2: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30 border focus:outline-none"
              />
            </div>
          </div>

          {/* External Source 2 Missing */}
          <div className="group/input relative" onMouseEnter={() => setHoveredInput("EXT_SOURCE_2_missing")} onMouseLeave={() => setHoveredInput(null)}>
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-blue-400/30 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 border">
              <label htmlFor="EXT_SOURCE_2_missing" className="text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 cursor-pointer">
                External Source 2 Missing
              </label>
              <input
                id="EXT_SOURCE_2_missing"
                type="checkbox"
                checked={formData.EXT_SOURCE_2_missing}
                onChange={(e) => updateFormData({ EXT_SOURCE_2_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-blue-500"
                style={{
                  boxShadow: formData.EXT_SOURCE_2_missing ? "0 0 10px rgba(37,99,235,0.5)" : "none",
                }}
              />
            </div>
          </div>

          {/* External Source 3 */}
          <div className="group/input relative" onMouseEnter={() => setHoveredInput("EXT_SOURCE_3")} onMouseLeave={() => setHoveredInput(null)}>
            <label htmlFor="EXT_SOURCE_3" className="text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 inline-block group-hover/input:translate-x-1">
              External Source 3
            </label>
            <div className="relative mt-2">
              <input
                id="EXT_SOURCE_3"
                type="number"
                step="0.01"
                placeholder="Enter external source 3"
                value={formData.EXT_SOURCE_3 || ""}
                onChange={(e) => updateFormData({ EXT_SOURCE_3: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-sky-400/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-400/20 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 text-sky-100 placeholder:text-sky-300/30 border focus:outline-none"
              />
            </div>
          </div>

          {/* External Source 3 Missing */}
          <div className="group/input relative" onMouseEnter={() => setHoveredInput("EXT_SOURCE_3_missing")} onMouseLeave={() => setHoveredInput(null)}>
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-cyan-400/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 border">
              <label htmlFor="EXT_SOURCE_3_missing" className="text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 cursor-pointer">
                External Source 3 Missing
              </label>
              <input
                id="EXT_SOURCE_3_missing"
                type="checkbox"
                checked={formData.EXT_SOURCE_3_missing}
                onChange={(e) => updateFormData({ EXT_SOURCE_3_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-cyan-500"
                style={{
                  boxShadow: formData.EXT_SOURCE_3_missing ? "0 0 10px rgba(6,182,212,0.5)" : "none",
                }}
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
