import { z } from "zod";
import { ghlReady, subscribeContact } from "@/lib/ghl";

/**
 * A newsletter sign-up, from the footer on every page or the band on the blog.
 *
 * The person goes to GHL as a contact tagged `newsletter`, plus where they
 * signed up (`newsletter-footer`, `newsletter-blog`) — a GHL workflow on the
 * tag is what notifies the team. Validated here, not only in the form: this
 * route is open to the internet and the values become a real contact.
 *
 * `company` is a honeypot. The form hides it from people; a bot fills every
 * field it finds, and gets a quiet success that sends nothing.
 */
const Signup = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  where: z.enum(["footer", "blog"]),
  page: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const parsed = Signup.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Please add your name and a valid email." }, { status: 400 });
  }
  const signup = parsed.data;
  if (signup.company) return Response.json({ ok: true });

  if (!ghlReady()) {
    console.error("newsletter sign-up dropped: GHL_API_TOKEN / GHL_LOCATION_ID are not set");
    return Response.json({ error: "Sign-up is unavailable right now — please try again later." }, { status: 503 });
  }

  try {
    await subscribeContact(
      {
        name: signup.name,
        email: signup.email,
        source: `Website newsletter (${signup.where}${signup.page ? ` — ${signup.page}` : ""})`,
      },
      ["newsletter", `newsletter-${signup.where}`],
    );
    return Response.json({ ok: true });
  } catch (error) {
    console.error("newsletter sign-up failed:", error);
    return Response.json({ error: "That didn't go through — please try again." }, { status: 502 });
  }
}
