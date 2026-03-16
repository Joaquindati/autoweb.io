"use client";

import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";

const reports = [
  {
    titleKey: "monthlyReport" as const,
    badge: "PDF",
    badgeClass: "bg-red-100 text-red-600",
    lastSent: 2,
    action: "download",
  },
  {
    titleKey: "weeklySummary" as const,
    badge: "Excel",
    badgeClass: "bg-green-100 text-green-600",
    lastSent: 5,
    action: "download",
  },
  {
    titleKey: "customExport" as const,
    badge: "Email",
    badgeClass: "bg-blue-100 text-blue-600",
    lastSent: 1,
    action: "send",
  },
];

export default function ReportsPage() {
  const t = useTranslations("dashboard");

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">
        {t("reports")}
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report.titleKey}
            className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <FileText className="h-6 w-6 text-neutral-500" />
            </div>

            {/* Title + Badge */}
            <div className="flex items-center gap-3">
              <h3 className="text-base font-semibold text-neutral-900">
                {t(report.titleKey)}
              </h3>
              <span
                className={`rounded px-2 py-0.5 text-xs font-semibold ${report.badgeClass}`}
              >
                {report.badge}
              </span>
            </div>

            {/* Last sent */}
            <p className="text-sm text-neutral-500">
              {t("lastSent")}: {report.lastSent} {t("daysAgo")}
            </p>

            {/* Action button */}
            <button className="mt-auto rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
              {report.action === "download" ? t("download") : t("send")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
