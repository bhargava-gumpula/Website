import { promoBanner } from "@/data/siteContent";

function getPacificDateString(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export function isPromoActive(now = new Date()): boolean {
  return getPacificDateString(now) <= promoBanner.expiresOn;
}
