import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/crm/auth";
import { getAllTelecallers, getAllUsers, createUser, toggleUserStatus } from "@/lib/crm/db";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // If Admin, can get all users; if Telecaller, only active telecallers list
  if (session.role === "ADMIN") {
    const users = await getAllUsers();
    const telecallers = await getAllTelecallers();
    return NextResponse.json({ users, telecallers });
  }

  const telecallers = await getAllTelecallers();
  return NextResponse.json({ users: telecallers, telecallers });
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
  }

  const { name, email, password, role } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
  }

  try {
    const user = await createUser(name, email, password, role || "TELECALLER");
    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create user" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
  }

  const { userId, isActive } = await req.json();
  if (userId === undefined || isActive === undefined) {
    return NextResponse.json({ error: "userId and isActive are required" }, { status: 400 });
  }

  const success = await toggleUserStatus(Number(userId), Boolean(isActive));
  return NextResponse.json({ success });
}

