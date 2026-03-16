"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FAQItem from "@/components/ui/FAQItem";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations("faq");

  const faqs = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest font-semibold text-primary mb-2">
              {t("eyebrow")}
            </p>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block h-0.5 w-12 bg-primary origin-left mb-3"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t("heading")}
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-6">
              {t("description")}
            </p>
            <motion.a
              href="https://wa.me/543416446621" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center text-primary font-medium gap-2 group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {t("contactCta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right column */}
          <div className="lg:col-span-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
