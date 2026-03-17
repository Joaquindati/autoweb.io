"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const STORAGE_KEY = "cookie-consent";

export default function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function handleChoice(consent: "accepted" | "rejected") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ consent, timestamp: Date.now() })
    );
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-2xl bg-neutral-900 p-5 shadow-2xl"
        >
          <p className="text-sm text-neutral-300 leading-relaxed">
            {t("message")}{" "}
            <a
              href={`/${locale}/legal/cookies`}
              className="text-primary underline underline-offset-2 hover:text-primary-light"
            >
              {t("learnMore")}
            </a>
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleChoice("accepted")}
              className="cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              {t("accept")}
            </button>
            <button
              onClick={() => handleChoice("rejected")}
              className="cursor-pointer rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-700"
            >
              {t("reject")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
