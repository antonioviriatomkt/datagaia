import Link from "next/link";
import { cn } from "@/lib/cn";
import { GlobeMark } from "./GlobeMark";

/**
 * Full lockup: green globe mark + `datagaia.io` wordmark.
 * Wordmark inherits `currentColor` so it adapts to light/dark headers;
 * the mark is always brand green.
 */
export function Logo({
  uid = "logo",
  animated = false,
  className,
}: {
  uid?: string;
  animated?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Datagaia — home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <GlobeMark uid={uid} animated={animated} decorative className="h-7 w-7 shrink-0 text-gaia" />
      <span className="font-display text-[21px] font-extrabold tracking-[-0.03em]">
        datagaia.io
      </span>
    </Link>
  );
}
