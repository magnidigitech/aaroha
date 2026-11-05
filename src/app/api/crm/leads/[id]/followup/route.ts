import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { scheduleFollowUp, getLeadById } from "@/lib/crm/db";
import { FollowUpPriority } from "@/lib/crm/types";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const leadId = Number(id);
  const lead = await getLeadById(leadId);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  if (session.role === "TELECALLER" && lead.assigned_telecaller_id !== session.userId) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const body = await req.json();
  const { scheduled_at, priority, remarks } = body;

  if (!scheduled_at) {
    return NextResponse.json({ error: "Scheduled date & time is required" }, { status: 400 });
  }

  const followup = await scheduleFollowUp(
    leadId,
    session.userId,
    scheduled_at,
    (priority as FollowUpPriority) || "Medium",
    remarks
  );

  const updatedLead = await getLeadById(leadId);
  return NextResponse.json({ success: true, followup, lead: updatedLead });
}
