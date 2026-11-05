import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { assignLead, getLeadById } from "@/lib/crm/db";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req);
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
  }

  const { id } = await params;
  const leadId = Number(id);
  const body = await req.json();
  const telecallerId = body.telecaller_id ? Number(body.telecaller_id) : null;

  await assignLead(leadId, telecallerId, session.userId);
  const updated = await getLeadById(leadId);

  return NextResponse.json({ success: true, lead: updated });
}

