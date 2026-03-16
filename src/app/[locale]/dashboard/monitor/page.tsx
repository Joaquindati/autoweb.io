"use client";

import { useTranslations } from "next-intl";

const rows = [
  { name: "CRM Sync", time: "2 min ago", status: "active" },
  { name: "Email Flow", time: "1h ago", status: "active" },
  { name: "Invoice Bot", time: "3h ago", status: "paused" },
  { name: "Report Gen", time: "5h ago", status: "active" },
  { name: "Data Backup", time: "12h ago", status: "error" },
];

function statusDotClass(status: string) {
  switch (status) {
    case "active":
      return "bg-green-500 animate-[pulse-dot_2s_ease-in-out_infinite]";
    case "paused":
      return "bg-yellow-500";
    case "error":
      return "bg-red-500";
    default:
      return "bg-neutral-400";
  }
}

function badgeClass(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700";
    case "paused":
      return "bg-yellow-100 text-yellow-700";
    case "error":
      return "bg-red-100 text-red-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
}

function badgeLabel(status: string) {
  switch (status) {
    case "active":
      return "Active";
    case "paused":
      return "Paused";
    case "error":
      return "Error";
    default:
      return status;
  }
}

export default function MonitorPage() {
  const t = useTranslations("dashboard");

  return (
    <div>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>

      <h1 className="mb-6 text-3xl font-bold font-heading text-neutral-900">
        {t("monitor")}
      </h1>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="pb-3 pr-4 font-medium text-neutral-500">
                {t("status")}
              </th>
              <th className="pb-3 pr-4 font-medium text-neutral-500">
                {t("name")}
              </th>
              <th className="pb-3 pr-4 font-medium text-neutral-500">
                {t("lastRun")}
              </th>
              <th className="pb-3 font-medium text-neutral-500">
                {t("state")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.map((row) => (
              <tr key={row.name} className="hover:bg-neutral-50">
                <td className="py-4 pr-4">
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full ${statusDotClass(row.status)}`}
                  />
                </td>
                <td className="py-4 pr-4 font-medium text-neutral-900">
                  {row.name}
                </td>
                <td className="py-4 pr-4 text-neutral-500">{row.time}</td>
                <td className="py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(row.status)}`}
                  >
                    {badgeLabel(row.status)}
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
