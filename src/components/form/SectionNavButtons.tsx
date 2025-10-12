import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/FormContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SectionNavButtons = () => {
  const { currentSection, setCurrentSection, markSectionVisited } = useFormContext();

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleNext = () => {
    if (currentSection < 8) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);
      markSectionVisited(nextSection);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <Button
        onClick={handlePrevious}
        disabled={currentSection === 1}
        variant="outline"
        className="gap-2 bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500 transition-all duration-200"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <Button
        onClick={handleNext}
        disabled={currentSection === 8}
        className="gap-2 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
