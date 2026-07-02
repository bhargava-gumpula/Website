export function formatSlotTimeLocal(iso: string, timeZone?: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  return date.toLocaleString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone
  });
}

export function getBrowserTimeZone(): string {
  if (typeof Intl === "undefined") {
    return "America/Los_Angeles";
  }

  return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Los_Angeles";
}

export function formatRemainingSlots(remaining: number): string {
  return remaining === 1 ? "1 slot remaining" : `${remaining} slots remaining`;
}

export function formatSlotDuration(startsAt: string, endsAt: string): string {
  const startMs = new Date(startsAt).getTime();
  const endMs = new Date(endsAt).getTime();

  if (Number.isNaN(startMs) || Number.isNaN(endMs) || endMs <= startMs) {
    return "";
  }

  const minutes = Math.round((endMs - startMs) / 60000);

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  if (remainder === 0) {
    return hours === 1 ? "1 hr" : `${hours} hr`;
  }

  return `${hours} hr ${remainder} min`;
}
