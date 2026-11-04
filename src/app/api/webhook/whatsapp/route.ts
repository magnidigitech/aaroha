import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "aaroha_whatsapp_verify_token_2026";

/**
 * GET Handler for Meta / WhatsApp Webhook Verification
 * Meta sends a GET request with hub.mode, hub.verify_token, and hub.challenge
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    // Check if mode and token were sent
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("[WHATSAPP WEBHOOK] Verified successfully with Meta challenge:", challenge);
      // Respond with 200 OK and the challenge token from the request
      return new NextResponse(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    console.warn("[WHATSAPP WEBHOOK] Verification failed. Token mismatch or invalid mode.", {
      receivedToken: token,
      expectedToken: VERIFY_TOKEN,
      mode,
    });

    return new NextResponse("Forbidden", { status: 403 });
  } catch (err: any) {
    console.error("[WHATSAPP WEBHOOK GET ERROR]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**
 * POST Handler for Incoming WhatsApp Messages & Status Updates
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("[WHATSAPP WEBHOOK EVENT]", JSON.stringify(body, null, 2));

    // Handle messages, delivery receipts, read receipts here
    if (body.object === "whatsapp_business_account") {
      // Process entries
      const entries = body.entry || [];
      for (const entry of entries) {
        const changes = entry.changes || [];
        for (const change of changes) {
          const value = change.value;
          if (value?.messages) {
            for (const msg of value.messages) {
              console.log("[WHATSAPP MESSAGE INCOMING]", {
                from: msg.from,
                type: msg.type,
                text: msg.text?.body,
                timestamp: msg.timestamp,
              });
            }
          }
        }
      }
    }

    // Meta requires an immediate 200 OK response to acknowledge receipt
    return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
  } catch (err: any) {
    console.error("[WHATSAPP WEBHOOK POST ERROR]", err);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
