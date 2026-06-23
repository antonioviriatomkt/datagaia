"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nav, primaryCta } from "@/lib/site";
import { Button } from "@/components/ui/Button";

/** The only interactive client component in the header. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Move focus into the panel when it opens (keyboard/SR users).
    if (open) firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-chip text-ink"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full border-b border-line bg-white px-6 py-5 shadow-lift"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                onClick={() => close()}
                className="rounded-chip px-2 py-2.5 text-[16px] font-medium text-ink-2 hover:bg-mist hover:text-gaia-ink"
              >
                {link.label}
              </Link>
            ))}
            <Button
              href={primaryCta.href}
              variant="primary"
              className="mt-3 w-full"
              onClick={() => close()}
            >
              {primaryCta.label}
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
