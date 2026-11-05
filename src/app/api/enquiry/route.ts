import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmails } from "@/lib/mailer";
import { ingestWebsiteLead } from "@/lib/crm/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !body.name) {
      return NextResponse.json({ error: "Missing required name field" }, { status: 400 });
    }

    if (body.type === "business" && (!body.email || !body.message)) {
      return NextResponse.json({ error: "Missing required email or message field" }, { status: 400 });
    }

    if (body.type === "training" && !body.email && !body.phone && !body.contactInfo) {
      return NextResponse.json({ error: "Missing required contact field (Email or Phone)" }, { status: 400 });
    }

    // Automatically ingest lead into Centralized CRM Database
    let crmResult = null;
    try {
      crmResult = await ingestWebsiteLead({
        full_name: body.name,
        email: body.email || (body.contactInfo?.includes("@") ? body.contactInfo : undefined),
        mobile_number: body.phone || body.contactInfo || "N/A",
        year_of_passing: body.yearOfPassing,
        candidate_type: body.candidateType,
        total_experience: body.totalExperience,
        domain_change: body.changingDomain,
        interested_domain: body.interestedDomain,
        target_program: body.courseSlug || body.serviceSlug,
        city: body.city,
        enquiry_source: body.type === "training" ? "Training Enquiry Form" : "Business Enquiry Form",
        form_name: body.type === "training" ? "Candidate Enquiry" : "Business Project Enquiry",
        notes: body.message,
      });
    } catch (crmErr) {
      console.error("[CRM AUTO-INGESTION ERROR]", crmErr);
    }

    // Server audit logging
    console.log(`[ENQUIRY RECEIVED - ${body.type?.toUpperCase()}]`, {
      timestamp: new Date().toISOString(),
      name: body.name,
      email: body.email || body.contactInfo,
      phone: body.phone || "N/A",
      yearOfPassing: body.yearOfPassing || "N/A",
      candidateType: body.candidateType || "N/A",
      totalExperience: body.totalExperience || "N/A",
      changingDomain: body.changingDomain || "N/A",
      interestedDomain: body.interestedDomain || "N/A",
      company: body.company || "N/A",
      serviceSlug: body.serviceSlug || "N/A",
      courseSlug: body.courseSlug || "N/A",
      message: body.message || "N/A",
    });

    // Send emails (Admin Notification + User Acknowledgement)
    const mailResult = await sendEnquiryEmails({
      type: body.type || "business",
      name: body.name,
      email: body.email || (body.contactInfo?.includes("@") ? body.contactInfo : undefined),
      contactInfo: body.contactInfo || body.email || body.phone,
      company: body.company,
      phone: body.phone,
      serviceSlug: body.serviceSlug,
      courseSlug: body.courseSlug,
      experienceLevel: body.experienceLevel,
      message: body.message,
      yearOfPassing: body.yearOfPassing,
      candidateType: body.candidateType,
      totalExperience: body.totalExperience,
      changingDomain: body.changingDomain,
      interestedDomain: body.interestedDomain,
    });

    if (!mailResult.adminEmailSent && mailResult.errors.length > 0) {
      console.error("[ENQUIRY MAIL ERROR] Failed to send admin notification:", mailResult.errors);
      return NextResponse.json(
        {
          error: "Failed to deliver enquiry notification email. Please check SMTP settings.",
          mailErrors: mailResult.errors,
        },
        { status: 500 }
      );
    }

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
