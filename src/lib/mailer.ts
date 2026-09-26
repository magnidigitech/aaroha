import nodemailer from "nodemailer";
import { SERVICES_CATALOG } from "@/data/services";
import { TRAINING_COURSES } from "@/data/training";
import { COMPANY_INFO } from "@/data/company";

// SMTP Transporter configuration helper
function getTransporter() {
  const host = (process.env.SMTP_HOST || "smtp.hostinger.com").trim();
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = (process.env.SMTP_USER || "training@aaroha-inc.com").trim();
  const pass = (process.env.SMTP_PASS || "Aaroha#azureai@0369").trim();
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE !== "false" : true;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export interface EnquiryPayload {
  type: "business" | "training" | string;
  name: string;
  email?: string;
  contactInfo?: string;
  company?: string;
  phone?: string;
  serviceSlug?: string;
  courseSlug?: string;
  experienceLevel?: string;
  message?: string;
}

/**
 * Resolves slug to a user-friendly title
 */
function resolveItemTitle(payload: EnquiryPayload): string {
  if (payload.serviceSlug) {
    const service = SERVICES_CATALOG.find((s) => s.slug === payload.serviceSlug);
    if (service) return service.title;
  }
  if (payload.courseSlug) {
    const course = TRAINING_COURSES.find((c) => c.slug === payload.courseSlug);
    if (course) return course.title;
  }
  if (payload.type === "training") return "Tech Training Program";
  return "General Business Enquiry";
}

/**
 * Extracts a valid recipient email from payload
 */
function extractUserEmail(payload: EnquiryPayload): string | null {
  if (payload.email && payload.email.includes("@")) {
    return payload.email.trim();
  }
  if (payload.contactInfo && payload.contactInfo.includes("@")) {
    const match = payload.contactInfo.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (match) return match[0];
  }
  return null;
}

/**
 * Generates HTML for Admin Notification Email (sent to training@aaroha-inc.com)
 */
function generateAdminEmailHTML(payload: EnquiryPayload, formattedDate: string, itemTitle: string): string {
  const isBusiness = payload.type === "business";
  const badgeText = isBusiness ? "BUSINESS ENQUIRY" : "TRAINING REQUEST";
  const badgeBg = isBusiness ? "#2563eb" : "#0d9488";
  const userContactEmail = extractUserEmail(payload) || "N/A";
  const userPhone = payload.phone || (payload.contactInfo && !payload.contactInfo.includes("@") ? payload.contactInfo : "N/A");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry - AAROHA Technologies</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="650" border="0" cellspacing="0" cellpadding="0" style="max-width: 650px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #050E2B; padding: 32px 30px; text-align: left;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                      AAROHA <span style="color: #3b82f6;">Technologies</span>
                    </h1>
                    <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                      Powered by J2D Technologies
                    </p>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: ${badgeBg}; color: #ffffff; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
                      ${badgeText}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subheader Bar -->
          <tr>
            <td style="background-color: #0f172a; padding: 12px 30px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #cbd5e1; margin: 0; font-size: 13px; font-weight: 500;">
                🔔 New enquiry received on <strong>${formattedDate}</strong>
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 35px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #0f172a; font-size: 20px; font-weight: 700;">
                Form Submission Details
              </h2>

              <!-- Details Table -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
                <tr style="background-color: #f8fafc;">
                  <td width="35%" style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Full Name</td>
                  <td width="65%" style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${payload.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Email Address</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #2563eb; font-weight: 600; border-bottom: 1px solid #e2e8f0;">
                    ${userContactEmail !== "N/A" ? `<a href="mailto:${userContactEmail}" style="color: #2563eb; text-decoration: none;">${userContactEmail}</a>` : "N/A"}
                  </td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Phone Number</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${userPhone}</td>
                </tr>
                ${
                  payload.company
                    ? `
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Company / Org</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${payload.company}</td>
                </tr>
                `
                    : ""
                }
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Service / Course Requested</td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #1e40af; border-bottom: 1px solid #e2e8f0;">${itemTitle}</td>
                </tr>
                ${
                  payload.experienceLevel
                    ? `
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Experience Level</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${payload.experienceLevel}</td>
                </tr>
                `
                    : ""
                }
              </table>

              <!-- Message / Requirements Box -->
              <h3 style="margin: 0 0 10px 0; color: #334155; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                Project Overview & Requirements
              </h3>
              <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 18px 20px; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-line;">
                  ${payload.message && payload.message.trim() ? payload.message.trim() : "No additional details provided."}
                </p>
              </div>

              <!-- Action Callout Button -->
              ${
                userContactEmail !== "N/A"
                  ? `
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${userContactEmail}?subject=Re: Your enquiry with AAROHA Technologies - ${encodeURIComponent(itemTitle)}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(37,99,235,0.3);">
                  ✉️ Reply Direct to ${payload.name} &rarr;
                </a>
              </div>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                This notification was automatically sent from the <strong>AAROHA Technologies</strong> web portal.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Generates HTML for User Acknowledgement Email (sent to submitter)
 */
function generateUserAckEmailHTML(payload: EnquiryPayload, itemTitle: string): string {
  const isBusiness = payload.type === "business";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting AAROHA Technologies</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="650" border="0" cellspacing="0" cellpadding="0" style="max-width: 650px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Branded Dark Navy Header -->
          <tr>
            <td style="background-color: #050E2B; padding: 36px 32px; text-align: left; background-image: linear-gradient(135deg, #050E2B 0%, #0f172a 100%);">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">
                      AAROHA <span style="color: #3b82f6;">Technologies</span>
                    </h1>
                    <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 13px; font-weight: 500;">
                      Software, Cloud & Data Engineering — Powered by J2D
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Greeting Banner -->
          <tr>
            <td style="background-color: #eff6ff; padding: 24px 32px; border-bottom: 1px solid #dbeafe;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="48" style="vertical-align: top; padding-right: 12px;">
                    <div style="width: 40px; height: 40px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 40px; color: #ffffff; font-size: 20px;">
                      ✓
                    </div>
                  </td>
                  <td style="vertical-align: middle;">
                    <h2 style="margin: 0; color: #1e40af; font-size: 18px; font-weight: 700;">
                      We Have Received Your Request!
                    </h2>
                    <p style="margin: 4px 0 0 0; color: #3b82f6; font-size: 13px; font-weight: 500;">
                      Thank you for reaching out to AAROHA Technologies.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 35px 32px;">
              <p style="margin: 0 0 18px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                Dear <strong>${payload.name}</strong>,
              </p>

              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                ${
                  isBusiness
                    ? `Thank you for interest in our engineering solutions. We have logged your enquiry regarding <strong>${itemTitle}</strong>. Our technical architecture team is reviewing your project details.`
                    : `Thank you for inquiring about our tech career programs. We have received your request for <strong>${itemTitle}</strong>. Our senior counseling team is preparing syllabus and batch information for you.`
                }
              </p>

              <!-- Request Summary Box -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px;">
                <h3 style="margin: 0 0 14px 0; color: #0f172a; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  Summary of Submitted Details
                </h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="6" style="font-size: 14px;">
                  <tr>
                    <td width="38%" style="color: #64748b; font-weight: 600;">Inquiry Type:</td>
                    <td width="62%" style="color: #0f172a; font-weight: 700;">${isBusiness ? "Business Engineering Project" : "Tech Training Program"}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: 600;">Primary Interest:</td>
                    <td style="color: #1e40af; font-weight: 700;">${itemTitle}</td>
                  </tr>
                  ${
                    payload.company
                      ? `
                  <tr>
                    <td style="color: #64748b; font-weight: 600;">Organization:</td>
                    <td style="color: #0f172a;">${payload.company}</td>
                  </tr>
                  `
                      : ""
                  }
                </table>
              </div>

              <!-- Next Steps Card -->
              <div style="background-color: #ffffff; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px;">
                <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 15px; font-weight: 700;">
                  ⚡ What Happens Next?
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.7;">
                  <li><strong>Prompt Review:</strong> Our specialist team will analyze your request within <strong>24 hours</strong>.</li>
                  <li><strong>Direct Response:</strong> An engineer or senior advisor will contact you directly via email or phone.</li>
                  <li><strong>Customized Consultation:</strong> We will share relevant case studies, syllabus documents, or schedule an initial discovery session.</li>
                </ul>
              </div>

              <!-- Urgent Inquiry Contact Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050E2B; border-radius: 12px; overflow: hidden; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 22px 24px;">
                    <h4 style="margin: 0 0 8px 0; color: #ffffff; font-size: 15px; font-weight: 700;">
                      Need Immediate Assistance?
                    </h4>
                    <p style="margin: 0 0 14px 0; color: #cbd5e1; font-size: 13px; line-height: 1.5;">
                      Feel free to speak directly with our team or drop by our office:
                    </p>
                    <p style="margin: 0; color: #ffffff; font-size: 13px; line-height: 1.8;">
                      📞 <strong>Phone:</strong> ${COMPANY_INFO.phones[0].display} / ${COMPANY_INFO.phones[1].display}<br>
                      ✉️ <strong>Email:</strong> <a href="mailto:${COMPANY_INFO.email}" style="color: #60a5fa; text-decoration: none;">${COMPANY_INFO.email}</a><br>
                      📍 <strong>Address:</strong> 3rd Floor, VIP Hills, Madhapur, Hyderabad, Telangana 500081
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #475569;">
                Best regards,<br>
                <strong>Engineering & Counseling Team</strong><br>
                <span style="color: #2563eb; font-weight: 600;">AAROHA Technologies</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #64748b;">
                © 2026 AAROHA Technologies — Powered by J2D Technologies. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 12px;">
                <a href="${COMPANY_INFO.siteUrl}" style="color: #2563eb; text-decoration: none; font-weight: 600;">Visit Website</a> &nbsp;•&nbsp; 
                <a href="${COMPANY_INFO.socials.linkedin}" style="color: #2563eb; text-decoration: none; font-weight: 600;">LinkedIn</a> &nbsp;•&nbsp; 
                <a href="${COMPANY_INFO.socials.youtube}" style="color: #2563eb; text-decoration: none; font-weight: 600;">YouTube</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Sends notification email to Admin and acknowledgement email to User
 */
export async function sendEnquiryEmails(payload: EnquiryPayload) {
  const adminRecipient = process.env.ADMIN_EMAIL || "training@aaroha-inc.com";
  const formattedDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const itemTitle = resolveItemTitle(payload);

  const results = {
    adminEmailSent: false,
    userEmailSent: false,
    errors: [] as string[],
  };

  // 1. Send Admin Notification Email
  try {
    const adminHTML = generateAdminEmailHTML(payload, formattedDate, itemTitle);
    await getTransporter().sendMail({
      from: `"AAROHA Website" <${process.env.SMTP_USER || "training@aaroha-inc.com"}>`,
      to: adminRecipient,
      replyTo: extractUserEmail(payload) || undefined,
      subject: `[AAROHA Web Form] ${payload.type === "business" ? "Business Enquiry" : "Training Request"} - ${payload.name}`,
      html: adminHTML,
    });
    results.adminEmailSent = true;
    console.log(`[MAIL SUCCESS] Admin notification sent to ${adminRecipient}`);
  } catch (err: any) {
    console.error(`[MAIL ERROR] Failed to send admin email:`, err);
    results.errors.push(`Admin mail error: ${err.message || String(err)}`);
  }

  // 2. Send User Acknowledgement Email (if email address exists)
  const userEmail = extractUserEmail(payload);
  if (userEmail) {
    try {
      const userHTML = generateUserAckEmailHTML(payload, itemTitle);
      await getTransporter().sendMail({
        from: `"AAROHA Technologies" <${process.env.SMTP_USER || "training@aaroha-inc.com"}>`,
        to: userEmail,
        subject: `Thank you for contacting AAROHA Technologies - ${itemTitle}`,
        html: userHTML,
      });
      results.userEmailSent = true;
      console.log(`[MAIL SUCCESS] User acknowledgement sent to ${userEmail}`);
    } catch (err: any) {
      console.error(`[MAIL ERROR] Failed to send user acknowledgement:`, err);
      results.errors.push(`User mail error: ${err.message || String(err)}`);
    }
  }

  return results;
}

export interface RegistrationPayload {
  fullName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  email: string;
  city: string;
  state?: string;
  currentStatus: string;
  highestQualification: string;
  specialization?: string;
  totalExperience?: string;
  jobTitle?: string;
  company?: string;
  trainingProgram: string;
  preferredMode: string;
  preferredBatchTiming: string;
  preferredStartDate?: string;
  priorExperience?: string;
  primaryObjective: string;
  currentSkills?: string;
  expectedOutcome?: string;
  realTimeProjectInterest?: string;
  popInterest?: string;
  interviewPrepInterest?: string;
  placementAssistanceInterest?: string;
  hearAboutUs: string;
  referralCode?: string;
  message?: string;
  consentAccurate: boolean;
  consentCommunication: boolean;
}

export async function sendRegistrationEmails(payload: RegistrationPayload) {
  const adminRecipient = process.env.ADMIN_EMAIL || "training@aaroha-inc.com";
  const formattedDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const results = {
    adminEmailSent: false,
    userEmailSent: false,
    errors: [] as string[],
  };

  const adminHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Registration - AAROHA Technologies</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9; padding:30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="700" border="0" cellspacing="0" cellpadding="0" style="max-width:700px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08); border:1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#050E2B; padding:32px 30px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:800; letter-spacing:-0.5px;">
                      AAROHA <span style="color:#3b82f6;">Technologies</span>
                    </h1>
                    <p style="color:#94a3b8; margin:4px 0 0 0; font-size:12px; font-weight:500; text-transform:uppercase; letter-spacing:1px;">
                      Training & Career Registration Form Submission
                    </p>
                  </td>
                  <td align="right">
                    <span style="display:inline-block; background-color:#0d9488; color:#ffffff; font-size:11px; font-weight:700; padding:6px 14px; border-radius:20px; text-transform:uppercase;">
                      NEW REGISTRATION
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:#0f172a; padding:12px 30px; border-top:1px solid rgba(255,255,255,0.1);">
              <p style="color:#cbd5e1; margin:0; font-size:13px;">
                🎓 Received on <strong>${formattedDate}</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 30px;">

              <!-- 1. Personal Details -->
              <h3 style="margin:0 0 12px 0; color:#1e40af; font-size:16px; font-weight:700; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
                1. Personal Details
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="margin-bottom:24px; font-size:14px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
                <tr><td width="35%" style="font-weight:600; color:#475569;">Full Name:</td><td style="font-weight:700; color:#0f172a;">${payload.fullName}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Mobile Number:</td><td style="font-weight:600; color:#0f172a;">${payload.mobileNumber}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">WhatsApp Number:</td><td style="color:#0f172a;">${payload.whatsappNumber || "N/A"}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Email Address:</td><td style="color:#2563eb; font-weight:600;"><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
                <tr><td style="font-weight:600; color:#475569;">City / State:</td><td style="color:#0f172a;">${payload.city}${payload.state ? `, ${payload.state}` : ""}</td></tr>
              </table>

              <!-- 2. Professional / Educational Details -->
              <h3 style="margin:0 0 12px 0; color:#1e40af; font-size:16px; font-weight:700; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
                2. Professional / Educational Details
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="margin-bottom:24px; font-size:14px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
                <tr><td width="35%" style="font-weight:600; color:#475569;">Current Status:</td><td style="font-weight:600; color:#0f172a;">${payload.currentStatus}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Highest Qualification:</td><td style="font-weight:600; color:#0f172a;">${payload.highestQualification}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Specialization:</td><td style="color:#0f172a;">${payload.specialization || "N/A"}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Total IT Experience:</td><td style="color:#0f172a;">${payload.totalExperience || "N/A"}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Current Role:</td><td style="color:#0f172a;">${payload.jobTitle || "N/A"}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Current Company:</td><td style="color:#0f172a;">${payload.company || "N/A"}</td></tr>
              </table>

              <!-- 3. Selected Training Program -->
              <h3 style="margin:0 0 12px 0; color:#1e40af; font-size:16px; font-weight:700; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
                3. Training Program Selection
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="margin-bottom:24px; font-size:14px; background:#eff6ff; border-radius:8px; border:1px solid #bfdbfe;">
                <tr><td width="35%" style="font-weight:600; color:#1e40af;">Selected Program:</td><td style="font-weight:800; color:#1d4ed8; font-size:15px;">${payload.trainingProgram}</td></tr>
                <tr><td style="font-weight:600; color:#1e40af;">Preferred Mode:</td><td style="font-weight:700; color:#0f172a;">${payload.preferredMode}</td></tr>
                <tr><td style="font-weight:600; color:#1e40af;">Preferred Batch Timing:</td><td style="font-weight:700; color:#0f172a;">${payload.preferredBatchTiming}</td></tr>
                <tr><td style="font-weight:600; color:#1e40af;">Preferred Start Date:</td><td style="font-weight:600; color:#0f172a;">${payload.preferredStartDate || "N/A"}</td></tr>
              </table>

              <!-- 4. Experience & Career Goals -->
              <h3 style="margin:0 0 12px 0; color:#1e40af; font-size:16px; font-weight:700; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
                4. Experience & Career Goals
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="margin-bottom:24px; font-size:14px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
                <tr><td width="35%" style="font-weight:600; color:#475569;">Prior Tech Experience:</td><td style="color:#0f172a;">${payload.priorExperience || "N/A"}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Primary Objective:</td><td style="font-weight:700; color:#0f172a;">${payload.primaryObjective}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Current Known Skills:</td><td style="color:#0f172a;">${payload.currentSkills || "N/A"}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Expected Career Outcome:</td><td style="color:#0f172a;">${payload.expectedOutcome || "N/A"}</td></tr>
              </table>

              <!-- 5. Project & Practical Learning -->
              <h3 style="margin:0 0 12px 0; color:#1e40af; font-size:16px; font-weight:700; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
                5. Project & Practical Learning Preferences
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="margin-bottom:24px; font-size:14px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
                <tr><td width="35%" style="font-weight:600; color:#475569;">Real-Time Project Interest:</td><td style="font-weight:600; color:#0f172a;">${payload.realTimeProjectInterest || "N/A"}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Project Oriented Program (POP):</td><td style="font-weight:600; color:#0f172a;">${payload.popInterest || "N/A"}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Interview Prep / Career Support:</td><td style="font-weight:600; color:#0f172a;">${payload.interviewPrepInterest || "N/A"}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Placement Assistance Info:</td><td style="font-weight:600; color:#0f172a;">${payload.placementAssistanceInterest || "N/A"}</td></tr>
              </table>

              <!-- 6 & 7. Source & Questions -->
              <h3 style="margin:0 0 12px 0; color:#1e40af; font-size:16px; font-weight:700; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
                6 & 7. Additional & Source Info
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="margin-bottom:24px; font-size:14px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
                <tr><td width="35%" style="font-weight:600; color:#475569;">How Did You Hear About Us?</td><td style="font-weight:600; color:#0f172a;">${payload.hearAboutUs}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Referral Code / Name:</td><td style="color:#0f172a;">${payload.referralCode || "N/A"}</td></tr>
                <tr><td style="font-weight:600; color:#475569;">Questions / Message:</td><td style="color:#0f172a;">${payload.message || "N/A"}</td></tr>
              </table>

              <div style="text-align:center; margin-top:24px;">
                <a href="mailto:${payload.email}?subject=Re: AAROHA Registration - ${encodeURIComponent(payload.trainingProgram)}" style="display:inline-block; background-color:#2563eb; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:8px; font-weight:700; font-size:14px;">
                  ✉️ Reply Direct to ${payload.fullName} (${payload.mobileNumber})
                </a>
              </div>

            </td>
          </tr>

          <tr>
            <td style="background-color:#f8fafc; padding:20px 30px; border-top:1px solid #e2e8f0; text-align:center;">
              <p style="margin:0; font-size:12px; color:#64748b;">
                AAROHA Technologies Registration System · www.aaroha-inc.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const userHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Received - AAROHA Technologies</title>
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f8fafc; padding:30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="650" border="0" cellspacing="0" cellpadding="0" style="max-width:650px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.06); border:1px solid #e2e8f0;">
          
          <tr style="background-color:#050E2B;">
            <td style="padding:36px 32px;">
              <h1 style="color:#ffffff; margin:0; font-size:26px; font-weight:800;">
                AAROHA <span style="color:#3b82f6;">Technologies</span>
              </h1>
              <p style="color:#94a3b8; margin:6px 0 0 0; font-size:13px; font-weight:500;">
                Elevate | Empower | Excel
              </p>
            </td>
          </tr>

          <tr style="background-color:#eff6ff;">
            <td style="padding:24px 32px; border-bottom:1px solid #dbeafe;">
              <h2 style="margin:0; color:#1e40af; font-size:18px; font-weight:700;">
                Registration Successfully Received!
              </h2>
              <p style="margin:4px 0 0 0; color:#2563eb; font-size:13px;">
                Thank you for registering with AAROHA Technologies.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px 0; font-size:15px; color:#334155;">
                Dear <strong>${payload.fullName}</strong>,
              </p>
              <p style="margin:0 0 20px 0; font-size:15px; line-height:1.6; color:#334155;">
                Thank you for your interest in AAROHA Technologies. Your registration for <strong>${payload.trainingProgram}</strong> has been successfully received. Our team will review your details and contact you shortly regarding the selected training program, upcoming batches, demo sessions, and career opportunities.
              </p>

              <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin-bottom:24px;">
                <h3 style="margin:0 0 12px 0; color:#0f172a; font-size:14px; font-weight:700; text-transform:uppercase;">
                  Registration Summary
                </h3>
                <p style="margin:4px 0; font-size:14px; color:#475569;"><strong>Program:</strong> ${payload.trainingProgram}</p>
                <p style="margin:4px 0; font-size:14px; color:#475569;"><strong>Mode & Timing:</strong> ${payload.preferredMode} (${payload.preferredBatchTiming})</p>
                <p style="margin:4px 0; font-size:14px; color:#475569;"><strong>Contact Mobile:</strong> ${payload.mobileNumber}</p>
              </div>

              <p style="margin:0; font-size:14px; line-height:1.6; color:#475569;">
                Best regards,<br>
                <strong>Training & Career Support Team</strong><br>
                <span style="color:#2563eb; font-weight:600;">AAROHA Technologies</span><br>
                <a href="https://www.aaroha-inc.com" style="color:#2563eb; text-decoration:none;">www.aaroha-inc.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // 1. Admin Email
  try {
    await getTransporter().sendMail({
      from: `"AAROHA Registration" <${process.env.SMTP_USER || "training@aaroha-inc.com"}>`,
      to: adminRecipient,
      replyTo: payload.email,
      subject: `[AAROHA Registration] ${payload.fullName} - ${payload.trainingProgram}`,
      html: adminHTML,
    });
    results.adminEmailSent = true;
  } catch (err: any) {
    console.error("[REGISTRATION MAIL ERROR Admin]", err);
    results.errors.push(`Admin mail error: ${err.message || String(err)}`);
  }

  // 2. User Acknowledgement
  try {
    await getTransporter().sendMail({
      from: `"AAROHA Technologies" <${process.env.SMTP_USER || "training@aaroha-inc.com"}>`,
      to: payload.email,
      subject: `Registration Confirmed - AAROHA Technologies (${payload.trainingProgram})`,
      html: userHTML,
    });
    results.userEmailSent = true;
  } catch (err: any) {
    console.error("[REGISTRATION MAIL ERROR User]", err);
    results.errors.push(`User mail error: ${err.message || String(err)}`);
  }

  return results;
}

