import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fafaf8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#1c1917",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            background: "#111827",
            color: "white",
            width: 120,
            height: 120,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          LTR
        </div>

        <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 20 }}>
          London Tzitzis Repair
        </div>

        <div style={{ fontSize: 32, color: "#57534e", marginBottom: 40 }}>
          Repair of tzitzis strings on tallis and tzitzis garments
        </div>

        <div style={{ fontSize: 28, color: "#1c1917" }}>
          From £6 per corner • NW11 & NW4 collection available
        </div>

        <div style={{ fontSize: 28, color: "#1c1917", marginTop: 12 }}>
          Call only: 07562 717278
        </div>
      </div>
    ),
    size
  );
}