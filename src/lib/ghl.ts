/**
 * The GoHighLevel v2 API, only as far as booking needs it.
 *
 * The booking popup is ours, not their widget, so three calls stand in for it:
 * read a calendar's free slots, upsert the person, put the appointment on the
 * calendar. Server-side only — the token is a private integration token and
 * must never reach the browser.
 *
 * Without GHL_API_TOKEN and GHL_LOCATION_ID nothing here is reachable and the
 * popup falls back to the GHL widget iframe, so a missing key costs styling
 * rather than every lead.
 *
 * The two products version their APIs separately; sending the wrong Version
 * header is a 404 that reads like a missing calendar.
 */
const BASE = "https://services.leadconnectorhq.com";
const CALENDARS = "2021-04-15";
const CONTACTS = "2021-07-28";

/** GHL ids are opaque alphanumeric strings; anything else never reaches a URL. */
export const isGhlId = (value: string) => /^[A-Za-z0-9_-]{8,64}$/.test(value);

export const ghlReady = () =>
  Boolean(process.env.GHL_API_TOKEN && process.env.GHL_LOCATION_ID);

export class GhlError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function call<T>(
  path: string,
  { version, method = "GET", body }: { version: string; method?: string; body?: unknown },
): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
      Version: version,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : null),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  // an upstream 502 comes back as HTML, so the parse has to be allowed to fail
  const text = await response.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text.slice(0, 200) };
  }

  if (!response.ok) {
    const detail = (data as { message?: string | string[] }).message;
    throw new GhlError(
      `${method} ${path} failed: ${Array.isArray(detail) ? detail.join(", ") : detail || response.statusText}`,
      response.status,
    );
  }
  return data as T;
}

/**
 * Free slots, as `{ "2026-09-18": ["2026-09-18T09:00:00-05:00", …] }`.
 *
 * GHL keys the response by date and wraps each day in `{ slots }`, alongside
 * bookkeeping keys like traceId — hence the shape check rather than a plain map.
 */
export async function freeSlots(
  calendarId: string,
  startMs: number,
  endMs: number,
  timezone: string,
) {
  const query = new URLSearchParams({
    startDate: String(startMs),
    endDate: String(endMs),
    timezone,
  });
  const data = await call<Record<string, unknown>>(
    `/calendars/${calendarId}/free-slots?${query}`,
    { version: CALENDARS },
  );

  const days: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(data)) {
    const slots = (value as { slots?: unknown })?.slots;
    if (Array.isArray(slots) && slots.length) days[key] = slots as string[];
  }
  return days;
}

/** What the popup puts on the card: the calendar's name and how long it books for. */
export async function calendarInfo(calendarId: string) {
  const { calendar } = await call<{
    calendar?: { name?: string; slotDuration?: number; slotDurationUnit?: string };
  }>(`/calendars/${calendarId}`, { version: CALENDARS });

  const minutes =
    calendar?.slotDurationUnit === "hours"
      ? (calendar?.slotDuration ?? 0) * 60
      : (calendar?.slotDuration ?? 0);
  return { name: calendar?.name ?? "", minutes };
}

/** Upserts by email or phone, so a repeat booking does not make a second contact. */
export async function upsertContact(person: {
  name: string;
  email: string;
  phone: string;
  city?: string;
}) {
  const [firstName, ...rest] = person.name.trim().split(/\s+/);
  const data = await call<{ contact?: { id?: string } }>("/contacts/upsert", {
    version: CONTACTS,
    method: "POST",
    body: {
      locationId: process.env.GHL_LOCATION_ID,
      name: person.name,
      firstName,
      lastName: rest.join(" ") || undefined,
      email: person.email,
      phone: person.phone,
      city: person.city || undefined,
      source: "smartsynclink.com",
    },
  });

  const id = data.contact?.id;
  if (!id) throw new GhlError("contact upsert returned no id", 502);
  return id;
}

/**
 * A newsletter sign-up: the person upserted by email, then tagged.
 *
 * The tags go on in a second call, to the add-tags endpoint, rather than in
 * the upsert — an upsert that carries tags replaces whatever tags a returning
 * contact already has (a booking's, say). Adding them never removes any.
 */
export async function subscribeContact(person: { name: string; email: string; source: string }, tags: string[]) {
  const [firstName, ...rest] = person.name.trim().split(/\s+/);
  const data = await call<{ contact?: { id?: string } }>("/contacts/upsert", {
    version: CONTACTS,
    method: "POST",
    body: {
      locationId: process.env.GHL_LOCATION_ID,
      name: person.name,
      firstName,
      lastName: rest.join(" ") || undefined,
      email: person.email,
      source: person.source,
    },
  });

  const id = data.contact?.id;
  if (!id) throw new GhlError("contact upsert returned no id", 502);
  if (tags.length) {
    await call(`/contacts/${id}/tags`, { version: CONTACTS, method: "POST", body: { tags } });
  }
  return id;
}

export async function createAppointment(appointment: {
  calendarId: string;
  contactId: string;
  startTime: string;
  timezone: string;
  title: string;
  notes?: string;
}) {
  return call<{ id?: string }>("/calendars/events/appointments", {
    version: CALENDARS,
    method: "POST",
    body: {
      locationId: process.env.GHL_LOCATION_ID,
      calendarId: appointment.calendarId,
      contactId: appointment.contactId,
      startTime: appointment.startTime,
      selectedTimezone: appointment.timezone,
      title: appointment.title,
      appointmentStatus: "confirmed",
      // the slot came from free-slots moments ago; let GHL be the referee anyway
      ignoreFreeSlotValidation: false,
      toNotify: true,
      meta: appointment.notes ? { notes: appointment.notes } : undefined,
    },
  });
}
