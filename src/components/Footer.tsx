import { FileText } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        <span className="font-display font-semibold">Manual Simplifier</span>
      </div>
      <p className="text-sm text-muted-foreground font-mono">
        Built by Kartik Garg &mdash; clean architecture, real AI
      </p>
    </div>
  </footer>
);

export default Footer;
