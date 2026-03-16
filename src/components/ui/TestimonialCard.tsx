"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  index?: number;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  company,
  initials,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ rotate: -1, scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
      className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm transition-colors duration-300"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.2 + index * 0.12,
        }}
      >
        <Quote className="w-8 h-8 text-primary mb-4" />
      </motion.div>
      <p className="text-neutral-700 italic leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="border-t border-neutral-200 pt-4 flex items-center gap-3">
        <motion.div
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + index * 0.12 }}
        >
          {initials}
        </motion.div>
        <div>
          <p className="font-semibold text-neutral-900 text-sm">{name}</p>
          <p className="text-xs text-neutral-500">
            {role}, {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
