import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface IntegrateProps {
  platforms?: string[];
  hubLabel?: string;
  badge?: string;
}

const defaultPlatforms = ["CRM", "Email", "Database", "API", "Calendar", "Slack", "ERP", "Sheets"];

// 8 nodes distributed in a circle around center (480, 280), radius ~200
const HUB_X = 480;
const HUB_Y = 280;
const RADIUS = 195;
const NODE_W = 110;
const NODE_H = 50;

// Calculate circular positions for final state
const angles = Array.from({ length: 8 }, (_, i) => (i * Math.PI * 2) / 8 - Math.PI / 2);
const finalPositions = angles.map((a) => ({
  x: HUB_X + Math.cos(a) * RADIUS - NODE_W / 2,
  y: HUB_Y + Math.sin(a) * RADIUS - NODE_H / 2,
}));

// Scattered initial positions (spread across the viewBox)
const initialPositions = [
  { x: 60, y: 30 },
  { x: 750, y: 20 },
  { x: 820, y: 280 },
  { x: 780, y: 500 },
  { x: 400, y: 530 },
  { x: 80, y: 510 },
  { x: 20, y: 280 },
  { x: 120, y: 80 },
];

export default function IntegrateAnimation({
  platforms: platformLabels = defaultPlatforms,
  hubLabel = "AUTOMATIKA",
  badge = "All Connected \u2713",
}: IntegrateProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gearRotation = frame * 2;
  const pulsePhase = (frame - 100) * 0.1;
  const pulseOpacity = frame > 100 ? Math.sin(pulsePhase) * 0.4 + 0.6 : 0;
  const glowOpacity = interpolate(frame, [130, 145], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
        {/* Connection lines + data flow dots */}
        {finalPositions.map((fp, i) => {
          const ip = initialPositions[i];
          const moveDelay = 20 + i * 6;
          const lineDelay = 40 + i * 6;
          const px = interpolate(frame, [0, moveDelay, moveDelay + 20], [ip.x, ip.x, fp.x], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const py = interpolate(frame, [0, moveDelay, moveDelay + 20], [ip.y, ip.y, fp.y], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const lineProgress = interpolate(frame, [lineDelay, lineDelay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cx = px + NODE_W / 2;
          const cy = py + NODE_H / 2;

          return (
            <g key={`conn-${i}`}>
              <line
                x1={cx}
                y1={cy}
                x2={cx + (HUB_X - cx) * lineProgress}
                y2={cy + (HUB_Y - cy) * lineProgress}
                stroke="#22c55e"
                strokeWidth="2.5"
                opacity={lineProgress * 0.5}
              />
              {frame > 105 && lineProgress > 0.9 && (
                <circle
                  cx={cx + (HUB_X - cx) * ((Math.sin(frame * 0.07 + i * 1.2) + 1) / 2)}
                  cy={cy + (HUB_Y - cy) * ((Math.sin(frame * 0.07 + i * 1.2) + 1) / 2)}
                  r="5"
                  fill="#22c55e"
                  opacity={pulseOpacity}
                />
              )}
            </g>
          );
        })}

        {/* Platform nodes — text only, no emojis */}
        {finalPositions.map((fp, i) => {
          const ip = initialPositions[i];
          const moveDelay = 20 + i * 6;
          const nodeScale = spring({
            frame: frame - i * 4,
            fps,
            config: { damping: 12, stiffness: 200 },
          });
          const px = interpolate(frame, [0, moveDelay, moveDelay + 20], [ip.x, ip.x, fp.x], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const py = interpolate(frame, [0, moveDelay, moveDelay + 20], [ip.y, ip.y, fp.y], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const isConnected = frame > 60 + i * 6;
          const label = platformLabels[i] ?? defaultPlatforms[i];

          return (
            <g
              key={`platform-${i}`}
              transform={`translate(${px}, ${py}) scale(${Math.min(nodeScale, 1)})`}
            >
              <rect
                width={NODE_W}
                height={NODE_H}
                rx="12"
                fill="white"
                stroke={isConnected ? "#22c55e" : "#cbd5e1"}
                strokeWidth={isConnected ? "2.5" : "1.5"}
              />
              <text
                x={NODE_W / 2}
                y={NODE_H / 2 + 7}
                textAnchor="middle"
                fontSize="20"
                fontWeight="600"
                fill={isConnected ? "#0f172a" : "#64748b"}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Central hub */}
        <g transform={`translate(${HUB_X}, ${HUB_Y})`}>
          <circle r="150" fill="#22c55e" opacity={glowOpacity * 0.08} />
          <circle r="130" fill="#22c55e" opacity={glowOpacity * 0.12} />
          <circle
            r="110"
            fill="white"
            stroke="#22c55e"
            strokeWidth="4"
            opacity={spring({
              frame: frame - 15,
              fps,
              config: { damping: 15, stiffness: 150 },
            })}
          />

          {/* Gear — shifted up to visually center with label below */}
          {frame > 60 && (
            <g
              transform={`translate(0, -18) rotate(${gearRotation})`}
              opacity={interpolate(frame, [60, 80], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            >
              <circle r="26" fill="#22c55e" opacity="0.15" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect
                  key={angle}
                  x="-5"
                  y="-34"
                  width="10"
                  height="10"
                  rx="2.5"
                  fill="#22c55e"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle r="13" fill="#22c55e" />
              <circle r="6" fill="white" />
            </g>
          )}

          {/* Hub label */}
          <text
            y={48}
            textAnchor="middle"
            fontSize="24"
            fontWeight="700"
            fill="#22c55e"
            opacity={interpolate(frame, [65, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          >
            {hubLabel}
          </text>
        </g>

        {/* Final badge */}
        {frame > 130 && (
          <g
            transform={`translate(${HUB_X}, 555) scale(${Math.min(
              spring({
                frame: frame - 130,
                fps,
                config: { damping: 10, stiffness: 200 },
              }),
              1
            )})`}
          >
            <rect x="-130" y="-26" width="260" height="52" rx="26" fill="#22c55e" />
            <text textAnchor="middle" y="7" fontSize="22" fontWeight="700" fill="white">
              {badge}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
