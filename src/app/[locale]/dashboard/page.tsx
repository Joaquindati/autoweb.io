"use client";

import { useTranslations } from "next-intl";
import { LayoutDashboard, CheckCircle, PauseCircle, AlertCircle } from "lucide-react";

const kpis = [
  {
    key: "total" as const,
    value: "12",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    Icon: LayoutDashboard,
  },
  {
    key: "active" as const,
    value: "9",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    Icon: CheckCircle,
  },
  {
    key: "paused" as const,
    value: "2",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    Icon: PauseCircle,
  },
  {
    key: "errors" as const,
    value: "1",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    Icon: AlertCircle,
  },
];

const recentRows = [
  { name: "CRM Sync", time: "2 min ago", status: "active" },
  { name: "Email Flow", time: "1h ago", status: "active" },
  { name: "Invoice Bot", time: "3h ago", status: "paused" },
  { name: "Report Gen", time: "5h ago", status: "active" },
  { name: "Data Backup", time: "12h ago", status: "error" },
];

function statusBadge(status: string) {
  const map: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };
  return map[status] ?? "bg-neutral-100 text-neutral-700";
}

export default function DashboardOverviewPage() {
  const t = useTranslations("dashboard");

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold font-heading text-neutral-900">
        {t("overview")}
      </h1>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.Icon;
          return (
            <div
              key={kpi.key}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${kpi.iconBg}`}
              >
                <Icon className={`h-6 w-6 ${kpi.iconColor}`} />
              </div>
              <p className="text-sm text-neutral-500">{t(kpi.key)}</p>
              <p className="text-4xl font-bold text-neutral-900">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <h2 className="mb-4 mt-10 text-xl font-semibold font-heading text-neutral-900">
        {t("recentActivity")}
      </h2>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-primary-50">
              <th className="px-6 py-3 font-medium text-neutral-500">
                {t("name")}
              </th>
              <th className="px-6 py-3 font-medium text-neutral-500">
                {t("lastRun")}
              </th>
              <th className="px-6 py-3 font-medium text-neutral-500">
                {t("status")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {recentRows.map((row) => (
              <tr key={row.name} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">
                  {row.name}
                </td>
                <td className="px-6 py-4 text-neutral-500">{row.time}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusBadge(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
