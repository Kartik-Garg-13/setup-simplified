import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, AlertTriangle, XCircle, CheckSquare } from "lucide-react";

interface Step {
  step: number;
  instruction: string;
}

interface GuideData {
  title: string;
  estimated_time: string;
  steps: Step[];
  warnings: string[];
  common_mistakes: string[];
  final_checklist: string[];
}

interface GuideDisplayProps {
  guide: GuideData | null;
}

const GuideDisplay = ({ guide }: GuideDisplayProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (!guide) return null;

  return (
    <section ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">Output</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Your <span className="text-gradient-primary">Setup Guide</span>
          </h2>
        </motion.div>

        {/* Guide Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-border">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold">{guide.title}</h3>
                <p className="text-muted-foreground text-sm mt-1 font-mono">
                  Generated from your PDF manual
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-primary">{guide.estimated_time}</span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="p-8">
            <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">Steps</h4>
            <div className="space-y-4">
              {guide.steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono text-sm font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {step.step}
                  </div>
                  <p className="text-foreground/90 leading-relaxed pt-1">{step.instruction}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Warnings & Mistakes */}
          <div className="grid md:grid-cols-2 gap-0">
            {guide.warnings.length > 0 && (
              <div className="p-8 border-t border-border md:border-r">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                  <h4 className="font-mono text-xs text-accent uppercase tracking-widest">Warnings</h4>
                </div>
                <ul className="space-y-3">
                  {guide.warnings.map((w, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-accent mt-0.5">&bull;</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {guide.common_mistakes.length > 0 && (
              <div className="p-8 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <h4 className="font-mono text-xs text-destructive uppercase tracking-widest">Common Mistakes</h4>
                </div>
                <ul className="space-y-3">
                  {guide.common_mistakes.map((m, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-destructive mt-0.5">&bull;</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Checklist */}
          {guide.final_checklist.length > 0 && (
            <div className="p-8 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="w-4 h-4 text-primary" />
                <h4 className="font-mono text-xs text-primary uppercase tracking-widest">Final Checklist</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {guide.final_checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="w-5 h-5 rounded border-2 border-primary/40 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* JSON preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8"
        >
          <details className="group">
            <summary className="font-mono text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors">
              View raw JSON response &rarr;
            </summary>
            <pre className="mt-4 p-6 rounded-xl bg-card border border-border overflow-x-auto text-xs font-mono text-muted-foreground leading-relaxed">
              {JSON.stringify(guide, null, 2)}
            </pre>
          </details>
        </motion.div>
      </div>
    </section>
  );
};

export default GuideDisplay;
