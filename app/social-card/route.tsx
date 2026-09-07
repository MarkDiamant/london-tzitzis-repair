import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#06183d", fontFamily: "Arial", padding: "28px" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#fffdf8", borderRadius: "32px" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "12px", background: "#c79a35" }} />
        <div style={{ position: "absolute", width: "420px", height: "420px", borderRadius: "210px", background: "#f2e7cb", right: "-120px", top: "-150px", display: "flex" }} />
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "42px 68px" }}>
          <img src="https://www.londontzitzisrepair.co.uk/logo1.png" width="420" height="155" style={{ objectFit: "contain", objectPosition: "left center", marginBottom: 24 }} />
          <div style={{ display: "flex", color: "#c0922d", fontSize: 24, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>Quality service you can trust</div>
          <div style={{ display: "flex", color: "#071d49", fontSize: 64, lineHeight: 1.02, fontWeight: 800, maxWidth: 980, marginBottom: 28 }}>
            Tallis Tzitzis String<br />Replacement & Repairs
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ display: "flex", background: "#071d49", color: "white", borderRadius: "18px", padding: "15px 24px", fontSize: 28, fontWeight: 700 }}>1 corner&nbsp; £6</div>
            <div style={{ display: "flex", background: "#c79a35", color: "#071d49", borderRadius: "18px", padding: "15px 24px", fontSize: 28, fontWeight: 800 }}>All 4 corners&nbsp; £20</div>
          </div>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
