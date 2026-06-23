import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Alternating two-column feature block: text + visual.
 * `reversed` flips the order (visual on the left) on desktop.
 */
export function FeatureBlock({
  eyebrow,
  title,
  keyline,
  children,
  visual,
  reversed = false,
  cta,
  className,
}: {
  eyebrow: string;
  title: string;
  keyline?: React.ReactNode;
  children?: React.ReactNode;
  visual: React.ReactNode;
  reversed?: boolean;
  cta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 items-center gap-15 max-md:grid-cols-1 max-md:gap-7",
        className,
      )}
    >
      <div className={cn(reversed && "md:order-2")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-3 text-[clamp(24px,3vw,30px)] font-extrabold">{title}</h3>
        {keyline && (
          <p className="mt-4 text-[16.5px] font-semibold text-ink">{keyline}</p>
        )}
        {children && (
          <div className="mt-3.5 space-y-3.5 text-[16.5px] text-muted">
            {children}
          </div>
        )}
        {cta && <div className="mt-5">{cta}</div>}
      </div>
      <div className={cn(reversed && "md:order-1")}>{visual}</div>
    </div>
  );
}
