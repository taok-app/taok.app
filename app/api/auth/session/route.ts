import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get("taok_session")?.value ?? null;
    if (!cookie) {
      return NextResponse.json({ success: true, data: { user: null } });
    }

    // cookie value is a JSON stringified user in base64 (set by auth routes)
    try {
      const decoded = Buffer.from(cookie, "base64").toString("utf-8");
      const user = JSON.parse(decoded);
      return NextResponse.json({ success: true, data: { user } });
    } catch (e) {
      return NextResponse.json({ success: true, data: { user: null } });
    }
  } catch (e) {
    return NextResponse.json({ success: false, error: { message: "Session unavailable" } }, { status: 500 });
  }
}
