"use client";

import { motion } from "framer-motion";
import { Zap, Shield, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const barHeights = [50, 80, 110, 130, 100, 140, 120];
const barDelays = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];

const featureCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i === 1 ? 0 : 0.15,
    },
  }),
};

export default function WhyChooseUsSection() {
  const t = useTranslations("whyUs");

  const features = [
    { icon: Zap, title: t("feature1Title"), description: t("feature1Desc") },
    { icon: Shield, title: t("feature2Title"), description: t("feature2Desc") },
    { icon: TrendingUp, title: t("feature3Title"), description: t("feature3Desc") },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-light to-primary-50 rounded-3xl p-10">
              <svg viewBox="0 0 350 280" className="w-full" aria-hidden="true">
                {/* Dashboard mockup */}
                <rect x="20" y="20" width="310" height="240" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="2" />
                <rect x="20" y="20" width="310" height="40" rx="16" fill="#f1f5f9" />
                <rect x="20" y="44" width="310" height="16" fill="#f1f5f9" />
                <circle cx="42" cy="40" r="6" fill="#22c55e" />
                <circle cx="60" cy="40" r="6" fill="#e2e8f0" />
                <circle cx="78" cy="40" r="6" fill="#e2e8f0" />

                {/* Animated chart bars */}
                {barHeights.map((h, i) => (
                  <motion.rect
                    key={i}
                    x={50 + i * 35}
                    y={230 - h}
                    width="25"
                    height={h}
                    rx="4"
                    fill="#22c55e"
                    opacity={0.3 + i * 0.1}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + barDelays[i],
                      ease: "easeOut",
                    }}
                    style={{ originY: 1, transformBox: "fill-box" }}
                  />
                ))}

                {/* Line graph overlay */}
                <motion.polyline
                  points="62,175 98,145 132,115 168,95 202,125 238,85 272,105"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
                />

                {/* Dots on line */}
                {[
                  [62, 175], [98, 145], [132, 115], [168, 95],
                  [202, 125], [238, 85], [272, 105],
                ].map(([cx, cy], i) => (
                  <motion.circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="#16a34a"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 1.0 + i * 0.1,
                    }}
                  />
                ))}

                {/* Stat cards */}
                <motion.g
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.5 }}
                >
                  <rect x="50" y="70" width="80" height="30" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                  <text x="62" y="83" fontSize="8" fill="#64748b">{t("svgRevenue")}</text>
                  <text x="62" y="93" fontSize="10" fontWeight="bold" fill="#0f172a">+42%</text>
                </motion.g>
                <motion.g
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.7 }}
                >
                  <rect x="145" y="70" width="80" height="30" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                  <text x="157" y="83" fontSize="8" fill="#64748b">{t("svgEfficiency")}</text>
                  <text x="157" y="93" fontSize="10" fontWeight="bold" fill="#22c55e">+67%</text>
                </motion.g>
              </svg>
            </div>

            <motion.div
              className="absolute -bottom-4 -right-4 opacity-15"
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path
                  d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 15 72, 15 55 C15 38, 30 25, 47 25 C60 25, 70 35, 70 50 C70 62, 60 70, 50 70"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest font-semibold text-primary mb-2">
              {t("eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {t("heading")}
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-4">
              {t("p1")}
            </p>
            <p className="text-neutral-500 leading-relaxed mb-8">
              {t("p2")}
            </p>
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-neutral-700 font-medium">
                  <AnimatedCounter value={99.9} suffix="%" decimals={1} duration={2} /> {t("stat1Label")}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-neutral-700 font-medium">
                  {t("stat2Prefix")} <AnimatedCounter value={40} suffix="%" duration={1.5} /> {t("stat2Label")}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-neutral-700 font-medium">
                  {t("stat3Label")}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={featureCardVariants}
            >
              <ServiceCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
