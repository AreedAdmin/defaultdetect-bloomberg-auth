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
    DAYS_FIRST_DRAWING: null,
    DAYS_FIRST_DUE: null,
    DAYS_LAST_DUE_1ST_VERSION: null,
    DAYS_LAST_DUE: null,
    DAYS_TERMINATION: null,
    DAYS_DECISION: null,
    DAYS_FIRST_DRAWING_missing: false,
    DAYS_FIRST_DUE_missing: false,
    DAYS_LAST_DUE_1ST_VERSION_missing: false,
    DAYS_LAST_DUE_missing: false,
    DAYS_TERMINATION_missing: false,
    CNT_PAYMENT: null,
    CNT_PAYMENT_missing: false,
    CREDIT_DIFF: null,
    ANNUITY_DIFF: null,
    GOODS_PRICE_DIFF: null,
    CREDIT_TO_GOODS_DELTA_RATIO: null,
    CREDIT_DURATION_DAYS: null,
    TIME_TO_FIRST_PAYMENT_DAYS: null,
    TIME_TO_TERMINATION_DAYS: null,
    OVERLAP_WITH_CURRENT: false,
    SAME_CONTRACT_TYPE: false,
    SAME_WEEKDAY_APPR: false,
    HOUR_APPR_DIFF: null,
  });
  const [hoveredInput, setHoveredInput] = useState(null);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const colors = ['indigo', 'blue', 'sky', 'cyan', 'teal', 'emerald', 'green', 'lime', 'yellow', 'amber'];
  const rgbValues = {
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
              const field = `FLAG_DOCUMENT_${n}`;
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
                      checked={formData[field]}
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

          {/* DAYS_FIRST_DRAWING - Orange */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_FIRST_DRAWING")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_FIRST_DRAWING"
              className="text-sm font-semibold text-orange-300 group-hover/input:text-orange-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days First Drawing
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_FIRST_DRAWING"
                type="number"
                placeholder="Enter number of days"
                value={formData.DAYS_FIRST_DRAWING || ""}
                onChange={(e) => updateFormData({ DAYS_FIRST_DRAWING: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-orange-400/30 focus:border-orange-500 focus:ring-4 focus:ring-orange-400/20 hover:border-orange-400/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] bg-slate-900/50 text-orange-100 placeholder:text-orange-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_FIRST_DRAWING" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* DAYS_FIRST_DRAWING_missing - Red Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_FIRST_DRAWING_missing")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-red-400/30 hover:border-red-400/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="DAYS_FIRST_DRAWING_missing"
                className="text-sm font-semibold text-red-300 group-hover/input:text-red-400 transition-all duration-300 cursor-pointer"
              >
                Days First Drawing Missing
              </label>
              <input
                id="DAYS_FIRST_DRAWING_missing"
                type="checkbox"
                checked={formData.DAYS_FIRST_DRAWING_missing}
                onChange={(e) => updateFormData({ DAYS_FIRST_DRAWING_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-red-500"
                style={{
                  boxShadow: formData.DAYS_FIRST_DRAWING_missing ? "0 0 10px rgba(239,68,68,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "DAYS_FIRST_DRAWING_missing" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* CREDIT_DIFF - Green */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("CREDIT_DIFF")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="CREDIT_DIFF"
              className="text-sm font-semibold text-green-300 group-hover/input:text-green-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Credit Difference
            </label>
            <div className="relative mt-2">
              <input
                id="CREDIT_DIFF"
                type="number"
                placeholder="Enter credit difference"
                value={formData.CREDIT_DIFF || ""}
                onChange={(e) => updateFormData({ CREDIT_DIFF: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-green-400/30 focus:border-green-500 focus:ring-4 focus:ring-green-400/20 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] bg-slate-900/50 text-green-100 placeholder:text-green-300/30 border focus:outline-none"
              />
              {hoveredInput === "CREDIT_DIFF" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* ANNUITY_DIFF - Lime */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("ANNUITY_DIFF")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="ANNUITY_DIFF"
              className="text-sm font-semibold text-lime-300 group-hover/input:text-lime-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Annuity Difference
            </label>
            <div className="relative mt-2">
              <input
                id="ANNUITY_DIFF"
                type="number"
                placeholder="Enter annuity difference"
                value={formData.ANNUITY_DIFF || ""}
                onChange={(e) => updateFormData({ ANNUITY_DIFF: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-lime-400/30 focus:border-lime-500 focus:ring-4 focus:ring-lime-400/20 hover:border-lime-400/50 hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] bg-slate-900/50 text-lime-100 placeholder:text-lime-300/30 border focus:outline-none"
              />
              {hoveredInput === "ANNUITY_DIFF" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* GOODS_PRICE_DIFF - Yellow */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("GOODS_PRICE_DIFF")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="GOODS_PRICE_DIFF"
              className="text-sm font-semibold text-yellow-300 group-hover/input:text-yellow-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Goods Price Difference
            </label>
            <div className="relative mt-2">
              <input
                id="GOODS_PRICE_DIFF"
                type="number"
                placeholder="Enter goods price difference"
                value={formData.GOODS_PRICE_DIFF || ""}
                onChange={(e) => updateFormData({ GOODS_PRICE_DIFF: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-yellow-400/30 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-400/20 hover:border-yellow-400/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-slate-900/50 text-yellow-100 placeholder:text-yellow-300/30 border focus:outline-none"
              />
              {hoveredInput === "GOODS_PRICE_DIFF" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* CREDIT_TO_GOODS_DELTA_RATIO - Amber */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("CREDIT_TO_GOODS_DELTA_RATIO")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="CREDIT_TO_GOODS_DELTA_RATIO"
              className="text-sm font-semibold text-amber-300 group-hover/input:text-amber-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Credit to Goods Delta Ratio
            </label>
            <div className="relative mt-2">
              <input
                id="CREDIT_TO_GOODS_DELTA_RATIO"
                type="number"
                step="0.01"
                placeholder="Enter ratio"
                value={formData.CREDIT_TO_GOODS_DELTA_RATIO || ""}
                onChange={(e) => updateFormData({ CREDIT_TO_GOODS_DELTA_RATIO: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-amber-400/30 focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)] bg-slate-900/50 text-amber-100 placeholder:text-amber-300/30 border focus:outline-none"
              />
              {hoveredInput === "CREDIT_TO_GOODS_DELTA_RATIO" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* CREDIT_DURATION_DAYS - Orange */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("CREDIT_DURATION_DAYS")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="CREDIT_DURATION_DAYS"
              className="text-sm font-semibold text-orange-300 group-hover/input:text-orange-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Credit Duration (Days)
            </label>
            <div className="relative mt-2">
              <input
                id="CREDIT_DURATION_DAYS"
                type="number"
                placeholder="Enter duration in days"
                value={formData.CREDIT_DURATION_DAYS || ""}
                onChange={(e) => updateFormData({ CREDIT_DURATION_DAYS: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-orange-400/30 focus:border-orange-500 focus:ring-4 focus:ring-orange-400/20 hover:border-orange-400/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] bg-slate-900/50 text-orange-100 placeholder:text-orange-300/30 border focus:outline-none"
              />
              {hoveredInput === "CREDIT_DURATION_DAYS" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* TIME_TO_FIRST_PAYMENT_DAYS - Red */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("TIME_TO_FIRST_PAYMENT_DAYS")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="TIME_TO_FIRST_PAYMENT_DAYS"
              className="text-sm font-semibold text-red-300 group-hover/input:text-red-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Time to First Payment (Days)
            </label>
            <div className="relative mt-2">
              <input
                id="TIME_TO_FIRST_PAYMENT_DAYS"
                type="number"
                placeholder="Enter days to first payment"
                value={formData.TIME_TO_FIRST_PAYMENT_DAYS || ""}
                onChange={(e) => updateFormData({ TIME_TO_FIRST_PAYMENT_DAYS: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-red-400/30 focus:border-red-500 focus:ring-4 focus:ring-red-400/20 hover:border-red-400/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] bg-slate-900/50 text-red-100 placeholder:text-red-300/30 border focus:outline-none"
              />
              {hoveredInput === "TIME_TO_FIRST_PAYMENT_DAYS" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* TIME_TO_TERMINATION_DAYS - Rose */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("TIME_TO_TERMINATION_DAYS")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="TIME_TO_TERMINATION_DAYS"
              className="text-sm font-semibold text-rose-300 group-hover/input:text-rose-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Time to Termination (Days)
            </label>
            <div className="relative mt-2">
              <input
                id="TIME_TO_TERMINATION_DAYS"
                type="number"
                placeholder="Enter days to termination"
                value={formData.TIME_TO_TERMINATION_DAYS || ""}
                onChange={(e) => updateFormData({ TIME_TO_TERMINATION_DAYS: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-rose-400/30 focus:border-rose-500 focus:ring-4 focus:ring-rose-400/20 hover:border-rose-400/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] bg-slate-900/50 text-rose-100 placeholder:text-rose-300/30 border focus:outline-none"
              />
              {hoveredInput === "TIME_TO_TERMINATION_DAYS" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(244, 63, 94, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* OVERLAP_WITH_CURRENT - Pink Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("OVERLAP_WITH_CURRENT")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-pink-400/30 hover:border-pink-400/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="OVERLAP_WITH_CURRENT"
                className="text-sm font-semibold text-pink-300 group-hover/input:text-pink-400 transition-all duration-300 cursor-pointer"
              >
                Overlap with Current Loan
              </label>
              <input
                id="OVERLAP_WITH_CURRENT"
                type="checkbox"
                checked={formData.OVERLAP_WITH_CURRENT}
                onChange={(e) => updateFormData({ OVERLAP_WITH_CURRENT: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-pink-500"
                style={{
                  boxShadow: formData.OVERLAP_WITH_CURRENT ? "0 0 10px rgba(236,72,153,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "OVERLAP_WITH_CURRENT" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* SAME_CONTRACT_TYPE - Fuchsia Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("SAME_CONTRACT_TYPE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-fuchsia-400/30 hover:border-fuchsia-400/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="SAME_CONTRACT_TYPE"
                className="text-sm font-semibold text-fuchsia-300 group-hover/input:text-fuchsia-400 transition-all duration-300 cursor-pointer"
              >
                Same Contract Type
              </label>
              <input
                id="SAME_CONTRACT_TYPE"
                type="checkbox"
                checked={formData.SAME_CONTRACT_TYPE}
                onChange={(e) => updateFormData({ SAME_CONTRACT_TYPE: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-fuchsia-500"
                style={{
                  boxShadow: formData.SAME_CONTRACT_TYPE ? "0 0 10px rgba(217,70,239,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "SAME_CONTRACT_TYPE" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(217, 70, 239, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* SAME_WEEKDAY_APPR - Purple Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("SAME_WEEKDAY_APPR")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-purple-400/30 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="SAME_WEEKDAY_APPR"
                className="text-sm font-semibold text-purple-300 group-hover/input:text-purple-400 transition-all duration-300 cursor-pointer"
              >
                Same Weekday Application
              </label>
              <input
                id="SAME_WEEKDAY_APPR"
                type="checkbox"
                checked={formData.SAME_WEEKDAY_APPR}
                onChange={(e) => updateFormData({ SAME_WEEKDAY_APPR: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-purple-500"
                style={{
                  boxShadow: formData.SAME_WEEKDAY_APPR ? "0 0 10px rgba(168,85,247,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "SAME_WEEKDAY_APPR" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* HOUR_APPR_DIFF - Violet */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("HOUR_APPR_DIFF")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="HOUR_APPR_DIFF"
              className="text-sm font-semibold text-violet-300 group-hover/input:text-violet-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Hour Difference Between Applications
            </label>
            <div className="relative mt-2">
              <input
                id="HOUR_APPR_DIFF"
                type="number"
                placeholder="Enter hour difference"
                value={formData.HOUR_APPR_DIFF || ""}
                onChange={(e) => updateFormData({ HOUR_APPR_DIFF: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-violet-400/30 focus:border-violet-500 focus:ring-4 focus:ring-violet-400/20 hover:border-violet-400/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] bg-slate-900/50 text-violet-100 placeholder:text-violet-300/30 border focus:outline-none"
              />
              {hoveredInput === "HOUR_APPR_DIFF" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)",
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
          input[type="checkbox"]::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 18px;
            height: 18px;
            background: white;
            border-radius: 50%;
            transition: transform 0.3s;
          }
          input[type="checkbox"]:checked::after {
            transform: translateX(20px);
          }
        `}</style>
      </div>
    </div>
  );
}(239, 68, 68, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* DAYS_FIRST_DUE - Rose */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_FIRST_DUE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_FIRST_DUE"
              className="text-sm font-semibold text-rose-300 group-hover/input:text-rose-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days First Due
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_FIRST_DUE"
                type="number"
                placeholder="Enter number of days"
                value={formData.DAYS_FIRST_DUE || ""}
                onChange={(e) => updateFormData({ DAYS_FIRST_DUE: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-rose-400/30 focus:border-rose-500 focus:ring-4 focus:ring-rose-400/20 hover:border-rose-400/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] bg-slate-900/50 text-rose-100 placeholder:text-rose-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_FIRST_DUE" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(244, 63, 94, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* DAYS_FIRST_DUE_missing - Pink Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_FIRST_DUE_missing")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-pink-400/30 hover:border-pink-400/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="DAYS_FIRST_DUE_missing"
                className="text-sm font-semibold text-pink-300 group-hover/input:text-pink-400 transition-all duration-300 cursor-pointer"
              >
                Days First Due Missing
              </label>
              <input
                id="DAYS_FIRST_DUE_missing"
                type="checkbox"
                checked={formData.DAYS_FIRST_DUE_missing}
                onChange={(e) => updateFormData({ DAYS_FIRST_DUE_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-pink-500"
                style={{
                  boxShadow: formData.DAYS_FIRST_DUE_missing ? "0 0 10px rgba(236,72,153,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "DAYS_FIRST_DUE_missing" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* DAYS_LAST_DUE_1ST_VERSION - Fuchsia */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_LAST_DUE_1ST_VERSION")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_LAST_DUE_1ST_VERSION"
              className="text-sm font-semibold text-fuchsia-300 group-hover/input:text-fuchsia-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days Last Due (1st Version)
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_LAST_DUE_1ST_VERSION"
                type="number"
                placeholder="Enter number of days"
                value={formData.DAYS_LAST_DUE_1ST_VERSION || ""}
                onChange={(e) => updateFormData({ DAYS_LAST_DUE_1ST_VERSION: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-fuchsia-400/30 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-400/20 hover:border-fuchsia-400/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] bg-slate-900/50 text-fuchsia-100 placeholder:text-fuchsia-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_LAST_DUE_1ST_VERSION" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(217, 70, 239, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* DAYS_LAST_DUE_1ST_VERSION_missing - Purple Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_LAST_DUE_1ST_VERSION_missing")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-purple-400/30 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="DAYS_LAST_DUE_1ST_VERSION_missing"
                className="text-sm font-semibold text-purple-300 group-hover/input:text-purple-400 transition-all duration-300 cursor-pointer"
              >
                Days Last Due (1st) Missing
              </label>
              <input
                id="DAYS_LAST_DUE_1ST_VERSION_missing"
                type="checkbox"
                checked={formData.DAYS_LAST_DUE_1ST_VERSION_missing}
                onChange={(e) => updateFormData({ DAYS_LAST_DUE_1ST_VERSION_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-purple-500"
                style={{
                  boxShadow: formData.DAYS_LAST_DUE_1ST_VERSION_missing ? "0 0 10px rgba(168,85,247,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "DAYS_LAST_DUE_1ST_VERSION_missing" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* DAYS_LAST_DUE - Violet */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_LAST_DUE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_LAST_DUE"
              className="text-sm font-semibold text-violet-300 group-hover/input:text-violet-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days Last Due
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_LAST_DUE"
                type="number"
                placeholder="Enter number of days"
                value={formData.DAYS_LAST_DUE || ""}
                onChange={(e) => updateFormData({ DAYS_LAST_DUE: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-violet-400/30 focus:border-violet-500 focus:ring-4 focus:ring-violet-400/20 hover:border-violet-400/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] bg-slate-900/50 text-violet-100 placeholder:text-violet-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_LAST_DUE" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* DAYS_LAST_DUE_missing - Indigo Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_LAST_DUE_missing")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-indigo-400/30 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="DAYS_LAST_DUE_missing"
                className="text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 cursor-pointer"
              >
                Days Last Due Missing
              </label>
              <input
                id="DAYS_LAST_DUE_missing"
                type="checkbox"
                checked={formData.DAYS_LAST_DUE_missing}
                onChange={(e) => updateFormData({ DAYS_LAST_DUE_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-indigo-500"
                style={{
                  boxShadow: formData.DAYS_LAST_DUE_missing ? "0 0 10px rgba(99,102,241,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "DAYS_LAST_DUE_missing" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* DAYS_TERMINATION - Blue */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_TERMINATION")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_TERMINATION"
              className="text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days Termination
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_TERMINATION"
                type="number"
                placeholder="Enter number of days"
                value={formData.DAYS_TERMINATION || ""}
                onChange={(e) => updateFormData({ DAYS_TERMINATION: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-blue-400/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 text-blue-100 placeholder:text-blue-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_TERMINATION" && (
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

          {/* DAYS_TERMINATION_missing - Sky Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_TERMINATION_missing")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-sky-400/30 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="DAYS_TERMINATION_missing"
                className="text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 cursor-pointer"
              >
                Days Termination Missing
              </label>
              <input
                id="DAYS_TERMINATION_missing"
                type="checkbox"
                checked={formData.DAYS_TERMINATION_missing}
                onChange={(e) => updateFormData({ DAYS_TERMINATION_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-sky-500"
                style={{
                  boxShadow: formData.DAYS_TERMINATION_missing ? "0 0 10px rgba(14,165,233,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "DAYS_TERMINATION_missing" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* DAYS_DECISION - Cyan */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_DECISION")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_DECISION"
              className="text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days Since Decision
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_DECISION"
                type="number"
                placeholder="Enter number of days"
                value={formData.DAYS_DECISION || ""}
                onChange={(e) => updateFormData({ DAYS_DECISION: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-cyan-400/30 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 text-cyan-100 placeholder:text-cyan-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_DECISION" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* CNT_PAYMENT - Teal */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("CNT_PAYMENT")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="CNT_PAYMENT"
              className="text-sm font-semibold text-teal-300 group-hover/input:text-teal-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Number of Payments
            </label>
            <div className="relative mt-2">
              <input
                id="CNT_PAYMENT"
                type="number"
                placeholder="Enter number of scheduled payments"
                value={formData.CNT_PAYMENT || ""}
                onChange={(e) => updateFormData({ CNT_PAYMENT: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-teal-400/30 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] bg-slate-900/50 text-teal-100 placeholder:text-teal-300/30 border focus:outline-none"
              />
              {hoveredInput === "CNT_PAYMENT" && (
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

          {/* CNT_PAYMENT_missing - Emerald Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("CNT_PAYMENT_missing")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-emerald-400/30 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="CNT_PAYMENT_missing"
                className="text-sm font-semibold text-emerald-300 group-hover/input:text-emerald-400 transition-all duration-300 cursor-pointer"
              >
                CNT Payment Missing
              </label>
              <input
                id="CNT_PAYMENT_missing"
                type="checkbox"
                checked={formData.CNT_PAYMENT_missing}
                onChange={(e) => updateFormData({ CNT_PAYMENT_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-emerald-500"
                style={{
                  boxShadow: formData.CNT_PAYMENT_missing ? "0 0 10px rgba(16,185,129,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "CNT_PAYMENT_missing" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba