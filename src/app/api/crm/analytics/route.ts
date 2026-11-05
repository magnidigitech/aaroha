import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { getDashboardMetrics, getTelecallerPerformance } from "@/lib/crm/db";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const metrics = await getDashboardMetrics(session.role, session.userId);

  let performance = null;
  if (session.role === "ADMIN") {
    performance = await getTelecallerPerformance();
  }

  return NextResponse.json({ metrics, performance });
}

