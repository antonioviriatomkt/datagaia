/**
 * Site-wide configuration — single source of truth for nav, CTA, contact.
 * PLACEHOLDER values are flagged; confirm with the owner (brief §13).
 */
export const site = {
  name: "Datagaia",
  domain: "datagaia.io",
  url: "https://datagaia.io",
  tagline: "Turn the where in your data into your next decision.",
  description:
    "Datagaia is a data-intelligence consultancy: geomarketing, predictive analytics and programmatic advertising — one partner from insight to activation.",
  email: "hello@datagaia.io", // PLACEHOLDER — confirm demo-routing address
  social: {
    linkedin: "https://www.linkedin.com/", // PLACEHOLDER
  },
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Geomarketing", href: "/geomarketing" },
  { label: "Predictive", href: "/predictive-analytics" },
  { label: "Programmatic", href: "/programmatic-advertising" },
  { label: "Cases", href: "/cases" },
  { label: "Clients", href: "/clients" },
  { label: "About", href: "/about" },
];

/** The one persistent conversion goal across the whole site. */
export const primaryCta = { label: "Request a demo", href: "/contact" } as const;

export const footerNav = {
  Solutions: [
    { label: "Geomarketing", href: "/geomarketing" },
    { label: "Predictive Analytics", href: "/predictive-analytics" },
    { label: "Programmatic Advertising", href: "/programmatic-advertising" },
    { label: "Geoprocessing APIs", href: "/geomarketing#apis" },
  ],
  Company: [
    { label: "Cases", href: "/cases" },
    { label: "Clients", href: "/clients" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} satisfies Record<string, NavItem[]>;
