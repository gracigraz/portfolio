import Image from "next/image";

type PhotoTileProps = {
  src: string;
  alt: string;
  sizes: string;
  focus?: string;
  color?: boolean;
  eager?: boolean;
  className?: string;
};

export function PhotoTile({
  src,
  alt,
  sizes,
  focus = "center",
  color = false,
  eager = false,
  className = "",
}: PhotoTileProps) {
  return (
    <div className={`relative overflow-hidden rounded-card ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className={`object-cover ${color ? "" : "grayscale"}`}
        style={{ objectPosition: focus }}
      />
    </div>
  );
}
