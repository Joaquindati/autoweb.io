import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Automatika — Custom Automation Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Automatika
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#22c55e",
            }}
          >
            .
          </span>
        </div>
        <span
          style={{
            fontSize: 28,
            color: "#94a3b8",
            fontWeight: 400,
          }}
        >
          Custom Automation Services
        </span>
      </div>
    ),
    { ...size }
  );
}
