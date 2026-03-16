"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="group p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-primary/30 transition-colors duration-300"
    >
      <motion.div
        className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300"
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
      </motion.div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
