/** @deprecated Time slots come from Google Calendar via /api/calendar/slots */

export type TimeSlot = {
  id: string;
  label: string;
  available: boolean;
};

export function getTimeSlotsForClass(_classSlug: string): TimeSlot[] {
  return [];
}

export function hasAvailableTimeSlots(_classSlug: string): boolean {
  return false;
}
