import { cn } from "@/lib/cn";

/**
 * The Datagaia globe graticule — traced from the brand GIF
 * (circle + 3 vertical meridians + 2 horizontal parallels, clipped to the circle).
 * Pure SVG, server-renderable. `currentColor` so it themes via `text-*`.
 *
 * `uid` makes the clipPath id unique when several marks render on one page.
 * `animated` enables the draw-in (reduced-motion safe; see globals.css).
 * `decorative` hides it from the a11y tree — use inside a labelled link/lockup
 * (Logo, Footer) where an adjacent wordmark already names the element.
 */
export function GlobeMark({
  uid = "dg",
  animated = false,
  decorative = false,
  title = "Datagaia",
  className,
}: {
  uid?: string;
  animated?: boolean;
  decorative?: boolean;
  title?: string;
  className?: string;
}) {
  const clipId = `globe-clip-${uid}`;
  const draw = (stagger: string) => (animated ? `logo-draw ${stagger}` : undefined);
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": title } as const);

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      {...a11y}
      className={className}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="32" cy="32" r="27.8" />
        </clipPath>
      </defs>
      <g
        clipPath={`url(#${clipId})`}
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
      >
        <line className={draw("logo-draw-m1")} pathLength={1} x1="14" y1="0" x2="14" y2="64" />
        <line className={draw("logo-draw-m2")} pathLength={1} x1="32" y1="0" x2="32" y2="64" />
        <line className={draw("logo-draw-m3")} pathLength={1} x1="50" y1="0" x2="50" y2="64" />
        <line className={draw("logo-draw-p1")} pathLength={1} x1="0" y1="19" x2="64" y2="19" />
        <line className={draw("logo-draw-p2")} pathLength={1} x1="0" y1="45" x2="64" y2="45" />
      </g>
      <circle
        className={cn(draw("logo-draw-ring"))}
        pathLength={1}
        cx="32"
        cy="32"
        r="29"
        stroke="currentColor"
        strokeWidth={2.4}
      />
    </svg>
  );
}
