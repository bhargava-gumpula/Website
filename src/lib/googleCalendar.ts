import { google } from "googleapis";

export const BOOKED_MARKER = "(BOOKED)";

export function isGoogleCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CALENDAR_ID?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim()
  );
}

function getPrivateKey(): string {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim() ?? "";
  const unquoted =
    raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw;
  return unquoted.replace(/\\n/g, "\n");
}

const PROXY_ENV_KEYS = ["HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy"] as const;

/** Pi pm2 may inherit a stale HTTP_PROXY — reach Google APIs directly. */
async function withDirectGoogleAccess<T>(fn: () => Promise<T>): Promise<T> {
  const saved: Partial<Record<(typeof PROXY_ENV_KEYS)[number], string>> = {};

  for (const key of PROXY_ENV_KEYS) {
    if (process.env[key]) {
      saved[key] = process.env[key];
      delete process.env[key];
    }
  }

  try {
    return await fn();
  } finally {
    for (const key of PROXY_ENV_KEYS) {
      if (saved[key]) {
        process.env[key] = saved[key];
      }
    }
  }
}

export function getCalendarClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();

  if (!email || !calendarId || !getPrivateKey()) {
    throw new Error("Google Calendar is not configured.");
  }

  const auth = new google.auth.JWT({
    email,
    key: getPrivateKey(),
    scopes: ["https://www.googleapis.com/auth/calendar"]
  });

  return google.calendar({ version: "v3", auth });
}

export function getCalendarId(): string {
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();
  if (!calendarId) {
    throw new Error("GOOGLE_CALENDAR_ID is not configured.");
  }
  return calendarId;
}

export function stripBookedFromTitle(title: string): string {
  return title.replace(/\s*\(BOOKED\)\s*$/i, "").trim();
}

export function isEventTitleBooked(title: string): boolean {
  return /\(BOOKED\)/i.test(title);
}

export type CalendarEventRecord = {
  id: string;
  summary: string;
  startsAt: string;
  endsAt: string;
};

export async function listUpcomingCalendarEvents(): Promise<CalendarEventRecord[]> {
  return withDirectGoogleAccess(async () => {
    const calendar = getCalendarClient();
    const response = await calendar.events.list({
      calendarId: getCalendarId(),
      timeMin: new Date().toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: "startTime"
    });

    const items = response.data.items ?? [];

    return items
      .filter((event) => event.id && event.summary && event.start?.dateTime && event.end?.dateTime)
      .map((event) => ({
        id: event.id!,
        summary: event.summary!,
        startsAt: event.start!.dateTime!,
        endsAt: event.end!.dateTime!
      }));
  });
}

export async function getCalendarEvent(eventId: string) {
  return withDirectGoogleAccess(async () => {
    const calendar = getCalendarClient();
    const response = await calendar.events.get({
      calendarId: getCalendarId(),
      eventId
    });
    return response.data;
  });
}

export async function appendBookedToEvent(eventId: string): Promise<void> {
  return withDirectGoogleAccess(async () => {
    const calendar = getCalendarClient();
    const existing = await calendar.events.get({
      calendarId: getCalendarId(),
      eventId
    });

    const summary = existing.data.summary ?? "";

    if (isEventTitleBooked(summary)) {
      return;
    }

    const baseTitle = stripBookedFromTitle(summary);

    await calendar.events.patch({
      calendarId: getCalendarId(),
      eventId,
      requestBody: {
        summary: `${baseTitle} ${BOOKED_MARKER}`.trim()
      }
    });
  });
}
