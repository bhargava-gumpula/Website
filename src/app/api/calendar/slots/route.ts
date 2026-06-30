import { NextResponse } from "next/server";
import { getAvailableSlotsForClass } from "@/lib/calendarSlots";
import { isGoogleCalendarConfigured } from "@/lib/googleCalendar";
import { classes } from "@/data/siteContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const openSlugs = new Set(
  classes.filter((classItem) => classItem.status === "Open").map((classItem) => classItem.slug)
);

export async function GET(request: Request) {
  try {
    const classSlug = new URL(request.url).searchParams.get("classSlug")?.trim() ?? "";

    if (!classSlug || !openSlugs.has(classSlug)) {
      return NextResponse.json({ error: "Invalid class." }, { status: 400 });
    }

    if (!isGoogleCalendarConfigured()) {
      return NextResponse.json({ error: "Scheduling is not configured yet." }, { status: 503 });
    }

    const slots = await getAvailableSlotsForClass(classSlug);

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Failed to load calendar slots:", error);
    return NextResponse.json({ error: "Could not load time slots." }, { status: 500 });
  }
}
