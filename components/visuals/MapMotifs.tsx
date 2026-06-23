import { cn } from "@/lib/cn";

type Pos = { left?: string; top?: string; right?: string; bottom?: string };

/** Location pin (rounded teardrop), brand green. Decorative. */
export function Pin({ className, ...pos }: Pos & { className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={pos}
      className={cn(
        "absolute h-3 w-3 rotate-45 rounded-[50%_50%_50%_0] bg-gaia-700 shadow-[0_0_0_4px_rgba(15,155,96,0.18)]",
        className,
      )}
    />
  );
}

/** Pulsing location ping (animated ring, reduced-motion safe via globals.css). */
export function Ping({ className, ...pos }: Pos & { className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={pos}
      className={cn("absolute h-3.5 w-3.5 rounded-full bg-gaia", className)}
    >
      <span className="ping-ring absolute -inset-2 rounded-full border-2 border-gaia" />
    </span>
  );
}

/** Soft blurred density blob (heat/catchment cue). */
export function Blob({
  size = 160,
  className,
  ...pos
}: Pos & { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, ...pos }}
      className={cn(
        "absolute rounded-full bg-gaia opacity-15 blur-[2px]",
        className,
      )}
    />
  );
}

/**
 * The legacy "viewfinder" motif — thin green rectangle outline that frames
 * imagery/visuals like a targeting reticle. Decorative.
 */
export function ViewfinderFrame({
  className,
  ...pos
}: Pos & { className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={pos}
      className={cn(
        "pointer-events-none absolute border-[1.5px] border-gaia/60",
        className,
      )}
    />
  );
}

/** Dashed/solid route line over a visual panel. Decorative SVG. */
export function RouteLine({
  d = "M40 240 C120 200 140 90 240 110 S360 60 370 60",
  color = "var(--color-gaia)",
  dashed = true,
}: {
  d?: string;
  color?: string;
  dashed?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeDasharray={dashed ? "7 8" : undefined}
      />
    </svg>
  );
}
