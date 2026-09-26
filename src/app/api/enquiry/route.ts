import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmails } from "@/lib/mailer";

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

    // Server audit logging
    console.log(`[ENQUIRY RECEIVED - ${body.type?.toUpperCase()}]`, {
      timestamp: new Date().toISOString(),
      name: body.name,
      email: body.email || body.contactInfo,
      company: body.company || "N/A",
      serviceSlug: body.serviceSlug || "N/A",
      courseSlug: body.courseSlug || "N/A",
      message: body.message || "N/A",
    });

    // Send emails (Admin Notification + User Acknowledgement)
    const mailResult = await sendEnquiryEmails({
      type: body.type || "business",
      name: body.name,
      email: body.email,
      contactInfo: body.contactInfo,
      company: body.company,
      phone: body.phone,
      serviceSlug: body.serviceSlug,
      courseSlug: body.courseSlug,
      experienceLevel: body.experienceLevel,
      message: body.message,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry received and processed successfully",
      timestamp: new Date().toISOString(),
      mailStatus: {
        adminSent: mailResult.adminEmailSent,
        userAckSent: mailResult.userEmailSent,
        errors: mailResult.errors.length > 0 ? mailResult.errors : undefined,
      },
    });
  } catch (error: any) {
    console.error("[ENQUIRY API ERROR]", error);
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 });
  }
}
