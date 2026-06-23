import { cn } from "@/lib/cn";

/** The brand-signature label: uppercase, wide-tracked, green. */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-display text-[13px] font-bold uppercase tracking-[0.14em]",
        onDark ? "text-gaia-300" : "text-gaia-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
