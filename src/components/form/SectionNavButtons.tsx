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
    if (currentSection < 12) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);
      markSectionVisited(nextSection);
    }
  };

  return (
    <div className="flex items-center justify-between pb-6 mb-6 border-b border-border/50">
      <Button
        onClick={handlePrevious}
        disabled={currentSection === 1}
        variant="outline"
        className="gap-2 bg-background border-border hover:border-accent hover:bg-accent/5 transition-all duration-200"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <Button
        onClick={handleNext}
        disabled={currentSection === 12}
        className="gap-2 bg-accent hover:bg-accent/90 text-white border-0 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
