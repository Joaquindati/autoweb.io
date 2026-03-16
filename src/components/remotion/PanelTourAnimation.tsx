import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface PanelTourProps {
  scenes?: { title: string; subtitle: string }[];
}

const defaultScenes = [
  { title: "Your Centralized Panel", subtitle: "View the status of all your automations in one place" },
  { title: "Real-time Monitoring", subtitle: "Each automation shows its status, last run, and performance" },
  { title: "Project Tracking", subtitle: "Know exactly what phase your implementation is in and what's next" },
  { title: "Detailed Analytics", subtitle: "Performance metrics, time savings, and ROI in real time" },
  { title: "Automatic Reports", subtitle: "Receive periodic reports by email or download them when you need" },
];

function textOpacity(frame: number, sceneStart: number, duration: number = 120): number {
  const fadeIn = 20;
  const fadeOut = 15;
  const end = sceneStart + duration;
  if (frame < sceneStart || frame > end) return 0;
  if (frame < sceneStart + fadeIn) return interpolate(frame, [sceneStart, sceneStart + fadeIn], [0, 1]);
  if (frame > end - fadeOut) return interpolate(frame, [end - fadeOut, end], [1, 0]);
  return 1;
}

const automationRows = [
  { name: "CRM Sync", lastRun: "2 min ago", status: "Active", color: "#22c55e" },
  { name: "Email Flow", lastRun: "1h ago", status: "Active", color: "#22c55e" },
  { name: "Invoice Bot", lastRun: "3h ago", status: "Paused", color: "#eab308" },
  { name: "Report Gen", lastRun: "5h ago", status: "Active", color: "#22c55e" },
  { name: "Data Backup", lastRun: "12h ago", status: "Error", color: "#ef4444" },
];

const phases = [
  { label: "Discovery", completed: true },
  { label: "Build", completed: true },
  { label: "Launch", inProgress: true },
  { label: "Optimize", upcoming: true },
];

const reportCards = [
  { title: "Monthly Report", badge: "PDF", badgeColor: "#ef4444" },
  { title: "Weekly Summary", badge: "Excel", badgeColor: "#22c55e" },
  { title: "Custom Export", badge: "Email", badgeColor: "#3b82f6" },
];

export default function PanelTourAnimation({ scenes: scenesProp }: PanelTourProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scenes = scenesProp ?? defaultScenes;

  const currentSceneIndex = Math.min(Math.floor(frame / 120), 4);

  // --- Sidebar menu items ---
  const sidebarItems = [0, 1, 2, 3, 4];

  // --- Helper: spring shorthand ---
  const sp = (delay: number, durationInFrames: number = 20) =>
    spring({ frame, fps, delay, config: { damping: 12, stiffness: 120 }, durationInFrames });

  return (
    <svg viewBox="0 0 1200 700" style={{ width: "100%", height: "100%", fontFamily: "system-ui, sans-serif" }}>
      {/* Background */}
      <rect x={0} y={0} width={1200} height={700} fill="#f0fdf4" />

      {/* === DASHBOARD FRAME === */}
      {/* Main border */}
      <rect x={50} y={50} width={1100} height={600} rx={20} fill="white" stroke="#e2e8f0" strokeWidth={1.5} />

      {/* Sidebar */}
      <rect x={50} y={50} width={200} height={600} fill="#f8fafc" rx={20} />
      {/* Cover the right-side rounding of the sidebar */}
      <rect x={230} y={50} width={20} height={600} fill="#f8fafc" />
      {/* Sidebar divider */}
      <line x1={250} y1={50} x2={250} y2={650} stroke="#e2e8f0" strokeWidth={1} />

      {/* Sidebar Logo Placeholder */}
      <circle cx={150} cy={95} r={18} fill="#22c55e" opacity={0.15} />
      <text x={150} y={100} textAnchor="middle" fontSize={14} fontWeight={700} fill="#22c55e">A</text>

      {/* Sidebar menu items */}
      {sidebarItems.map((i) => {
        const isActive = i === currentSceneIndex;
        const yPos = 140 + i * 52;
        return (
          <g key={`sidebar-${i}`}>
            <rect
              x={65}
              y={yPos}
              width={170}
              height={38}
              rx={8}
              fill={isActive ? "#22c55e" : "transparent"}
              opacity={isActive ? 0.12 : 0}
            />
            {/* Active indicator bar */}
            {isActive && (
              <rect x={60} y={yPos + 7} width={4} height={24} rx={2} fill="#22c55e" />
            )}
            {/* Menu icon placeholder */}
            <rect
              x={80}
              y={yPos + 10}
              width={16}
              height={16}
              rx={4}
              fill={isActive ? "#22c55e" : "#94a3b8"}
              opacity={isActive ? 1 : 0.5}
            />
            {/* Menu label */}
            <text
              x={108}
              y={yPos + 24}
              fontSize={14}
              fontWeight={isActive ? 600 : 400}
              fill={isActive ? "#16a34a" : "#64748b"}
            >
              {["Overview", "Monitor", "Projects", "Analytics", "Reports"][i]}
            </text>
          </g>
        );
      })}

      {/* Header bar */}
      <rect x={250} y={50} width={900} height={55} fill="#f8fafc" />
      <line x1={250} y1={105} x2={1150} y2={105} stroke="#e2e8f0" strokeWidth={1} />
      {/* Header search placeholder */}
      <rect x={280} y={66} width={220} height={28} rx={6} fill="#e2e8f0" opacity={0.5} />
      <text x={296} y={84} fontSize={12} fill="#94a3b8">Search...</text>
      {/* Header avatar */}
      <circle cx={1120} cy={78} r={14} fill="#22c55e" opacity={0.2} />
      <text x={1120} y={83} textAnchor="middle" fontSize={11} fontWeight={600} fill="#22c55e">J</text>

      {/* === TEXT OVERLAY (top center) === */}
      {scenes.map((scene, i) => {
        const sceneStart = i * 120;
        const titleOp = textOpacity(frame, sceneStart, 120);
        const subtitleOp = textOpacity(frame, sceneStart + 10, 110);
        if (titleOp <= 0 && subtitleOp <= 0) return null;
        return (
          <g key={`text-${i}`}>
            <rect x={470} y={8} width={460} height={58} rx={12} fill="white" opacity={titleOp * 0.92} />
            <rect x={470} y={8} width={460} height={58} rx={12} fill="none" stroke="#e2e8f0" strokeWidth={1} opacity={titleOp * 0.5} />
            <text x={700} y={33} textAnchor="middle" fontSize={20} fontWeight={700} fill="#0f172a" opacity={titleOp}>
              {scene.title}
            </text>
            <text x={700} y={54} textAnchor="middle" fontSize={13} fill="#64748b" opacity={subtitleOp}>
              {scene.subtitle}
            </text>
          </g>
        );
      })}

      {/* === SCENE 1: Dashboard Overview (frames 0-120) === */}
      {frame < 120 && (() => {
        const contentX = 270;
        const contentY = 125;
        const cardW = 195;
        const cardH = 100;
        const cardGap = 15;

        const kpis = [
          { label: "Total", value: 12, color: "#22c55e" },
          { label: "Active", value: 9, color: "#22c55e" },
          { label: "Paused", value: 2, color: "#eab308" },
          { label: "Errors", value: 1, color: "#ef4444" },
        ];

        return (
          <g opacity={textOpacity(frame, 0, 120)}>
            {kpis.map((kpi, i) => {
              const delay = i * 15;
              const s = sp(delay, 30);
              const cx = contentX + i * (cardW + cardGap);
              const counterVal = Math.round(
                interpolate(
                  frame,
                  [delay, delay + 40],
                  [0, kpi.value],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )
              );
              return (
                <g key={`kpi-${i}`} opacity={s} transform={`translate(0, ${(1 - s) * 20})`}>
                  <rect x={cx} y={contentY} width={cardW} height={cardH} rx={12} fill="white" stroke="#e2e8f0" strokeWidth={1} />
                  {/* Color icon circle */}
                  <circle cx={cx + 30} cy={contentY + 38} r={16} fill={kpi.color} opacity={0.15} />
                  <circle cx={cx + 30} cy={contentY + 38} r={6} fill={kpi.color} />
                  {/* Label */}
                  <text x={cx + 58} y={contentY + 32} fontSize={14} fill="#64748b" fontWeight={500}>
                    {kpi.label}
                  </text>
                  {/* Value */}
                  <text x={cx + 58} y={contentY + 62} fontSize={34} fontWeight={700} fill="#0f172a">
                    {counterVal}
                  </text>
                </g>
              );
            })}

            {/* Table preview bars below cards */}
            {[0, 1, 2].map((i) => {
              const barDelay = 60 + i * 10;
              const barOp = interpolate(frame, [barDelay, barDelay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const barY = contentY + cardH + 40 + i * 55;
              return (
                <g key={`bar-${i}`} opacity={barOp}>
                  <rect x={contentX} y={barY} width={840} height={40} rx={8} fill="#f8fafc" stroke="#e2e8f0" strokeWidth={0.5} />
                  {/* Simulated columns */}
                  <rect x={contentX + 15} y={barY + 12} width={80} height={16} rx={4} fill="#e2e8f0" />
                  <rect x={contentX + 120} y={barY + 12} width={200} height={16} rx={4} fill="#e2e8f0" opacity={0.6} />
                  <rect x={contentX + 360} y={barY + 12} width={100} height={16} rx={4} fill="#e2e8f0" opacity={0.4} />
                  <rect x={contentX + 680} y={barY + 12} width={60} height={16} rx={4} fill="#22c55e" opacity={0.15} />
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* === SCENE 2: Automation Monitor (frames 120-240) === */}
      {frame >= 120 && frame < 240 && (() => {
        const localFrame = frame - 120;
        const contentX = 270;
        const contentY = 125;
        const rowH = 50;

        return (
          <g opacity={textOpacity(frame, 120, 120)}>
            {/* Table header */}
            <rect x={contentX} y={contentY} width={840} height={36} rx={8} fill="#f8fafc" />
            <text x={contentX + 30} y={contentY + 24} fontSize={12} fontWeight={600} fill="#64748b">STATUS</text>
            <text x={contentX + 100} y={contentY + 24} fontSize={12} fontWeight={600} fill="#64748b">NAME</text>
            <text x={contentX + 400} y={contentY + 24} fontSize={12} fontWeight={600} fill="#64748b">LAST RUN</text>
            <text x={contentX + 650} y={contentY + 24} fontSize={12} fontWeight={600} fill="#64748b">STATE</text>

            {automationRows.map((row, i) => {
              const rowDelay = i * 20;
              const rowOp = interpolate(localFrame, [rowDelay, rowDelay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const rowSlide = interpolate(localFrame, [rowDelay, rowDelay + 15], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const ry = contentY + 46 + i * rowH;

              // Pulse for active dots
              const pulse = row.status === "Active"
                ? 0.6 + 0.4 * Math.sin((frame - 120) * 0.12 + i)
                : 1;

              // Badge dimensions
              const badgeW = row.status.length * 9 + 20;

              return (
                <g key={`row-${i}`} opacity={rowOp} transform={`translate(0, ${rowSlide})`}>
                  {/* Row background */}
                  <rect x={contentX} y={ry} width={840} height={rowH - 4} rx={8} fill="white" stroke="#e2e8f0" strokeWidth={0.5} />
                  {/* Status dot */}
                  <circle cx={contentX + 38} cy={ry + 22} r={6} fill={row.color} opacity={pulse} />
                  {/* Name */}
                  <text x={contentX + 100} y={ry + 28} fontSize={16} fontWeight={600} fill="#0f172a">{row.name}</text>
                  {/* Last run */}
                  <text x={contentX + 400} y={ry + 28} fontSize={14} fill="#64748b">{row.lastRun}</text>
                  {/* Status badge */}
                  <rect
                    x={contentX + 640}
                    y={ry + 8}
                    width={badgeW}
                    height={28}
                    rx={14}
                    fill={row.color}
                    opacity={0.12}
                  />
                  <text
                    x={contentX + 640 + badgeW / 2}
                    y={ry + 27}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight={600}
                    fill={row.color}
                  >
                    {row.status}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* === SCENE 3: Project Progress (frames 240-360) === */}
      {frame >= 240 && frame < 360 && (() => {
        const localFrame = frame - 240;
        const contentX = 270;
        const contentY = 200;
        const phaseSpacing = 190;
        const lineY = contentY + 50;

        const progressPct = interpolate(localFrame, [20, 100], [0, 65], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const progressBarWidth = 760;

        return (
          <g opacity={textOpacity(frame, 240, 120)}>
            {/* Progress bar background */}
            <rect x={contentX + 30} y={lineY + 55} width={progressBarWidth} height={10} rx={5} fill="#e2e8f0" />
            {/* Progress bar fill */}
            <rect x={contentX + 30} y={lineY + 55} width={progressBarWidth * (progressPct / 100)} height={10} rx={5} fill="#22c55e" />
            {/* Percentage label */}
            <text
              x={contentX + 30 + progressBarWidth * (progressPct / 100)}
              y={lineY + 88}
              textAnchor="middle"
              fontSize={16}
              fontWeight={700}
              fill="#22c55e"
            >
              {Math.round(progressPct)}%
            </text>

            {/* Connecting line between phases */}
            <line x1={contentX + 60} y1={lineY} x2={contentX + 60 + 3 * phaseSpacing} y2={lineY} stroke="#e2e8f0" strokeWidth={3} />
            {/* Filled connecting line up to active */}
            <line
              x1={contentX + 60}
              y1={lineY}
              x2={contentX + 60 + 2 * phaseSpacing * interpolate(localFrame, [0, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              y2={lineY}
              stroke="#22c55e"
              strokeWidth={3}
            />

            {phases.map((phase, i) => {
              const phaseX = contentX + 60 + i * phaseSpacing;
              const s = sp(i * 18, 25);
              const isCompleted = phase.completed;
              const isInProgress = !!(phase as typeof phases[number] & { inProgress?: boolean }).inProgress;
              const pulseDot = isInProgress ? 0.5 + 0.5 * Math.sin(localFrame * 0.15) : 1;

              return (
                <g key={`phase-${i}`} opacity={s} transform={`translate(0, ${(1 - s) * 15})`}>
                  {/* Node circle */}
                  <circle
                    cx={phaseX}
                    cy={lineY}
                    r={22}
                    fill={isCompleted || isInProgress ? "#22c55e" : "#e2e8f0"}
                    opacity={isInProgress ? pulseDot : 1}
                  />
                  {/* Checkmark for completed */}
                  {isCompleted && (
                    <text x={phaseX} y={lineY + 6} textAnchor="middle" fontSize={18} fill="white" fontWeight={700}>
                      &#x2713;
                    </text>
                  )}
                  {/* Dot for in-progress */}
                  {isInProgress && (
                    <circle cx={phaseX} cy={lineY} r={6} fill="white" />
                  )}
                  {/* Number for upcoming */}
                  {phase.upcoming && (
                    <text x={phaseX} y={lineY + 6} textAnchor="middle" fontSize={16} fill="#94a3b8" fontWeight={600}>
                      {i + 1}
                    </text>
                  )}
                  {/* Phase label */}
                  <text
                    x={phaseX}
                    y={lineY - 36}
                    textAnchor="middle"
                    fontSize={16}
                    fontWeight={600}
                    fill={isCompleted || isInProgress ? "#0f172a" : "#94a3b8"}
                  >
                    {phase.label}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* === SCENE 4: Analytics Dashboard (frames 360-480) === */}
      {frame >= 360 && frame < 480 && (() => {
        const localFrame = frame - 360;
        const contentX = 270;
        const contentY = 125;

        // Bar chart data
        const barData = [85, 120, 65, 145, 95, 160];
        const barW = 50;
        const barGap = 18;
        const barBaseY = contentY + 300;
        const maxBarH = 180;

        // Line chart points
        const lineChartPoints = [
          [0, 60], [1, 45], [2, 70], [3, 30], [4, 50], [5, 15], [6, 25],
        ];
        const lcX = contentX + 450;
        const lcY = contentY + 20;
        const lcW = 380;
        const lcH = 130;

        // Donut chart
        const donutCx = contentX + 620;
        const donutCy = contentY + 280;
        const donutR = 65;
        const donutAngle = interpolate(localFrame, [30, 100], [0, 270], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const donutRad = (donutAngle * Math.PI) / 180;
        const donutEndX = donutCx + donutR * Math.sin(donutRad);
        const donutEndY = donutCy - donutR * Math.cos(donutRad);
        const largeArc = donutAngle > 180 ? 1 : 0;
        const donutPath =
          donutAngle > 0
            ? `M ${donutCx} ${donutCy - donutR} A ${donutR} ${donutR} 0 ${largeArc} 1 ${donutEndX} ${donutEndY}`
            : "";

        // KPI counters
        const kpiEfficiency = Math.round(interpolate(localFrame, [40, 90], [0, 42], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
        const kpiTime = Math.round(interpolate(localFrame, [50, 95], [0, 65], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
        const kpiRoi = (interpolate(localFrame, [60, 100], [0, 3.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toFixed(1);

        // Line chart draw progress
        const lineProgress = interpolate(localFrame, [15, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        return (
          <g opacity={textOpacity(frame, 360, 120)}>
            {/* Bar chart */}
            {barData.map((val, i) => {
              const s = sp(i * 10 + 5, 25);
              const bh = (val / 160) * maxBarH * s;
              const bx = contentX + 20 + i * (barW + barGap);
              return (
                <g key={`bar-${i}`}>
                  <rect
                    x={bx}
                    y={barBaseY - bh}
                    width={barW}
                    height={bh}
                    rx={6}
                    fill="#22c55e"
                    opacity={0.7 + 0.3 * (i / barData.length)}
                  />
                  {/* Bar label */}
                  <text x={bx + barW / 2} y={barBaseY + 18} textAnchor="middle" fontSize={11} fill="#64748b">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                  </text>
                </g>
              );
            })}
            {/* Bar chart axis */}
            <line x1={contentX + 12} y1={barBaseY + 2} x2={contentX + 420} y2={barBaseY + 2} stroke="#e2e8f0" strokeWidth={1} />

            {/* Line chart area */}
            <rect x={lcX} y={lcY} width={lcW} height={lcH} rx={12} fill="white" stroke="#e2e8f0" strokeWidth={0.5} />
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((pct, gi) => (
              <line
                key={`grid-${gi}`}
                x1={lcX + 15}
                y1={lcY + lcH * pct}
                x2={lcX + lcW - 15}
                y2={lcY + lcH * pct}
                stroke="#e2e8f0"
                strokeWidth={0.5}
              />
            ))}
            {/* Line chart polyline */}
            {lineProgress > 0 && (
              <polyline
                points={lineChartPoints
                  .filter((_, idx) => idx <= Math.floor(lineProgress * (lineChartPoints.length - 1)))
                  .map(([xi, yi]) => `${lcX + 25 + (xi as number) * ((lcW - 50) / 6)},${lcY + 15 + ((yi as number) / 80) * (lcH - 30)}`)
                  .join(" ")}
                fill="none"
                stroke="#22c55e"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {/* Line chart dots */}
            {lineChartPoints.map(([xi, yi], di) => {
              const dotProgress = interpolate(localFrame, [15 + di * 9, 20 + di * 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              if (dotProgress <= 0) return null;
              return (
                <circle
                  key={`dot-${di}`}
                  cx={lcX + 25 + (xi as number) * ((lcW - 50) / 6)}
                  cy={lcY + 15 + ((yi as number) / 80) * (lcH - 30)}
                  r={4 * dotProgress}
                  fill="#22c55e"
                />
              );
            })}
            <text x={lcX + 15} y={lcY - 8} fontSize={14} fontWeight={600} fill="#334155">Trend</text>

            {/* Donut chart */}
            <circle cx={donutCx} cy={donutCy} r={donutR} fill="none" stroke="#e2e8f0" strokeWidth={14} />
            {donutAngle > 0 && (
              <path
                d={donutPath}
                fill="none"
                stroke="#22c55e"
                strokeWidth={14}
                strokeLinecap="round"
              />
            )}
            <text x={donutCx} y={donutCy + 6} textAnchor="middle" fontSize={24} fontWeight={700} fill="#0f172a">
              {Math.round((donutAngle / 360) * 100)}%
            </text>
            <text x={donutCx} y={donutCy + 24} textAnchor="middle" fontSize={12} fill="#64748b">Success</text>

            {/* KPI text values */}
            {[
              { label: "Efficiency", value: `+${kpiEfficiency}%`, x: contentX + 470, y: contentY + 290 },
              { label: "Time Saved", value: `-${kpiTime}%`, x: contentX + 470, y: contentY + 330 },
              { label: "ROI", value: `${kpiRoi}x`, x: contentX + 470, y: contentY + 370 },
            ].map((kpi, ki) => {
              const kOp = interpolate(localFrame, [40 + ki * 12, 55 + ki * 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <g key={`akpi-${ki}`} opacity={kOp}>
                  <text x={kpi.x} y={kpi.y} fontSize={14} fill="#64748b">{kpi.label}</text>
                  <text x={kpi.x + 110} y={kpi.y} fontSize={18} fontWeight={700} fill="#22c55e">{kpi.value}</text>
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* === SCENE 5: Reports & Export (frames 480-600+) === */}
      {frame >= 480 && (() => {
        const localFrame = Math.min(frame - 480, 120);
        const contentX = 300;
        const contentY = 140;
        const cardW = 260;
        const cardH = 160;

        // "Report Sent" badge
        const sentBadgeOp = sp(85, 30);

        // Email sending pulse
        const emailPulse = 0.5 + 0.5 * Math.sin(localFrame * 0.18);

        return (
          <g opacity={frame < 600 ? textOpacity(frame, 480, 120) : 1}>
            {reportCards.map((card, i) => {
              const s = sp(i * 20 + 5, 30);
              const cx = contentX + i * (cardW + 30);
              const cy = contentY;
              return (
                <g key={`report-${i}`} opacity={s} transform={`translate(0, ${(1 - s) * 25})`}>
                  {/* Card shadow layer (stacking illusion) */}
                  <rect x={cx + 4} y={cy + 4} width={cardW} height={cardH} rx={12} fill="#e2e8f0" opacity={0.4} />
                  {/* Card */}
                  <rect x={cx} y={cy} width={cardW} height={cardH} rx={12} fill="white" stroke="#e2e8f0" strokeWidth={1} />
                  {/* Document icon */}
                  <rect x={cx + 20} y={cy + 22} width={36} height={46} rx={4} fill="#f8fafc" stroke="#e2e8f0" strokeWidth={1} />
                  {/* Document fold */}
                  <path d={`M ${cx + 44} ${cy + 22} L ${cx + 56} ${cy + 34} L ${cx + 44} ${cy + 34} Z`} fill="#e2e8f0" />
                  {/* Lines on document */}
                  <rect x={cx + 27} y={cy + 42} width={22} height={3} rx={1.5} fill="#e2e8f0" />
                  <rect x={cx + 27} y={cy + 50} width={16} height={3} rx={1.5} fill="#e2e8f0" />
                  <rect x={cx + 27} y={cy + 58} width={20} height={3} rx={1.5} fill="#e2e8f0" />
                  {/* Card title */}
                  <text x={cx + 72} y={cy + 48} fontSize={16} fontWeight={600} fill="#0f172a">{card.title}</text>
                  {/* Badge */}
                  <rect
                    x={cx + 72}
                    y={cy + 60}
                    width={card.badge.length * 10 + 16}
                    height={24}
                    rx={12}
                    fill={card.badgeColor}
                    opacity={0.12}
                  />
                  <text
                    x={cx + 72 + (card.badge.length * 10 + 16) / 2}
                    y={cy + 77}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill={card.badgeColor}
                  >
                    {card.badge}
                  </text>
                  {/* Download icon hint */}
                  <circle cx={cx + cardW - 30} cy={cy + cardH - 30} r={16} fill="#f0fdf4" />
                  <text x={cx + cardW - 30} y={cy + cardH - 24} textAnchor="middle" fontSize={16} fill="#22c55e">&#x2193;</text>
                </g>
              );
            })}

            {/* Email sending indicator */}
            <g opacity={interpolate(localFrame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
              <circle cx={contentX + 420} cy={contentY + cardH + 55} r={28} fill="#22c55e" opacity={0.1} />
              <circle cx={contentX + 420} cy={contentY + cardH + 55} r={20} fill="#22c55e" opacity={emailPulse * 0.2} />
              {/* Envelope shape */}
              <rect x={contentX + 407} y={contentY + cardH + 44} width={26} height={18} rx={3} fill="none" stroke="#22c55e" strokeWidth={1.5} />
              <polyline
                points={`${contentX + 407},${contentY + cardH + 44} ${contentX + 420},${contentY + cardH + 55} ${contentX + 433},${contentY + cardH + 44}`}
                fill="none"
                stroke="#22c55e"
                strokeWidth={1.5}
              />
              <text x={contentX + 455} y={contentY + cardH + 60} fontSize={14} fill="#334155">Sending report...</text>
            </g>

            {/* "Report Sent" green pill badge */}
            <g opacity={sentBadgeOp} transform={`translate(0, ${(1 - sentBadgeOp) * 12})`}>
              <rect
                x={contentX + 310}
                y={contentY + cardH + 90}
                width={220}
                height={44}
                rx={22}
                fill="#22c55e"
              />
              <text
                x={contentX + 420}
                y={contentY + cardH + 118}
                textAnchor="middle"
                fontSize={18}
                fontWeight={700}
                fill="white"
              >
                Report Sent &#x2713;
              </text>
            </g>
          </g>
        );
      })()}
    </svg>
  );
}
