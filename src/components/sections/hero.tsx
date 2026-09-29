import type { ReactNode } from "react";
import type { HomeContent } from "@/content/home";
import { AssistantArt } from "../assistant-art";
import { HeroIcons } from "../hero-icons";
import { BookingBand } from "../booking-band";
import { FUNNEL_BOARD } from "../funnel/list-screen";
import { FunnelMetricsScreen } from "../funnel/metrics-screen";
import { HeroVideos, type HeroScreen } from "../hero-videos";
import { ChatCycle, LiveDashboard, LivePhoneChat } from "../live-suite";
import { BOARD, PHONE } from "../suite-mockup";
import { Button, Container, GLOW, Tick } from "../ui";

/**
 * A fixed-size artboard scaled down to fit the hero box whole — by width or by
 * height, whichever runs out first — so a screen is small on a phone, never
 * cropped and never a sideways scroll. The outer box is a size container; the
 * stage is as wide as both limits allow and scales its board to that width.
 */
function Fit({ w, h, framed = false, children }: { w: number; h: number; framed?: boolean; children: ReactNode }) {
  return (
    <div className={`grid h-full w-full place-items-center [container-type:size] ${framed ? "py-3" : ""}`}>
      <div
        className={`suite-stage relative ${framed ? "overflow-hidden rounded-[10px] shadow-[0_20px_50px_-24px_rgba(14,14,20,0.35)] ring-1 ring-black/5" : ""}`}
        style={{ aspectRatio: `${w} / ${h}`, width: `min(100cqw, calc(100cqh * ${w / h}))` }}
      >
        <div className="suite-board" style={{ width: w, height: h, ["--stage-w" as string]: `${w}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * One story told across five shots, alternating footage and product:
 *
 *   she taps the tablet → the dashboard zooms open out of it → it closes again
 *   → he points at the screen → what he points at fades up → it hands over to
 *   the phone.
 *
 * The order here is what makes that read, so the screens are not
 * interchangeable: `zoom` belongs to the shot that follows a tap, `rise`
 * to the phone that takes over from the board. See HeroVideos for how the
 * clips and screens interleave, and .hero-screen in globals.css for the motion.
 */
const SCREENS: HeroScreen[] = [
  {
    hold: 7000,
    // opens out of the tablet she just tapped, and closes back into it
    enter: "zoom",
    node: (
      <ChatCycle className="h-full w-full">
        <Fit w={BOARD.w} h={BOARD.h} framed>
          <LiveDashboard />
        </Fit>
      </ChatCycle>
    ),
  },
  {
    hold: 6500,
    // what he is pointing at, so it arrives quietly rather than jumping in
    enter: "fade",
    node: (
      <Fit w={FUNNEL_BOARD.w} h={FUNNEL_BOARD.h} framed>
        <FunnelMetricsScreen />
      </Fit>
    ),
  },
  {
    // long enough for a message to arrive, the reply to type and send
    hold: 8500,
    enter: "rise",
    node: (
      <ChatCycle className="h-full w-full py-2">
        <Fit w={PHONE.w} h={PHONE.h}>
          <LivePhoneChat />
        </Fit>
      </ChatCycle>
    ),
  },
];

/**
 * Seconds per clip, by position: the first clip (she taps the tablet) plays at
 * its own pace, the second (he points at the screen) is four seconds of
 * footage the story only wants two and a half of.
 *
 * ponytail: by position, because that is what the playlist is. Reorder the
 * clips in the dashboard and this wants reordering too.
 */
const CLIP_SECONDS = [undefined, 2.5];

/**
 * Client preview: the landscape "Plugged In" cut plays alone, on a loop, and
 * the playlist above — the dashboard clips and the product screens — sits out.
 * Nothing is deleted; set SHOW_PLAYLIST back to true to return to it.
 *
 * ponytail: streamed straight from the ClickUp attachment; if the cut stays,
 * upload it to the media library so a ClickUp clean-up can't blank the hero.
 */
const SHOW_PLAYLIST = false;
const PREVIEW_CLIP = {
  src: "https://t90181364563.p.clickup-attachments.com/t90181364563/bc0688fc-7af2-427f-801e-402adc64ac10/SmartSync-Plugged-In-v3-16x9.mp4?open=true",
  alt: "SmartSync, plugged in",
  wide: true,
};

export function Hero({ data }: { data: HomeContent["hero"] }) {
  return (
    <section className="hero-backdrop relative z-10 overflow-hidden bg-[#fafaf9] pb-10 pt-28 sm:pt-32 lg:pt-46">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-1 overflow-hidden"
      >
        <span
          className="absolute -left-32 -top-32 size-[380px] rounded-full opacity-[0.22] blur-[100px]"
          style={{ background: GLOW }}
        />
        <span
          className="absolute -right-32 -bottom-32 size-[380px] rounded-full opacity-[0.22] blur-[100px]"
          style={{ background: GLOW }}
        />
      </div>
      <Container>
        <h1
          className="rise mx-auto text-balance text-center text-[38px] font-medium leading-[1.08] tracking-[-0.03em] text-ink sm:text-[54px] lg:text-[64px]"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          {data.heading}
        </h1>
        {/* what the system is made of, under the promise */}
        <HeroIcons className="rise mt-7" style={{ "--i": 1 } as React.CSSProperties} />
        <p
          className="rise mx-auto mt-7 max-w-[740px] text-center text-[20px] leading-[1.65] text-[#1E1E1E]"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {data.subheading}
        </p>
      </Container>

      <div
        className="rise relative mt-10 flex justify-center lg:mt-14"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        {/* wider than the clip on desktop: the clips stay 700px, the product screens get the room.
            The preview cut sizes the box itself — 16:9 at full width, ~500px tall on desktop */}
        <div
          className={`relative w-full px-3 lg:px-6 ${
            SHOW_PLAYLIST ? "h-[300px] md:h-[420px] lg:h-[500px] lg:max-w-[1100px]" : "mb-10 lg:mb-14 lg:max-w-[940px]"
          }`}
        >
          <HeroVideos
            videos={SHOW_PLAYLIST ? (data.videos ?? []) : [PREVIEW_CLIP]}
            screens={SHOW_PLAYLIST ? SCREENS : []}
            clipSeconds={CLIP_SECONDS}
          />
        </div>
      </div>

      <Container>
        <div
          className="rise flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Button cta={data.primary} className="px-8" />
          <Button cta={data.secondary} variant="outline" />
        </div>

        <ul
          className="rise mt-10 flex flex-wrap items-start justify-center gap-x-[6%] gap-y-3 sm:items-center sm:gap-x-12 sm:gap-y-3"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {/* on a phone, two to a row in small centred type, the odd one
              centred under them; from sm, one wrapping line as before */}
          {data.stats.map((stat) => (
            <li
              key={stat}
              className="w-[46%] text-center text-[11px] leading-snug font-normal text-[#1E1E1E] sm:flex sm:w-auto sm:items-center sm:gap-2 sm:text-[16px] sm:leading-normal"
            >
              <Tick className="mr-1 inline size-3 align-[-1px] text-brand sm:mr-0 sm:size-3.5" />
              {stat}
            </li>
          ))}
        </ul>

        {/* "Did You Know?" about Sofia, straight under the hero; its button opens her */}
        {data.assistant?.heading ? (
          <BookingBand booking={data.assistant} art={AssistantArt} className="mt-16 text-left lg:mt-20" />
        ) : null}
      </Container>
    </section>
  );
}
