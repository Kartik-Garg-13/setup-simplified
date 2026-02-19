import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PipelineSection from "@/components/PipelineSection";
import UploadSection from "@/components/UploadSection";
import GuideDisplay from "@/components/GuideDisplay";
import Footer from "@/components/Footer";

const Index = () => {
  const [guideData, setGuideData] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <PipelineSection />
      <UploadSection onGuideGenerated={(data) => setGuideData(data)} />
      <GuideDisplay guide={guideData} />
      <Footer />
    </div>
  );
};

export default Index;
