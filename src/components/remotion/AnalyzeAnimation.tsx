import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface AnalyzeProps {
  dashboardTitle?: string;
  kpis?: { label: string; value: number; suffix: string; prefix: string; color: string }[];
  badge?: string;
}

const bars = [
  { height: 70, delay: 30 },
  { height: 100, delay: 34 },
  { height: 50, delay: 38 },
  { height: 130, delay: 42 },
  { height: 90, delay: 46 },
  { height: 150, delay: 50 },
  { height: 120, delay: 54 },
];

const defaultKpis = [
  { label: "Efficiency", value: 42, suffix: "%", prefix: "+", color: "#0f172a", delay: 85 },
  { label: "Manual Time", value: 65, suffix: "%", prefix: "-", color: "#22c55e", delay: 93 },
  { label: "ROI", value: 3, suffix: "x", prefix: "", color: "#0f172a", delay: 101 },
  { label: "Uptime", value: 99.9, suffix: "%", prefix: "", color: "#22c55e", delay: 109 },
];

const linePoints = [
  [90, 330],
  [160, 300],
  [230, 340],
  [300, 260],
  [370, 285],
  [440, 215],
  [510, 235],
];

export default function AnalyzeAnimation({
  dashboardTitle = "Performance Dashboard",
  kpis: kpiLabels,
  badge = "Optimized \u2713",
}: AnalyzeProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kpis = defaultKpis.map((def, i) => ({
    ...def,
    label: kpiLabels?.[i]?.label ?? def.label,
    value: kpiLabels?.[i]?.value ?? def.value,
    suffix: kpiLabels?.[i]?.suffix ?? def.suffix,
    prefix: kpiLabels?.[i]?.prefix ?? def.prefix,
    color: kpiLabels?.[i]?.color ?? def.color,
  }));

  const dashboardOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dashboardScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const lineProgress = interpolate(frame, [58, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeScale = spring({
    frame: frame - 125,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f0fdf4",
        fontFamily: "system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 960 560" width="100%" height="100%">
        <g
          opacity={dashboardOpacity}
          transform={`translate(480, 280) scale(${Math.min(dashboardScale, 1)}) translate(-480, -280)`}
        >
          {/* Main dashboard frame */}
          <rect
            x="30"
            y="20"
            width="900"
            height="520"
            rx="24"
            fill="white"
            stroke="#e2e8f0"
            strokeWidth="2.5"
          />

          {/* Title bar */}
          <rect x="30" y="20" width="900" height="56" rx="24" fill="#f8fafc" />
          <rect x="30" y="54" width="900" height="22" fill="#f8fafc" />
          <circle cx="66" cy="48" r="9" fill="#22c55e" />
          <circle cx="92" cy="48" r="9" fill="#e2e8f0" />
          <circle cx="118" cy="48" r="9" fill="#e2e8f0" />
          <text
            x="480"
            y="56"
            textAnchor="middle"
            fontSize="22"
            fontWeight="600"
            fill="#64748b"
          >
            {dashboardTitle}
          </text>

          {/* Chart area — left side, takes more space */}
          <rect
            x="50"
            y="95"
            width="520"
            height="300"
            rx="16"
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth="1.5"
          />

          {/* Grid lines */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={`grid-${i}`}
              x1="70"
              x2="550"
              y1={145 + i * 60}
              y2={145 + i * 60}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}

          {/* Animated bars */}
          {bars.map((bar, i) => {
            const barScale = spring({
              frame: frame - bar.delay,
              fps,
              config: { damping: 15, stiffness: 200 },
            });
            const h = bar.height * Math.min(barScale, 1);
            return (
              <rect
                key={`bar-${i}`}
                x={78 + i * 66}
                y={375 - h}
                width="46"
                height={h}
                rx="6"
                fill="#22c55e"
                opacity={0.3 + (i / bars.length) * 0.7}
              />
            );
          })}

          {/* Trend line */}
          {lineProgress > 0 && (
            <polyline
              points={linePoints
                .slice(0, Math.ceil(linePoints.length * lineProgress))
                .map(([x, y]) => `${x},${y}`)
                .join(" ")}
              fill="none"
              stroke="#16a34a"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Trend line dots */}
          {linePoints.map(([x, y], i) => {
            const dotScale = spring({
              frame: frame - (58 + i * 4),
              fps,
              config: { damping: 12, stiffness: 300 },
            });
            return (
              dotScale > 0 && (
                <circle
                  key={`dot-${i}`}
                  cx={x}
                  cy={y}
                  r={5 * Math.min(dotScale, 1)}
                  fill="#16a34a"
                />
              )
            );
          })}

          {/* KPI Cards — 2x2 grid on right side */}
          {kpis.map((kpi, i) => {
            const cardScale = spring({
              frame: frame - kpi.delay,
              fps,
              config: { damping: 12, stiffness: 200 },
            });
            const counterValue = interpolate(
              frame,
              [kpi.delay, kpi.delay + 20],
              [0, kpi.value],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const col = i % 2;
            const row = Math.floor(i / 2);
            const cardW = 155;
            const cardH = 110;
            const startX = 595;
            const startY = 100;
            const gapX = 15;
            const gapY = 15;

            return (
              <g
                key={`kpi-${i}`}
                transform={`translate(${startX + col * (cardW + gapX)}, ${startY + row * (cardH + gapY)}) scale(${Math.min(cardScale, 1)})`}
              >
                <rect
                  width={cardW}
                  height={cardH}
                  rx="14"
                  fill="white"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                <text
                  x={cardW / 2}
                  y="35"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#64748b"
                >
                  {kpi.label}
                </text>
                <text
                  x={cardW / 2}
                  y="78"
                  textAnchor="middle"
                  fontSize="36"
                  fontWeight="800"
                  fill={kpi.color}
                >
                  {kpi.prefix}
                  {kpi.value % 1 !== 0
                    ? interpolate(
                        frame,
                        [kpi.delay, kpi.delay + 20],
                        [0, kpi.value],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                      ).toFixed(1)
                    : Math.round(counterValue)}
                  {kpi.suffix}
                </text>
              </g>
            );
          })}

          {/* Optimized badge — bottom center */}
          {frame > 125 && (
            <g
              transform={`translate(480, 470) scale(${Math.min(badgeScale, 1)})`}
            >
              <rect
                x="-110"
                y="-26"
                width="220"
                height="52"
                rx="26"
                fill="#22c55e"
              />
              <text
                textAnchor="middle"
                y="8"
                fontSize="24"
                fontWeight="700"
                fill="white"
              >
                {badge}
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
