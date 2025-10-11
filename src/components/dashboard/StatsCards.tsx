import { Briefcase, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Briefcase,
    title: "Trusted by 500+",
    subtitle: "Institutions",
  },
  {
    icon: Target,
    title: "99.2% Predictive",
    subtitle: "Accuracy",
  },
  {
    icon: Zap,
    title: "Real-time",
    subtitle: "Assessment",
  },
];

export const StatsCards = () => {
  return (
    <section className="px-8 py-12 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl p-8 backdrop-blur-sm bg-card/50 border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-accent/10">
                  <Icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {stat.title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {stat.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
