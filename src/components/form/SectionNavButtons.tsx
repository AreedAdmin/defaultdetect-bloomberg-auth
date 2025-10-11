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
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
      <Button
        onClick={handlePrevious}
        disabled={currentSection === 1}
        variant="outline"
        className="gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <Button
        onClick={handleNext}
        disabled={currentSection === 12}
        className="gap-2 bg-accent hover:bg-accent/90"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
