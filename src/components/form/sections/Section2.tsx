import { useState } from "react";

export default function Section2() {
  const [formData, setFormData] = useState({
    CODE_GENDER: null,
    FLAG_OWN_CAR: false,
    FLAG_OWN_REALTY: false,
    CNT_CHILDREN: null,
    CNT_FAM_MEMBERS: null,
    NAME_EDUCATION_TYPE: "",
    NAME_FAMILY_STATUS: "",
    NAME_HOUSING_TYPE: "",
    OCCUPATION_TYPE: "",
    ORGANIZATION_TYPE: "",
  });
  const [hoveredInput, setHoveredInput] = useState(null);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          {/* Gender - Indigo Dropdown */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("CODE_GENDER")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="CODE_GENDER"
              className="required text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Gender
            </label>
            <div className="relative mt-2">
              <select
                id="CODE_GENDER"
                value={formData.CODE_GENDER === null ? "" : formData.CODE_GENDER}
                onChange={(e) => updateFormData({ CODE_GENDER: e.target.value === "" ? null : Number(e.target.value) })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 border focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900">
                  Select gender
                </option>
                <option value="1" className="bg-slate-900">
                  Male (1)
                </option>
                <option value="0.5" className="bg-slate-900">
                  N/A (0.5)
                </option>
                <option value="0" className="bg-slate-900">
                  Female (0)
                </option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-300">▼</div>
              {hoveredInput === "CODE_GENDER" && (
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

          {/* Own Car - Blue */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("FLAG_OWN_CAR")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-blue-400/30 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="FLAG_OWN_CAR"
                className="text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 cursor-pointer"
              >
                Do you own a car?
              </label>
              <input
                id="FLAG_OWN_CAR"
                type="checkbox"
                checked={formData.FLAG_OWN_CAR}
                onChange={(e) => updateFormData({ FLAG_OWN_CAR: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-blue-500"
                style={{
                  boxShadow: formData.FLAG_OWN_CAR ? "0 0 10px rgba(59,130,246,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "FLAG_OWN_CAR" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* Own Realty - Sky */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("FLAG_OWN_REALTY")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <div className="flex items-center justify-between p-4 rounded-md transition-all duration-300 border-sky-400/30 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 border">
              <label
                htmlFor="FLAG_OWN_REALTY"
                className="text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 cursor-pointer"
              >
                Do you own real estate?
              </label>
              <input
                id="FLAG_OWN_REALTY"
                type="checkbox"
                checked={formData.FLAG_OWN_REALTY}
                onChange={(e) => updateFormData({ FLAG_OWN_REALTY: e.target.checked })}
                className="w-12 h-6 appearance-none bg-slate-700 rounded-full relative cursor-pointer transition-colors duration-300 checked:bg-sky-500"
                style={{
                  boxShadow: formData.FLAG_OWN_REALTY ? "0 0 10px rgba(14,165,233,0.5)" : "none",
                }}
              />
            </div>
            {hoveredInput === "FLAG_OWN_REALTY" && (
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.2), transparent)",
                  animation: "borderGlow 2s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* Number of Children - Cyan */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("CNT_CHILDREN")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="CNT_CHILDREN"
              className="required text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Number of Children
            </label>
            <div className="relative mt-2">
              <input
                id="CNT_CHILDREN"
                type="number"
                placeholder="Enter number of children"
                value={formData.CNT_CHILDREN || ""}
                onChange={(e) => updateFormData({ CNT_CHILDREN: Number(e.target.value) || null })}
                min={0}
                max={15}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-cyan-400/30 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 text-cyan-100 placeholder:text-cyan-300/30 border focus:outline-none"
              />
              {hoveredInput === "CNT_CHILDREN" && (
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

          {/* Number of Family Members - Teal */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("CNT_FAM_MEMBERS")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="CNT_FAM_MEMBERS"
              className="required text-sm font-semibold text-teal-300 group-hover/input:text-teal-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Number of Family Members
            </label>
            <div className="relative mt-2">
              <input
                id="CNT_FAM_MEMBERS"
                type="number"
                placeholder="Enter number of family members"
                value={formData.CNT_FAM_MEMBERS || ""}
                onChange={(e) => updateFormData({ CNT_FAM_MEMBERS: Math.max(1, Number(e.target.value)) || null })}
                min={1}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-teal-400/30 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] bg-slate-900/50 text-teal-100 placeholder:text-teal-300/30 border focus:outline-none"
              />
              {hoveredInput === "CNT_FAM_MEMBERS" && (
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

          {/* Education Level - Indigo */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("NAME_EDUCATION_TYPE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="NAME_EDUCATION_TYPE"
              className="required text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Education Level
            </label>
            <div className="relative mt-2">
              <input
                id="NAME_EDUCATION_TYPE"
                type="text"
                placeholder="Enter education level (e.g., Higher education, Secondary)"
                value={formData.NAME_EDUCATION_TYPE}
                onChange={(e) => updateFormData({ NAME_EDUCATION_TYPE: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30 border focus:outline-none"
              />
              {hoveredInput === "NAME_EDUCATION_TYPE" && (
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

          {/* Family Status - Blue */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("NAME_FAMILY_STATUS")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="NAME_FAMILY_STATUS"
              className="required text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Family Status
            </label>
            <div className="relative mt-2">
              <input
                id="NAME_FAMILY_STATUS"
                type="text"
                placeholder="Enter family status (e.g., Married, Single)"
                value={formData.NAME_FAMILY_STATUS}
                onChange={(e) => updateFormData({ NAME_FAMILY_STATUS: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-blue-400/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 text-blue-100 placeholder:text-blue-300/30 border focus:outline-none"
              />
              {hoveredInput === "NAME_FAMILY_STATUS" && (
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

          {/* Housing Type - Sky */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("NAME_HOUSING_TYPE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="NAME_HOUSING_TYPE"
              className="required text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Housing Type
            </label>
            <div className="relative mt-2">
              <input
                id="NAME_HOUSING_TYPE"
                type="text"
                placeholder="Enter housing type (e.g., House/apartment, With parents)"
                value={formData.NAME_HOUSING_TYPE}
                onChange={(e) => updateFormData({ NAME_HOUSING_TYPE: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-sky-400/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-400/20 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 text-sky-100 placeholder:text-sky-300/30 border focus:outline-none"
              />
              {hoveredInput === "NAME_HOUSING_TYPE" && (
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

          {/* Occupation - Cyan */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("OCCUPATION_TYPE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="OCCUPATION_TYPE"
              className="required text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Occupation
            </label>
            <div className="relative mt-2">
              <input
                id="OCCUPATION_TYPE"
                type="text"
                placeholder="Enter occupation (e.g., Manager, Sales staff)"
                value={formData.OCCUPATION_TYPE}
                onChange={(e) => updateFormData({ OCCUPATION_TYPE: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-cyan-400/30 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 text-cyan-100 placeholder:text-cyan-300/30 border focus:outline-none"
              />
              {hoveredInput === "OCCUPATION_TYPE" && (
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

          {/* Organization Type - Teal */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("ORGANIZATION_TYPE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="ORGANIZATION_TYPE"
              className="required text-sm font-semibold text-teal-300 group-hover/input:text-teal-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Organization Type
            </label>
            <div className="relative mt-2">
              <input
                id="ORGANIZATION_TYPE"
                type="text"
                placeholder="Enter organization type (e.g., Bank, Government)"
                value={formData.ORGANIZATION_TYPE}
                onChange={(e) => updateFormData({ ORGANIZATION_TYPE: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-teal-400/30 focus:border-teal-500 focus:ring-4 focus:ring-teal-400/20 hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] bg-slate-900/50 text-teal-100 placeholder:text-teal-300/30 border focus:outline-none"
              />
              {hoveredInput === "ORGANIZATION_TYPE" && (
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
