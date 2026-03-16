"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 bg-gradient-to-br from-primary to-primary-dark overflow-hidden"
    >
      {/* Floating decorative dots */}
      <motion.div
        className="absolute top-10 left-10 opacity-10"
        aria-hidden="true"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150">
          {Array.from({ length: 49 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 7) * 22 + 10}
              cy={Math.floor(i / 7) * 22 + 10}
              r="3"
              fill="white"
            />
          ))}
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 opacity-10"
        aria-hidden="true"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150">
          {Array.from({ length: 49 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 7) * 22 + 10}
              cy={Math.floor(i / 7) * 22 + 10}
              r="3"
              fill="white"
            />
          ))}
        </svg>
      </motion.div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("heading")}
          </motion.h2>
          <motion.p
            className="text-lg text-white/80 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button variant="white" size="lg" href="#contact">
              {t("button")}
            </Button>
          </motion.div>
          {/* Pulse ring around button */}
          <motion.p
            className="mt-4 text-sm text-white/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {t("disclaimer")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
