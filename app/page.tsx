import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Section, SectionHead } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { StatBand } from "@/components/ui/StatBand";
import { Ping, ViewfinderFrame } from "@/components/visuals/MapMotifs";

/* Inline line-icons (geometric / cartographic vocabulary) */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const IconGeo = (
  <svg {...iconProps}>
    <path d="M9 20l-5.4 1.5L3 6l6-2 6 2 6-2 .6 15.5L15 22l-6-2zM9 4v16M15 6v16" />
  </svg>
);
const IconChart = (
  <svg {...iconProps}>
    <path d="M3 3v18h18M7 14l3-4 4 3 5-7" />
  </svg>
);
const IconTarget = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
  </svg>
);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-ink text-white"
        style={{
          background:
            "radial-gradient(120% 130% at 80% -10%, #294038 0%, var(--color-ink) 55%)",
        }}
      >
        <div
          aria-hidden="true"
          className="map-grid-dark absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_70%_at_70%_10%,#000_30%,transparent_75%)]"
        />
        <div className="wrap relative grid grid-cols-[1.05fr_0.95fr] items-center gap-10 py-[88px] max-md:grid-cols-1 max-md:py-14">
          <div>
            <Eyebrow onDark>
              Geomarketing · Predictive Analytics · Programmatic
            </Eyebrow>
            <h1 className="mt-4 text-[clamp(34px,6vw,54px)] font-extrabold text-white">
              Turn the <span className="text-gaia-300">where</span> in your data
              into your next decision.
            </h1>
            <p className="mt-5 max-w-[540px] text-[19px] leading-relaxed text-ink-muted">
              80% of your business data carries a location — yet most of it goes
              unused. Datagaia puts your customers on the map, predicts what
              they&apos;ll do next, and activates the right message in the right
              place.
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Button href="/contact" variant="primary">
                Talk to an expert
              </Button>
              <Button href="#solutions" variant="light">
                Explore solutions
              </Button>
            </div>
          </div>

          {/* Hero visual — map with location signals */}
          <div className="relative h-[380px] overflow-hidden rounded-[20px] border border-gaia-300/20 bg-gradient-to-br from-[#0e2a24] to-ink shadow-lift max-md:h-[300px]">
            <div className="map-grid-dark absolute inset-0 opacity-50" aria-hidden="true" />
            {/* Signature viewfinder reticle framing (legacy brand motif) */}
            <ViewfinderFrame left="12%" top="16%" className="h-[44%] w-[42%] rounded-[4px]" />
            <ViewfinderFrame right="10%" bottom="14%" className="h-[36%] w-[32%] rounded-[4px]" />
            <Ping left="24%" top="38%" />
            <Ping left="62%" top="30%" />
            <Ping left="48%" top="64%" />
            <Ping left="78%" top="60%" />
            <Chip style={{ left: "16%", top: "20%" }}>High-value cluster</Chip>
            <Chip style={{ left: "54%", top: "70%" }}>New store?</Chip>
            <Chip style={{ right: "8%", top: "40%" }}>+18% reach</Chip>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <Section id="solutions" tone="light">
        <SectionHead
          eyebrow="What we do"
          title="One partner, from insight to activation"
          lead="We combine geographic intelligence, predictive modelling and programmatic media so your strategy doesn't stop at the dashboard — it reaches the customer."
        />
        <div className="grid grid-cols-3 gap-6.5 max-md:grid-cols-1">
          <Card
            icon={IconGeo}
            title="Geomarketing"
            description="Know exactly where your customers are, who they are, and where to grow."
            bullets={[
              "Customer mapping & segmentation",
              "Site selection & territory planning",
              "Service areas, logistics & routing",
            ]}
            href="/geomarketing"
            cta="See how it works"
          />
          <Card
            icon={IconChart}
            title="Predictive & Sentiment"
            description="Statistical models that anticipate behaviour before it happens."
            bullets={[
              "Churn, demand & value prediction",
              "Customer sentiment analysis",
              "Models built on your own data",
            ]}
            href="/predictive-analytics"
            cta="See how it works"
          />
          <Card
            icon={IconTarget}
            title="Programmatic Advertising"
            description="Activate your insight with personalised, precisely targeted ads."
            bullets={[
              "Audience & geofencing strategy",
              "Automated, personalised delivery",
              "Transparent, measurable ROI",
            ]}
            href="/programmatic-advertising"
            cta="See how it works"
          />
        </div>
      </Section>

      {/* STATS */}
      <Section tone="ink" className="py-16">
        <StatBand
          stats={[
            { value: "80%", label: "of business data contains a spatial component" },
            { value: "90%", label: "of that location data sits unexploited today" },
            { value: "5th P", label: "location as the missing piece of your marketing mix" },
            { value: "1", label: "partner from insight to activation" },
          ]}
        />
      </Section>

      {/* CTA */}
      <section className="pb-[88px] pt-[88px] max-md:py-14">
        <div className="wrap">
          <div
            className="relative overflow-hidden rounded-panel px-6 py-16 text-center text-white"
            style={{
              background:
                "radial-gradient(120% 140% at 20% 0%, #294038, var(--color-ink))",
            }}
          >
            <h2 className="text-[clamp(28px,4vw,38px)] font-extrabold text-white">
              See your business on the map
            </h2>
            <p className="mx-auto mt-3.5 max-w-[520px] text-[18px] text-ink-muted">
              Book a short call with our team and we&apos;ll show you what your
              own data reveals about where to grow next.
            </p>
            <div className="mt-7">
              <Button href="/contact" variant="primary">
                Request a demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
