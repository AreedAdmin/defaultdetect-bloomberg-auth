import { useState } from "react";

export default function Section8() {
  const [formData, setFormData] = useState({
    AMT_ANNUITY_y: null,
    AMT_APPLICATION: null,
    AMT_CREDIT_y: null,
    AMT_GOODS_PRICE_y: null,
    SELLERPLACE_AREA: null,
    AMT_GOODS_PRICE_y_missing: false,
    AMT_ANNUITY_y_missing: false,
    NAME_CONTRACT_TYPE_y: "",
    NAME_CASH_LOAN_PURPOSE: "",
    NAME_CONTRACT_STATUS: "",
    NAME_PAYMENT_TYPE: "",
    CODE_REJECT_REASON: "",
    NAME_CLIENT_TYPE: "",
    NAME_GOODS_CATEGORY: "",
    NAME_PORTFOLIO: "",
    NAME_PRODUCT_TYPE: "",
    CHANNEL_TYPE: "",
    NAME_SELLER_INDUSTRY: "",
    NAME_YIELD_GROUP: "",
    PRODUCT_COMBINATION: "",
    FLAG_LAST_APPL_PER_CONTRACT: false,
    NFLAG_LAST_APPL_IN_DAY: false,
    NFLAG_INSURED_ON_APPROVAL: false,
    NFLAG_INSURED_ON_APPROVAL_missing: false,
    is_CashLoan: false,
    BUREAU_QUERY_INTENSITY: null,
    SHORT_TERM_BUREAU_RATIO: null,
    HAS_ALL_DOCS: null,
    STABILITY_SCORE: null,
  });
  const [hoveredInput, setHoveredInput] = useState(null);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          {/* AMT_ANNUITY_y - Indigo */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("AMT_ANNUITY_y")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="AMT_ANNUITY_y"
              className="text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Previous Loan Annuity
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300/50 pointer-events-none">$</span>
              <input
                id="AMT_ANNUITY_y"
                type="number"
                placeholder="Enter annuity amount"
                value={formData.AMT_ANNUITY_y || ""}
                onChange={(e) => updateFormData({ AMT_ANNUITY_y: Number(e.target.value) || null })}
                className="w-full pl-8 pr-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30 border focus:outline-none"
              />
              {hoveredInput === "AMT_ANNUITY_y" && (
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

          {/* NAME_PRODUCT_TYPE - Purple */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("NAME_PRODUCT_TYPE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="NAME_PRODUCT_TYPE"
              className="text-sm font-semibold text-purple-300 group-hover/input:text-purple-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Product Type
            </label>
            <div className="relative mt-2">
              <input
                id="NAME_PRODUCT_TYPE"
                type="text"
                placeholder="e.g., XNA, XAP, Loan"
                value={formData.NAME_PRODUCT_TYPE}
                onChange={(e) => updateFormData({ NAME_PRODUCT_TYPE: e.target.value })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-purple-400/30 focus:border-purple-500 focus:ring-4 focus:ring-purple-400/20 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-slate-900/50 text-purple-100 placeholder:text-purple-300/30 border focus:outline-none"
              />
              {hoveredInput === "NAME_PRODUCT_TYPE" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* CHANNEL_TYPE - Violet */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("CHANNEL_TYPE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="CHANNEL_TYPE"
              className="text-sm font-semibold text-violet-300 group-hover/input:text-violet-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Channel Type
            </label>
            <div className="relative mt-2">
              <input
                id="CHANNEL_TYPE"
                type="text"
                placeholder="e.g., Country-wide, Regional"
                value={formData.CHANNEL_TYPE}
                onChange={(e) => updateFormData({ CHANNEL_TYPE: e.target.value })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-violet-400/30 focus:border-violet-500 focus:ring-4 focus:ring-violet-400/20 hover:border-violet-400/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] bg-slate-900/50 text-violet-100 placeholder:text-violet-300/30 border focus:outline-none"
              />
              {hoveredInput === "CHANNEL_TYPE" && (
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

          {/* NAME_SELLER_INDUSTRY - Indigo */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("NAME_SELLER_INDUSTRY")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="NAME_SELLER_INDUSTRY"
              className="text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Seller Industry
            </label>
            <div className="relative mt-2">
              <input
                id="NAME_SELLER_INDUSTRY"
                type="text"
                placeholder="e.g., Consumer electronics, Auto"
                value={formData.NAME_SELLER_INDUSTRY}
                onChange={(e) => updateFormData({ NAME_SELLER_INDUSTRY: e.target.value })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30 border focus:outline-none"
              />
              {hoveredInput === "NAME_SELLER_INDUSTRY" && (
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

          {/* NAME_YIELD_GROUP - Blue */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("NAME_YIELD_GROUP")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="NAME_YIELD_GROUP"
              className="text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Yield Group
            </label>
            <div className="relative mt-2">
              <input
                id="NAME_YIELD_GROUP"
                type="text"
                placeholder="e.g., Low, Medium, High"
                value={formData.NAME_YIELD_GROUP}
                onChange={(e) => updateFormData({ NAME_YIELD_GROUP: e.target.value })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-blue-400/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 text-blue-100 placeholder:text-blue-300/30 border focus:outline-none"
              />
              {hoveredInput === "NAME_YIELD_GROUP" && (
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

          {/* PRODUCT_COMBINATION - Sky */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("PRODUCT_COMBINATION")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="PRODUCT_COMBINATION"
              className="text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Product Combination
            </label>
            <div className="relative mt-2">
              <input
                id="PRODUCT_COMBINATION"
                type="text"
                placeholder="e.g., Cash, POS mobile"
                value={formData.PRODUCT_COMBINATION}
                onChange={(e) => updateFormData({ PRODUCT_COMBINATION: e.target.value })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-sky-400/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-400/20 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 text-sky-100 placeholder:text-sky-300/30 border focus:outline-none"
              />
              {hoveredInput === "PRODUCT_COMBINATION" && (
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

          {/* Toggles */}
          {/* FLAG_LAST_APPL_PER_CONTRACT - Cyan Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("FLAG_LAST_APPL_PER_CONTRACT")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-cyan-400/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="FLAG_LAST_APPL_PER_CONTRACT"
                className="text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 cursor-pointer"
              >
                Last Application Per Contract
              </label>
              <input
                id="FLAG_LAST_APPL_PER_CONTRACT"
                type="checkbox"
                checked={formData.FLAG_LAST_APPL_PER_CONTRACT}
                onChange={(e) => updateFormData({ FLAG_LAST_APPL_PER_CONTRACT: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-cyan-500"
                style={{
                  boxShadow: formData.FLAG_LAST_APPL_PER_CONTRACT ? "0 0 10px rgba(6,182,212,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "FLAG_LAST_APPL_PER_CONTRACT" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* NFLAG_LAST_APPL_IN_DAY - Teal Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("NFLAG_LAST_APPL_IN_DAY")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-teal-400/30 hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="NFLAG_LAST_APPL_IN_DAY"
                className="text-sm font-semibold text-teal-300 group-hover/input:text-teal-400 transition-all duration-300 cursor-pointer"
              >
                Last Application in Day
              </label>
              <input
                id="NFLAG_LAST_APPL_IN_DAY"
                type="checkbox"
                checked={formData.NFLAG_LAST_APPL_IN_DAY}
                onChange={(e) => updateFormData({ NFLAG_LAST_APPL_IN_DAY: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-teal-500"
                style={{
                  boxShadow: formData.NFLAG_LAST_APPL_IN_DAY ? "0 0 10px rgba(20,184,166,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "NFLAG_LAST_APPL_IN_DAY" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* NFLAG_INSURED_ON_APPROVAL - Emerald Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("NFLAG_INSURED_ON_APPROVAL")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-emerald-400/30 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="NFLAG_INSURED_ON_APPROVAL"
                className="text-sm font-semibold text-emerald-300 group-hover/input:text-emerald-400 transition-all duration-300 cursor-pointer"
              >
                Insured on Approval
              </label>
              <input
                id="NFLAG_INSURED_ON_APPROVAL"
                type="checkbox"
                checked={formData.NFLAG_INSURED_ON_APPROVAL}
                onChange={(e) => updateFormData({ NFLAG_INSURED_ON_APPROVAL: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-emerald-500"
                style={{
                  boxShadow: formData.NFLAG_INSURED_ON_APPROVAL ? "0 0 10px rgba(16,185,129,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "NFLAG_INSURED_ON_APPROVAL" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* NFLAG_INSURED_ON_APPROVAL_missing - Green Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("NFLAG_INSURED_ON_APPROVAL_missing")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-green-400/30 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="NFLAG_INSURED_ON_APPROVAL_missing"
                className="text-sm font-semibold text-green-300 group-hover/input:text-green-400 transition-all duration-300 cursor-pointer"
              >
                Insurance Flag Missing
              </label>
              <input
                id="NFLAG_INSURED_ON_APPROVAL_missing"
                type="checkbox"
                checked={formData.NFLAG_INSURED_ON_APPROVAL_missing}
                onChange={(e) => updateFormData({ NFLAG_INSURED_ON_APPROVAL_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-green-500"
                style={{
                  boxShadow: formData.NFLAG_INSURED_ON_APPROVAL_missing ? "0 0 10px rgba(34,197,94,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "NFLAG_INSURED_ON_APPROVAL_missing" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* is_CashLoan - Lime Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("is_CashLoan")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-lime-400/30 hover:border-lime-400/50 hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="is_CashLoan"
                className="text-sm font-semibold text-lime-300 group-hover/input:text-lime-400 transition-all duration-300 cursor-pointer"
              >
                Is Cash Loan
              </label>
              <input
                id="is_CashLoan"
                type="checkbox"
                checked={formData.is_CashLoan}
                onChange={(e) => updateFormData({ is_CashLoan: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-lime-500"
                style={{
                  boxShadow: formData.is_CashLoan ? "0 0 10px rgba(163,230,53,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "is_CashLoan" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* BUREAU_QUERY_INTENSITY - Yellow */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("BUREAU_QUERY_INTENSITY")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="BUREAU_QUERY_INTENSITY"
              className="text-sm font-semibold text-yellow-300 group-hover/input:text-yellow-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Bureau Query Intensity
            </label>
            <div className="relative mt-2">
              <input
                id="BUREAU_QUERY_INTENSITY"
                type="number"
                placeholder="Enter intensity"
                value={formData.BUREAU_QUERY_INTENSITY || ""}
                onChange={(e) => updateFormData({ BUREAU_QUERY_INTENSITY: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-yellow-400/30 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-400/20 hover:border-yellow-400/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-slate-900/50 text-yellow-100 placeholder:text-yellow-300/30 border focus:outline-none"
              />
              {hoveredInput === "BUREAU_QUERY_INTENSITY" && (
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

          {/* SHORT_TERM_BUREAU_RATIO - Amber */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("SHORT_TERM_BUREAU_RATIO")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="SHORT_TERM_BUREAU_RATIO"
              className="text-sm font-semibold text-amber-300 group-hover/input:text-amber-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Short Term Bureau Ratio
            </label>
            <div className="relative mt-2">
              <input
                id="SHORT_TERM_BUREAU_RATIO"
                type="number"
                step="0.01"
                placeholder="Enter ratio"
                value={formData.SHORT_TERM_BUREAU_RATIO || ""}
                onChange={(e) => updateFormData({ SHORT_TERM_BUREAU_RATIO: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-amber-400/30 focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)] bg-slate-900/50 text-amber-100 placeholder:text-amber-300/30 border focus:outline-none"
              />
              {hoveredInput === "SHORT_TERM_BUREAU_RATIO" && (
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

          {/* HAS_ALL_DOCS - Orange */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("HAS_ALL_DOCS")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="HAS_ALL_DOCS"
              className="text-sm font-semibold text-orange-300 group-hover/input:text-orange-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Has All Documents
            </label>
            <div className="relative mt-2">
              <input
                id="HAS_ALL_DOCS"
                type="number"
                min={0}
                max={4}
                placeholder="Enter count (0-4)"
                value={formData.HAS_ALL_DOCS || ""}
                onChange={(e) => updateFormData({ HAS_ALL_DOCS: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-orange-400/30 focus:border-orange-500 focus:ring-4 focus:ring-orange-400/20 hover:border-orange-400/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] bg-slate-900/50 text-orange-100 placeholder:text-orange-300/30 border focus:outline-none"
              />
              {hoveredInput === "HAS_ALL_DOCS" && (
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

          {/* STABILITY_SCORE - Red */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("STABILITY_SCORE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="STABILITY_SCORE"
              className="text-sm font-semibold text-red-300 group-hover/input:text-red-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Stability Score
            </label>
            <div className="relative mt-2">
              <input
                id="STABILITY_SCORE"
                type="number"
                step="0.01"
                placeholder="Enter stability score"
                value={formData.STABILITY_SCORE || ""}
                onChange={(e) => updateFormData({ STABILITY_SCORE: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-red-400/30 focus:border-red-500 focus:ring-4 focus:ring-red-400/20 hover:border-red-400/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] bg-slate-900/50 text-red-100 placeholder:text-red-300/30 border focus:outline-none"
              />
              {hoveredInput === "STABILITY_SCORE" && (
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
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            transition: transform 0.3s;
          }
          input[type="checkbox"]:checked::after {
            transform: translateX(24px);
          }
        `}</style>
      </div>
    </div>
  );
}