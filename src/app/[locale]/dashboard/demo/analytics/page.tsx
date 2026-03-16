"use client";

import { useTranslations } from "next-intl";

const barData = [
  { month: "Jan", height: 85 },
  { month: "Feb", height: 120 },
  { month: "Mar", height: 65 },
  { month: "Apr", height: 145 },
  { month: "May", height: 95 },
  { month: "Jun", height: 160 },
];

const linePoints = [
  { x: 20, y: 150 },
  { x: 80, y: 120 },
  { x: 140, y: 130 },
  { x: 200, y: 90 },
  { x: 260, y: 70 },
  { x: 320, y: 50 },
  { x: 380, y: 30 },
];

export default function AnalyticsPage() {
  const t = useTranslations("dashboard");

  const maxBar = 160;
  const barWidth = 40;
  const barGap = (400 - barData.length * barWidth) / (barData.length + 1);

  // Donut chart: 75% fill = 270 degrees
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - 0.75);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold font-heading text-neutral-900">
        {t("analytics")}
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Card 1: Bar chart */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold font-heading text-neutral-900">
            Monthly Performance
          </h2>
          <svg viewBox="0 0 400 220" className="w-full">
            {barData.map((bar, i) => {
              const x = barGap + i * (barWidth + barGap);
              const barH = (bar.height / maxBar) * 170;
              const y = 180 - barH;
              return (
                <g key={bar.month}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barH}
                    rx={4}
                    className="fill-primary"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={200}
                    textAnchor="middle"
                    className="fill-neutral-500"
                    fontSize={12}
                  >
                    {bar.month}
                  </text>
                </g>
              );
            })}
            {/* baseline */}
            <line
              x1={0}
              y1={180}
              x2={400}
              y2={180}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
          </svg>
        </div>

        {/* Card 2: Line chart */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold font-heading text-neutral-900">
            Trend
          </h2>
          <svg viewBox="0 0 400 200" className="w-full">
            {/* Grid lines */}
            {[40, 80, 120, 160].map((y) => (
              <line
                key={y}
                x1={0}
                y1={y}
                x2={400}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth={1}
              />
            ))}
            {/* Line */}
            <polyline
              fill="none"
              stroke="#22c55e"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              points={linePoints.map((p) => `${p.x},${p.y}`).join(" ")}
            />
            {/* Area fill */}
            <polygon
              fill="#22c55e"
              opacity={0.1}
              points={`${linePoints.map((p) => `${p.x},${p.y}`).join(" ")} 380,180 20,180`}
            />
            {/* Dots */}
            {linePoints.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={4}
                className="fill-primary"
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </svg>
        </div>

        {/* Card 3: Donut chart */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold font-heading text-neutral-900">
            {t("successRate")}
          </h2>
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="h-48 w-48">
              {/* Background circle */}
              <circle
                cx={100}
                cy={100}
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={16}
              />
              {/* Foreground arc */}
              <circle
                cx={100}
                cy={100}
                r={radius}
                fill="none"
                stroke="#22c55e"
                strokeWidth={16}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 100 100)"
              />
              {/* Center text */}
              <text
                x={100}
                y={95}
                textAnchor="middle"
                className="fill-neutral-900"
                fontSize={28}
                fontWeight={700}
              >
                75%
              </text>
              <text
                x={100}
                y={118}
                textAnchor="middle"
                className="fill-neutral-500"
                fontSize={12}
              >
                {t("successRate")}
              </text>
            </svg>
          </div>
        </div>

        {/* Card 4: KPI mini cards */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold font-heading text-neutral-900">
            Key Metrics
          </h2>
          <div className="flex flex-col gap-4">
            {/* Efficiency */}
            <div className="rounded-xl border border-primary-light bg-primary-50 p-4">
              <p className="text-sm text-neutral-500">{t("efficiency")}</p>
              <p className="text-2xl font-bold text-primary">+42%</p>
            </div>
            {/* Time Saved */}
            <div className="rounded-xl border border-primary-light bg-primary-50 p-4">
              <p className="text-sm text-neutral-500">{t("timeSaved")}</p>
              <p className="text-2xl font-bold text-primary">-65%</p>
            </div>
            {/* ROI */}
            <div className="rounded-xl border border-primary-light bg-primary-50 p-4">
              <p className="text-sm text-neutral-500">{t("roi")}</p>
              <p className="text-2xl font-bold text-neutral-900">3.2x</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
