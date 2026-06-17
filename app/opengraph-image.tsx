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
          background: "linear-gradient(135deg, #111827 0%, #1c1917 55%, #3f3326 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "70px",
          color: "white",
          fontFamily: "Arial",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 70,
            background: "#f5f0e8",
            color: "#111827",
            width: 132,
            height: 132,
            borderRadius: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          LTR
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#d6c7a1",
              fontWeight: 700,
              marginBottom: 26,
            }}
          >
            Local Tzitzis String Repair
          </div>

          <div
            style={{
              fontSize: 86,
              lineHeight: 1,
              fontWeight: 900,
              marginBottom: 26,
            }}
          >
            London Tzitzis Repair
          </div>

          <div
            style={{
              width: 180,
              height: 8,
              background: "#d6c7a1",
              borderRadius: 999,
              marginBottom: 30,
            }}
          />

          <div
            style={{
              fontSize: 38,
              lineHeight: 1.35,
              color: "#f5f0e8",
              marginBottom: 32,
            }}
          >
            From £6 per corner · NW11 & NW4 collection available
          </div>

          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "white",
            }}
          >
            Call only: 07562 717278
          </div>
        </div>
      </div>
    ),
    size
  );
}