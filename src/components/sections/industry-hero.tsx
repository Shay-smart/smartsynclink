import type { Media as MediaItem } from "@/content/home";
import type { IndustryContent } from "@/content/industry";
import { HeroIcons } from "../hero-icons";
import { ReelSlider } from "../reel-slider";
import { Button, Container, Media, Tick } from "../ui";

/**
 * An industry page's hero. With reels on the page it is two columns — the copy
 * on the left, the clips playing on the right — and the Reels section's own
 * badge and heading are left out (PageShell hands the clips over). Without
 * reels it is the centred hero it always was.
 */
export function IndustryHero({ data, reels }: { data: IndustryContent["hero"]; reels?: MediaItem[] }) {
  const split = Boolean(reels?.length);
  // centred alone; left-aligned beside the clips from lg, centred above them below it
  const align = split ? "text-center lg:text-left" : "text-center";
  const block = split ? "mx-auto lg:mx-0" : "mx-auto";
  const row = split ? "justify-center lg:justify-start" : "justify-center";

  // two pieces, so that on a phone the clips can sit between them. The head
  // ends with the same icon row as the home hero.
  const head = (
    <div>
      <p
        className={`rise text-[13px] font-normal uppercase tracking-[0.18em] text-[#1E1E1E]/70 ${align}`}
        style={{ "--i": 0 } as React.CSSProperties}
      >
        {data.badge}
      </p>

      <h1
        className={`rise mt-5 max-w-[860px] text-balance text-[34px] font-medium leading-[1.12] tracking-[-0.03em] text-ink sm:text-[46px] ${
          split ? "lg:text-[48px]" : "lg:text-[54px]"
        } ${align} ${block}`}
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {data.heading}
      </h1>
      <HeroIcons
        align={split ? "start" : "center"}
        className="rise mt-7"
        style={{ "--i": 2 } as React.CSSProperties}
      />
    </div>
  );

  const rest = (
    <div>
      <p
        className={`rise max-w-[720px] text-[16px] leading-[1.75] text-[#1E1E1E] ${split ? "" : "mt-6"} ${align} ${block}`}
        style={{ "--i": 2 } as React.CSSProperties}
      >
        {data.body}
      </p>
      <p
        className={`rise mt-4 max-w-[720px] text-[16px] leading-[1.75] text-[#1E1E1E] ${align} ${block}`}
        style={{ "--i": 3 } as React.CSSProperties}
      >
        {data.body2}
      </p>

      <div
        className={`rise mt-9 flex flex-wrap items-center gap-4 ${row}`}
        style={{ "--i": 4 } as React.CSSProperties}
      >
        <Button cta={data.primary} className="px-8" />
        <Button cta={data.secondary} variant="outline" />
      </div>

      <ul
        className={`rise mt-10 flex flex-wrap items-center gap-y-3 ${split ? "gap-x-6" : "gap-x-8"} ${row}`}
        style={{ "--i": 5 } as React.CSSProperties}
      >
        {data.stats.map((stat) => (
          <li
            key={stat}
            className="flex items-center gap-2 text-[16px] font-normal text-[#1E1E1E]"
          >
            <Tick className="size-3.5 text-brand" />
            {stat}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className={`relative z-10 overflow-hidden pb-14 pt-36 sm:pt-40 ${split ? "lg:pt-44" : "lg:pt-48"}`}>
      {/* the illustration behind the copy. An empty src renders the dashed
          placeholder, so the layout is final before the artwork exists. */}
      <Media
        image={data.background}
        variant="plain"
        sizes="100vw"
        priority
        className="absolute inset-0 -z-10 h-full w-full"
      />
      {/* scrim: keeps the copy readable whatever artwork lands back there */}
      <div aria-hidden="true" className="absolute inset-0 -z-1 bg-white/72" />

      <Container>
        {split && reels ? (
          // Beside the clips from lg: heading over copy on the left, the clips
          // spanning both rows on the right. On a phone they stack in source
          // order — heading, clips, then the copy and the buttons.
          <div className="grid items-center gap-y-8 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6">
            <div className="lg:col-start-1 lg:row-start-1 lg:self-end">{head}</div>
            <div
              className="rise min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <ReelSlider videos={reels} fit="column" />
            </div>
            <div className="lg:col-start-1 lg:row-start-2 lg:self-start">{rest}</div>
          </div>
        ) : (
          <>
            {head}
            {rest}
          </>
        )}
      </Container>
    </section>
  );
}
