import { Check } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { cn } from "@/lib/utils";

const sections = [
  "Client Identification",
  "Personal Information",
  "Income & Financial",
  "Age & Employment",
  "Contact Information",
  "Regional & Location",
  "Current Application",
  "External Data Sources",
  "Social Circle & Bureau",
  "Documents Provided",
  "Previous Application",
  "Derived Metrics",
];

export const SectionNavigation = () => {
  const { currentSection, setCurrentSection, visitedSections, markSectionVisited } = useFormContext();

  const handleSectionClick = (index: number) => {
    const sectionNumber = index + 1;
    if (visitedSections.has(sectionNumber)) {
      setCurrentSection(sectionNumber);
      markSectionVisited(sectionNumber);
    }
  };

  return (
    <aside className="w-64 bg-card border-r border-border p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-foreground mb-4 px-2">Form Sections</h3>
      <nav>
        <ul className="space-y-1">
          {sections.map((section, index) => {
            const sectionNumber = index + 1;
            const isVisited = visitedSections.has(sectionNumber);
            const isCurrent = currentSection === sectionNumber;
            const isCompleted = visitedSections.has(sectionNumber) && currentSection > sectionNumber;

            return (
              <li key={index}>
                <button
                  onClick={() => handleSectionClick(index)}
                  disabled={!isVisited}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300",
                    isCurrent && "bg-accent/20 text-foreground font-medium border-l-2 border-accent",
                    !isCurrent && isVisited && "hover:bg-muted text-foreground",
                    !isVisited && "text-muted-foreground cursor-not-allowed opacity-50"
                  )}
                >
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2",
                          isCurrent ? "border-accent bg-accent/20" : "border-muted"
                        )}
                      />
                    )}
                  </div>
                  <span className="text-left flex-1">{section}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
