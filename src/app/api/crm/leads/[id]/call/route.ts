import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { addCallLog, getLeadById, updateLeadStatus, scheduleFollowUp } from "@/lib/crm/db";
import { LeadStatus } from "@/lib/crm/types";

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
  const {
    call_status,
    remarks,
    duration_seconds,
    update_lead_status,
    followup_date,
    followup_priority,
    followup_remarks,
  } = body;

  if (!call_status || !remarks) {
    return NextResponse.json({ error: "Call status and remarks are required" }, { status: 400 });
  }

  const log = await addCallLog(
    leadId,
    session.userId,
    call_status,
    remarks,
    Number(duration_seconds) || 0
  );

  // If telecaller updated the overall lead status during the call
  if (update_lead_status) {
    await updateLeadStatus(leadId, update_lead_status as LeadStatus, session.userId, remarks);
  }

  // If a follow-up date was scheduled as part of the call or follow-up required status
  if (followup_date) {
    await scheduleFollowUp(
      leadId,
      session.userId,
      followup_date,
      followup_priority || "Medium",
      followup_remarks || remarks
    );
  }

  const updatedLead = await getLeadById(leadId);
  return NextResponse.json({ success: true, callLog: log, lead: updatedLead });
}

