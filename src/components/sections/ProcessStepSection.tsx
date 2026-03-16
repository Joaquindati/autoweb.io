"use client";

import React, { useMemo } from "react";
import { Player } from "@remotion/player";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProcessStepSectionProps {
  id?: string;
  stepNumber: string;
  eyebrow: string;
  title: string;
  description: string;
  bulletPoints: string[];
  remotionComponent: React.ComponentType<Record<string, unknown>>;
  reversed?: boolean;
  bgClass?: string;
  animationKey?: "study" | "integrate" | "analyze";
}

export default function ProcessStepSection({
  id,
  stepNumber,
  eyebrow,
  title,
  description,
  bulletPoints,
  remotionComponent,
  reversed = false,
  bgClass = "",
  animationKey,
}: ProcessStepSectionProps) {
  const t = useTranslations("animations");

  const inputProps = useMemo(() => {
    if (!animationKey) return {};
    return t.raw(animationKey) as Record<string, unknown>;
  }, [animationKey, t]);

  const textContent = (
    <motion.div
      initial={{ opacity: 0, x: reversed ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
          {stepNumber}
        </span>
        <p className="text-sm uppercase tracking-widest font-semibold text-primary">
          {eyebrow}
        </p>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        {title}
      </h2>
      <p className="text-neutral-500 leading-relaxed mb-6">{description}</p>
      <ul className="space-y-3">
        {bulletPoints.map((point, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-neutral-700 text-sm">{point}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  const animationContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-light p-6 lg:p-8 border border-neutral-200/50 shadow-sm"
    >
      <div className="rounded-2xl overflow-hidden">
        <Player
          component={remotionComponent}
          durationInFrames={240}
          fps={30}
          compositionWidth={960}
          compositionHeight={600}
          autoPlay
          loop
          controls={false}
          inputProps={inputProps}
          style={{ width: "100%" }}
        />
      </div>
    </motion.div>
  );

  return (
    <section id={id} className={`py-20 lg:py-28 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {reversed ? (
            <>
              {animationContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {animationContent}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
