import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
      <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">404</p>
      <h1 className="mt-4 font-serif text-5xl sm:text-7xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink-muted">
        The link may be broken, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block rounded-full bg-ink px-6 py-3 text-bg transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </section>
  );
}
