"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import type { Media } from "@/content/home";
import { Placeholder } from "./ui";

/**
 * A product screen shown between clips, for `hold` milliseconds.
 *
 * `enter` is how it arrives and leaves, which is what ties the playlist into
 * one story rather than five unrelated shots — see .hero-screen in globals.css.
 */
export type HeroScreen = { node: ReactNode; hold: number; enter?: "zoom" | "fade" | "rise" };

type Slide =
  | { kind: "video"; clip: Media; seconds?: number }
  | ({ kind: "screen" } & HeroScreen);

/**
 * The hero clip, or a crossfading playlist of clips with product screens
 * between them: clip 1, screen 1, clip 2, screen 2, and so on.
 *
 * A clip advances when it ends, not on a timer, so a slide never cuts away
 * mid-sentence; a screen advances after its hold. A screen is mounted only
 * while it is showing (or fading out), so each visit starts fresh — the chat
 * on the phone opens again rather than being caught halfway through.
 *
 * `rewind` rather than `loop` on purpose — loop mode clones slide DOM, and a
 * cloned <video> is outside React so the refs below would miss it. Rewind
 * returns to the first slide with no clones at all.
 *
 * mix-blend-multiply is what drops the clip's white background out against the
 * page, which is why the uploader insists on white-background 16:9 footage.
 *
 * brightness-[1.03] is tolerance, not decoration. Multiply only erases a
 * background that is exactly #FFFFFF; an exported clip often lands on
 * #FCFCFC and those three levels show as a faint box against the page. The
 * lift clamps anything from 248 up to pure white and moves midtones by a
 * fraction nobody sees.
 *
 * ponytail: a fixed 3% covers the usual encoder drift, nothing more. A clip
 * whose backdrop is genuinely grey still needs re-exporting on white.
 *
 * That blend sits on the Swiper root, never on the <video>. Swiper transforms
 * .swiper-wrapper and fades .swiper-slide with opacity, and each of those makes
 * a stacking context — a blend on the video would be trapped inside its own
 * slide with nothing behind it. Applied to the root, the slides composite
 * together first and the finished frame multiplies with the section.
 */
export function HeroVideos({
  videos,
  screens = [],
  clipSeconds = [],
}: {
  /** `wide`: a finished landscape cut with its own backdrop — shown whole in a rounded frame, never cropped or blended. */
  videos: (Media & { wide?: boolean })[];
  screens?: HeroScreen[];
  /**
   * How long clip *n* should take on screen, in seconds. A clip longer than
   * that is played faster rather than cut short, so the whole gesture still
   * reads — the man's clip runs four seconds but the story only wants two and
   * a half of them, and cutting it would drop the point he is making.
   */
  clipSeconds?: (number | undefined)[];
}) {
  const clips = (videos ?? []).filter((clip) => clip?.src);
  const players = useRef<(HTMLVideoElement | null)[]>([]);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(-1);

  const slides: Slide[] = [];
  for (let i = 0; i < Math.max(clips.length, screens.length); i++) {
    if (clips[i]) slides.push({ kind: "video", clip: clips[i], seconds: clipSeconds[i] });
    if (screens[i]) slides.push({ kind: "screen", ...screens[i] });
  }

  const current = slides[active];
  const hold = current?.kind === "screen" ? current.hold : 0;

  // a screen has no "ended" event; it moves on after its hold
  useEffect(() => {
    if (!swiper || !hold) return;
    const timer = window.setTimeout(() => swiper.slideNext(), hold);
    return () => window.clearTimeout(timer);
  }, [swiper, active, hold]);

  // Only the clip on screen loads in full, and the next one while a product
  // screen holds (seven seconds or so — ample); the rest wait with just their
  // metadata. They all used to preload at once, and the first clip — the one
  // the visitor is actually waiting for — shared the connection with every
  // other clip in the playlist.
  const nextVideo = slides.findIndex((slide, i) => i > active && slide.kind === "video");
  const upNext = current?.kind === "screen" ? (nextVideo === -1 ? slides.findIndex((slide) => slide.kind === "video") : nextVideo) : -1;

  const playOnly = (index: number, restart = true) => {
    players.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        if (restart) video.currentTime = 0;
        // autoplay can still be refused; a stalled slide must not throw
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };

  if (!clips.length) {
    return (
      <Placeholder
        label="Hero video — white background, 16:9"
        className="h-full w-full"
      />
    );
  }

  if (slides.length === 1) {
    if (clips[0].wide) return <WideClip clip={clips[0]} />;
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-label={clips[0].alt}
        className="hero-clip mx-auto h-full w-full object-cover brightness-[1.03] mix-blend-multiply lg:w-[700px]"
      >
        <source src={clips[0].src} />
      </video>
    );
  }

  return (
    <Swiper
      modules={[EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      rewind
      // it is a playlist, not a carousel — dragging it would fight the videos
      allowTouchMove={false}
      speed={700}
      onSwiper={(instance) => {
        setSwiper(instance);
        // not from the top: the first clip autoplays from the HTML before the
        // page's script arrives, and rewinding it here made it visibly restart
        playOnly(0, false);
      }}
      onSlideChange={(instance) => {
        setPrevious(instance.previousIndex);
        setActive(instance.activeIndex);
        playOnly(instance.activeIndex);
      }}
      className="h-full w-full mix-blend-multiply"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          {slide.kind === "video" ? (
            <video
              ref={(el) => {
                players.current[i] = el;
              }}
              muted
              playsInline
              preload={i === active || i === upNext ? "auto" : "metadata"}
              autoPlay={i === 0}
              onLoadedMetadata={(event) => {
                const video = event.currentTarget;
                // 2x is the ceiling: past it a person's movement turns comic
                if (slide.seconds && video.duration)
                  video.playbackRate = Math.min(2, Math.max(1, video.duration / slide.seconds));
              }}
              onEnded={() => swiper?.slideNext()}
              aria-label={slide.clip.alt}
              className="hero-clip mx-auto h-full w-full object-cover brightness-[1.03] lg:w-[700px]"
            >
              <source src={slide.clip.src} />
            </video>
          ) : i === active || i === previous ? (
            // the screen carries its own entrance and exit; swiper only
            // crossfades the slides, which on its own reads as five unrelated
            // shots rather than one continuous take
            <div
              className={`hero-screen hero-screen--${slide.enter ?? "fade"} ${
                i === active ? "is-in" : "is-out"
              }`}
            >
              {slide.node}
            </div>
          ) : null}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

/**
 * A finished landscape cut with its own backdrop: shown whole in a rounded
 * frame, never cropped or blended. Autoplay only runs muted, so it starts
 * silent and the button turns the sound on — set on the element directly, in
 * the tap itself, which is what iOS needs to allow audio (and a play() for
 * Low Power Mode, where the muted autoplay never started either). It sits top
 * right: the cut burns its subtitles in along the bottom.
 */
function WideClip({ clip }: { clip: Media }) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    if (!el.muted) el.play().catch(() => {});
    setMuted(el.muted);
  };

  return (
    <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-[14px] shadow-[0_20px_50px_-24px_rgba(14,14,20,0.35)]">
      <video ref={video} autoPlay loop muted playsInline aria-label={clip.alt} className="h-full w-full object-cover">
        <source src={clip.src} />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!muted}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        className={`absolute top-3 right-3 flex h-10 items-center justify-center gap-2 rounded-full bg-black/50 text-[14px] font-medium text-white backdrop-blur transition-colors hover:bg-black/65 sm:top-4 sm:right-4 ${
          muted ? "px-4" : "w-10"
        }`}
      >
        <svg viewBox="0 0 24 24" className="size-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5 6 9H2v6h4l5 4z" />
          {muted ? <path d="m22 9-6 6M16 9l6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}
        </svg>
        {muted ? <span aria-hidden="true">Tap for sound</span> : null}
      </button>
    </div>
  );
}
