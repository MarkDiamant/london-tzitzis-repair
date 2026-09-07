import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#071d49", padding: "18px" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#ffffff", border: "5px solid #c5962e", padding: "28px 55px" }}>
        <img src="https://www.londontzitzisrepair.co.uk/logo1.png" width="560" height="260" style={{ objectFit: "contain", marginBottom: 8 }} />
        <div style={{ display: "flex", width: 760, height: 4, background: "#c5962e", marginBottom: 20 }} />
        <div style={{ display: "flex", color: "#071d49", fontFamily: "Arial", fontSize: 54, lineHeight: 1.05, fontWeight: 800, textAlign: "center", maxWidth: 1050, marginBottom: 18 }}>
          Tallis Tzitzis String Replacement & Repairs
        </div>
        <div style={{ display: "flex", color: "#263750", fontFamily: "Arial", fontSize: 32, fontWeight: 600, textAlign: "center" }}>
          1 corner £6   •   All 4 corners £20
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
