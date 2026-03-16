"use client";

import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

interface PricingCardProps {
  tier: string;
  price: number | null;
  period: string;
  tagline: string;
  features: string[];
  ctaText: string;
  ctaVariant: "primary" | "outline";
  highlighted?: boolean;
  badge?: string;
  index?: number;
}

export default function PricingCard({
  tier,
  price,
  period,
  tagline,
  features,
  ctaText,
  ctaVariant,
  highlighted = false,
  badge,
  index = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: highlighted ? "spring" : "tween",
        stiffness: 200,
        damping: 20,
        duration: highlighted ? undefined : 0.5,
        delay: index * 0.12,
      }}
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl p-8 flex flex-col transition-shadow duration-300 ${
        highlighted
          ? "bg-white border-2 border-primary shadow-xl scale-105 z-10"
          : "bg-white border border-neutral-200 shadow-sm"
      }`}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.12, type: "spring" }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full"
        >
          {badge}
        </motion.span>
      )}
      <h3 className="text-xl font-bold text-neutral-900">{tier}</h3>
      <p className="text-sm text-neutral-500 mt-1">{tagline}</p>
      <div className="mt-6 mb-6 h-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={price}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {price !== null ? (
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-neutral-900">
                  ${price}
                </span>
                <span className="text-neutral-500">{period}</span>
              </div>
            ) : (
              <span className="text-4xl font-bold text-neutral-900">Custom</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => (
          <motion.li
            key={feature}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.06 }}
          >
            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-sm text-neutral-700">{feature}</span>
          </motion.li>
        ))}
      </ul>
      <Button variant={ctaVariant} href="https://wa.me/543416446621" className="w-full">
        {ctaText}
      </Button>
    </motion.div>
  );
}
