import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/crm/auth";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
