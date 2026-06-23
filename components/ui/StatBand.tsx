import { cn } from "@/lib/cn";

export type Stat = { value: string; label: string };

/** Dark proof band — large green figures + muted labels. */
export function StatBand({
  stats,
  className,
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-7.5 text-center max-md:grid-cols-2 max-md:gap-9",
        className,
      )}
    >
      {stats.map((s) => (
        <div key={s.label}>
          <div className="font-display text-[44px] font-extrabold leading-none text-gaia-300">
            {s.value}
          </div>
          <p className="mt-1.5 text-[14.5px] text-ink-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
