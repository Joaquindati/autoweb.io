"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.3 + i * 0.08 },
  }),
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
      delay: 0.6 + i * 0.12,
    },
  }),
};

export default function HeroSection() {
  const t = useTranslations("hero");
  const headingWords = t("headingWords").split(" ");

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      <motion.div
        className="absolute top-20 right-10 opacity-20"
        aria-hidden="true"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          {Array.from({ length: 36 }).map((_, i) => (
            <circle key={i} cx={(i % 6) * 22 + 10} cy={Math.floor(i / 6) * 22 + 10} r="3" fill="#22c55e" />
          ))}
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm uppercase tracking-widest font-semibold text-primary mb-4"
            >
              {t("eyebrow")}
            </motion.p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
              {headingWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
              <br className="hidden md:block" />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-primary inline-block"
              >
                {t("highlight")}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6 text-lg text-neutral-500 leading-relaxed max-w-xl"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button href="#contact" size="lg">
                  {t("cta")} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button href="#process-study" variant="outline" size="lg">
                  <Play className="w-4 h-4 mr-2" /> {t("ctaSecondary")}
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-8 text-sm text-neutral-500"
            >
              {t("trust")}{" "}
              <span className="font-semibold text-neutral-700">
                <AnimatedCounter value={50} suffix="+" duration={1.5} />
                {" "}{t("trustSuffix")}
              </span>
            </motion.p>
          </div>

          {/* Illustration — same SVG as before */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary-50 to-primary-light rounded-3xl p-10 lg:p-14">
              <svg viewBox="0 0 440 340" className="w-full" aria-hidden="true">
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }} style={{ transformOrigin: "220px 170px" }}>
                  <circle cx="220" cy="170" r="50" fill="#22c55e" opacity="0.1" />
                  <circle cx="220" cy="170" r="35" fill="#22c55e" opacity="0.2" />
                  <circle cx="220" cy="170" r="18" fill="#22c55e" opacity="0.4" />
                  <circle cx="220" cy="170" r="10" fill="#22c55e" />
                </motion.g>
                {[{ x2: 80, y2: 55 },{ x2: 220, y2: 30 },{ x2: 360, y2: 55 },{ x2: 390, y2: 170 },{ x2: 360, y2: 285 },{ x2: 220, y2: 310 },{ x2: 80, y2: 285 },{ x2: 50, y2: 170 }].map((line, i) => (
                  <motion.line key={i} x1="220" y1="170" x2={line.x2} y2={line.y2} stroke="#22c55e" strokeWidth="2" opacity="0.35" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.7 + i * 0.08 }} />
                ))}
                {[
                  <g key="n1"><rect x="55" y="30" width="50" height="50" rx="12" fill="#22c55e" opacity="0.15" /><rect x="60" y="35" width="40" height="40" rx="9" fill="white" stroke="#22c55e" strokeWidth="2" /><rect x="69" y="47" width="22" height="3" rx="1.5" fill="#22c55e" opacity="0.7" /><rect x="69" y="53" width="15" height="3" rx="1.5" fill="#22c55e" opacity="0.5" /><rect x="69" y="59" width="19" height="3" rx="1.5" fill="#22c55e" opacity="0.35" /></g>,
                  <g key="n2"><rect x="195" y="5" width="50" height="50" rx="12" fill="#22c55e" opacity="0.15" /><rect x="200" y="10" width="40" height="40" rx="9" fill="white" stroke="#22c55e" strokeWidth="2" /><rect x="209" y="24" width="22" height="15" rx="2" fill="none" stroke="#22c55e" strokeWidth="1.8" /><path d="M209 24 L220 33 L231 24" fill="none" stroke="#22c55e" strokeWidth="1.8" /></g>,
                  <g key="n3"><rect x="335" y="30" width="50" height="50" rx="12" fill="#22c55e" opacity="0.15" /><rect x="340" y="35" width="40" height="40" rx="9" fill="white" stroke="#22c55e" strokeWidth="2" /><rect x="350" y="47" width="20" height="18" rx="3" fill="none" stroke="#22c55e" strokeWidth="2" /><path d="M354 56 L358 60 L366 50" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></g>,
                  <g key="n4"><rect x="365" y="145" width="50" height="50" rx="12" fill="#22c55e" opacity="0.15" /><rect x="370" y="150" width="40" height="40" rx="9" fill="white" stroke="#22c55e" strokeWidth="2" /><circle cx="390" cy="170" r="7" fill="none" stroke="#22c55e" strokeWidth="2" /><circle cx="390" cy="170" r="2.5" fill="#22c55e" /><line x1="390" y1="160" x2="390" y2="163" stroke="#22c55e" strokeWidth="2" /><line x1="390" y1="177" x2="390" y2="180" stroke="#22c55e" strokeWidth="2" /><line x1="380" y1="170" x2="383" y2="170" stroke="#22c55e" strokeWidth="2" /><line x1="397" y1="170" x2="400" y2="170" stroke="#22c55e" strokeWidth="2" /></g>,
                  <g key="n5"><rect x="335" y="260" width="50" height="50" rx="12" fill="#22c55e" opacity="0.15" /><rect x="340" y="265" width="40" height="40" rx="9" fill="white" stroke="#22c55e" strokeWidth="2" /><circle cx="360" cy="285" r="10" fill="none" stroke="#22c55e" strokeWidth="2" /><path d="M354 285 L358 290 L367 279" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></g>,
                  <g key="n6"><rect x="195" y="285" width="50" height="50" rx="12" fill="#22c55e" opacity="0.15" /><rect x="200" y="290" width="40" height="40" rx="9" fill="white" stroke="#22c55e" strokeWidth="2" /><ellipse cx="220" cy="303" rx="11" ry="4" fill="none" stroke="#22c55e" strokeWidth="1.8" /><path d="M209 303 L209 317 C209 320 214 323 220 323 C226 323 231 320 231 317 L231 303" fill="none" stroke="#22c55e" strokeWidth="1.8" /><path d="M209 310 C209 313 214 316 220 316 C226 316 231 313 231 310" fill="none" stroke="#22c55e" strokeWidth="1.2" opacity="0.5" /></g>,
                  <g key="n7"><rect x="55" y="260" width="50" height="50" rx="12" fill="#22c55e" opacity="0.15" /><rect x="60" y="265" width="40" height="40" rx="9" fill="white" stroke="#22c55e" strokeWidth="2" /><rect x="69" y="288" width="7" height="14" rx="2" fill="#22c55e" opacity="0.4" /><rect x="79" y="282" width="7" height="20" rx="2" fill="#22c55e" opacity="0.65" /><rect x="89" y="276" width="7" height="26" rx="2" fill="#22c55e" /></g>,
                  <g key="n8"><rect x="25" y="145" width="50" height="50" rx="12" fill="#22c55e" opacity="0.15" /><rect x="30" y="150" width="40" height="40" rx="9" fill="white" stroke="#22c55e" strokeWidth="2" /><path d="M55 160 L47 172 L53 172 L45 183" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></g>,
                ].map((node, i) => (
                  <motion.g key={i} custom={i} initial="hidden" animate="visible" variants={nodeVariants}>{node}</motion.g>
                ))}
                <circle cx="220" cy="170" r="60" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.15"><animate attributeName="r" values="60;85;60" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" /></circle>
                <circle cx="220" cy="170" r="80" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.1"><animate attributeName="r" values="80;110;80" dur="3s" repeatCount="indefinite" begin="1s" /><animate attributeName="opacity" values="0.1;0;0.1" dur="3s" repeatCount="indefinite" begin="1s" /></circle>
              </svg>
            </div>
            <motion.div className="absolute -bottom-6 -left-6 opacity-20" aria-hidden="true" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <svg width="80" height="80" viewBox="0 0 80 80"><path d="M40 10 C55 10, 70 25, 70 40 C70 55, 55 70, 40 70 C25 70, 15 58, 15 45 C15 32, 25 22, 38 22 C48 22, 55 30, 55 40 C55 48, 48 55, 40 55" fill="none" stroke="#22c55e" strokeWidth="2" /></svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
