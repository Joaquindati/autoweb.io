import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface StudyProps {
  nodes?: string[];
  issuesTitle?: string;
  issues?: string[];
  badge?: string;
}

export default function StudyAnimation({
  nodes: nodeLabels = ["Intake", "Process", "Review", "Output"],
  issuesTitle = "Issues Found",
  issues = ["Manual data entry", "Bottleneck detected", "Missing integration", "Redundant steps"],
  badge = "Audit Complete",
}: StudyProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Magnifying glass position
  const lupaX = interpolate(frame, [0, 30, 60, 90], [100, 280, 420, 350], {
    extrapolateRight: "clamp",
  });
  const lupaY = interpolate(frame, [0, 30, 60, 90], [80, 200, 130, 220], {
    extrapolateRight: "clamp",
  });
  const lupaOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lupaScale = spring({ frame, fps, config: { damping: 15, stiffness: 200 } });

  // Workflow nodes
  const nodes = [
    { x: 60, y: 200, label: nodeLabels[0], delay: 5 },
    { x: 240, y: 130, label: nodeLabels[1], delay: 10 },
    { x: 420, y: 200, label: nodeLabels[2], delay: 15 },
    { x: 600, y: 130, label: nodeLabels[3], delay: 20 },
  ];

  const nodeW = 140;
  const nodeH = 56;

  // Problem highlights
  const problemOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const problemPulse = Math.sin(frame * 0.3) * 0.3 + 0.7;

  // Checklist items
  const checklistItems = [
    { label: issues[0], delay: 65 },
    { label: issues[1], delay: 75 },
    { label: issues[2], delay: 85 },
    { label: issues[3], delay: 95 },
  ];

  // Report consolidation
  const reportScale = spring({
    frame: frame - 110,
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const reportProgress = interpolate(frame, [115, 145], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#f0fdf4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 960 600" width="100%" height="100%">
        {/* Workflow connections */}
        {nodes.slice(0, -1).map((node, i) => {
          const next = nodes[i + 1];
          const lineProgress = interpolate(
            frame,
            [node.delay, node.delay + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <line
              key={`line-${i}`}
              x1={node.x + nodeW / 2}
              y1={node.y + nodeH / 2}
              x2={node.x + nodeW / 2 + (next.x - node.x) * lineProgress}
              y2={node.y + nodeH / 2 + (next.y - node.y) * lineProgress}
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray="10 6"
              opacity={0.5}
            />
          );
        })}

        {/* Workflow nodes */}
        {nodes.map((node, i) => {
          const nodeScale = spring({
            frame: frame - node.delay,
            fps,
            config: { damping: 15, stiffness: 250 },
          });
          const isProblem = i === 1 || i === 2;
          return (
            <g
              key={`node-${i}`}
              transform={`translate(${node.x}, ${node.y}) scale(${nodeScale})`}
            >
              {isProblem && frame > 35 && (
                <rect
                  x="-6"
                  y="-6"
                  width={nodeW + 12}
                  height={nodeH + 12}
                  rx="18"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  opacity={problemOpacity * problemPulse}
                />
              )}
              <rect
                width={nodeW}
                height={nodeH}
                rx="14"
                fill="white"
                stroke={isProblem && frame > 35 ? "#ef4444" : "#22c55e"}
                strokeWidth="3"
              />
              <text
                x={nodeW / 2}
                y={nodeH / 2 + 8}
                textAnchor="middle"
                fontSize="28"
                fontWeight="600"
                fill={isProblem && frame > 35 ? "#ef4444" : "#0f172a"}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Magnifying glass */}
        <g
          transform={`translate(${lupaX}, ${lupaY}) scale(${lupaScale})`}
          opacity={lupaOpacity}
        >
          <circle
            cx="0"
            cy="0"
            r="45"
            fill="white"
            fillOpacity="0.3"
            stroke="#22c55e"
            strokeWidth="4"
          />
          <line
            x1="32"
            y1="32"
            x2="58"
            y2="58"
            stroke="#22c55e"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {frame > 20 && frame < 90 && (
            <line
              x1="-28"
              y1={Math.sin(frame * 0.2) * 22}
              x2="28"
              y2={Math.sin(frame * 0.2) * 22}
              stroke="#22c55e"
              strokeWidth="2.5"
              opacity="0.6"
            />
          )}
        </g>

        {/* Checklist panel */}
        {frame > 60 && (
          <g transform="translate(580, 220)">
            <rect
              width="360"
              height={280}
              rx="18"
              fill="white"
              stroke="#e2e8f0"
              strokeWidth="2"
              opacity={interpolate(frame, [60, 70], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
            <text
              x="28"
              y="45"
              fontSize="28"
              fontWeight="700"
              fill="#0f172a"
              opacity={interpolate(frame, [60, 70], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            >
              {issuesTitle}
            </text>

            {checklistItems.map((item, i) => {
              const itemOpacity = interpolate(
                frame,
                [item.delay, item.delay + 8],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const checkOpacity = interpolate(
                frame,
                [item.delay + 15, item.delay + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <g key={i} opacity={itemOpacity}>
                  <rect
                    x="28"
                    y={66 + i * 46}
                    width="22"
                    height="22"
                    rx="5"
                    fill={checkOpacity > 0.5 ? "#22c55e" : "white"}
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                  {checkOpacity > 0.5 && (
                    <path
                      d={`M${32} ${77 + i * 46} L${37} ${83 + i * 46} L${46} ${73 + i * 46}`}
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}
                  <text
                    x="60"
                    y={83 + i * 46}
                    fontSize="22"
                    fill="#334155"
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* Report badge */}
        {frame > 110 && (
          <g
            transform={`translate(480, 550) scale(${Math.min(reportScale, 1)})`}
          >
            <rect
              x="-180"
              y="-32"
              width="360"
              height="64"
              rx="32"
              fill="#22c55e"
            />
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fontSize="26"
              fontWeight="700"
              fill="white"
            >
              {badge} {Math.round(reportProgress)}%
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
