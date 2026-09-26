import { NextRequest, NextResponse } from "next/server";
import { sendRegistrationEmails, RegistrationPayload } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body: RegistrationPayload = await req.json();

    // Required Field Validations
    if (!body.fullName || !body.fullName.trim()) {
      return NextResponse.json({ error: "Full Name is required" }, { status: 400 });
    }

    if (!body.mobileNumber || !body.mobileNumber.trim()) {
      return NextResponse.json({ error: "Mobile Number is required" }, { status: 400 });
    }

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "Valid Email Address is required" }, { status: 400 });
    }

    if (!body.city || !body.city.trim()) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    if (!body.currentStatus) {
      return NextResponse.json({ error: "Current Status is required" }, { status: 400 });
    }

    if (!body.highestQualification) {
      return NextResponse.json({ error: "Highest Qualification is required" }, { status: 400 });
    }

    if (!body.trainingProgram) {
      return NextResponse.json({ error: "Training Program selection is required" }, { status: 400 });
    }

    if (!body.preferredMode) {
      return NextResponse.json({ error: "Preferred Training Mode is required" }, { status: 400 });
    }

    if (!body.preferredBatchTiming) {
      return NextResponse.json({ error: "Preferred Batch Timing is required" }, { status: 400 });
    }

    if (!body.primaryObjective) {
      return NextResponse.json({ error: "Primary Objective is required" }, { status: 400 });
    }

    if (!body.hearAboutUs) {
      return NextResponse.json({ error: "How did you hear about us is required" }, { status: 400 });
    }

    if (!body.consentAccurate || !body.consentCommunication) {
      return NextResponse.json({ error: "Please accept the required consent check items to submit" }, { status: 400 });
    }

    // Server audit logging
    console.log("[TRAINING REGISTRATION RECEIVED]", {
      timestamp: new Date().toISOString(),
      fullName: body.fullName,
      email: body.email,
      mobile: body.mobileNumber,
      program: body.trainingProgram,
      mode: body.preferredMode,
      city: body.city,
    });

    // Dispatch email notifications (Admin alert + Submitter confirmation)
    const mailResult = await sendRegistrationEmails(body);

    return NextResponse.json({
      success: true,
      message: "Thank you for registering with AAROHA Technologies! Your registration has been successfully received.",
      timestamp: new Date().toISOString(),
      mailStatus: {
        adminSent: mailResult.adminEmailSent,
        userAckSent: mailResult.userEmailSent,
        errors: mailResult.errors.length > 0 ? mailResult.errors : undefined,
      },
    });
  } catch (error: any) {
    console.error("[REGISTRATION API ERROR]", error);
    return NextResponse.json(
      { error: "Failed to process registration request. Please try again or contact support directly." },
      { status: 500 }
    );
  }
}
