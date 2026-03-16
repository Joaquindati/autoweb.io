"use client";

import { useTranslations } from "next-intl";

const phases = [
  { key: "discovery" as const, step: 1, status: "completed" },
  { key: "build" as const, step: 2, status: "completed" },
  { key: "launch" as const, step: 3, status: "inProgress" },
  { key: "optimize" as const, step: 4, status: "upcoming" },
];

const deliverables = [
  { label: "Workflow audit", status: "completed" },
  { label: "Integration setup", status: "completed" },
  { label: "Testing & QA", status: "inProgress" },
  { label: "Performance optimization", status: "upcoming" },
];

function statusBadge(status: string, t: (key: string) => string) {
  switch (status) {
    case "completed":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {t("completed")}
        </span>
      );
    case "inProgress":
      return (
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {t("inProgress")}
        </span>
      );
    case "upcoming":
      return (
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-500">
          {t("upcoming")}
        </span>
      );
    default:
      return null;
  }
}

export default function ProgressPage() {
  const t = useTranslations("dashboard");

  return (
    <div>
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <h1 className="mb-6 text-3xl font-bold font-heading text-neutral-900">
        {t("projectProgress")}
      </h1>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-700">
            {t("progress")}
          </span>
          <span className="text-sm font-semibold text-primary">65%</span>
        </div>
        <div className="h-5 w-full overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-500" />
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-10 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-4 gap-0">
          {phases.map((phase, i) => (
            <div key={phase.key} className="relative flex flex-col items-center">
              {/* Connecting line */}
              {i < phases.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 h-0.5 w-full ${
                    phase.status === "completed"
                      ? "bg-primary"
                      : "bg-neutral-200"
                  }`}
                />
              )}

              {/* Circle */}
              <div className="relative z-10">
                {phase.status === "completed" ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                ) : phase.status === "inProgress" ? (
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary"
                    style={{ animation: "pulse-ring 2s ease-in-out infinite" }}
                  >
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-sm font-bold text-neutral-500">
                    {phase.step}
                  </div>
                )}
              </div>

              {/* Label */}
              <p className="mt-3 text-sm font-medium font-heading text-neutral-900">
                {t(phase.key)}
              </p>

              {/* Status badge */}
              <div className="mt-2">{statusBadge(phase.status, t)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold font-heading text-neutral-900">
          {t("deliverables")}
        </h2>
        <ul className="space-y-3">
          {deliverables.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              {item.status === "completed" ? (
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : item.status === "inProgress" ? (
                <span className="inline-block h-5 w-5 rounded-full border-2 border-primary bg-primary/20" />
              ) : (
                <span className="inline-block h-5 w-5 rounded-full border-2 border-neutral-300 bg-neutral-100" />
              )}
              <span
                className={`text-sm ${
                  item.status === "completed"
                    ? "text-neutral-900"
                    : item.status === "inProgress"
                      ? "font-medium text-neutral-900"
                      : "text-neutral-500"
                }`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
