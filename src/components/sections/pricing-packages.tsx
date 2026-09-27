import type { PricingTableContent } from "@/content/pricing-pages";
import { Reveal } from "../reveal";
import { SuiteLockup } from "../suite-logo";
import { GradientText, Rich } from "../rich";
import { Badge, Container, SectionHead } from "../ui";
import { FunnelBanner, PlanCards } from "./pricing";

/** Icons for the standard-feature tiles, in the order the content lists them. */
const STANDARD_ICONS = [
  // SSL
  <path key="ssl" d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.7 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />,
  // app
  <g key="app">
    <rect x="6" y="2" width="12" height="20" rx="2.5" />
    <path d="M11 18h2" />
  </g>,
  // cloud
  <path key="cloud" d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9z" />,
  // leads
  <g key="leads">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    <circle cx="9" cy="7" r="4" />
  </g>,
];

/**
 * "Choose Your Power Level": quick-start packages, extras, the platform plans,
 * the SmartSync Funnel banner, standard features and the Local SEO packages.
 */
export function PricingPackages({ data }: { data: PricingTableContent }) {
  return (
    <section className="pb-24">
      <Container>
        {/* hero */}
        <Reveal className="flex flex-col items-center pt-[168px] text-center" stagger={0.1}>
          <Badge>{data.badge}</Badge>
          <h1 className="mt-6 text-balance text-[40px] font-medium leading-[1.1] tracking-[-0.03em] text-ink sm:text-[52px] lg:text-[64px]">
            <GradientText text={data.heading} highlight={data.highlight} />
          </h1>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.7] text-[#1E1E1E]">{data.subheading}</p>
        </Reveal>

        {/* quick start */}
        <div className="pt-24">
          <Reveal className="flex flex-col items-center">
            <SuiteLockup id="pt-quick-suite" size={36} className="mb-7" />
            <SectionHead heading={data.quickStart.heading} subheading={data.quickStart.subheading} />
          </Reveal>
          <PlanCards plans={data.quickStart.plans} className="mt-16" />
        </div>

        {/* extra lines / agents / locations */}
        <Reveal className="mt-12 rounded-[22px] border border-line bg-surface px-6 py-10 sm:px-10">
          <h2 className="text-center text-[24px] font-medium tracking-[-0.01em] text-ink">{data.extras.heading}</h2>
          <ul className="mx-auto mt-8 grid max-w-[860px] divide-line sm:grid-cols-3 sm:divide-x">
            {data.extras.items.map((item) => (
              <li key={item.label} className="py-3 text-center sm:py-0">
                <p className="text-[14px] text-muted">{item.label}</p>
                <p className="mt-1 text-[28px] font-medium tracking-[-0.02em] text-ink">{item.price}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mx-auto mt-8 max-w-[80ch] text-center">
          <p className="text-[15px] leading-[1.8] text-[#1E1E1E]">
            <Rich text={data.extras.body} />
          </p>
          <p className="mt-5 text-[14px] text-muted">{data.extras.setup}</p>
          <p className="mt-1 text-[14px] text-muted">
            <Rich text={data.extras.usage} />
          </p>
        </div>

        {/* full platform plans */}
        <PlanCards plans={data.platform.plans} className="mt-24" />

        {/* smartsync funnel, straight to its checkout */}
        {data.funnel?.heading ? <FunnelBanner data={data.funnel} payments className="mt-8" /> : null}

        {/* included with every plan */}
        <Reveal className="mx-auto mt-20 max-w-[920px] rounded-[22px] border border-line bg-white px-6 py-10 shadow-card sm:px-10">
          <h2 className="text-center text-[24px] font-medium tracking-[-0.01em] text-ink">{data.standard.heading}</h2>
          <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {data.standard.items.map((item, i) => (
              <li key={item} className="flex flex-col items-center gap-3 text-center">
                <span className="grid size-12 place-items-center rounded-[14px] bg-gradient-to-br from-[#052EFF] to-[#3300EA] text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {STANDARD_ICONS[i % STANDARD_ICONS.length]}
                  </svg>
                </span>
                <span className="text-[14px] font-medium text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* local seo packages */}
        <div className="pt-24">
          <Reveal className="flex flex-col items-center">
            <SuiteLockup id="pt-seo-funnel" product="funnel" size={36} className="mb-7" />
            <SectionHead heading={data.seo.heading} subheading={data.seo.subheading} />
          </Reveal>
          <PlanCards plans={data.seo.plans} className="mt-16" />
        </div>
      </Container>
    </section>
  );
}
