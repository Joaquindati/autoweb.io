import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface IntegrateProps {
  platforms?: { label: string; icon: string }[];
  hubLabel?: string;
  badge?: string;
}

const defaultPlatforms = [
  { label: "CRM", icon: "\u{1F4CA}" },
  { label: "Email", icon: "\u{1F4E7}" },
  { label: "Database", icon: "\u{1F5C4}\uFE0F" },
  { label: "API", icon: "\u{1F517}" },
  { label: "Calendar", icon: "\u{1F4C5}" },
];

const platformPositions = [
  { x: 160, y: 100, finalX: 220, finalY: 140 },
  { x: 740, y: 80, finalX: 660, finalY: 140 },
  { x: 140, y: 440, finalX: 220, finalY: 380 },
  { x: 760, y: 420, finalX: 660, finalY: 380 },
  { x: 460, y: 480, finalX: 440, finalY: 440 },
];

const HUB_X = 440;
const HUB_Y = 270;
const NODE_W = 120;
const NODE_H = 80;

export default function IntegrateAnimation({
  platforms: platformLabels = defaultPlatforms,
  hubLabel = "AUTOWEB",
  badge = "All Connected \u2713",
}: IntegrateProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const platforms = platformPositions.map((pos, i) => ({
    ...pos,
    label: platformLabels[i]?.label ?? defaultPlatforms[i].label,
    icon: platformLabels[i]?.icon ?? defaultPlatforms[i].icon,
  }));

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
      <svg viewBox="0 0 960 600" width="100%" height="100%">
        {/* Connection lines */}
        {platforms.map((p, i) => {
          const lineProgress = interpolate(
            frame,
            [30 + i * 8, 60 + i * 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const px = interpolate(frame, [0, 30 + i * 8], [p.x, p.finalX], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const py = interpolate(frame, [0, 30 + i * 8], [p.y, p.finalY], {
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
                strokeWidth="3"
                opacity={lineProgress * 0.5}
              />
              {frame > 100 && lineProgress > 0.9 && (
                <circle
                  cx={cx + (HUB_X - cx) * ((Math.sin(frame * 0.08 + i * 1.5) + 1) / 2)}
                  cy={cy + (HUB_Y - cy) * ((Math.sin(frame * 0.08 + i * 1.5) + 1) / 2)}
                  r="6"
                  fill="#22c55e"
                  opacity={pulseOpacity}
                />
              )}
            </g>
          );
        })}

        {/* Platform nodes */}
        {platforms.map((p, i) => {
          const nodeScale = spring({
            frame: frame - i * 5,
            fps,
            config: { damping: 12, stiffness: 200 },
          });
          const px = interpolate(frame, [0, 30 + i * 8], [p.x, p.finalX], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const py = interpolate(frame, [0, 30 + i * 8], [p.y, p.finalY], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const isConnected = frame > 60 + i * 8;

          return (
            <g
              key={`platform-${i}`}
              transform={`translate(${px}, ${py}) scale(${Math.min(nodeScale, 1)})`}
            >
              <rect
                width={NODE_W}
                height={NODE_H}
                rx="16"
                fill="white"
                stroke={isConnected ? "#22c55e" : "#cbd5e1"}
                strokeWidth={isConnected ? "3" : "2"}
              />
              <text
                x={NODE_W / 2}
                y={34}
                textAnchor="middle"
                fontSize="30"
              >
                {p.icon}
              </text>
              <text
                x={NODE_W / 2}
                y={64}
                textAnchor="middle"
                fontSize="20"
                fontWeight="600"
                fill="#334155"
              >
                {p.label}
              </text>
            </g>
          );
        })}

        {/* Central hub */}
        <g transform={`translate(${HUB_X}, ${HUB_Y})`}>
          <circle r="155" fill="#22c55e" opacity={glowOpacity * 0.1} />
          <circle r="135" fill="#22c55e" opacity={glowOpacity * 0.08} />
          <circle
            r="115"
            fill="white"
            stroke="#22c55e"
            strokeWidth="5"
            opacity={spring({
              frame: frame - 25,
              fps,
              config: { damping: 15, stiffness: 150 },
            })}
          />

          {/* Gear */}
          {frame > 65 && (
            <g
              transform={`rotate(${gearRotation})`}
              opacity={interpolate(frame, [65, 80], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            >
              <circle r="48" fill="#22c55e" opacity="0.2" />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <rect
                  key={angle}
                  x="-10"
                  y="-58"
                  width="20"
                  height="20"
                  rx="5"
                  fill="#22c55e"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle r="22" fill="#22c55e" />
              <circle r="10" fill="white" />
            </g>
          )}

          {/* Hub label */}
          <text
            y={82}
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="#22c55e"
            opacity={interpolate(frame, [70, 85], [0, 1], {
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
            transform={`translate(${HUB_X}, 540) scale(${Math.min(
              spring({
                frame: frame - 130,
                fps,
                config: { damping: 10, stiffness: 200 },
              }),
              1
            )})`}
          >
            <rect
              x="-130"
              y="-28"
              width="260"
              height="56"
              rx="28"
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
      </svg>
    </div>
  );
}
