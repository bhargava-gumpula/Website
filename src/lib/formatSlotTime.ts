export function formatSlotTimeLocal(iso: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  return date.toLocaleString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export function formatRemainingSlots(remaining: number): string {
  return remaining === 1 ? "1 slot remaining" : `${remaining} slots remaining`;
}
