import { Check, Circle } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { cn } from "@/lib/utils";

const sections = [
  "Client Identification",
  "Personal Information",
  "Income & Financial",
  "Age & Employment",
  "Contact Information",
  "Regional, Social, and Bureau Information",
  "Document Verification and Historical Application Timing",
  "Previous Loan Attributes and Stability Indicatorss",
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

  const completionPercentage = Math.round((visitedSections.size / 8) * 100);

  return (
    <aside className="w-56 flex flex-col h-full bg-gradient-to-b from-[hsl(217_25%_15%)] to-[hsl(217_33%_7%)] border-r border-[hsl(187_85%_48%/0.2)]">
      <div className="px-4 py-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Form Sections</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
            {completionPercentage}%
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-hidden py-3 px-3">
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
                    "w-full flex items-center gap-2 px-2 py-2 rounded-md text-xs transition-all duration-200 relative",
                    isCurrent && "bg-accent/20 text-foreground font-medium",
                    !isCurrent && isVisited && "hover:bg-accent/10 text-muted-foreground hover:text-foreground",
                    !isVisited && "text-muted-foreground/50 cursor-not-allowed",
                    isCompleted && !isCurrent && "text-muted-foreground",
                  )}
                >
                  {isCurrent && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-r-full" />}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {isCompleted ? (
                      <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center animate-in zoom-in duration-200">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    ) : (
                      <Circle
                        className={cn(
                          "w-4 h-4 transition-colors",
                          isCurrent ? "text-accent fill-accent/20" : "text-muted-foreground/50",
                        )}
                      />
                    )}
                  </div>
                  <span className="text-left flex-1 leading-tight">{section}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-3 border-t border-success/20 bg-success/5">
        <div className="flex items-center gap-2 text-xs text-success">
          <div className="w-2 h-2 rounded-full bg-success animate-[pulse-glow_2s_ease-in-out_infinite]" />
          <span className="font-medium">Auto-save enabled</span>
        </div>
      </div>
    </aside>
  );
};
