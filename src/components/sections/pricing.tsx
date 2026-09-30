import type { HomeContent } from "@/content/home";
import { PaymentMarks } from "../payment-marks";
import { Reveal } from "../reveal";
import { SuiteLockup } from "../suite-logo";
import { Button, CheckRing, Container, GLOW, SectionHead, Tick } from "../ui";

/**
 * A plan card as the home page stores it, plus the optional extras the
 * /pricing-table page needs. Home plans leave them out and render as before.
 */
export type PlanCard = HomeContent["pricing"]["plans"][number] & {
  /** Per-plan price unit; falls back to the section's period. */
  unit?: string;
  /** Small line under the price — "One-Time Payment", a savings note. */
  priceNote?: string;
  /** Small print under the button — "Cancel or Pause Anytime". */
  footnote?: string;
};

/** The three-across plan cards, shared by the home pricing section and /pricing-table. */
export function PlanCards({
  plans,
  period = "",
  className = "",
}: {
  plans: PlanCard[];
  period?: string;
  className?: string;
}) {
  return (
    <Reveal className={`grid gap-[25px] lg:grid-cols-3 ${className}`} stagger={0.16} delay={0.18}>
      {plans.map((plan) => {
        const hot = plan.featured;
        return (
          <article
            key={plan.name}
            className={`relative flex flex-col rounded-[22px] p-8 ${
              hot
                ? "bg-linear-to-br from-[#052EFF] to-[#3300EA] text-white"
                : "border border-black/25 bg-linear-to-br from-[#cabee2]/20 via-white/10 to-[#cad7dd]/30 backdrop-blur-xl"
            }`}
          >
            {/* clip-path as well as overflow: iOS Safari lets a blurred child
                escape an overflow:hidden rounded box, and the glows showed as
                square patches past the card's corners on iPhone 17 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px] [clip-path:inset(0_round_22px)]"
            >
              <span
                className={`absolute right-0 -top-20 size-64 rounded-full blur-[60px] ${hot ? "opacity-100" : "opacity-[0.22]"}`}
                style={{ background: GLOW }}
              />
              <span
                className={`absolute -bottom-20 -left-20 size-64 rounded-full blur-[60px] ${hot ? "opacity-100" : "opacity-[0.22]"}`}
                style={{ background: GLOW }}
              />
            </div>

            {plan.badge ? (
              <span className="absolute -top-3.5 right-8 rounded-full px-4 py-1.5 text-[16px] font-normal text-brand bg-white border-brand border-solid border shadow-lift">
                {plan.badge}
              </span>
            ) : null}

            <h3
              className={`relative text-[20px] font-medium ${hot ? "text-white" : "text-[#1e1e1e]"}`}
            >
              {plan.name}
            </h3>

            <p className="relative mt-4 flex items-baseline gap-1.5">
              <span
                className={`text-[64px] font-medium leading-none tracking-[-0.03em] ${hot ? "text-white" : "text-ink"}`}
              >
                {plan.price}
              </span>
              <span
                className={`text-[16px] ${hot ? "text-white/70" : "text-[#1e1e1e]"}`}
              >
                {plan.unit || period}
              </span>
            </p>

            {plan.priceNote ? (
              <p
                className={`relative mt-2 mb-3 text-[13px] leading-snug ${hot ? "text-white/80" : "text-muted"}`}
              >
                {plan.priceNote}
              </p>
            ) : null}

            <p
              className={`relative text-[14px] pb-[36px] border-b  ${hot ? "text-white/75 border-white/25" : "text-[#1e1e1e] border-black/25"}`}
            >
              {plan.tagline}
            </p>

            <ul className="relative mt-8 mb-10 space-y-3.5">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-3 text-[16px] leading-snug ${hot ? "text-white/90" : "text-[#1e1e1e]"}`}
                >
                  <CheckRing
                    className={`mt-px size-[17px] shrink-0 ${hot ? "text-white/80" : "text-brand"}`}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              cta={plan.cta}
              variant={hot ? "white" : "outline"}
              className="relative mt-auto w-full"
            />

            <PaymentMarks className="relative mt-4" />

            {plan.footnote ? (
              <p
                className={`relative mt-3 text-center text-[13px] ${hot ? "text-white/75" : "text-muted"}`}
              >
                {plan.footnote}
              </p>
            ) : null}
          </article>
        );
      })}
    </Reveal>
  );
}

export function Pricing({ data }: { data: HomeContent["pricing"] }) {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-page py-14 md:py-24 lg:py-28"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 select-none text-[120px] md:text-[324px] font-black leading-none tracking-[-0.04em] text-ink/[0.038]"
      >
        {data.watermark}
      </span>

      <Container className="relative">
        <Reveal>
          <SectionHead
            badge={data.badge}
            heading={data.heading}
            subheading={data.subheading}
          />
        </Reveal>

        <PlanCards plans={data.plans} period={data.period} className="mt-20" />

        {data.funnel?.heading ? <FunnelBanner data={data.funnel} /> : null}
      </Container>
    </section>
  );
}

/**
 * SmartSync Funnel, as a bento banner rather than another row of plans: what
 * it is on a white tile with the funnel drawn beside it, the starting price on
 * a dark one. Thinner than the plan cards and built differently on purpose —
 * it is an add-on with one starting price, not more plans to compare.
 */
function FunnelBanner({ data }: { data: HomeContent["pricing"]["funnel"] }) {
  return (
    <Reveal className="mt-16 grid gap-4 md:mt-20 lg:grid-cols-3" stagger={0.12}>
      <article className="relative flex flex-col overflow-hidden rounded-[28px] border border-line bg-white p-7 sm:p-9 md:block lg:col-span-2">
        {/* a phone gets it under the copy, centred; from md it sits beside the copy */}
        <FunnelArt className="pointer-events-none order-last mx-auto mt-8 block w-[220px] max-w-full md:absolute md:top-1/2 md:-right-4 md:mx-0 md:mt-0 md:h-[86%] md:w-auto md:-translate-y-1/2" />
        <div className="relative md:max-w-[58%]">
          <SuiteLockup id="pricing-funnel-lockup" product="funnel" size={28} />
          <h3 className="mt-5 text-balance text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[30px]">
            {data.heading}
          </h3>
          {data.body ? <p className="mt-3 text-[15px] leading-[1.7] text-[#1E1E1E]">{data.body}</p> : null}
          {data.highlights?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {data.highlights.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-[13px] font-medium text-brand"
                >
                  <Tick className="size-3" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>

      {/* the glow is a plain gradient, not a blur: iOS Safari leaks blurred
          layers past rounded corners (see the plan cards above) */}
      <article className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-[#0E0E14] p-7 text-white sm:p-9">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-[radial-gradient(closest-side,rgba(51,0,234,0.6),transparent)]"
        />
        <div className="relative">
          <p className="text-[12px] font-medium tracking-[0.18em] text-white/55 uppercase">{data.priceLabel}</p>
          <p className="mt-3 flex items-baseline gap-1.5">
            <span className="text-[56px] font-medium leading-none tracking-[-0.03em]">{data.price}</span>
            <span className="text-[16px] text-white/60">{data.unit}</span>
          </p>
          {data.note ? <p className="mt-3 text-[14px] leading-snug text-white/70">{data.note}</p> : null}
        </div>
        <Button cta={data.cta} variant="white" className="relative mt-8 w-full" />
      </article>
    </Reveal>
  );
}

/** Visitors → leads → booked, as three bands narrowing: the funnel, drawn. */
function FunnelArt({ className = "" }: { className?: string }) {
  const bands = [
    { d: "M16 14H244L218 72H42Z", label: "Visitors", y: 47, fill: "#052EFF" },
    { d: "M48 84H212L190 142H70Z", label: "Leads", y: 117, fill: "#2A17F2" },
    { d: "M76 154H184L166 212H94Z", label: "Booked", y: 187, fill: "#3300EA" },
  ];
  return (
    <svg viewBox="0 0 260 226" aria-hidden="true" className={className}>
      {bands.map((band, i) => (
        <g key={band.label} opacity={1 - i * 0.08}>
          <path d={band.d} fill={band.fill} />
          <text x="130" y={band.y} textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">
            {band.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
