import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { getLeads, ingestWebsiteLead } from "@/lib/crm/db";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || undefined;
  const status = searchParams.get("status") || undefined;
  const source = searchParams.get("source") || undefined;
  const dateFrom = searchParams.get("date_from") || undefined;
  const dateTo = searchParams.get("date_to") || undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "25", 10);
  const isExport = searchParams.get("export") === "csv";

  // Telecallers can only see their own assigned leads
  let telecallerId: number | "unassigned" | undefined = undefined;
  if (session.role === "TELECALLER") {
    telecallerId = session.userId;
  } else {
    const rawTele = searchParams.get("telecaller_id");
    if (rawTele === "unassigned") telecallerId = "unassigned";
    else if (rawTele && !isNaN(Number(rawTele))) telecallerId = Number(rawTele);
  }

  const offset = isExport ? 0 : (page - 1) * limit;
  const fetchLimit = isExport ? 10000 : limit;

  const { leads, total } = await getLeads({
    search,
    status,
    source,
    telecaller_id: telecallerId,
    date_from: dateFrom,
    date_to: dateTo,
    limit: fetchLimit,
    offset,
  });

  if (isExport) {
    // Generate CSV
    const headers = [
      "Lead ID",
      "Full Name",
      "Mobile Number",
      "Email",
      "Status",
      "Passing Year",
      "Candidate Type",
      "Domain Change",
      "Target Program",
      "Assigned Telecaller",
      "Created Date",
    ];

    const rows = leads.map((l) => [
      l.lead_code,
      `"${l.full_name.replace(/"/g, '""')}"`,
      l.mobile_number,
      l.email || "",
      l.status,
      l.year_of_passing || "",
      l.candidate_type || "",
      l.domain_change || "",
      `"${(l.target_program || "").replace(/"/g, '""')}"`,
      `"${(l.assigned_telecaller_name || "Unassigned").replace(/"/g, '""')}"`,
      new Date(l.created_at).toLocaleDateString("en-IN"),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="aaroha-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({
    leads,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.full_name || !body.mobile_number) {
      return NextResponse.json({ error: "Full Name and Mobile Number are required" }, { status: 400 });
    }

    const { lead, isDuplicate } = await ingestWebsiteLead({
      full_name: body.full_name,
      email: body.email,
      mobile_number: body.mobile_number,
      year_of_passing: body.year_of_passing,
      candidate_type: body.candidate_type,
      total_experience: body.total_experience,
      domain_change: body.domain_change,
      interested_domain: body.interested_domain,
      target_program: body.target_program,
      city: body.city,
      enquiry_source: body.enquiry_source || "Manual Entry",
      form_name: body.form_name || "CRM Manual Creation",
      notes: body.notes,
    });

    return NextResponse.json({
      success: true,
      lead,
      isDuplicate,
      message: isDuplicate ? "Existing lead updated with new enquiry." : "New lead successfully created.",
    });
  } catch (error: any) {
    console.error("[CRM CREATE LEAD ERROR]", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}

