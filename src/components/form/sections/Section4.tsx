import { useState } from "react";

export default function Section4() {
  const [formData, setFormData] = useState({
    DAYS_BIRTH: null,
    DAYS_EMPLOYED: null,
    DAYS_REGISTRATION: null,
    DAYS_ID_PUBLISH: null,
    DAYS_LAST_PHONE_CHANGE: null,
  });
  const [hoveredInput, setHoveredInput] = useState(null);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Auto-calculated values
  const ageYears = formData.DAYS_BIRTH ? Math.abs(formData.DAYS_BIRTH) / 365.25 : 0;
  const employedYears = formData.DAYS_EMPLOYED ? Math.abs(formData.DAYS_EMPLOYED) / 365.25 : 0;
  const registrationYearsAgo = formData.DAYS_REGISTRATION ? Math.abs(formData.DAYS_REGISTRATION) / 365.25 : 0;
  const idPublishYearsAgo = formData.DAYS_ID_PUBLISH ? Math.abs(formData.DAYS_ID_PUBLISH) / 365.25 : 0;
  const phoneChangeYearsAgo = formData.DAYS_LAST_PHONE_CHANGE ? Math.abs(formData.DAYS_LAST_PHONE_CHANGE) / 365.25 : 0;
  const employmentToAgeRatio = ageYears > 0 ? employedYears / ageYears : 0;

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          {/* DAYS_BIRTH - Indigo */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_BIRTH")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_BIRTH"
              className="required text-sm font-semibold text-indigo-300 group-hover/input:text-indigo-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days Since Birth (negative value)
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_BIRTH"
                type="number"
                placeholder="-12000"
                value={formData.DAYS_BIRTH || ""}
                onChange={(e) => updateFormData({ DAYS_BIRTH: Number(e.target.value) || null })}
                required
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-indigo-400/30 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-900/50 text-indigo-100 placeholder:text-indigo-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_BIRTH" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
            {ageYears > 0 && <p className="text-sm text-indigo-400 mt-1">Age: {ageYears.toFixed(1)} years</p>}
          </div>

          {/* DAYS_EMPLOYED - Blue */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_EMPLOYED")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_EMPLOYED"
              className="text-sm font-semibold text-blue-300 group-hover/input:text-blue-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days of Current Employment (negative = before application)
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_EMPLOYED"
                type="number"
                placeholder="-2000"
                value={formData.DAYS_EMPLOYED || ""}
                onChange={(e) => updateFormData({ DAYS_EMPLOYED: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-blue-400/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/50 text-blue-100 placeholder:text-blue-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_EMPLOYED" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
            {employedYears > 0 && (
              <p className="text-sm text-blue-400 mt-1">Employment years: {employedYears.toFixed(1)} years</p>
            )}
          </div>

          {/* DAYS_REGISTRATION - Sky */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_REGISTRATION")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_REGISTRATION"
              className="text-sm font-semibold text-sky-300 group-hover/input:text-sky-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days Since Registration Change
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_REGISTRATION"
                type="number"
                placeholder="-3000"
                value={formData.DAYS_REGISTRATION || ""}
                onChange={(e) => updateFormData({ DAYS_REGISTRATION: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-sky-400/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-400/20 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-slate-900/50 text-sky-100 placeholder:text-sky-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_REGISTRATION" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
            {registrationYearsAgo > 0 && (
              <p className="text-sm text-sky-400 mt-1">Registration: {registrationYearsAgo.toFixed(1)} years ago</p>
            )}
          </div>

          {/* DAYS_ID_PUBLISH - Cyan */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_ID_PUBLISH")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_ID_PUBLISH"
              className="text-sm font-semibold text-cyan-300 group-hover/input:text-cyan-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days Since ID Publication
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_ID_PUBLISH"
                type="number"
                placeholder="-2500"
                value={formData.DAYS_ID_PUBLISH || ""}
                onChange={(e) => updateFormData({ DAYS_ID_PUBLISH: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-cyan-400/30 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/50 text-cyan-100 placeholder:text-cyan-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_ID_PUBLISH" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
            {idPublishYearsAgo > 0 && (
              <p className="text-sm text-cyan-400 mt-1">ID published: {idPublishYearsAgo.toFixed(1)} years ago</p>
            )}
          </div>

          {/* DAYS_LAST_PHONE_CHANGE - Teal */}
          <div
            className="group/input relative"
            onMouseEnter={() => setHoveredInput("DAYS_LAST_PHONE_CHANGE")}
            onMouseLeave={() => setHoveredInput(null)}
          >
            <label
              htmlFor="DAYS_LAST_PHONE_CHANGE"
              className="text-sm font-semibold text-teal-300 group-hover/input:text-teal-400 transition-all duration-300 inline-block group-hover/input:translate-x-1"
            >
              Days Since Last Phone Change
            </label>
            <div className="relative mt-2">
              <input
                id="DAYS_LAST_PHONE_CHANGE"
                type="number"
                placeholder="-500"
                value={formData.DAYS_LAST_PHONE_CHANGE || ""}
                onChange={(e) => updateFormData({ DAYS_LAST_PHONE_CHANGE: Number(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-md transition-all duration-300 border-teal-400/30 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] bg-slate-900/50 text-teal-100 placeholder:text-teal-300/30 border focus:outline-none"
              />
              {hoveredInput === "DAYS_LAST_PHONE_CHANGE" && (
                <div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.2), transparent)",
                    animation: "borderGlow 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
            {phoneChangeYearsAgo > 0 && (
              <p className="text-sm text-teal-400 mt-1">Phone changed: {phoneChangeYearsAgo.toFixed(1)} years ago</p>
            )}
          </div>

          {/* Timeline Animation */}
          <div className="relative py-8">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 via-sky-500 to-cyan-500 rounded-full opacity-30"></div>
            <div
              className="absolute top-1/2 left-0 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 via-sky-500 to-cyan-500"
              style={{
                width: "0%",
                animation: "progressFlow 3s ease-in-out infinite",
              }}
            ></div>
            <div className="flex justify-between relative">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 animate-pulse"></div>
                <span className="text-xs text-indigo-300 mt-2">Birth</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span className="text-xs text-blue-300 mt-2">Employment</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full bg-sky-500 shadow-lg shadow-sky-500/50 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span className="text-xs text-sky-300 mt-2">Registration</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <span className="text-xs text-cyan-300 mt-2">ID Publish</span>
              </div>
            </div>
          </div>
        </div>

        {/* Employment to Age Ratio Card */}
        {employmentToAgeRatio > 0 && (
          <div className="mt-6 p-6 rounded-lg border-2 border-emerald-400/50 bg-slate-900/50">
            <h4 className="text-sm font-medium text-slate-400 mb-2">Employment to Age Ratio</h4>
            <p className="text-4xl font-bold text-emerald-400">{(employmentToAgeRatio * 100).toFixed(1)}%</p>
            <p className="text-sm text-slate-500 mt-2">
              You've been employed for {(employmentToAgeRatio * 100).toFixed(1)}% of your life
            </p>
          </div>
        )}

        <style>{`
          @keyframes borderGlow {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
          @keyframes progressFlow {
            0% { width: 0%; opacity: 0.5; }
            50% { width: 100%; opacity: 1; }
            100% { width: 100%; opacity: 0.5; }
          }
        `}</style>
      </div>
    </div>
  );
}
