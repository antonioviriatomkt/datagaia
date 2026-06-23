import { cn } from "@/lib/cn";

/** Small floating data label used over map/feature visuals. Decorative. */
export function Chip({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn(
        "absolute z-10 rounded-[9px] border border-line bg-white px-2.5 py-1.5 font-display text-[12px] font-semibold text-ink shadow-chip",
        className,
      )}
    >
      {children}
    </span>
  );
}
