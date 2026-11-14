import Image from "next/image";

type PhotoTileProps = {
  src?: string;
  alt?: string;
  sizes: string;
  eager?: boolean;
  className?: string;
};

export function PhotoTile({
  src,
  alt = "",
  sizes,
  eager = false,
  className = "",
}: PhotoTileProps) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className={`flex items-center justify-center rounded-card border border-dashed border-ink-muted/40 bg-surface text-xs tracking-[0.2em] text-ink-muted uppercase ${className}`}
      >
        Photo
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-card ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="object-cover grayscale"
      />
    </div>
  );
}
