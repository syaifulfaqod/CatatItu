import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "CatatItu API — Auth callback akan diimplementasikan di Phase 3",
  });
}
