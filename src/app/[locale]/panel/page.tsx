"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Player } from "@remotion/player";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Activity, BarChart3, Map, FileText, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

const PanelTourAnimation = dynamic(
  () => import("@/components/remotion/PanelTourAnimation"),
  { ssr: false }
);

const features = [
  { icon: Activity, titleKey: "feature1Title", descKey: "feature1Desc" },
  { icon: BarChart3, titleKey: "feature2Title", descKey: "feature2Desc" },
  { icon: Map, titleKey: "feature3Title", descKey: "feature3Desc" },
  { icon: FileText, titleKey: "feature4Title", descKey: "feature4Desc" },
] as const;

export default function PanelPage() {
  const t = useTranslations("panel");
  const locale = useLocale();

  const inputProps = useMemo(
    () => ({
      scenes: t.raw("scenes") as { title: string; subtitle: string }[],
    }),
    [t]
  );

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-12 lg:pt-36 lg:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm uppercase tracking-widest font-semibold text-primary mb-3"
            >
              {t("heroEyebrow")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight"
            >
              {t("heroTitle")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto"
            >
              {t("heroDescription")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <Button href={`/${locale}/dashboard/demo`} size="lg">
                {t("demoBtn")} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Remotion Tour Animation — full width */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-light p-4 lg:p-6 border border-neutral-200/50 shadow-lg"
            >
              <div className="rounded-2xl overflow-hidden">
                <Player
                  component={PanelTourAnimation}
                  durationInFrames={690}
                  fps={30}
                  compositionWidth={1200}
                  compositionHeight={700}
                  autoPlay
                  loop
                  controls={false}
                  inputProps={inputProps}
                  style={{ width: "100%" }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 lg:py-28 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.titleKey}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {t(feat.titleKey)}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                      {t(feat.descKey)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-primary to-primary-dark">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              {t("heroTitle")}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button
                variant="white"
                size="lg"
                href="https://wa.me/543416446621"
              >
                {t("cta")} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
