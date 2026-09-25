import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !body.name) {
      return NextResponse.json({ error: "Missing required name field" }, { status: 400 });
    }

    if (body.type === "business" && (!body.email || !body.message)) {
      return NextResponse.json({ error: "Missing required email or message field" }, { status: 400 });
    }

    if (body.type === "training" && !body.contactInfo) {
      return NextResponse.json({ error: "Missing required contact info field" }, { status: 400 });
    }

    // Console log for server audit / backend logging
    console.log(`[ENQUIRY RECEIVED - ${body.type?.toUpperCase()}]`, {
      timestamp: new Date().toISOString(),
      name: body.name,
      email: body.email || body.contactInfo,
      company: body.company || "N/A",
      serviceSlug: body.serviceSlug || "N/A",
      courseSlug: body.courseSlug || "N/A",
      message: body.message || "N/A",
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry received successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[ENQUIRY ERROR]", error);
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 });
  }
}
