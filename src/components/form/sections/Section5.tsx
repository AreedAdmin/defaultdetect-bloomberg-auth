import { useState } from "react";

export default function Section5() {
  const [formData, setFormData] = useState({
    FLAG_MOBIL: false,
    FLAG_EMP_PHONE: false,
    FLAG_WORK_PHONE: false,
    FLAG_CONT_MOBILE: false,
    FLAG_PHONE: false,
    FLAG_EMAIL: false,
  });
  const [hoveredInput, setHoveredInput] = useState(null);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const numActiveContacts = [
    formData.FLAG_MOBIL,
    formData.FLAG_EMP_PHONE,
    formData.FLAG_WORK_PHONE,
    formData.FLAG_CONT_MOBILE,
    formData.FLAG_PHONE,
    formData.FLAG_EMAIL,
  ].filter(Boolean).length;

  const hasWorkContact = formData.FLAG_WORK_PHONE || formData.FLAG_EMP_PHONE;

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          {/* FLAG_MOBIL - Indigo Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("FLAG_MOBIL")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-indigo-400/30 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="FLAG_MOBIL"
                className="text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 cursor-pointer"
              >
                Has Mobile Phone
              </label>
              <input
                id="FLAG_MOBIL"
                type="checkbox"
                checked={formData.FLAG_MOBIL}
                onChange={(e) => updateFormData({ FLAG_MOBIL: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-indigo-500"
                style={{
                  boxShadow: formData.FLAG_MOBIL ? "0 0 10px rgba(99,102,241,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "FLAG_MOBIL" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* FLAG_EMP_PHONE - Blue Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("FLAG_EMP_PHONE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-blue-400/30 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="FLAG_EMP_PHONE"
                className="text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 cursor-pointer"
              >
                Has Employer Phone
              </label>
              <input
                id="FLAG_EMP_PHONE"
                type="checkbox"
                checked={formData.FLAG_EMP_PHONE}
                onChange={(e) => updateFormData({ FLAG_EMP_PHONE: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-blue-500"
                style={{
                  boxShadow: formData.FLAG_EMP_PHONE ? "0 0 10px rgba(37,99,235,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "FLAG_EMP_PHONE" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* FLAG_WORK_PHONE - Sky Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("FLAG_WORK_PHONE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-sky-400/30 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="FLAG_WORK_PHONE"
                className="text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 cursor-pointer"
              >
                Has Work Phone
              </label>
              <input
                id="FLAG_WORK_PHONE"
                type="checkbox"
                checked={formData.FLAG_WORK_PHONE}
                onChange={(e) => updateFormData({ FLAG_WORK_PHONE: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-sky-500"
                style={{
                  boxShadow: formData.FLAG_WORK_PHONE ? "0 0 10px rgba(14,165,233,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "FLAG_WORK_PHONE" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* FLAG_CONT_MOBILE - Cyan Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("FLAG_CONT_MOBILE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-cyan-400/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="FLAG_CONT_MOBILE"
                className="text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 cursor-pointer"
              >
                Reachable via Mobile
              </label>
              <input
                id="FLAG_CONT_MOBILE"
                type="checkbox"
                checked={formData.FLAG_CONT_MOBILE}
                onChange={(e) => updateFormData({ FLAG_CONT_MOBILE: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-cyan-500"
                style={{
                  boxShadow: formData.FLAG_CONT_MOBILE ? "0 0 10px rgba(6,182,212,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "FLAG_CONT_MOBILE" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* FLAG_PHONE - Teal Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("FLAG_PHONE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-teal-400/30 hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="FLAG_PHONE"
                className="text-sm font-semibold text-teal-300 group-hover/input:text-teal-400 transition-all duration-300 cursor-pointer"
              >
                Has Home Phone
              </label>
              <input
                id="FLAG_PHONE"
                type="checkbox"
                checked={formData.FLAG_PHONE}
                onChange={(e) => updateFormData({ FLAG_PHONE: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-teal-500"
                style={{
                  boxShadow: formData.FLAG_PHONE ? "0 0 10px rgba(20,184,166,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "FLAG_PHONE" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* FLAG_EMAIL - Emerald Toggle */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("FLAG_EMAIL")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-emerald-400/30 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="FLAG_EMAIL"
                className="text-sm font-semibold text-emerald-300 group-hover/input:text-emerald-400 transition-all duration-300 cursor-pointer"
              >
                Has Email Address
              </label>
              <input
                id="FLAG_EMAIL"
                type="checkbox"
                checked={formData.FLAG_EMAIL}
                onChange={(e) => updateFormData({ FLAG_EMAIL: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-emerald-500"
                style={{
                  boxShadow: formData.FLAG_EMAIL ? "0 0 10px rgba(16,185,129,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "FLAG_EMAIL" && (
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <div className="p-6 rounded-lg border-2 border-blue-400/50 bg-slate-900/50">
            <h4 className="text-sm font-medium text-slate-400 mb-2">Active Contact Methods</h4>
            <p className="text-5xl font-bold text-blue-400">{numActiveContacts}</p>
            <p className="text-xs text-slate-500 mt-2">out of 6 possible methods</p>
          </div>

          <div
            className={`p-6 rounded-lg border-2 bg-slate-900/50 ${
              hasWorkContact ? "border-emerald-400/50" : "border-red-400/50"
            }`}
          >
            <h4 className="text-sm font-medium text-slate-400 mb-2">Work Contact Available</h4>
            <p className={`text-5xl font-bold ${hasWorkContact ? "text-emerald-400" : "text-red-400"}`}>
              {hasWorkContact ? "Yes" : "No"}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {hasWorkContact ? "Employer or work phone provided" : "No work contact information"}
            </p>
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
