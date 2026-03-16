"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ProcessStepProps {
  stepNumber: string;
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  isLast?: boolean;
}

export default function ProcessStep({
  stepNumber,
  icon: Icon,
  title,
  description,
  index = 0,
}: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
      className="relative flex flex-col items-center text-center"
    >
      <motion.div
        className="relative z-10 w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mb-4"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.5 + index * 0.2,
        }}
      >
        <Icon className="w-8 h-8 text-primary" />
        <motion.span
          className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center"
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
            delay: 0.7 + index * 0.2,
          }}
        >
          {stepNumber}
        </motion.span>
      </motion.div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-500 text-sm max-w-[200px]">{description}</p>
    </motion.div>
  );
}
