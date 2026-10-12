import { NextResponse } from "next/server";
import { queryOne } from "@/server/db";
import { announcements as defaultAnnouncements } from "@/data";

export async function GET() {
  try {
    const row = queryOne<{ value: string }>(
      "SELECT value FROM store_settings WHERE key = 'ticker_announcements'"
    );

    if (row?.value) {
      const parsed = JSON.parse(row.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return NextResponse.json({
          announcements: parsed.filter((a) => a.active),
          all: parsed,
        });
      }
    }

    return NextResponse.json({
      announcements: defaultAnnouncements.filter((a) => a.active),
      all: defaultAnnouncements,
    });
  } catch {
    return NextResponse.json({
      announcements: defaultAnnouncements.filter((a) => a.active),
      all: defaultAnnouncements,
    });
  }
}
