import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", background: "#ffffff",
      color: "#071d49", fontFamily: "Arial", padding: "44px 70px",
      borderTop: "12px solid #c5962e", borderBottom: "12px solid #c5962e"
    }}>
      <img
        src="https://www.londontzitzisrepair.co.uk/logo1.png"
        width="500" height="220"
        style={{ objectFit: "contain", marginBottom: 18 }}
      />
      <div style={{ width: 650, height: 2, background: "#c5962e", marginBottom: 24 }} />
      <div style={{
        display: "flex", fontSize: 46, lineHeight: 1.08, fontWeight: 800,
        textAlign: "center", maxWidth: 1000, marginBottom: 22
      }}>
        Tallis Tzitzis String Replacement & Repairs
      </div>
      <div style={{
        display: "flex", fontSize: 28, letterSpacing: 1, color: "#263750",
        textAlign: "center"
      }}>
        1 corner £6   •   All 4 corners £20
      </div>
    </div>,
    size
  );
}
