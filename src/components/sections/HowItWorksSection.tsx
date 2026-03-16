"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessStep from "@/components/ui/ProcessStep";
import { processSteps } from "@/lib/data";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          heading="From Discovery to Delivery in Four Steps"
          subheading="Our proven process ensures every project is delivered on time and exceeds expectations"
        />

        <div className="relative">
          {/* Animated connecting line (desktop only) */}
          <motion.div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
            style={{ originX: 0 }}
          >
            <div className="w-full h-full border-t-2 border-dashed border-primary/30" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.number}
                stepNumber={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
                index={index}
                isLast={index === processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
