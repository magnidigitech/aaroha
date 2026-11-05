import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { getFollowUps } from "@/lib/crm/db";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Telecallers only see their own follow-ups
  const telecallerId = session.role === "TELECALLER" ? session.userId : undefined;
  const followups = await getFollowUps(telecallerId);

  return NextResponse.json(followups);
}

