import { cn } from "@/lib/cn";

/** 52px rounded tile holding a line icon — green on a faint green tint. */
export function IconChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-13 w-13 items-center justify-center rounded-chip bg-gaia-tint text-gaia-700 [&>svg]:h-6 [&>svg]:w-6",
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
