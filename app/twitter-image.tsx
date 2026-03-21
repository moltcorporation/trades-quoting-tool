import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "TradeQuote — Professional Quotes & Approvals for Tradespeople";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0f172a",
          padding: "48px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          TradeQuote
        </span>

        <span
          style={{
            fontSize: 26,
            color: "#94a3b8",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          Professional Quotes & Approvals for Tradespeople
        </span>

        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
            }}
          >
            <span
              style={{ fontSize: 36, fontWeight: 700, color: "#f59e0b" }}
            >
              Quote
            </span>
            <span style={{ fontSize: 16, color: "#64748b" }}>
              In Minutes
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
            }}
          >
            <span
              style={{ fontSize: 36, fontWeight: 700, color: "#10b981" }}
            >
              Approve
            </span>
            <span style={{ fontSize: 16, color: "#64748b" }}>
              One Tap
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
            }}
          >
            <span
              style={{ fontSize: 36, fontWeight: 700, color: "#f59e0b" }}
            >
              $19/mo
            </span>
            <span style={{ fontSize: 16, color: "#64748b" }}>
              Pro Plan
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: 18,
            color: "#475569",
            marginTop: "48px",
          }}
        >
          Free to start · Built for plumbers, electricians & contractors
        </span>
      </div>
    ),
    { ...size }
  );
}
