import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "light";

const base =
  "inline-flex items-center justify-center gap-2 font-display text-[15px] font-bold rounded-pill px-6 py-3 transition duration-200 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Dark-ink text on green — AA-safe (white-on-green fails); see design-language §2.4
  primary:
    "bg-gaia text-ink shadow-[0_10px_24px_-10px_rgba(15,155,96,0.55)] hover:bg-gaia-600 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(15,155,96,0.65)]",
  ghost:
    "border-[1.5px] border-line text-ink hover:border-gaia hover:text-gaia-ink",
  light:
    "border-[1.5px] border-white/30 bg-white/10 text-white hover:bg-white/20",
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = BaseProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof BaseProps | "href"
  >;

type ButtonAsButton = BaseProps & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseProps
  >;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  if (props.href !== undefined) {
    const { variant = "primary", className, children, href, ...rest } = props;
    const classes = cn(base, variants[variant], className);
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
    if (isExternal) {
      const extAttrs = href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};
      return (
        <a href={href} className={classes} {...extAttrs} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
