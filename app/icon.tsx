import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const serif = await readFile(
    join(process.cwd(), "assets/InstrumentSerif-Regular.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        background: "#0f5132",
        color: "#fbf7f0",
        fontFamily: "Instrument Serif",
        fontSize: 52,
        paddingBottom: 4,
      }}
    >
      G
    </div>,
    {
      ...size,
      fonts: [{ name: "Instrument Serif", data: serif, weight: 400 }],
    },
  );
}
