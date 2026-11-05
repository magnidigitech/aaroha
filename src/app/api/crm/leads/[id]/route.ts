import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { getLeadById, getTimelineByLead, getCallLogsByLead, updateLeadStatus, scheduleFollowUp } from "@/lib/crm/db";
import { LeadStatus } from "@/lib/crm/types";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

  // Telecaller access restriction
  if (session.role === "TELECALLER" && lead.assigned_telecaller_id !== session.userId) {
    return NextResponse.json({ error: "Access denied. Lead not assigned to you." }, { status: 403 });
  }

  const timeline = await getTimelineByLead(leadId);
  const callLogs = await getCallLogsByLead(leadId);

  return NextResponse.json({ lead, timeline, callLogs });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
  if (body.status) {
    await updateLeadStatus(leadId, body.status as LeadStatus, session.userId, body.remarks);
  }

  if (body.followup_date) {
    await scheduleFollowUp(
      leadId,
      session.userId,
      body.followup_date,
      body.followup_priority || "Medium",
      body.remarks
    );
  }

  const updated = await getLeadById(leadId);
  return NextResponse.json({ success: true, lead: updated });
}

