import type { CSSProperties } from "react";

/**
 * What the system is made of, in a line under the hero heading: an icon tile
 * and its name, four across. It replaced chips that floated, tilted and
 * wiggled round the heading — the heading is the promise, and these only need
 * to sit still under it and be read.
 *
 * Four columns on a phone, so the row never wraps; a centred row from sm. On a
 * two-column hero (`align="start"`) it lines up with the copy from lg.
 */
const ITEMS = [
  {
    label: "Website",
    icon: (
      <>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19M12 2.5a14.5 14.5 0 0 0 0 19" />
      </>
    ),
  },
  {
    label: "Integrations",
    icon: <path d="M9 2.5v5M15 2.5v5M6 7.5h12v4a6 6 0 0 1-12 0v-4ZM12 17.5v4" />,
  },
  {
    label: "Funnels",
    icon: <path d="M3 4h18l-7 8.5V19l-4 2v-8.5L3 4Z" />,
  },
  {
    label: "AI Calls",
    icon: (
      <>
        <path d="M6.6 3h3l1.5 4.2-2 1.4a12 12 0 0 0 5.3 5.3l1.4-2 4.2 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z" />
        <path d="M17.5 2.5v4M15.5 4.5h4" />
      </>
    ),
  },
];

export function HeroIcons({
  align = "center",
  className = "",
  style,
}: {
  align?: "center" | "start";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <ul
      aria-label="What's included"
      style={style}
      className={`mx-auto grid max-w-88 grid-cols-4 gap-2 sm:flex sm:max-w-none sm:justify-center sm:gap-10 ${
        align === "start" ? "lg:mx-0 lg:justify-start" : ""
      } ${className}`}
    >
      {ITEMS.map(({ label, icon }) => (
        <li key={label} className="flex flex-col items-center gap-2 text-center">
          <span className="grid size-11 place-items-center rounded-[14px] border border-black/5 bg-white text-brand shadow-[0_8px_18px_-12px_rgba(14,14,20,0.35)] sm:size-12">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icon}
            </svg>
          </span>
          <span className="text-[11px] leading-tight font-medium text-ink sm:text-[13px]">{label}</span>
        </li>
      ))}
    </ul>
  );
}
