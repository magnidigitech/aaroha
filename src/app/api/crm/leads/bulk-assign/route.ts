import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { bulkAssignLeads } from "@/lib/crm/db";

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
  }

  const { lead_ids, telecaller_id } = await req.json();

  if (!Array.isArray(lead_ids) || lead_ids.length === 0 || !telecaller_id) {
    return NextResponse.json({ error: "lead_ids array and telecaller_id are required" }, { status: 400 });
  }

  const count = await bulkAssignLeads(lead_ids, Number(telecaller_id), session.userId);
  return NextResponse.json({ success: true, assignedCount: count });
}
