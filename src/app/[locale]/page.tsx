"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

const ProcessStepSection = dynamic(
  () => import("@/components/sections/ProcessStepSection"),
  { ssr: false }
);
const StudyAnimation = dynamic(
  () => import("@/components/remotion/StudyAnimation"),
  { ssr: false }
);
const IntegrateAnimation = dynamic(
  () => import("@/components/remotion/IntegrateAnimation"),
  { ssr: false }
);
const AnalyzeAnimation = dynamic(
  () => import("@/components/remotion/AnalyzeAnimation"),
  { ssr: false }
);

export default function Home() {
  const t = useTranslations("steps");

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        <ProcessStepSection
          id="process-study"
          stepNumber="01"
          eyebrow={t("step1.eyebrow")}
          title={t("step1.title")}
          description={t("step1.description")}
          bulletPoints={t.raw("step1.bullets") as string[]}
          remotionComponent={StudyAnimation}
          animationKey="study"
        />

        <ProcessStepSection
          id="process-integrate"
          stepNumber="02"
          eyebrow={t("step2.eyebrow")}
          title={t("step2.title")}
          description={t("step2.description")}
          bulletPoints={t.raw("step2.bullets") as string[]}
          remotionComponent={IntegrateAnimation}
          reversed
          bgClass="bg-neutral-50"
          animationKey="integrate"
        />

        <ProcessStepSection
          id="process-analyze"
          stepNumber="03"
          eyebrow={t("step3.eyebrow")}
          title={t("step3.title")}
          description={t("step3.description")}
          bulletPoints={t.raw("step3.bullets") as string[]}
          remotionComponent={AnalyzeAnimation}
          animationKey="analyze"
        />

        <WhyChooseUsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
