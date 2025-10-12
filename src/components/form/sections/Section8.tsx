import { useState } from "react";

export default function Section8() {
  const [formData, setFormData] = useState({
    AMT_ANNUITY_y: null,
    AMT_APPLICATION: null,
    AMT_CREDIT_y: null,
    AMT_GOODS_PRICE_y: null,
    DAYS_FIRST_DRAWING: null,
    DAYS_FIRST_DUE: null,
    DAYS_LAST_DUE_1ST_VERSION: null,
    DAYS_LAST_DUE: null,
    DAYS_TERMINATION: null,
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
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 pointer-events-none">$</div>
              <input
                id="AMT_ANNUITY_y"
                type="number"
                step="0.01"
                placeholder="Enter previous annuity amount"
                value={formData.AMT_ANNUITY_y || ""}
                onChange={(e) => updateFormData({ AMT_ANNUITY_y: Number(e.target.value) || null })}
                min={0}
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

          {/* AMT_APPLICATION - Blue */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("AMT_APPLICATION")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="AMT_APPLICATION"
              className="text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Previous Application Amount
            </label>
            <div className="relative mt-2">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none">$</div>
              <input
                id="AMT_APPLICATION"
                type="number"
                step="0.01"
                placeholder="Enter previous application amount"
                value={formData.AMT_APPLICATION || ""}
                onChange={(e) => updateFormData({ AMT_APPLICATION: Number(e.target.value) || null })}
                min={0}
                className="w-full pl-8 pr-4 py-2 rounded-md transition-all duration-300 border-blue-400/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 text-blue-100 placeholder:text-blue-300/30 border focus:outline-none"
              />
              {hoveredInput === "AMT_APPLICATION" && (
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

          {/* AMT_CREDIT_y - Sky */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("AMT_CREDIT_y")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="AMT_CREDIT_y"
              className="text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Previous Credit Amount
            </label>
            <div className="relative mt-2">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-300 pointer-events-none">$</div>
              <input
                id="AMT_CREDIT_y"
                type="number"
                step="0.01"
                placeholder="Enter previous credit amount"
                value={formData.AMT_CREDIT_y || ""}
                onChange={(e) => updateFormData({ AMT_CREDIT_y: Number(e.target.value) || null })}
                min={0}
                className="w-full pl-8 pr-4 py-2 rounded-md transition-all duration-300 border-sky-400/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-400/20 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 text-sky-100 placeholder:text-sky-300/30 border focus:outline-none"
              />
              {hoveredInput === "AMT_CREDIT_y" && (
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

          {/* AMT_GOODS_PRICE_y - Cyan */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("AMT_GOODS_PRICE_y")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="AMT_GOODS_PRICE_y"
              className="text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Previous Goods Price
            </label>
            <div className="relative mt-2">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 pointer-events-none">$</div>
              <input
                id="AMT_GOODS_PRICE_y"
                type="number"
                step="0.01"
                placeholder="Enter previous goods price"
                value={formData.AMT_GOODS_PRICE_y || ""}
                onChange={(e) => updateFormData({ AMT_GOODS_PRICE_y: Number(e.target.value) || null })}
                min={0}
                className="w-full pl-8 pr-4 py-2 rounded-md transition-all duration-300 border-cyan-400/30 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 text-cyan-100 placeholder:text-cyan-300/30 border focus:outline-none"
              />
              {hoveredInput === "AMT_GOODS_PRICE_y" && (
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

          {/* Days Timing Fields */}
          {[
            { key: "DAYS_FIRST_DRAWING", label: "Days First Drawing", color: "teal", rgb: "20,184,166" },
            { key: "DAYS_FIRST_DUE", label: "Days First Due", color: "emerald", rgb: "16,185,129" },
            { key: "DAYS_LAST_DUE_1ST_VERSION", label: "Days Last Due (1st Version)", color: "indigo", rgb: "99,102,241" },
            { key: "DAYS_LAST_DUE", label: "Days Last Due", color: "blue", rgb: "37,99,235" },
            { key: "DAYS_TERMINATION", label: "Days Termination", color: "sky", rgb: "14,165,233" },
          ].map(({ key, label, color, rgb }) => (
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
                  placeholder={`Enter ${label.toLowerCase()} (negative value)`}
                  value={formData[key] || ""}
                  onChange={(e) => updateFormData({ [key]: Number(e.target.value) || null })}
                  max={0}
                  className={`w-full px-4 py-2 rounded-md transition-all duration-300 border-${color}-400/30 focus:border-${color}-500 focus:ring-4 focus:ring-${color}-400/20 hover:border-${color}-400/50 hover:shadow-[0_0_20px_rgba(${rgb},0.15)] bg-slate-900/50 text-${color}-100 placeholder:text-${color}-300/30 border focus:outline-none`}
                />
                {hoveredInput === key && (
                  <div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(${rgb}, 0.2), transparent)`,
                      animation: "borderGlow 2s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Text Input Fields for Loan Categories */}
          {[
            { key: "NAME_CONTRACT_TYPE_y", label: "Previous Contract Type", color: "cyan", rgb: "6,182,212" },
            { key: "NAME_CASH_LOAN_PURPOSE", label: "Cash Loan Purpose", color: "teal", rgb: "20,184,166" },
            { key: "NAME_CONTRACT_STATUS", label: "Contract Status", color: "emerald", rgb: "16,185,129" },
            { key: "NAME_PAYMENT_TYPE", label: "Payment Type", color: "indigo", rgb: "99,102,241" },
            { key: "CODE_REJECT_REASON", label: "Reject Reason Code", color: "blue", rgb: "37,99,235" },
            { key: "NAME_CLIENT_TYPE", label: "Client Type", color: "sky", rgb: "14,165,233" },
            { key: "NAME_GOODS_CATEGORY", label: "Goods Category", color: "cyan", rgb: "6,182,212" },
            { key: "NAME_PORTFOLIO", label: "Portfolio Name", color: "teal", rgb: "20,184,166" },
            { key: "NAME_PRODUCT_TYPE", label: "Product Type", color: "emerald", rgb: "16,185,129" },
            { key: "CHANNEL_TYPE", label: "Channel Type", color: "indigo", rgb: "99,102,241" },
            { key: "NAME_SELLER_INDUSTRY", label: "Seller Industry", color: "blue", rgb: "37,99,235" },
            { key: "NAME_YIELD_GROUP", label: "Yield Group", color: "sky", rgb: "14,165,233" },
            { key: "PRODUCT_COMBINATION", label: "Product Combination", color: "cyan", rgb: "6,182,212" },
          ].map(({ key, label, color, rgb }) => (
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
                  type="text"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={formData[key]}
                  onChange={(e) => updateFormData({ [key]: e.target.value })}
                  className={`w-full px-4 py-2 rounded-md transition-all duration-300 border-${color}-400/30 focus:border-${color}-500 focus:ring-4 focus:ring-${color}-400/20 hover:border-${color}-400/50 hover:shadow-[0_0_20px_rgba(${rgb},0.15)] bg-slate-900/50 text-${color}-100 placeholder:text-${color}-300/30 border focus:outline-none`}
                />
                {hoveredInput === key && (
                  <div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(${rgb}, 0.2), transparent)`,
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
