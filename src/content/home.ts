// Shape + seed data for the home page.
// Live content lives in Postgres (site_content.home); this is the fallback the
// page renders when the row is missing or the DB is unreachable.
// No imports here on purpose — the seed script loads this file directly.

export type Cta = { label: string; href: string };
export type Bullet = { title: string; body?: string };
/** An empty src renders the placeholder instead — see <Media>. */
export type Media = { src: string; alt: string };

export const defaultHomeContent = {
  hero: {
    heading: "Never Lose Another Lead Again.",
    subheading:
      "AI answers calls, replies to messages, books appointments, follows up automatically and helps your business close more customers without hiring more staff.",
    // Clips crossfade one after another; each advances when it ends, so
    // there is no timer to keep in sync with the footage.
    videos: [{ src: "/video/video.mp4", alt: "Product walkthrough" }] as Media[],
    primary: { label: "Book Your Free Strategy Call", href: "#call" } as Cta,
    secondary: { label: "Book A 15-Min Demo Call", href: "#call" } as Cta,
    stats: [
      "Trusted By 3,000+ Businesses",
      "250,000+ Leads Managed",
      "500K+ Appointments Booked",
      "92.9% Uptime",
      "4.5/5 Average Rating",
    ],
    // The "Did You Know?" band under the hero, about Sofia — the booking
    // band's shape with her orb in it. #demo opens her (DemoModal). An empty
    // heading hides the band.
    assistant: {
      eyebrow: "Did You Know?",
      heading: "Sofia, our AI assistant, answers every call and message 24/7 — and books the appointment while the lead is still interested.",
      /** Painted in the accent colour wherever it appears in the heading. */
      highlight: "24/7",
      cta: { label: "Have A Chat With Sofia", href: "#demo" } as Cta,
    },
  },

  heroVideo: {
    label: "Intro video",
    video: { src: "", alt: "" } as Media,
  },

  /**
   * One-click campaigns, in full. It sits on the home page under the bento tile
   * that links to it, and again on the aesthetics page. Each page keeps its own
   * copy of this content, so one can be reworded without touching the other.
   *
   * What it describes: the front desk types a client's first name and mobile
   * number after the visit, and that one submit starts a year of texts — four
   * weekly review requests that stop the moment a review lands, then a
   * returning-client offer every two or three months carrying a referral
   * reward. Everything is SMS, never email.
   */
  oneClick: {
    badge: "ONE-CLICK CAMPAIGNS",
    heading: "One click after every appointment. A year of follow-up.",
    subheading:
      "Your front desk adds the client's first name and mobile number. The review requests, rebooking offers and referral asks then run on their own for the next 12 months.",
    /**
     * Upload the walkthrough here. The builder's picker offers a clip rather
     * than a photo because the field is called "video" — see content-editor.
     */
    video: { src: "", alt: "One-click campaigns, start to finish" } as Media,
    /** Or paste a link instead: YouTube, Vimeo, or a direct .mp4. */
    videoUrl: "",
    /** Shown until a video is added, and used as the video's poster frame. */
    image: { src: "/images/campaigns.webp", alt: "Front desk checking a client in" } as Media,
    points: [
      {
        title: "Check them in.",
        body: "After the visit, enter the client's first name and phone number and press Launch campaign.",
      },
      {
        title: "Get the review.",
        body: "They get a friendly review request once a week for 4 weeks. The reminders stop as soon as they leave one.",
      },
      {
        title: "Bring them back.",
        body: "Every 2–3 months they get a text with your returning-client offer, like 20% off their next treatment.",
      },
      {
        title: "Turn them into referrals.",
        body: "Each text invites them to refer a friend for the same reward, like a free facial. If they reply, you're notified right away.",
      },
    ] as Bullet[],
    /** The line under the steps. */
    footnote: "Your offer, your review link and your spa's name on every message.",
    cta: { label: "Book A Demo", href: "#call" } as Cta,
  },

  showcaseVideo: {
    label: "Product walkthrough",
    video: { src: "", alt: "" } as Media,
  },

  intro: {
    heading: "Lorem Ipsum is simply dummy text of the printing",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1968, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
    bullets: [
      "Lorem Ipsum is simply dummy text of the printing.",
      "Lorem Ipsum is simply dummy text of the printing.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ],
    body2:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1968, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
    primary: { label: "Book Your Free Strategy Call", href: "#call" } as Cta,
    secondary: { label: "Learn more about funnel", href: "#funnel" } as Cta,
    image: { src: "", alt: "Websites built with Smart Sync Link" } as Media,
  },

  bento: {
    // full width band across the top of the section
    booking: {
      eyebrow: "Did You Know?",
      heading: "Businesses that reply in under a minute book 57% more appointments. Here's how SmartSyncLink gets you there.",
      /** Painted in the accent colour wherever it appears in the heading. */
      highlight: "57%",
      body: "Twenty minutes, no slide deck. We look at where calls and messages are going today, then show you exactly what the AI would have caught.",
      // One action, because there was only ever one: the two buttons here used
      // to be "Book An Appointment" and "Book A 15-Min Demo Call", which is the
      // same thing asked twice. #call is the Smart SyncLink Demo Calendar.
      cta: { label: "Book A Demo", href: "#call" } as Cta,
    },

    intro: {
      eyebrow: "The Complete Solution",
      heading: "Simple systems that actually work",
      body: "Smart Sync Link automates every stage of your customer journey, from the first phone call to the final follow-up, so your team can focus on growing the business instead of managing repetitive tasks.",
      image: { src: "", alt: "AI assistant illustration" } as Media,
    },
    // Copy on these three is deliberately short: the animations beside them
    // are doing the explaining, and the long version buried them.
    voice: {
      heading: "Smart Voice AI",
      body: "An AI receptionist that answers, routes, and books straight into your calendar.",
      bullets: [
        {
          title: "Never Miss A Call",
          body: "When you cannot pick up, the AI does — and it sounds like a person.",
        },
        {
          title: "Intelligent Routing",
          body: "Urgent calls go through. The rest get booked in.",
        },
        {
          title: "24/7 Availability",
          body: "After hours, weekends, holidays. Everyone gets an answer.",
        },
      ] as Bullet[],
      cta: { label: "Book A Demo", href: "#call" } as Cta,
    },
    inbox: {
      heading: "All-In-One Smart Inbox",
      body: "SMS, email and social DMs in one place, instead of five apps.",
      bullets: [
        {
          title: "Centralized Communication",
          body: "Facebook, Instagram, SMS and email land in one list.",
        },
        {
          title: "Team Collaboration",
          body: "Assign a conversation so nothing falls through.",
        },
        {
          title: "Quick Responses",
          body: "AI-suggested replies handle the usual questions.",
        },
      ] as Bullet[],
      cta: { label: "Book A Demo", href: "#call" } as Cta,
      image: { src: "", alt: "Smart inbox interface" } as Media,
    },
    campaigns: {
      heading: "One-Click Marketing Campaigns",
      body: "Enter a client's name and number after their visit. One click starts a full year of review requests, return-visit offers and referral texts.",
      bullets: [
        { title: "4 weekly review reminders, stopped once they review" },
        { title: "A return-visit offer every 2–3 months" },
        { title: "A refer-a-friend reward in every text" },
      ] as Bullet[],
      // the tile says what it is; the section right below it explains it
      cta: { label: "Learn More", href: "#one-click" } as Cta,
      image: { src: "/images/campaigns.webp", alt: "Team reviewing a campaign" } as Media,
    },
  },

  industries: {
    heading: "Specialized systems for your industry",
    subheading:
      "We've built custom, battle-tested solutions specifically designed for these core industries.",
    cards: [
      {
        title: "Real Estate",
        body: "Automate lead follow-ups, schedule showings, and keep your pipeline full without lifting a finger.",
        image: { src: "/images/real-estate.png", alt: "Modern multi-storey home" } as Media,
        // Hover sequence, uploaded from the dashboard. The single blank is
        // the template the editor copies when you press Add — an empty array
        // would leave it with nothing to clone.
        frames: [{ src: "", alt: "" }] as Media[],
        cta: { label: "Get More Booking", href: "#contact" } as Cta,
      },
      {
        title: "Aesthetics & Medspas",
        body: "Fill your booking calendar, handle patient inquiries 24/7, and run automated reactivation campaigns.",
        image: { src: "/images/med-spa.png", alt: "Medspa client after treatment" } as Media,
        frames: [{ src: "", alt: "" }] as Media[],
        cta: { label: "Get More Booking", href: "#contact" } as Cta,
      },
      {
        title: "Contractors",
        body: "Never miss an estimate request. Our AI answers calls from the job site and books appointments instantly.",
        image: { src: "/images/constrution.png", alt: "Contractor holding blueprints" } as Media,
        frames: [{ src: "", alt: "" }] as Media[],
        cta: { label: "Get More Booking", href: "#contact" } as Cta,
      },
    ],
  },

  steps: {
    badge: "HOW IT WORKS",
    heading: "From Strategy to Automation in Just 3 Simple Steps",
    subheading:
      "Getting started is simple. Our team handles the heavy lifting while you focus on running your business.",
    items: [
      {
        step: "Step 1",
        title: "Discovery Call",
        duration: "20 mins",
        body: "It's actually a strategy call. We'll answer all your questions, show you how our AI works, and look at live client accounts & results.",
      },
      {
        step: "Step 2",
        title: "We Build Your System",
        duration: "7-10 days",
        body: "Fill out a basic onboarding form with your details. After we have the info, we get to work building your custom AI & marketing system.",
      },
      {
        step: "Step 3",
        title: "Launch Call",
        duration: "25 mins",
        body: "We'll walk you through your new system, show you how everything works... And by everything, we're really just talking about pressing two buttons.",
      },
    ],
  },

  pricing: {
    badge: "Pricing",
    heading: "Simple, transparent pricing",
    subheading:
      "Choose the package that fits your business needs. No hidden fees, no long-term contracts.",
    watermark: "PRICING",
    period: "/month",
    plans: [
      {
        name: "Sync Starter",
        price: "$197",
        tagline: "Capture leads and respond instantly.",
        featured: false,
        badge: "",
        features: [
          "Mobile App Access",
          "A2P Direct Phone Verification",
          "Conversation AI",
          "Unified Inbox",
          "Missed Call Text-Back",
          "AI Web Widget",
          "Smart Website",
        ],
        cta: { label: "Book A Call Now", href: "#call" } as Cta,
      },
      {
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
          "CRM & Pipeline Management",
          "Custom Website / Update Current Site",
          "Fully Hosted Ecosystem",
        ],
        cta: { label: "Book A Call Now", href: "#call" } as Cta,
      },
      {
        name: "Elite Link",
        price: "$497",
        tagline: "Full AI automation that runs your business.",
        featured: false,
        badge: "",
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
          "Expert AI Assistant",
          "Advanced Workflow Automations",
        ],
        cta: { label: "Book A Call Now", href: "#call" } as Cta,
      },
    ],
    /**
     * The SmartSync Funnel offer, as one banner under the plans: a starting
     * price and the gist of it, not a second row of plan cards. An empty
     * heading hides it.
     */
    funnel: {
      heading: "Funnels that turn clicks into booked calls.",
      body: "Conversion-focused funnel pages, lead capture and automated follow-up — built, hosted and connected to your SmartSync Suite.",
      highlights: ["Done-for-you funnel pages", "Lead capture on every step", "Automated follow-up", "Live conversion metrics"],
      priceLabel: "Starts at",
      price: "$297",
      unit: "/month",
      note: "Built, hosted and connected for you.",
      cta: { label: "Book A Funnel Call", href: "#call" } as Cta,
    },
  },

  testimonials: {
    eyebrow: "TRUSTED BY GROWING BUSINESSES",
    heading: "Real Businesses. Real Growth. Real Results.",
    subheading:
      "See how businesses are capturing more leads, and saving hours every week with Smart Sync Link.",
    avatars: ["a1", "a2", "a3", "a4", "a5"],
    reviews: [
      {
        rating: 5,
        quote:
          "If you are looking for someone to get that phone ringing, they're the right fit for you! I'm so happy with them!",
        author: "Cody",
      },
      {
        rating: 5,
        quote:
          "They are the absolute best at what they do. They built me a new system and within 10 days I got my first unpaid for lead! Best money spent.",
        author: "Armando",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ's",
    heading: "Everything You Need to Know Before Getting Started",
    items: [
      {
        q: "When am I going to start seeing results?",
        a: "Most clients see their first automated bookings within the first two weeks of launch, once the system is live and answering calls.",
      },
      {
        q: "How long does implementation take?",
        a: "Typically 7-10 business days from the completed onboarding form to a fully live system.",
      },
      {
        q: "Will it work for my industry?",
        a: "We have battle-tested builds for real estate, aesthetics and medspas, and contractors, and the platform adapts to most service businesses.",
      },
      {
        q: "Can I keep my existing phone number?",
        a: "Yes. We port or forward your existing number so your customers never notice a change.",
      },
      {
        q: "Can the AI answer calls after business hours?",
        a: "Yes. The voice agent runs 24/7, books appointments, and escalates urgent calls based on rules you set.",
      },
      {
        q: "Does Smart Sync Link integrate with my existing tools?",
        a: "We connect to most calendars, CRMs, and payment tools, and offer an API for anything custom.",
      },
      {
        q: "Is my customer data secure?",
        a: "All data is encrypted in transit and at rest on enterprise-grade cloud infrastructure.",
      },
      {
        q: "Will my team receive training?",
        a: "Every plan includes a live onboarding walkthrough plus recorded training for new staff.",
      },
      {
        q: "What kind of support do you offer?",
        a: "Email and chat support on every plan, with priority response and a dedicated manager on Elite Link.",
      },
      {
        q: "Do I need technical experience?",
        a: "None. We build, configure, and launch the whole system for you.",
      },
      {
        q: "What happens if I decide to cancel?",
        a: "There are no long-term contracts. Cancel any time and we will export your data for you.",
      },
    ],
  },

  suite: {
    heading: "One Inbox For Every Conversation, On Desktop And Mobile.",
    body: "Calls, texts, Facebook, Instagram, Google and website chat land in one team inbox. Answer from the dashboard at your desk, or pick up the very same thread in the SmartSync mobile app. Nothing to sync, nothing missed.",
    cta: { label: "Book A Call Now", href: "#call" } as Cta,
    points: [
      {
        title: "Unified Team Inbox",
        body: "Every channel in a single list, with owners, stars and unread counts.",
      },
      {
        title: "Mobile Connect",
        body: "The same inbox on your phone, so replies go out wherever you are.",
      },
      {
        title: "Full Contact Context",
        body: "Owner, followers, tags and every field right beside the thread.",
      },
    ] as Bullet[],
  },
  funnel: {
    heading: "Funnels That Turn Clicks Into Booked Appointments.",
    body: "Build a guided, quiz-style funnel in minutes, publish it to your ads and socials, and watch every step convert in real time. Visits, drop-off and bookings, all on one screen.",
    cta: { label: "Book A Call Now", href: "#call" } as Cta,
    /** One per screen, in the order the showcase cycles through them. */
    tabs: ["All Funnels", "Funnel Editor", "Metrics"],
    points: [
      {
        title: "Guided Quiz Funnels",
        body: "A few quick questions qualify every lead before they reach your calendar.",
      },
      {
        title: "Page-By-Page Metrics",
        body: "See exactly where visitors drop off and fix that step, not the whole funnel.",
      },
      {
        title: "Launch In Minutes",
        body: "Start from a proven template, refine it with AI, and publish in one click.",
      },
    ] as Bullet[],
  },
  finalCta: {
    heading: "Every Day You Wait Is Another Day of Missed Leads and Lost Revenue.",
    body: "Stop relying on manual processes. Let Smart Sync Link automate your customer journey, capture every opportunity, and help your business grow with confidence.",
    cta: { label: "Book A Call Now", href: "#call" } as Cta,
    orbLabel: "Smart AI Assistant",
    // #demo opens the voice agent — the orb IS the assistant, so it should hand
    // you to it rather than to a calendar. See DemoModal, which listens for it.
    pill: { label: "Talk To Smart AI", href: "#demo" } as Cta,
    chips: [
      "AI answers calls",
      "AI replies to messages",
      "AI books appointments",
      "AI follows up automatically",
    ],
  },

  // Opens over the page whenever a link points at #demo — the hero's
  // "Watch 3-Minute Demo", the Try Now pill, and anything else pointed there.
  demo: {
    headerTitle: "Talk to us!",
    agentName: "Sofia",
    agentBadge: "AI",
    role: "Support Agent",
    avatar: { src: "", alt: "Sofia, AI support agent" } as Media,
    /** What Sofia types when the phone opens, pointing at the call button under it. */
    callHint: "Please press the phone button to test our voice AI — it's totally free.",
    /** The LeadConnector voice widget. Empty hides the embed. */
    widgetId: "69e0ba00663add6222d0a27d",
  },

  calendar: {
    badge: "BOOK A TIME",
    heading: "Pick a slot that suits you",
    subheading:
      "Twenty minutes, no slide deck. We look at where your calls and messages go today, then show you what the AI would have caught.",
    /** Paste the booking widget URL here. Empty hides the section. */
    embedUrl: "https://link.smartsynclink.com/widget/booking/CiZVGpWY8IwKehDSPPHZ",
    /** The "Book a call" buttons open this one instead. Empty falls back above. */
    callEmbedUrl: "https://link.smartsynclink.com/widget/booking/MVbnzZUSVYjA4pVXK9b2",
  },
};

export type HomeContent = typeof defaultHomeContent;
