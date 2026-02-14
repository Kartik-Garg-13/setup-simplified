import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";

type Status = "idle" | "uploading" | "processing" | "done";

const processingMessages = [
  "Extracting text from PDF...",
  "Cleaning & normalizing content...",
  "Filtering setup sections...",
  "Chunking for LLM processing...",
  "Generating beginner-friendly guide...",
  "Assembling final output...",
];

interface UploadSectionProps {
  onGuideGenerated: () => void;
}

const UploadSection = ({ onGuideGenerated }: UploadSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState("");
  const [currentMessage, setCurrentMessage] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const simulateProcessing = useCallback(() => {
    setStatus("processing");
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentMessage(step);
      if (step >= processingMessages.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setStatus("done");
          onGuideGenerated();
        }, 800);
      }
    }, 900);
  }, [onGuideGenerated]);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".pdf")) return;
    setFileName(file.name);
    setStatus("uploading");
    setTimeout(() => simulateProcessing(), 1200);
  }, [simulateProcessing]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <section id="upload" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-accent tracking-widest uppercase">Try It</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Upload Your <span className="text-gradient-accent">Manual</span>
          </h2>
          <p className="text-muted-foreground">
            Drop a PDF and watch the pipeline transform it into clarity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {status === "idle" && (
            <label
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`
                group relative flex flex-col items-center justify-center gap-4 p-16 rounded-2xl cursor-pointer
                border-2 border-dashed transition-all duration-300
                ${dragOver
                  ? "border-primary bg-primary/5 glow-primary"
                  : "border-border hover:border-primary/50 hover:bg-secondary/30"
                }
              `}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleInputChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  Drop your PDF here or <span className="text-primary">browse</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Product manuals, user guides, quick start docs
                </p>
              </div>
            </label>
          )}

          {(status === "uploading" || status === "processing") && (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm text-muted-foreground">{fileName}</span>
              </div>

              <div className="flex items-center justify-center gap-3 mb-8">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <span className="text-foreground font-medium">
                  {status === "uploading" ? "Uploading..." : processingMessages[currentMessage]}
                </span>
              </div>

              {/* Progress steps */}
              <div className="flex items-center justify-center gap-2">
                {processingMessages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i <= currentMessage
                        ? "w-8 bg-primary"
                        : "w-4 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {status === "done" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-12 text-center glow-primary"
            >
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Guide Generated!</h3>
              <p className="text-muted-foreground mb-6">Scroll down to see your step-by-step setup guide.</p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFileName("");
                  setCurrentMessage(0);
                }}
                className="text-sm font-mono text-primary hover:underline"
              >
                Upload another manual →
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;
