import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { completeFollowUp } from "@/lib/crm/db";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const followUpId = Number(id);
  const body = await req.json();
  const { outcome_remarks, new_status, next_scheduled_at } = body;

  if (!outcome_remarks) {
    return NextResponse.json({ error: "Outcome remarks are required to close a follow-up" }, { status: 400 });
  }

  const success = await completeFollowUp(
    followUpId,
    session.userId,
    outcome_remarks,
    new_status,
    next_scheduled_at
  );

  return NextResponse.json({ success });
}

