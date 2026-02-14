import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, FileSearch, Sparkles, Scissors, Brain, Layers, ArrowRight } from "lucide-react";

const steps = [
  { icon: Upload, label: "PDF Upload", desc: "Accept any product manual", color: "primary" },
  { icon: FileSearch, label: "Text Extraction", desc: "Parse pages with precision", color: "primary" },
  { icon: Sparkles, label: "Cleaning", desc: "Strip noise & normalize", color: "primary" },
  { icon: Scissors, label: "Section Filtering", desc: "Isolate setup content", color: "accent" },
  { icon: Brain, label: "LLM Transform", desc: "Rewrite for clarity", color: "accent" },
  { icon: Layers, label: "Guide Assembly", desc: "Structured JSON output", color: "accent" },
];

const PipelineSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pipeline" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">Architecture</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            The <span className="text-gradient-primary">Pipeline</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Not AI magic — smart engineering. Every stage improves quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isPrimary = step.color === "primary";
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative"
              >
                <div className="glass rounded-xl p-6 h-full transition-all duration-300 hover:border-glow hover:glow-primary">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isPrimary ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.label}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>

                {/* Connector arrow on larger screens */}
                {i < steps.length - 1 && i % 3 !== 2 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20">
                    <ArrowRight className="w-5 h-5 text-muted-foreground/30" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
