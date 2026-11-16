const LOOM_SHARE = /^https:\/\/(?:www\.)?loom\.com\/share\/([a-f0-9]{32})$/i;

export function loomEmbedUrl(shareUrl: string): string | null {
  const match = LOOM_SHARE.exec(shareUrl.trim());
  return match ? `https://www.loom.com/embed/${match[1]}` : null;
}
