import { getMaxCapacityForClass } from "@/lib/classCapacity";
import {
  appendBookedToEvent,
  getCalendarClient,
  getCalendarId,
  isEventTitleBooked,
  isGoogleCalendarConfigured,
  listUpcomingCalendarEvents,
  stripBookedFromTitle,
  type CalendarEventRecord
} from "@/lib/googleCalendar";
import { countRegistrationsForSlot } from "@/lib/slotRegistrations";
import {
  classes,
  getClassRegistrationTitle,
  type ClassOffering
} from "@/data/siteContent";

export type CalendarSlot = {
  id: string;
  startsAt: string;
  endsAt: string;
  remaining: number;
  maxCapacity: number;
};

const openClassesBySlug = new Map(
  classes.filter((classItem) => classItem.status === "Open").map((classItem) => [classItem.slug, classItem])
);

function eventMatchesClass(event: CalendarEventRecord, classItem: ClassOffering): boolean {
  if (isEventTitleBooked(event.summary)) {
    return false;
  }

  const expectedTitle = getClassRegistrationTitle(classItem);
  return stripBookedFromTitle(event.summary) === expectedTitle;
}

export async function getAvailableSlotsForClass(classSlug: string): Promise<CalendarSlot[]> {
  if (!isGoogleCalendarConfigured()) {
    return [];
  }

  const classItem = openClassesBySlug.get(classSlug);

  if (!classItem) {
    return [];
  }

  const maxCapacity = getMaxCapacityForClass(classItem);
  const events = await listUpcomingCalendarEvents();
  const matching = events.filter((event) => eventMatchesClass(event, classItem));
  const slots: CalendarSlot[] = [];

  for (const event of matching) {
    const registered = await countRegistrationsForSlot(classSlug, event.id);
    const remaining = maxCapacity - registered;

    if (remaining <= 0) {
      continue;
    }

    slots.push({
      id: event.id,
      startsAt: event.startsAt,
      endsAt: event.endsAt,
      remaining,
      maxCapacity
    });
  }

  return slots;
}

export async function resolveCalendarSlot(params: {
  classSlug: string;
  eventId: string;
  extraReserved?: number;
}): Promise<
  | { ok: true; slot: CalendarSlot; classItem: ClassOffering; timeLabel: string }
  | { ok: false; error: string }
> {
  const classItem = openClassesBySlug.get(params.classSlug);

  if (!classItem) {
    return { ok: false, error: "One or more classes are invalid or unavailable." };
  }

  if (!isGoogleCalendarConfigured()) {
    return { ok: false, error: "Scheduling is not configured yet." };
  }

  const calendar = getCalendarClient();
  let event;

  try {
    const response = await calendar.events.get({
      calendarId: getCalendarId(),
      eventId: params.eventId
    });
    event = response.data;
  } catch {
    return { ok: false, error: "One or more time slots are invalid." };
  }

  if (!event.id || !event.summary || !event.start?.dateTime || !event.end?.dateTime) {
    return { ok: false, error: "One or more time slots are invalid." };
  }

  const record: CalendarEventRecord = {
    id: event.id,
    summary: event.summary,
    startsAt: event.start.dateTime,
    endsAt: event.end.dateTime
  };

  if (!eventMatchesClass(record, classItem)) {
    return { ok: false, error: "One or more time slots are unavailable." };
  }

  const maxCapacity = getMaxCapacityForClass(classItem);
  const registered = await countRegistrationsForSlot(params.classSlug, params.eventId);
  const reserved = params.extraReserved ?? 0;
  const remaining = maxCapacity - registered - reserved;

  if (remaining <= 0) {
    return { ok: false, error: "One or more time slots are full." };
  }

  const startsAt = new Date(record.startsAt);

  if (Number.isNaN(startsAt.getTime()) || startsAt.getTime() <= Date.now()) {
    return { ok: false, error: "One or more time slots are unavailable." };
  }

  const timeLabel = startsAt.toISOString();

  return {
    ok: true,
    classItem,
    timeLabel,
    slot: {
      id: record.id,
      startsAt: record.startsAt,
      endsAt: record.endsAt,
      remaining: remaining,
      maxCapacity
    }
  };
}

export async function markSlotsBookedIfFull(orderItems: Array<{ classSlug: string; timeSlotId: string }>) {
  const seen = new Set<string>();

  for (const item of orderItems) {
    const key = `${item.classSlug}:${item.timeSlotId}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);

    const classItem = openClassesBySlug.get(item.classSlug);

    if (!classItem) {
      continue;
    }

    const registered = await countRegistrationsForSlot(item.classSlug, item.timeSlotId);
    const maxCapacity = getMaxCapacityForClass(classItem);

    if (registered >= maxCapacity) {
      try {
        await appendBookedToEvent(item.timeSlotId);
      } catch (error) {
        console.error("Failed to mark calendar event as booked:", error);
      }
    }
  }
}
