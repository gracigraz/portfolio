"use client";

import { useEffect, useRef, useState } from "react";

export function BackToTop() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting),
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[150vh]"
      />
      <a
        href="#top"
        inert={!visible}
        className={`fixed right-4 bottom-4 z-40 rounded-full bg-ink px-4 py-3 text-sm text-bg shadow-md ring-2 ring-bg transition-opacity sm:right-8 sm:bottom-8 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <span aria-hidden="true">↑</span> Back to top
      </a>
    </>
  );
}
