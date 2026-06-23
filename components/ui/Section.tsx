import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type Tone = "light" | "mist" | "ink";

const tones: Record<Tone, string> = {
  light: "bg-white text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-white",
};

/** Page section with consistent vertical rhythm + tone + container. */
export function Section({
  tone = "light",
  id,
  container = true,
  className,
  children,
}: {
  tone?: Tone;
  id?: string;
  container?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-[88px] max-md:py-14", tones[tone], className)}
    >
      {container ? <div className="wrap">{children}</div> : children}
    </section>
  );
}

/** Centered section header: eyebrow → h2 → lead. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-13 max-w-[680px] text-center", className)}>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-3.5 text-[clamp(28px,4vw,40px)] font-extrabold",
          onDark && "text-white",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-3.5 text-[18px]",
            onDark ? "text-ink-muted" : "text-muted",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
