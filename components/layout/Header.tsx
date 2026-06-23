import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { nav, primaryCta } from "@/lib/site";

/** Sticky translucent header. Server component; only the menu toggle is client. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/[0.86] backdrop-blur-[12px]">
      <div className="wrap flex h-[70px] items-center justify-between">
        <Logo uid="hdr" animated />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7.5 md:flex"
        >
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink-2 transition-colors hover:text-gaia-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
