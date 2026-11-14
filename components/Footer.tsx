import { cacheLife } from "next/cache";
import { site } from "@/lib/site";

export async function Footer() {
  "use cache";
  cacheLife("days");

  return (
    <footer className="border-t border-line">
      <p className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-ink-muted sm:px-8">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
