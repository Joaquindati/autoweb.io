"use client";

import { useTranslations, useLocale } from "next-intl";
import { Lock, ArrowRight } from "lucide-react";

export default function DashboardLoginPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href={`/${locale}`} className="inline-block text-2xl font-bold font-heading text-neutral-900">
            Automatika<span className="text-primary">.</span>
          </a>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold font-heading text-neutral-900 text-center mb-6">
            {t("loginTitle")}
          </h1>

          {/* Form (visual only) */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t("email")}
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t("password")}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button
              type="button"
              disabled
              className="w-full rounded-full bg-neutral-200 text-neutral-500 py-3 text-sm font-medium cursor-not-allowed"
            >
              {t("loginBtn")} — {t("comingSoon")}
            </button>
          </form>

          {/* Separator */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-sm text-neutral-400">{t("or")}</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Demo button */}
          <a
            href={`/${locale}/dashboard/demo`}
            className="flex items-center justify-center gap-2 w-full rounded-full bg-primary text-white py-3 text-sm font-medium hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            {t("demoBtn")} <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <p className="text-center text-sm text-neutral-500 mt-6">
          <a href={`/${locale}`} className="hover:text-primary transition-colors">
            &larr; {t("backToSite")}
          </a>
        </p>
      </div>
    </div>
  );
}
