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
