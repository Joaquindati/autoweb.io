"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  subheading?: string;
  alignment?: "center" | "left";
}

export default function SectionHeading({
  eyebrow,
  heading,
  subheading,
  alignment = "center",
}: SectionHeadingProps) {
  const align = alignment === "center" ? "text-center" : "text-left";

  return (
    <div className={`${align} mb-12 lg:mb-16`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`inline-flex flex-col ${alignment === "center" ? "items-center" : "items-start"}`}
      >
        <p className="text-sm uppercase tracking-widest font-semibold text-primary mb-2">
          {eyebrow}
        </p>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="block h-0.5 w-12 bg-primary origin-left"
        />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-neutral-900 mt-3"
      >
        {heading}
      </motion.h2>
      {subheading && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto"
        >
          {subheading}
        </motion.p>
      )}
    </div>
  );
}
