interface SectionTitleProps {
  number: number;
  title: string;
  description: string;
}

export const SectionTitle = ({ number, title, description }: SectionTitleProps) => {
  return (
    <div className="relative mb-8 rounded-xl bg-gradient-to-r from-[hsl(217_25%_15%)] to-[hsl(217_33%_7%)] border border-[hsl(187_85%_48%/0.2)] shadow-lg overflow-hidden group">
      {/* Animated shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
          style={{
            animation: 'shine 3s ease-in-out infinite',
          }}
        />
      </div>
      
      <div className="relative px-6 py-5 flex items-center gap-6">
        <div className="text-6xl font-bold text-accent/40 leading-none">
          {String(number).padStart(2, '0')}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
