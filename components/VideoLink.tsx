"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { loomEmbedUrl } from "@/lib/video";

export function VideoLink({
  href,
  title,
  className,
  children,
}: {
  href: string;
  title: string;
  className: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const embedUrl = loomEmbedUrl(href);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const wantsNewTab =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (!embedUrl || wantsNewTab || event.button !== 0) return;
    event.preventDefault();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  }

  return (
    <>
      <a
        ref={triggerRef}
        href={href}
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
      {open &&
        embedUrl &&
        createPortal(
          <dialog
            ref={dialogRef}
            aria-labelledby={headingId}
            onClose={handleClose}
            onClick={handleBackdropClick}
            className="m-auto w-[min(92vw,960px)] max-w-none rounded-card border border-line bg-bg p-0 text-ink shadow-xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3">
              <h2 id={headingId} className="font-serif text-xl">
                {title}
              </h2>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close video"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-lg leading-none hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
            <div className="aspect-video w-full bg-surface">
              <iframe
                src={embedUrl}
                title={`Demo video: ${title}`}
                allow="fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <p className="px-5 py-3 text-right text-sm">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-highlight"
              >
                Open in Loom <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </dialog>,
          document.body,
        )}
    </>
  );
}
