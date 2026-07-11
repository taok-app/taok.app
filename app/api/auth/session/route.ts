import { NextResponse } from "next/server";

export async function GET() {
  // Lightweight session endpoint used by landing nav for CTA decisions.
  // Returns { success: true, data: { user: null | { id, email } } }
  // Server-side auth integration (Better Auth) will replace this implementation.

  // Try reading auth cookie from Better Auth if available (server runtime safe fallback)
  try {
    // NOTE: Placeholder: keep consistent response shape used by client.
    return NextResponse.json({ success: true, data: { user: null } });
  } catch (e) {
    return NextResponse.json({ success: false, error: { message: "Session unavailable" } }, { status: 500 });
  }
}
