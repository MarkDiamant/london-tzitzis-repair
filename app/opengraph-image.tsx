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
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "60px 72px",
          color: "#071d49",
          fontFamily: "Arial",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 18,
            background: "#c5962e",
          }}
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 64,
          }}
        >
          <div
            style={{
              width: 500,
              height: 390,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff",
            }}
          >
            <img
              src="https://www.londontzitzisrepair.co.uk/logo1.png"
              width="480"
              height="390"
              style={{ objectFit: "contain" }}
            />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 24,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#b48622",
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Quality Service You Can Trust
            </div>

            <div
              style={{
                fontSize: 58,
                lineHeight: 1.06,
                fontWeight: 800,
                marginBottom: 25,
              }}
            >
              Tallis Tzitzis String Replacement & Repairs
            </div>

            <div
              style={{
                width: 145,
                height: 5,
                background: "#c5962e",
                marginBottom: 25,
              }}
            />

            <div
              style={{
                fontSize: 31,
                lineHeight: 1.3,
                color: "#263750",
              }}
            >
              1 corner £6  •  All 4 corners £20
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
