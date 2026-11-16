import { ImageResponse } from "next/og";

export const alt = "One10 Brands Marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#090909",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, color: "#A1A1A1" }}>BRANDS MARKETING</div>
        <div style={{ display: "flex", fontSize: 92, letterSpacing: 4, marginTop: 12 }}>ONE10</div>
        <div style={{ width: 180, height: 6, background: "#D71920", marginTop: 28 }} />
        <div style={{ display: "flex", fontSize: 32, marginTop: 28, maxWidth: 800 }}>
          We build brands. We create growth.
        </div>
      </div>
    ),
    size,
  );
}
