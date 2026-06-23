import Link from "next/link";
import { cn } from "@/lib/cn";
import { IconChip } from "./IconChip";

/** Solution / service card — icon, title, blurb, green-bulleted list, link. */
export function Card({
  icon,
  title,
  description,
  bullets,
  href,
  cta,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  bullets?: string[];
  href?: string;
  cta?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-card border border-line bg-white p-8 transition duration-200 hover:-translate-y-1 hover:border-transparent hover:shadow-lift",
        className,
      )}
    >
      {icon && <IconChip className="mb-5">{icon}</IconChip>}
      <h3 className="text-[21px] font-bold">{title}</h3>
      <p className="mt-2.5 text-[15px] text-muted">{description}</p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-4.5 flex flex-col gap-2.5">
          {bullets.map((b) => (
            <li key={b} className="relative pl-6 text-[14.5px] text-ink-2">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[7px] h-3 w-3 rounded-full bg-gaia"
              />
              {b}
            </li>
          ))}
        </ul>
      )}
      {href && cta && (
        <Link
          href={href}
          aria-label={`${cta}: ${title}`}
          className="mt-auto pt-5.5 font-display text-[14px] font-bold text-gaia-ink hover:underline"
        >
          {cta} →
        </Link>
      )}
    </div>
  );
}
