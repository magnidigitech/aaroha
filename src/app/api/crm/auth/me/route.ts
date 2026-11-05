import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { findUserById } from "@/lib/crm/db";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await findUserById(session.userId);
  if (!user || !user.is_active) {
    return NextResponse.json({ error: "User not found or deactivated" }, { status: 403 });
  }

  return NextResponse.json({ user });
}
