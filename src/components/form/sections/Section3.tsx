import { useState } from "react";

export default function Section3() {
  const [formData, setFormData] = useState({
    AMT_INCOME_TOTAL: null,
    NAME_INCOME_TYPE: "",
    AMT_CREDIT_x: null,
    AMT_ANNUITY_x: null,
    AMT_ANNUITY_x_missing: false,
    AMT_GOODS_PRICE_x: null,
    AMT_GOODS_PRICE_x_missing: false,
    CNT_FAM_MEMBERS: 1,
    CNT_CHILDREN: 0,
  });
  const [hoveredInput, setHoveredInput] = useState(null);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Auto-calculated ratios
  const creditIncomeRatio =
    formData.AMT_CREDIT_x && formData.AMT_INCOME_TOTAL ? formData.AMT_CREDIT_x / formData.AMT_INCOME_TOTAL : 0;

  const annuityIncomeRatio =
    formData.AMT_ANNUITY_x && formData.AMT_INCOME_TOTAL ? (formData.AMT_ANNUITY_x * 12) / formData.AMT_INCOME_TOTAL : 0;

  const creditGoodsRatio =
    formData.AMT_CREDIT_x && formData.AMT_GOODS_PRICE_x ? formData.AMT_CREDIT_x / formData.AMT_GOODS_PRICE_x : 0;

  const incomePerPerson = formData.AMT_INCOME_TOTAL ? formData.AMT_INCOME_TOTAL / formData.CNT_FAM_MEMBERS : 0;

  const childrenRatio = formData.CNT_FAM_MEMBERS > 0 ? formData.CNT_CHILDREN / formData.CNT_FAM_MEMBERS : 0;

  const paymentRate =
    formData.AMT_ANNUITY_x && formData.AMT_CREDIT_x ? formData.AMT_ANNUITY_x / formData.AMT_CREDIT_x : 0;

  const getRiskLevel = (val) => {
    if (val > 4) return { color: "red", label: "High Risk" };
    if (val >= 2) return { color: "yellow", label: "Medium Risk" };
    return { color: "emerald", label: "Low Risk" };
  };

  const formatCurrency = (value) => {
    if (!value) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          {/* AMT_INCOME_TOTAL - Indigo */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("AMT_INCOME_TOTAL")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="AMT_INCOME_TOTAL"
              className="required text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Total Annual Income
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300/50 pointer-events-none">$</span>
              <input
                id="AMT_INCOME_TOTAL"
                type="number"
                placeholder="Enter total annual income"
                value={formData.AMT_INCOME_TOTAL || ""}
                onChange={(e) => updateFormData({ AMT_INCOME_TOTAL: Number(e.target.value) || null })}
                required
                className="w-full pl-8 pr-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30 border focus:outline-none"
              />
              {hoveredInput === "AMT_INCOME_TOTAL" && (
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

          {/* NAME_INCOME_TYPE - Blue */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("NAME_INCOME_TYPE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="NAME_INCOME_TYPE"
              className="required text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Income Type
            </label>
            <div className="relative mt-2">
              <select
                id="NAME_INCOME_TYPE"
                value={formData.NAME_INCOME_TYPE}
                onChange={(e) => updateFormData({ NAME_INCOME_TYPE: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-blue-400/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 text-blue-100 border focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900">
                  Select income type
                </option>
                <option value="Working" className="bg-slate-900">
                  Working
                </option>
                <option value="Commercial associate" className="bg-slate-900">
                  Commercial associate
                </option>
                <option value="Pensioner" className="bg-slate-900">
                  Pensioner
                </option>
                <option value="State servant" className="bg-slate-900">
                  State servant
                </option>
                <option value="Student" className="bg-slate-900">
                  Student
                </option>
                <option value="Businessman" className="bg-slate-900">
                  Businessman
                </option>
                <option value="Maternity leave" className="bg-slate-900">
                  Maternity leave
                </option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-300">▼</div>
              {hoveredInput === "NAME_INCOME_TYPE" && (
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

          {/* AMT_CREDIT_x - Sky */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("AMT_CREDIT_x")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="AMT_CREDIT_x"
              className="required text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Current Loan Credit Amount
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-300/50 pointer-events-none">$</span>
              <input
                id="AMT_CREDIT_x"
                type="number"
                placeholder="Enter credit amount"
                value={formData.AMT_CREDIT_x || ""}
                onChange={(e) => updateFormData({ AMT_CREDIT_x: Number(e.target.value) || null })}
                required
                className="w-full pl-8 pr-4 py-2 rounded-md transition-all duration-300 border-sky-400/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-400/20 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 text-sky-100 placeholder:text-sky-300/30 border focus:outline-none"
              />
              {hoveredInput === "AMT_CREDIT_x" && (
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

          {/* AMT_ANNUITY_x - Cyan */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("AMT_ANNUITY_x")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="AMT_ANNUITY_x"
              className="text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Current Loan Annuity (Monthly)
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300/50 pointer-events-none">$</span>
              <input
                id="AMT_ANNUITY_x"
                type="number"
                placeholder="Enter monthly annuity"
                value={formData.AMT_ANNUITY_x || ""}
                onChange={(e) => updateFormData({ AMT_ANNUITY_x: Number(e.target.value) || null })}
                className="w-full pl-8 pr-4 py-2 rounded-md transition-all duration-300 border-cyan-400/30 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 text-cyan-100 placeholder:text-cyan-300/30 border focus:outline-none"
              />
              {hoveredInput === "AMT_ANNUITY_x" && (
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

          {/* AMT_ANNUITY_x_missing - Teal Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("AMT_ANNUITY_x_missing")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-teal-400/30 hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="AMT_ANNUITY_x_missing"
                className="text-sm font-semibold text-teal-300 group-hover/input:text-teal-400 transition-all duration-300 cursor-pointer"
              >
                Annuity Data Unavailable
              </label>
              <input
                id="AMT_ANNUITY_x_missing"
                type="checkbox"
                checked={formData.AMT_ANNUITY_x_missing}
                onChange={(e) => updateFormData({ AMT_ANNUITY_x_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-teal-500"
                style={{
                  boxShadow: formData.AMT_ANNUITY_x_missing ? "0 0 10px rgba(20,184,166,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "AMT_ANNUITY_x_missing" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* AMT_GOODS_PRICE_x - Emerald */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("AMT_GOODS_PRICE_x")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="AMT_GOODS_PRICE_x"
              className="text-sm font-semibold text-emerald-300 group-hover/input:text-emerald-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Price of Goods for Current Loan
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300/50 pointer-events-none">
                $
              </span>
              <input
                id="AMT_GOODS_PRICE_x"
                type="number"
                placeholder="Enter goods price"
                value={formData.AMT_GOODS_PRICE_x || ""}
                onChange={(e) => updateFormData({ AMT_GOODS_PRICE_x: Number(e.target.value) || null })}
                className="w-full pl-8 pr-4 py-2 rounded-md transition-all duration-300 border-emerald-400/30 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-400/20 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-slate-900/50 text-emerald-100 placeholder:text-emerald-300/30 border focus:outline-none"
              />
              {hoveredInput === "AMT_GOODS_PRICE_x" && (
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

          {/* AMT_GOODS_PRICE_x_missing - Green Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("AMT_GOODS_PRICE_x_missing")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-green-400/30 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="AMT_GOODS_PRICE_x_missing"
                className="text-sm font-semibold text-green-300 group-hover/input:text-green-400 transition-all duration-300 cursor-pointer"
              >
                Goods Price Unavailable
              </label>
              <input
                id="AMT_GOODS_PRICE_x_missing"
                type="checkbox"
                checked={formData.AMT_GOODS_PRICE_x_missing}
                onChange={(e) => updateFormData({ AMT_GOODS_PRICE_x_missing: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-green-500"
                style={{
                  boxShadow: formData.AMT_GOODS_PRICE_x_missing ? "0 0 10px rgba(34,197,94,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "AMT_GOODS_PRICE_x_missing" && (
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

        {/* Auto-Calculated Ratios Section */}
        <div className="pt-6 space-y-4">
          <h3 className="text-xl font-bold text-indigo-300">Auto-Calculated Financial Ratios</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Credit/Income Ratio */}
            <div
              className={`p-6 rounded-lg border-2 bg-slate-900/50 ${
                getRiskLevel(creditIncomeRatio).color === "red"
                  ? "border-red-400/50"
                  : getRiskLevel(creditIncomeRatio).color === "yellow"
                    ? "border-yellow-400/50"
                    : "border-emerald-400/50"
              }`}
            >
              <p className="text-sm text-slate-400 mb-1">Credit/Income Ratio</p>
              <p
                className={`text-3xl font-bold ${
                  getRiskLevel(creditIncomeRatio).color === "red"
                    ? "text-red-400"
                    : getRiskLevel(creditIncomeRatio).color === "yellow"
                      ? "text-yellow-400"
                      : "text-emerald-400"
                }`}
              >
                {creditIncomeRatio.toFixed(2)}x
              </p>
              <p className="text-xs text-slate-500 mt-1">{getRiskLevel(creditIncomeRatio).label}</p>
            </div>

            {/* Annuity/Income Ratio */}
            <div
              className={`p-6 rounded-lg border-2 bg-slate-900/50 ${
                getRiskLevel(annuityIncomeRatio).color === "red"
                  ? "border-red-400/50"
                  : getRiskLevel(annuityIncomeRatio).color === "yellow"
                    ? "border-yellow-400/50"
                    : "border-emerald-400/50"
              }`}
            >
              <p className="text-sm text-slate-400 mb-1">Annuity/Income Ratio</p>
              <p
                className={`text-3xl font-bold ${
                  getRiskLevel(annuityIncomeRatio).color === "red"
                    ? "text-red-400"
                    : getRiskLevel(annuityIncomeRatio).color === "yellow"
                      ? "text-yellow-400"
                      : "text-emerald-400"
                }`}
              >
                {annuityIncomeRatio.toFixed(2)}x
              </p>
              <p className="text-xs text-slate-500 mt-1">{getRiskLevel(annuityIncomeRatio).label}</p>
            </div>

            {/* Credit/Goods Ratio */}
            <div className="p-6 rounded-lg border-2 border-blue-400/50 bg-slate-900/50">
              <p className="text-sm text-slate-400 mb-1">Credit/Goods Ratio</p>
              <p className="text-3xl font-bold text-blue-400">{creditGoodsRatio.toFixed(2)}x</p>
            </div>

            {/* Income Per Person */}
            <div className="p-6 rounded-lg border-2 border-cyan-400/50 bg-slate-900/50">
              <p className="text-sm text-slate-400 mb-1">Income Per Person</p>
              <p className="text-3xl font-bold text-cyan-400">{formatCurrency(incomePerPerson)}</p>
            </div>

            {/* Children Ratio */}
            <div className="p-6 rounded-lg border-2 border-indigo-400/50 bg-slate-900/50">
              <p className="text-sm text-slate-400 mb-1">Children Ratio</p>
              <p className="text-3xl font-bold text-indigo-400">{(childrenRatio * 100).toFixed(1)}%</p>
            </div>

            {/* Payment Rate */}
            <div className="p-6 rounded-lg border-2 border-violet-400/50 bg-slate-900/50">
              <p className="text-sm text-slate-400 mb-1">Payment Rate</p>
              <p className="text-3xl font-bold text-violet-400">{(paymentRate * 100).toFixed(2)}%</p>
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
