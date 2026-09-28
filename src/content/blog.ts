// Shape + seed copy for the blog index and the single post page.
// Live content lives in Postgres (site_content.blog); this is the fallback the
// pages render when the row is missing or the DB is unreachable.
// No imports here on purpose — the seed script loads this file directly.

export const defaultBlog = {
  badge: "BLOGS",
  heading: "Ideas, Strategies & Insights To Help You Capture More Leads.",
  subheading:
    "Practical insights on AI, automation, lead generation, conversion funnels, websites, and follow-up strategies designed to help businesses turn more opportunities into customers.",

  /** The dark band at the top of /blog. */
  title: "Resources",

  /** Sits above the "All" pill; the rest of the row comes from post tags. */
  allLabel: "All",
  featuredLabel: "Featured Article",
  recentLabel: "Recent post",
  relatedLabel: "Related blog post",
  tocLabel: "Table of Contents",
  updatedLabel: "Updated:",
  readTimeLabel: "min read",
  readLabel: "Read Article",

  /** Author byline. Posts have no author column, so one name covers the site. */
  byline: "admin",

  /** Articles in the featured column per page. */
  perPage: 10,

  /** How many cards sit above the newsletter band. The rest follow below it. */
  beforeNewsletter: 4,

  newsletter: {
    label: "Newsletter",
    heading: "Don't want to miss anything?",
    body: "Get SmartSyncLink updates, tutorials and tips right in your mailbox.",
    namePlaceholder: "Your name",
    placeholder: "Please, enter your e-mail",
    cta: "Get",
    /** Shown in place of the form once the person is in GHL. */
    success: "Thanks — you're on the list.",
    note: "By entering your email, you agree to our",
    noteLink: { label: "Privacy Policy.", href: "/privacy" },
    image: { src: "", alt: "" },
  },

  search: {
    label: "Search",
    placeholder: "Search",
  },
};

export type BlogContent = typeof defaultBlog;
