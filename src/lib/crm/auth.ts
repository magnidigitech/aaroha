import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { CrmUser, UserRole } from "./types";
import { findUserById } from "./db";

const JWT_SECRET = process.env.CRM_JWT_SECRET || "aaroha_crm_super_secure_jwt_secret_key_2026";
const COOKIE_NAME = "aaroha_crm_session";

export interface SessionPayload {
  userId: number;
  email: string;
  role: UserRole;
  name: string;
}

export function signSessionToken(payload: SessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<CrmUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifySessionToken(token);
  if (!payload) return null;

  return await findUserById(payload.userId);
}

export function getSessionFromRequest(req: NextRequest): SessionPayload | null {
  const cookieHeader = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookieHeader) return null;
  return verifySessionToken(cookieHeader);
}

export { COOKIE_NAME };
