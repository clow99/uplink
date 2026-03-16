import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { ts: Date.now(), ok: true },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Timing-Allow-Origin": "*",
      },
    },
  );
}
