"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (yearly: boolean) => void;
}

export default function PricingToggle({
  isYearly,
  onToggle,
}: PricingToggleProps) {
  const t = useTranslations("pricing");

  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span
        className={`text-sm font-medium transition-colors ${!isYearly ? "text-neutral-900" : "text-neutral-500"}`}
      >
        {t("monthly")}
      </span>
      <button
        onClick={() => onToggle(!isYearly)}
        className="relative w-14 h-7 rounded-full bg-primary cursor-pointer"
        aria-label="Toggle pricing period"
      >
        <motion.span
          className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow"
          animate={{ x: isYearly ? 28 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      <span
        className={`text-sm font-medium transition-colors ${isYearly ? "text-neutral-900" : "text-neutral-500"}`}
      >
        {t("yearly")}
      </span>
      <AnimatedBadge show={isYearly} label={t("save")} />
    </div>
  );
}

function AnimatedBadge({ show, label }: { show: boolean; label: string }) {
  return (
    <motion.span
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0.8,
        x: show ? 0 : -10,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="text-xs font-semibold bg-primary-light text-primary px-2 py-1 rounded-full"
    >
      {label}
    </motion.span>
  );
}
