// Shape + seed copy for /transparent-pricing and /pricing-table.
// Live content lives in Postgres (site_content["usage-pricing"] and
// site_content["pricing-table"]); this is the fallback when a row is missing.
// No imports here on purpose — the seed script loads this file directly.

export type Cta = { label: string; href: string };

/* ------------------------------------------------------------ usage rates */

export type RateCell = { value: string; unit: string };
export type RateRow = { name: string; description: string; cells: RateCell[] };
export type RateGroup = {
  /** phone | message | voice | ai | a2p | addons — picks the tile icon. */
  icon: string;
  title: string;
  subtitle: string;
  /** Header row. The first entry labels the name column. */
  columns: string[];
  rows: RateRow[];
  /** Callout under the table. **bold** is supported. Empty label hides it. */
  note: { label: string; text: string };
};

const cell = (value: string, unit = ""): RateCell => ({ value, unit });
const row = (name: string, description: string, ...cells: RateCell[]): RateRow => ({
  name,
  description,
  cells,
});
const noNote = { label: "", text: "" };

export const defaultUsagePricing = {
  badge: "SMART SYNC LINK",
  heading: "Usage Pricing Guide",
  /** The part of the heading painted in the brand gradient. */
  highlight: "Pricing Guide",
  subheading:
    "Transparent, pay-as-you-go rates for the messaging, calling, and AI features that run your business.",

  groups: [
    {
      icon: "phone",
      title: "Phone Numbers",
      subtitle: "Billed monthly per number (US & Canada)",
      columns: ["Number Type", "Price"],
      rows: [
        row("Local Number", "Standard 10-digit local phone number", cell("$1.15", "per month")),
        row("Toll-Free Number", "800, 888, 877, 866 style numbers", cell("$2.15", "per month")),
      ],
      note: noNote,
    },
    {
      icon: "message",
      title: "SMS & MMS Messaging",
      subtitle: "Pricing per message segment (US & Canada)",
      columns: ["Message Type", "Outbound", "Inbound"],
      rows: [
        row("SMS", "Standard text messages", cell("$0.00747", "per segment"), cell("$0.00747", "per segment")),
        row(
          "MMS (Local Number)",
          "Messages with images, video, or media",
          cell("$0.0220", "per segment"),
          cell("$0.0165", "per segment"),
        ),
        row(
          "MMS (Toll-Free)",
          "Media messages from toll-free numbers",
          cell("$0.0220", "per segment"),
          cell("$0.0200", "per segment"),
        ),
      ],
      note: {
        label: "About segments:",
        text: "An SMS holds up to 160 characters per segment. Longer messages are split into multiple segments and billed accordingly. Emojis and special characters may use more space per segment.",
      },
    },
    {
      icon: "voice",
      title: "Voice Calls",
      subtitle: "Per-minute pricing, billed in full minutes",
      columns: ["Call Type", "Rate"],
      rows: [
        row("Outbound Call", "Calls dialed out from your system", cell("$0.0180", "per minute")),
        row(
          "Inbound — Answered on App/Web",
          "Calls answered in mobile app, web, or desk phone",
          cell("$0.01165", "per minute"),
        ),
        row(
          "Inbound — Forwarded to Another Number",
          "Calls forwarded to an external US number",
          cell("$0.0200", "per minute"),
        ),
        row("Call Recording", "Record any inbound or outbound call", cell("$0.0025", "per minute")),
        row("Call Recording Storage", "Monthly storage of recorded calls", cell("$0.0005", "per min / month")),
        row("Call Transcription", "Convert call audio to searchable text", cell("$0.024", "per minute")),
        row("Voicemail Drop", "Pre-recorded voicemail delivery", cell("$0.0180", "per minute")),
      ],
      note: {
        label: "Billing note:",
        text: "Calls are billed in full minutes — any partial minute rounds up. Call reports display the exact duration for transparency. International rates apply outside US/Canada.",
      },
    },
    {
      icon: "ai",
      title: "AI Features",
      subtitle: "Voice AI, Conversation AI, and Reviews AI",
      columns: ["AI Service", "Rate"],
      rows: [
        row(
          "AI Employee — Unlimited Plan",
          "Unmetered Voice AI (Inbound), Conversation AI, & Reviews AI",
          cell("$97", "per month"),
        ),
        row("Voice AI — Engine", "Powers AI voice conversations on calls", cell("$0.045", "per minute")),
        row("Voice AI — Text-to-Speech (Standard)", "OpenAI or Cartesia voices", cell("$0.015", "per minute")),
        row(
          "Voice AI — Text-to-Speech (Premium)",
          "ElevenLabs V2.5 ultra-realistic voices",
          cell("$0.035", "per minute"),
        ),
        row("Voice AI — Text-to-Speech (Pro)", "ElevenLabs V3 most lifelike voices", cell("$0.17", "per minute")),
        row("Conversation AI — GPT-5", "Most capable model (input / output)", cell("$1.25 / $10.00", "per 1M tokens")),
        row(
          "Conversation AI — GPT-5 Mini",
          "Fast & cost-effective (input / output)",
          cell("$0.25 / $2.00", "per 1M tokens"),
        ),
        row(
          "Conversation AI — GPT-4.1",
          "Balanced performance (input / output)",
          cell("$2.00 / $8.00", "per 1M tokens"),
        ),
        row(
          "Conversation AI — GPT-4.1 Mini",
          "Lightweight & efficient (input / output)",
          cell("$0.40 / $1.60", "per 1M tokens"),
        ),
        row("Reviews AI", "Auto-respond to Google reviews", cell("$0.01", "per review")),
      ],
      note: {
        label: "Voice AI total cost:",
        text: "Voice Engine + selected Text-to-Speech rate. Example: $0.045 (engine) + $0.015 (Standard TTS) = **$0.06/min**. Add token usage from your selected model on top.",
      },
    },
    {
      icon: "a2p",
      title: "A2P Registration",
      subtitle: "Required for SMS messaging in the US",
      columns: ["Plan", "One-Time Fee", "Monthly", "Daily Limit"],
      rows: [
        row(
          "Low Volume",
          "For small businesses & limited messaging",
          cell("$24.50"),
          cell("$11.03"),
          cell("6,000", "segments/day"),
        ),
        row(
          "High Volume",
          "For frequent or large-scale messaging",
          cell("$71.91"),
          cell("$11.03"),
          cell("600,000", "segments/day"),
        ),
      ],
      note: {
        label: "Important:",
        text: "A2P registration is required by US carriers to send business SMS. Monthly campaign fees apply once your campaign is reviewed, whether approved or not. Resubmissions after carrier feedback are **free**.",
      },
    },
    {
      icon: "addons",
      title: "Add-Ons & Intelligence",
      subtitle: "Optional features to enhance your system",
      columns: ["Feature", "Rate"],
      rows: [
        row("Number Validation", "Verify phone numbers before sending SMS", cell("$0.005", "per call")),
        row("Spam Detection", "Flag incoming spam calls automatically", cell("$0.005", "per test")),
        row("Caller Name Lookup", "Identify unknown callers automatically", cell("$0.01", "per lookup")),
        row("Answering Machine Detection", "Detect voicemail vs. live answers", cell("$0.0075", "per call")),
        row("Text-to-Speech (Enhanced)", "Premium TTS for IVR and workflows", cell("$0.00084", "per 100 characters")),
        row("Conference Calls", "Warm transfers & multi-party calls", cell("$0.0018", "per participant/min")),
      ],
      note: {
        label: "Carrier fees:",
        text: "US carriers (AT&T, T-Mobile, Verizon, etc.) charge small per-message fees on top of SMS/MMS rates. These typically range from **$0.0025 to $0.01 per message** depending on the recipient's carrier.",
      },
    },
  ] as RateGroup[],

  closing: {
    title: "Smart Sync Link",
    body: "All usage charges are billed monthly based on actual consumption. Rates are subject to change with prior notice. International messaging and calling rates available upon request.",
    link: { label: "www.smartsynclink.com", href: "/" } as Cta,
  },
};

export type UsagePricingContent = typeof defaultUsagePricing;

/* ----------------------------------------------------------- plan tables */

export type TablePlan = {
  name: string;
  price: string;
  /** "/mo", "/ page", "/ month" */
  unit: string;
  /** Small line under the price, e.g. "One-Time Payment". */
  priceNote: string;
  tagline: string;
  featured: boolean;
  badge: string;
  features: string[];
  cta: Cta;
  /** Small print under the button, e.g. "Cancel or Pause Anytime". */
  footnote: string;
};

const plan = (p: Partial<TablePlan> & Pick<TablePlan, "name" | "price" | "tagline" | "features">): TablePlan => ({
  unit: "/mo",
  priceNote: "",
  featured: false,
  badge: "",
  cta: { label: "Get Started", href: "#call" },
  footnote: "",
  ...p,
});

export const defaultPricingTable = {
  badge: "SMART SYNC LINK",
  heading: "Choose Your Power Level",
  highlight: "Power Level",
  subheading:
    "Scalable AI solutions designed to capture leads, build reputation, and automate your entire workflow.",

  quickStart: {
    heading: "Start Small. Scale When You're Ready.",
    subheading:
      "Three quick-start packages built around one thing: never missing another call. Upgrade any time.",
    plans: [
      plan({
        name: "Sync Text",
        price: "$79",
        tagline: "Stop losing the calls you can't answer.",
        features: [
          "Missed Call Text-Back (instant auto-reply)",
          "IVR Phone Menu (press 1, 2, 3 routing)",
          "5-Step Follow-Up Sequence",
          "Mobile App Access",
          "A2P Direct Phone Verification",
          "1 Phone Line",
        ],
      }),
      plan({
        name: "Sync Chat",
        price: "$129",
        tagline: "Answer every text and web chat automatically.",
        featured: true,
        badge: "Most Popular",
        features: [
          "Everything in Sync Text",
          "Conversation AI (SMS + web chat)",
          "AI Web Chat Widget",
          "Unified Inbox — SMS, Email, Social DMs",
          "Mobile App Access",
          "1 Phone Line / 1 AI Agent",
        ],
      }),
      plan({
        name: "Sync Voice",
        price: "$197",
        tagline: "An AI receptionist that answers the phone 24/7.",
        features: [
          "Everything in Sync Chat",
          "24/7 Voice AI Receptionist",
          "Live Calendar Booking",
          "Smart Call Routing & Transfer",
          "Call Transcripts & Recordings",
          "1 Phone Line / 1 AI Agent",
        ],
      }),
    ],
  },

  extras: {
    heading: "Need More Lines or Locations?",
    items: [
      { label: "Additional Phone Line", price: "+$29 /mo" },
      { label: "Additional AI Agent", price: "+$79 /mo" },
      { label: "Additional Location", price: "+$99 /mo" },
    ],
    /** **bold** and [links](#call) are supported. */
    body: "A **line** is one phone number. An **AI agent** is one trained assistant with its own script, calendar, and routing rules. A **location** gets its own line, agent, and calendar. Multi-location businesses — [book a call](#call) and we'll build you a custom quote.",
    setup: "All packages include a $99 one-time setup + A2P registration.",
    usage: "Call and text usage billed at cost — [See Transparent Pricing](/transparent-pricing)",
  },

  platform: {
    plans: [
      plan({
        name: "Sync Starter",
        price: "$197",
        tagline: "Capture leads and respond instantly.",
        features: [
          "Mobile App Access",
          "A2P Direct Phone Verification",
          "Conversation AI",
          "Unified Inbox",
          "Missed Call Text-Back",
          "AI Web Widget",
          "Smart Website",
        ],
      }),
      plan({
        name: "Smart Site Link",
        price: "$297",
        tagline: "Dominate Google and grow your brand.",
        featured: true,
        badge: "Most Popular",
        features: [
          "Mobile App Access",
          "A2P Direct Phone Verification",
          "Conversation AI",
          "Unified Inbox",
          "Missed Call Text-Back",
          "GMB AI Messenger",
          "Google Reviews System",
          "Social Media Planner",
          "CRM & Pipeline Management",
          "Custom Website / Update Current Site",
          "Fully Hosted Ecosystem",
        ],
      }),
      plan({
        name: "Elite Link",
        price: "$497",
        tagline: "Full AI automation that runs your business.",
        features: [
          "Mobile App Access",
          "A2P Direct Phone Verification",
          "Conversation AI",
          "Unified Inbox",
          "Missed Call Text-Back",
          "GMB AI Messenger",
          "Google Reviews System",
          "Social Media Planner",
          "CRM & Pipeline Management",
          "Custom High-Converting Website",
          "24/7 Voice AI Agent",
          "Advanced Workflow Automations",
        ],
      }),
    ],
  },

  /**
   * The SmartSync Funnel banner under the platform plans — the home page's
   * banner, but its button goes to the funnel's own checkout like the plans'
   * do. An empty heading hides it.
   */
  funnel: {
    heading: "Funnels that turn clicks into booked calls.",
    body: "Conversion-focused funnel pages, lead capture and automated follow-up — built, hosted and connected to your SmartSync Suite.",
    highlights: ["Done-for-you funnel pages", "Lead capture on every step", "Automated follow-up", "Live conversion metrics"],
    priceLabel: "Starts at",
    price: "$297",
    unit: "/month",
    note: "Built, hosted and connected for you.",
    cta: { label: "Get Started", href: "https://funnel.smartsynclink.com/smart-sync-funnel-check-out" } as Cta,
  },

  standard: {
    heading: "Platform Standard Features",
    items: ["SSL Secure", "iOS & Android App", "Cloud Hosting", "Unlimited Leads"],
  },

  seo: {
    heading: "Local SEO & Content Expansion Packages",
    subheading:
      "Rank higher, expand your reach into surrounding service areas, and capture high-intent leads on autopilot.",
    plans: [
      plan({
        name: "Single Page Boost",
        price: "$49",
        unit: "/ page",
        priceNote: "One-Time Payment",
        tagline: "Best for one-off service area tests or targeted niche pages.",
        features: [
          "1 Fully Built & Published SEO Page (Blog or Service Area)",
          "Local Keyword Strategy (City + Service Intent Target)",
          "Dedicated Lead Capture Form (Direct Lead Delivery)",
          "Embedded Interactive Google Map (Local Ranking Boost)",
          "Custom On-Brand Media (Images & Formatting)",
          "Mobile & Fast-Load Optimization",
        ],
        cta: { label: "Get Single Page", href: "#call" },
      }),
      plan({
        name: "SEO Growth Engine",
        price: "$297",
        unit: "/ month",
        priceNote: "($497/mo value — Save $200/mo with active platform membership)",
        tagline: "For Smart Site Link & Elite Link active subscribers.",
        featured: true,
        badge: "Recommended",
        features: [
          "10 SEO-Optimized Pages Published Monthly (Blogs / Local Areas)",
          "Dedicated Lead Capture Form on Every Page",
          "Google Maps & Local Schema Integration",
          "High-Converting Image Sourcing & Embedding",
          "Full Publishing & Formatting Included (Hands-Off)",
          "Ongoing Internal Link Optimization",
          "Monthly Local Keyword Expansion Tracking",
        ],
        cta: { label: "Add To My Subscription", href: "#call" },
        footnote: "Cancel or Pause Anytime",
      }),
      plan({
        name: "Standalone SEO Dominator",
        price: "$497",
        unit: "/ month",
        priceNote: "Standard Non-Subscriber Rate",
        tagline: "For Sync Starter users or non-hosted website clients.",
        features: [
          "10 SEO-Optimized Pages Built Monthly (Blogs / Local Areas)",
          "Dedicated Lead Capture Form Code & Webhooks",
          "Google Maps & Schema Integration Files",
          "High-Converting Custom Image Sourcing",
          "Full Done-For-You Publishing (Or Deliverables for Your Dev)",
          "Local Search Engine Keyword Strategy",
          "Monthly Content Performance Audits",
        ],
        cta: { label: "Start Standalone SEO", href: "#call" },
        footnote: "Cancel or Pause Anytime",
      }),
    ],
  },
};

export type PricingTableContent = typeof defaultPricingTable;
