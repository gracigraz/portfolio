import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: software engineer portfolio and case studies`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const serif = await readFile(
    join(process.cwd(), "assets/InstrumentSerif-Regular.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#fbf7f0",
        color: "#0f5132",
        fontFamily: "Instrument Serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 26,
          letterSpacing: 4,
          color: "#5c564e",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: "#c8a96b",
          }}
        />
        SOFTWARE ENGINEER
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 120, lineHeight: 1 }}>{site.name}</div>
        <div style={{ marginTop: 28, fontSize: 40, color: "#5c564e" }}>
          Case studies: content attribution, AI agents, internal tools
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: 18,
          width: 360,
          borderRadius: 999,
          background: "#9fba96",
        }}
      />
    </div>,
    {
      ...size,
      fonts: [{ name: "Instrument Serif", data: serif, weight: 400 }],
    },
  );
}
