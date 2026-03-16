"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingToggle from "@/components/ui/PricingToggle";
import PricingCard from "@/components/ui/PricingCard";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const t = useTranslations("pricing");

  const tiers = [
    {
      tier: t("starter"), monthlyPrice: 499, yearlyPrice: 399,
      tagline: t("starterTagline"),
      features: t.raw("starterFeatures") as string[],
      ctaText: t("getStarted"), ctaVariant: "outline" as const,
    },
    {
      tier: t("professional"), monthlyPrice: 999, yearlyPrice: 799,
      tagline: t("professionalTagline"),
      features: t.raw("professionalFeatures") as string[],
      ctaText: t("getStarted"), ctaVariant: "primary" as const,
      highlighted: true, badge: t("mostPopular"),
    },
    {
      tier: t("enterprise"), monthlyPrice: null, yearlyPrice: null,
      tagline: t("enterpriseTagline"),
      features: t.raw("enterpriseFeatures") as string[],
      ctaText: t("contactUs"), ctaVariant: "outline" as const,
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          heading={t("heading")}
          subheading={t("subheading")}
        />

        <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingCard
              key={tier.tier}
              tier={tier.tier}
              price={
                isYearly
                  ? tier.yearlyPrice
                  : tier.monthlyPrice
              }
              period={tier.monthlyPrice !== null ? "/mo" : ""}
              tagline={tier.tagline}
              features={tier.features}
              ctaText={tier.ctaText}
              ctaVariant={tier.ctaVariant}
              highlighted={tier.highlighted}
              badge={tier.badge}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
