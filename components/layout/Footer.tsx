import Link from "next/link";
import { GlobeMark } from "@/components/brand/GlobeMark";
import { site, footerNav } from "@/lib/site";

/** Fat dark footer. */
export function Footer() {
  return (
    <footer className="bg-ink text-ink-muted">
      <div className="wrap py-16">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-9 border-b border-white/10 pb-10 max-md:grid-cols-2">
          <div>
            <Link
              href="/"
              aria-label="Datagaia — home"
              className="inline-flex items-center gap-2.5 text-white"
            >
              <GlobeMark uid="ftr" decorative className="h-6 w-6 text-gaia" />
              <span className="font-display text-[21px] font-extrabold tracking-[-0.03em]">
                datagaia.io
              </span>
            </Link>
            <p className="mt-3.5 max-w-[260px] text-[14px]">
              Geographic intelligence, predictive analytics and programmatic
              advertising — one partner from insight to activation.
            </p>
          </div>

          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h2 className="mb-4 font-display text-[14px] tracking-[0.04em] text-white">
                {heading}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] transition-colors hover:text-gaia-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-4 font-display text-[14px] tracking-[0.04em] text-white">
              Get in touch
            </h2>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[14px] transition-colors hover:text-gaia-300"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[14px] transition-colors hover:text-gaia-300"
                >
                  Request a demo
                </Link>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] transition-colors hover:text-gaia-300"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 pt-5.5 text-[13px] text-ink-muted/80">
          <span>© Datagaia {new Date().getFullYear()}. Mapping your customer.</span>
          <span>
            Geomarketing · Predictive Analytics · Programmatic Advertising
          </span>
        </div>
      </div>
    </footer>
  );
}
