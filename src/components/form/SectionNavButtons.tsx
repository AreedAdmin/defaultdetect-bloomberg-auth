import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function SectionNavButtons() {
  const [currentSection, setCurrentSection] = useState(1);

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleNext = () => {
    if (currentSection < 12) {
      setCurrentSection(currentSection + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation buttons at the top */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-700/50">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-navy-900 border-2 border-blue-700 text-white font-semibold hover:bg-blue-900 hover:border-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-navy-900 disabled:hover:border-blue-700 disabled:hover:shadow-none"
            style={{ backgroundColor: currentSection === 1 ? "#0c1e3d" : "#1e3a5f" }}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <span className="text-slate-400 font-medium">Section {currentSection} of 12</span>

          <button
            onClick={handleNext}
            disabled={currentSection === 12}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-800 to-blue-700 text-white font-semibold border-0 shadow-lg hover:from-blue-900 hover:to-blue-800 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Demo content area */}
        <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-700/50">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Section {currentSection}</h2>
          <p className="text-slate-300">Form content goes here...</p>
        </div>
      </div>
    </div>
  );
}
