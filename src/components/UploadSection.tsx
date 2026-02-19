import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, Key, Eye, EyeOff } from "lucide-react";

type Status = "idle" | "uploading" | "processing" | "done" | "error";

interface GuideData {
  title: string;
  estimated_time: string;
  steps: { step: number; instruction: string }[];
  warnings: string[];
  common_mistakes: string[];
  final_checklist: string[];
}

interface UploadSectionProps {
  onGuideGenerated: (data: GuideData) => void;
}

const processingMessages = [
  "Reading PDF content...",
  "Sending to Claude AI...",
  "Extracting setup steps...",
  "Identifying warnings and pitfalls...",
  "Assembling your guide...",
];

const UploadSection = ({ onGuideGenerated }: UploadSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [progressStep, setProgressStep] = useState(0);

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Strip the data URL prefix to get pure base64
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processWithClaude = useCallback(async (file: File) => {
    if (!apiKey.trim()) {
      setErrorMsg("Please enter your Anthropic API key first.");
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setProgressStep(0);

    try {
      const base64Data = await readFileAsBase64(file);
      setStatus("processing");
      setProgressStep(1);

      // Advance progress messages visually while waiting
      const progressInterval = setInterval(() => {
        setProgressStep((prev) => {
          if (prev < processingMessages.length - 1) return prev + 1;
          clearInterval(progressInterval);
          return prev;
        });
      }, 2000);

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey.trim(),
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "document",
                  source: {
                    type: "base64",
                    media_type: "application/pdf",
                    data: base64Data,
                  },
                },
                {
                  type: "text",
                  text: `You are a technical writer. Analyze this product manual PDF and extract the setup/installation instructions.

Return ONLY a valid JSON object (no markdown, no code fences, no explanation) with this exact structure:
{
  "title": "Product Name - Setup Guide",
  "estimated_time": "X-Y minutes",
  "steps": [
    {"step": 1, "instruction": "Clear beginner-friendly instruction here"},
    {"step": 2, "instruction": "Next step here"}
  ],
  "warnings": ["Important warning 1", "Important warning 2"],
  "common_mistakes": ["Common mistake 1", "Common mistake 2"],
  "final_checklist": ["Checklist item 1", "Checklist item 2", "Checklist item 3"]
}

Rules:
- steps: Extract ALL setup steps from the manual, rewritten in plain English for a beginner. Include 5-15 steps minimum.
- warnings: Safety warnings or things that could damage the device (2-4 items)
- common_mistakes: Things people commonly do wrong (2-4 items)
- final_checklist: Things to verify after setup is complete (3-5 items)
- estimated_time: Realistic estimate based on the complexity of the setup
- Return ONLY the JSON, nothing else.`,
                },
              ],
            },
          ],
        }),
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const textContent = data.content?.find((c: any) => c.type === "text")?.text;

      if (!textContent) throw new Error("No text content returned from API");

      // Parse the JSON response
      let guide: GuideData;
      try {
        // Strip any accidental markdown code fences
        const cleaned = textContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        guide = JSON.parse(cleaned);
      } catch {
        throw new Error("Failed to parse guide from AI response. Try again.");
      }

      setProgressStep(processingMessages.length - 1);
      setStatus("done");
      onGuideGenerated(guide);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Check your API key and try again.");
      setStatus("error");
    }
  }, [apiKey, onGuideGenerated]);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".pdf")) {
      setErrorMsg("Only PDF files are supported.");
      setStatus("error");
      return;
    }
    setFileName(file.name);
    setErrorMsg("");
    processWithClaude(file);
  }, [processWithClaude]);

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

  const reset = () => {
    setStatus("idle");
    setFileName("");
    setErrorMsg("");
    setProgressStep(0);
  };

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
            Drop a PDF and watch Claude AI transform it into a clear setup guide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4"
        >
          {/* API Key Input */}
          {(status === "idle" || status === "error") && (
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-4 h-4 text-accent" />
                <label className="font-mono text-xs text-accent uppercase tracking-widest">
                  Anthropic API Key
                </label>
              </div>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Get your key at{" "}
                <a
                  href="https://console.anthropic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  console.anthropic.com
                </a>
                . Never stored or sent anywhere except Anthropic directly.
              </p>
            </div>
          )}

          {/* Upload Zone */}
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
              <div className="text-center">
                <p className="text-lg font-medium">
                  Drop your PDF here or <span className="text-primary">browse</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Product manuals, user guides, quick start docs
                </p>
              </div>
            </label>
          )}

          {/* Processing State */}
          {(status === "uploading" || status === "processing") && (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm text-muted-foreground">{fileName}</span>
              </div>

              <div className="flex items-center justify-center gap-3 mb-8">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <span className="text-foreground font-medium">
                  {status === "uploading" ? "Reading PDF..." : processingMessages[progressStep]}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2">
                {processingMessages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i <= progressStep ? "w-8 bg-primary" : "w-4 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Done State */}
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
                onClick={reset}
                className="text-sm font-mono text-primary hover:underline"
              >
                Upload another manual &rarr;
              </button>
            </motion.div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="glass rounded-xl p-6 border border-destructive/30">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive font-medium">{errorMsg}</p>
              </div>
              <button
                onClick={reset}
                className="text-sm font-mono text-primary hover:underline"
              >
                Try again &rarr;
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;
