import { cn } from "@/lib/cn";

/**
 * The visual half of a feature block: a rounded, bordered panel with a faint
 * map grid, ready to hold pins / chips / routes — or a real product screenshot.
 */
export function FeaturePanel({
  children,
  className,
  height = "h-[330px]",
}: {
  children?: React.ReactNode;
  className?: string;
  height?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[18px] border border-line bg-mist shadow-lift",
        height,
        className,
      )}
    >
      <div className="map-grid-light absolute inset-0" aria-hidden="true" />
      {children}
    </div>
  );
}
