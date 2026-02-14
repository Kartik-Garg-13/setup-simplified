import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, AlertTriangle, XCircle, CheckSquare } from "lucide-react";

const demoGuide = {
  title: "Smart Router Pro — Setup Guide",
  estimated_time: "15–20 minutes",
  steps: [
    { step: 1, instruction: "Unbox the router and locate the power adapter, Ethernet cable, and quick start card." },
    { step: 2, instruction: "Place the router on a flat surface near your modem, ideally elevated and in a central location." },
    { step: 3, instruction: "Connect the included Ethernet cable from your modem's LAN port to the router's WAN (Internet) port." },
    { step: 4, instruction: "Plug the power adapter into the router, then into a wall outlet. Wait for the power LED to turn solid green (about 60 seconds)." },
    { step: 5, instruction: "On your phone or laptop, open Wi-Fi settings and connect to the network named 'SmartRouter-XXXX' (the default name is printed on the bottom label)." },
    { step: 6, instruction: "Open a browser and go to 192.168.1.1. Log in with admin / admin (default credentials on the label)." },
    { step: 7, instruction: "Follow the on-screen wizard: choose your Wi-Fi name, set a strong password, and select your region." },
    { step: 8, instruction: "Save settings and wait for the router to reboot. Reconnect to your new Wi-Fi network." },
  ],
  warnings: [
    "Do not place the router inside a metal cabinet — it blocks signal.",
    "Change the default admin password immediately after setup.",
  ],
  common_mistakes: [
    "Plugging the modem cable into a LAN port instead of the WAN port.",
    "Skipping the firmware update during initial wizard setup.",
  ],
  final_checklist: [
    "Router power LED is solid green",
    "Connected to your custom Wi-Fi name",
    "Admin password changed from default",
    "Firmware is up to date",
  ],
};

interface GuideDisplayProps {
  visible: boolean;
}

const GuideDisplay = ({ visible }: GuideDisplayProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (!visible) return null;

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
                <h3 className="text-2xl font-bold">{demoGuide.title}</h3>
                <p className="text-muted-foreground text-sm mt-1 font-mono">
                  Generated from product manual
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-primary">{demoGuide.estimated_time}</span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="p-8">
            <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">Steps</h4>
            <div className="space-y-4">
              {demoGuide.steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
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
          <div className="grid md:grid-cols-2 gap-0 md:gap-0">
            <div className="p-8 border-t border-border md:border-r">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-accent" />
                <h4 className="font-mono text-xs text-accent uppercase tracking-widest">Warnings</h4>
              </div>
              <ul className="space-y-3">
                {demoGuide.warnings.map((w, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-4 h-4 text-destructive" />
                <h4 className="font-mono text-xs text-destructive uppercase tracking-widest">Common Mistakes</h4>
              </div>
              <ul className="space-y-3">
                {demoGuide.common_mistakes.map((m, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Checklist */}
          <div className="p-8 border-t border-border">
            <div className="flex items-center gap-2 mb-4">
              <CheckSquare className="w-4 h-4 text-primary" />
              <h4 className="font-mono text-xs text-primary uppercase tracking-widest">Final Checklist</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {demoGuide.final_checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-5 h-5 rounded border-2 border-primary/40 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
                  </div>
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
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
              View raw JSON response →
            </summary>
            <pre className="mt-4 p-6 rounded-xl bg-card border border-border overflow-x-auto text-xs font-mono text-muted-foreground leading-relaxed">
              {JSON.stringify(demoGuide, null, 2)}
            </pre>
          </details>
        </motion.div>
      </div>
    </section>
  );
};

export default GuideDisplay;
