import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import {
  CrmUser,
  CrmLead,
  CrmCallLog,
  CrmFollowUp,
  CrmActivityTimeline,
  TelecallerStats,
  LeadStatus,
  FollowUpPriority,
} from "./types";

// Configuration from Environment Variables with Hostinger defaults
const DB_HOST = process.env.DB_HOST || "srv1310.hstgr.io";
const DB_USER = process.env.DB_USER || "u131062117_leads";
const DB_PASSWORD = process.env.DB_PASSWORD || "Aaroha@3939";
const DB_NAME = process.env.DB_NAME || "u131062117_leads";
const DB_PORT = Number(process.env.DB_PORT) || 3306;

let pool: mysql.Pool | null = null;
let useFallbackStorage = false;

// Fallback JSON-based local DB for offline local development if remote MySQL port is not open
const FALLBACK_DIR = path.join(process.cwd(), ".crm_data");
const FALLBACK_FILE = path.join(FALLBACK_DIR, "crm_store.json");

interface FallbackStore {
  users: CrmUser[];
  leads: CrmLead[];
  call_logs: CrmCallLog[];
  follow_ups: CrmFollowUp[];
  timeline: CrmActivityTimeline[];
  settings: Record<string, string>;
}

function getFallbackStore(): FallbackStore {
  if (!fs.existsSync(FALLBACK_DIR)) {
    fs.mkdirSync(FALLBACK_DIR, { recursive: true });
  }
  if (!fs.existsSync(FALLBACK_FILE)) {
    const adminHash = bcrypt.hashSync("Admin@Aaroha2026", 10);
    const teleHash = bcrypt.hashSync("Telecaller@123", 10);
    const initial: FallbackStore = {
      users: [
        {
          id: 1,
          name: "AAROHA Admin",
          email: "admin@aaroha-inc.com",
          password_hash: adminHash,
          role: "ADMIN",
          is_active: true,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Priya Sharma",
          email: "priya@aaroha-inc.com",
          password_hash: teleHash,
          role: "TELECALLER",
          is_active: true,
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Rahul Verma",
          email: "rahul@aaroha-inc.com",
          password_hash: teleHash,
          role: "TELECALLER",
          is_active: true,
          created_at: new Date().toISOString(),
        },
      ],
      leads: [],
      call_logs: [],
      follow_ups: [],
      timeline: [],
      settings: {
        auto_assignment: "true",
        round_robin_index: "0",
      },
    };
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
  try {
    return JSON.parse(fs.readFileSync(FALLBACK_FILE, "utf8"));
  } catch {
    return { users: [], leads: [], call_logs: [], follow_ups: [], timeline: [], settings: {} };
  }
}

function saveFallbackStore(store: FallbackStore) {
  if (!fs.existsSync(FALLBACK_DIR)) {
    fs.mkdirSync(FALLBACK_DIR, { recursive: true });
  }
  fs.writeFileSync(FALLBACK_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function getDbPool(): Promise<mysql.Pool | null> {
  if (useFallbackStorage) return null;
  if (pool) return pool;

  try {
    const p = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 4000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    // Test connection
    const conn = await p.getConnection();
    conn.release();
    pool = p;
    await initMySqlSchema(p);
    return pool;
  } catch (err: any) {
    console.warn(`[CRM DB] MySQL direct connection to ${DB_HOST} not reachable (${err.message}). Using resilient local store.`);
    useFallbackStorage = true;
    return null;
  }
}

async function initMySqlSchema(p: mysql.Pool) {
  // 1. Users table
  await p.query(`
    CREATE TABLE IF NOT EXISTS crm_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(191) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('ADMIN', 'TELECALLER') NOT NULL DEFAULT 'TELECALLER',
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 2. Leads table
  await p.query(`
    CREATE TABLE IF NOT EXISTS crm_leads (
      id INT AUTO_INCREMENT PRIMARY KEY,
      lead_code VARCHAR(50) NOT NULL UNIQUE,
      full_name VARCHAR(150) NOT NULL,
      email VARCHAR(191) NULL,
      mobile_number VARCHAR(50) NOT NULL,
      year_of_passing VARCHAR(50) NULL,
      candidate_type VARCHAR(50) NULL,
      total_experience VARCHAR(50) NULL,
      domain_change VARCHAR(20) NULL,
      interested_domain VARCHAR(150) NULL,
      target_program VARCHAR(191) NULL,
      city VARCHAR(100) NULL,
      enquiry_source VARCHAR(100) DEFAULT 'Website',
      form_name VARCHAR(100) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'New',
      assigned_telecaller_id INT NULL,
      last_contacted_at DATETIME NULL,
      next_followup_at DATETIME NULL,
      notes TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_telecaller (assigned_telecaller_id),
      INDEX idx_mobile (mobile_number)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 3. Call Logs
  await p.query(`
    CREATE TABLE IF NOT EXISTS crm_call_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      lead_id INT NOT NULL,
      telecaller_id INT NOT NULL,
      call_status VARCHAR(50) NOT NULL,
      remarks TEXT NOT NULL,
      duration_seconds INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_lead (lead_id),
      INDEX idx_telecaller (telecaller_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 4. Follow Ups
  await p.query(`
    CREATE TABLE IF NOT EXISTS crm_follow_ups (
      id INT AUTO_INCREMENT PRIMARY KEY,
      lead_id INT NOT NULL,
      telecaller_id INT NOT NULL,
      scheduled_at DATETIME NOT NULL,
      priority ENUM('High', 'Medium', 'Low') NOT NULL DEFAULT 'Medium',
      status ENUM('Pending', 'Completed', 'Missed', 'Rescheduled') NOT NULL DEFAULT 'Pending',
      remarks TEXT NULL,
      outcome_remarks TEXT NULL,
      completed_at DATETIME NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_lead (lead_id),
      INDEX idx_telecaller (telecaller_id),
      INDEX idx_status (status),
      INDEX idx_scheduled (scheduled_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 5. Activity Timeline
  await p.query(`
    CREATE TABLE IF NOT EXISTS crm_activity_timeline (
      id INT AUTO_INCREMENT PRIMARY KEY,
      lead_id INT NOT NULL,
      user_id INT NULL,
      action_type VARCHAR(50) NOT NULL,
      title VARCHAR(150) NOT NULL,
      details TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_lead (lead_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 6. Settings
  await p.query(`
    CREATE TABLE IF NOT EXISTS crm_settings (
      key_name VARCHAR(100) PRIMARY KEY,
      value TEXT NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Seed Admin if not exists
  const [users]: any = await p.query("SELECT id FROM crm_users WHERE email = 'admin@aaroha-inc.com' LIMIT 1");
  if (users.length === 0) {
    const adminHash = bcrypt.hashSync("Admin@Aaroha2026", 10);
    const teleHash = bcrypt.hashSync("Telecaller@123", 10);
    await p.query(`
      INSERT INTO crm_users (name, email, password_hash, role, is_active)
      VALUES 
        ('AAROHA Admin', 'admin@aaroha-inc.com', ?, 'ADMIN', 1),
        ('Priya Sharma', 'priya@aaroha-inc.com', ?, 'TELECALLER', 1),
        ('Rahul Verma', 'rahul@aaroha-inc.com', ?, 'TELECALLER', 1)
    `, [adminHash, teleHash, teleHash]);

    await p.query(`
      INSERT IGNORE INTO crm_settings (key_name, value)
      VALUES ('auto_assignment', 'true'), ('round_robin_index', '0')
    `);
  }
}

// -------------------------------------------------------------
// CORE REPOSITORY METHODS
// -------------------------------------------------------------

export async function findUserByEmail(email: string): Promise<CrmUser | null> {
  const p = await getDbPool();
  if (p) {
    const [rows]: any = await p.query("SELECT * FROM crm_users WHERE email = ? AND is_active = 1 LIMIT 1", [email.toLowerCase().trim()]);
    return rows.length > 0 ? rows[0] : null;
  }
  const store = getFallbackStore();
  return store.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.is_active) || null;
}

export async function findUserById(id: number): Promise<CrmUser | null> {
  const p = await getDbPool();
  if (p) {
    const [rows]: any = await p.query("SELECT id, name, email, role, is_active, created_at FROM crm_users WHERE id = ? LIMIT 1", [id]);
    return rows.length > 0 ? rows[0] : null;
  }
  const store = getFallbackStore();
  const u = store.users.find((user) => user.id === id);
  if (!u) return null;
  const { password_hash, ...safe } = u;
  return safe as CrmUser;
}

export async function getAllTelecallers(): Promise<CrmUser[]> {
  const p = await getDbPool();
  if (p) {
    const [rows]: any = await p.query("SELECT id, name, email, role, is_active, created_at FROM crm_users WHERE role = 'TELECALLER' AND is_active = 1 ORDER BY name ASC");
    return rows;
  }
  const store = getFallbackStore();
  return store.users
    .filter((u) => u.role === "TELECALLER" && u.is_active)
    .map(({ password_hash, ...safe }) => safe as CrmUser);
}

export async function getAllUsers(): Promise<CrmUser[]> {
  const p = await getDbPool();
  if (p) {
    const [rows]: any = await p.query("SELECT id, name, email, role, is_active, created_at FROM crm_users ORDER BY role ASC, name ASC");
    return rows;
  }
  const store = getFallbackStore();
  return store.users.map(({ password_hash, ...safe }) => safe as CrmUser);
}

export async function createUser(name: string, email: string, password: string, role: "ADMIN" | "TELECALLER"): Promise<CrmUser> {
  const passwordHash = await bcrypt.hash(password, 10);
  const p = await getDbPool();
  if (p) {
    const [res]: any = await p.query(
      "INSERT INTO crm_users (name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, 1)",
      [name.trim(), email.toLowerCase().trim(), passwordHash, role]
    );
    return {
      id: res.insertId,
      name,
      email,
      role,
      is_active: true,
      created_at: new Date().toISOString(),
    };
  }
  const store = getFallbackStore();
  const newId = store.users.length ? Math.max(...store.users.map((u) => u.id)) + 1 : 1;
  const newUser: CrmUser = {
    id: newId,
    name,
    email,
    password_hash: passwordHash,
    role,
    is_active: true,
    created_at: new Date().toISOString(),
  };
  store.users.push(newUser);
  saveFallbackStore(store);
  const { password_hash, ...safe } = newUser;
  return safe as CrmUser;
}

export async function toggleUserStatus(userId: number, isActive: boolean): Promise<boolean> {
  const p = await getDbPool();
  if (p) {
    await p.query("UPDATE crm_users SET is_active = ? WHERE id = ?", [isActive ? 1 : 0, userId]);
    return true;
  }
  const store = getFallbackStore();
  const u = store.users.find((user) => user.id === userId);
  if (u) {
    u.is_active = isActive;
    saveFallbackStore(store);
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// LEAD INGESTION & DEDUPLICATION
// -------------------------------------------------------------

function generateLeadCode(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ARO-${year}-${rand}`;
}

export interface IngestLeadPayload {
  full_name: string;
  email?: string;
  mobile_number: string;
  year_of_passing?: string;
  candidate_type?: string;
  total_experience?: string;
  domain_change?: string;
  interested_domain?: string;
  target_program?: string;
  city?: string;
  enquiry_source?: string;
  form_name: string;
  notes?: string;
}

export async function ingestWebsiteLead(payload: IngestLeadPayload): Promise<{ lead: CrmLead; isDuplicate: boolean }> {
  const p = await getDbPool();
  const cleanPhone = payload.mobile_number.replace(/[^0-9]/g, "").slice(-10);
  const cleanEmail = payload.email?.toLowerCase().trim() || null;

  // Check for duplicate lead within database by phone or email
  let existingLead: CrmLead | null = null;

  if (p) {
    const [rows]: any = await p.query(
      `SELECT * FROM crm_leads 
       WHERE mobile_number LIKE ? ${cleanEmail ? "OR email = ?" : ""} 
       ORDER BY id DESC LIMIT 1`,
      cleanEmail ? [`%${cleanPhone}`, cleanEmail] : [`%${cleanPhone}`]
    );
    if (rows.length > 0) existingLead = rows[0];
  } else {
    const store = getFallbackStore();
    existingLead =
      store.leads.find((l) => {
        const p1 = l.mobile_number.replace(/[^0-9]/g, "").slice(-10);
        return p1 === cleanPhone || (cleanEmail && l.email?.toLowerCase() === cleanEmail);
      }) || null;
  }

  // If existing lead found: MERGE enquiry into timeline, bump status, do not create duplicate
  if (existingLead) {
    const updateDetails = `Repeated enquiry from ${payload.form_name}. Target Program: ${payload.target_program || "General"}. Notes: ${payload.notes || "None"}`;
    await addActivityTimeline(
      existingLead.id,
      null,
      "RE_ENQUIRY",
      "Repeat Website Form Submission",
      updateDetails
    );

    // Update notes or status if previously closed
    if (["Lost", "Not Interested", "Call Not Answered"].includes(existingLead.status)) {
      await updateLeadStatus(existingLead.id, "Follow-up Required", null, "Re-enquired on website form");
    }

    return { lead: existingLead, isDuplicate: true };
  }

  // Automatic Round-Robin Assignment if configured
  const telecallers = await getAllTelecallers();
  let assignedTelecallerId: number | null = null;

  if (telecallers.length > 0) {
    // Round-robin selection
    const rrIndex = Math.floor(Math.random() * telecallers.length);
    assignedTelecallerId = telecallers[rrIndex].id;
  }

  const initialStatus: LeadStatus = assignedTelecallerId ? "Assigned" : "New";
  const leadCode = generateLeadCode();

  if (p) {
    const [res]: any = await p.query(
      `INSERT INTO crm_leads (
        lead_code, full_name, email, mobile_number, year_of_passing,
        candidate_type, total_experience, domain_change, interested_domain,
        target_program, city, enquiry_source, form_name, status, assigned_telecaller_id, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        leadCode,
        payload.full_name,
        cleanEmail,
        payload.mobile_number,
        payload.year_of_passing || null,
        payload.candidate_type || null,
        payload.total_experience || null,
        payload.domain_change || null,
        payload.interested_domain || null,
        payload.target_program || null,
        payload.city || null,
        payload.enquiry_source || "Website",
        payload.form_name,
        initialStatus,
        assignedTelecallerId,
        payload.notes || null,
      ]
    );

    const leadId = res.insertId;
    await addActivityTimeline(
      leadId,
      null,
      "FORM_SUBMISSION",
      "Lead Created via Website Form",
      `Submitted through ${payload.form_name}. Source: ${payload.enquiry_source || "Website"}`
    );

    if (assignedTelecallerId) {
      const telecaller = telecallers.find((t) => t.id === assignedTelecallerId);
      await addActivityTimeline(
        leadId,
        null,
        "LEAD_ASSIGNED",
        "Lead Automatically Assigned",
        `Assigned to ${telecaller?.name || "Telecaller"}`
      );
    }

    const [created]: any = await p.query("SELECT * FROM crm_leads WHERE id = ?", [leadId]);
    return { lead: created[0], isDuplicate: false };
  }

  // Fallback Store
  const store = getFallbackStore();
  const newId = store.leads.length ? Math.max(...store.leads.map((l) => l.id)) + 1 : 1;
  const newLead: CrmLead = {
    id: newId,
    lead_code: leadCode,
    full_name: payload.full_name,
    email: cleanEmail,
    mobile_number: payload.mobile_number,
    year_of_passing: payload.year_of_passing || null,
    candidate_type: payload.candidate_type || null,
    total_experience: payload.total_experience || null,
    domain_change: payload.domain_change || null,
    interested_domain: payload.interested_domain || null,
    target_program: payload.target_program || null,
    city: payload.city || null,
    enquiry_source: payload.enquiry_source || "Website",
    form_name: payload.form_name,
    status: initialStatus,
    assigned_telecaller_id: assignedTelecallerId,
    last_contacted_at: null,
    next_followup_at: null,
    notes: payload.notes || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.leads.unshift(newLead);
  saveFallbackStore(store);

  await addActivityTimeline(
    newId,
    null,
    "FORM_SUBMISSION",
    "Lead Created via Website Form",
    `Submitted through ${payload.form_name}. Source: ${payload.enquiry_source || "Website"}`
  );

  return { lead: newLead, isDuplicate: false };
}

// -------------------------------------------------------------
// LEAD MANAGEMENT QUERIES
// -------------------------------------------------------------

export interface LeadFilterOptions {
  search?: string;
  status?: string;
  telecaller_id?: number | "unassigned";
  source?: string;
  date_from?: string;
  date_to?: string;
  limit?: number;
  offset?: number;
}

export async function getLeads(filters: LeadFilterOptions = {}): Promise<{ leads: CrmLead[]; total: number }> {
  const p = await getDbPool();
  const limit = filters.limit || 50;
  const offset = filters.offset || 0;

  if (p) {
    const whereConditions: string[] = ["1=1"];
    const queryParams: any[] = [];

    if (filters.search) {
      whereConditions.push("(l.full_name LIKE ? OR l.mobile_number LIKE ? OR l.email LIKE ? OR l.lead_code LIKE ?)");
      const term = `%${filters.search.trim()}%`;
      queryParams.push(term, term, term, term);
    }

    if (filters.status && filters.status !== "All") {
      whereConditions.push("l.status = ?");
      queryParams.push(filters.status);
    }

    if (filters.telecaller_id) {
      if (filters.telecaller_id === "unassigned") {
        whereConditions.push("l.assigned_telecaller_id IS NULL");
      } else {
        whereConditions.push("l.assigned_telecaller_id = ?");
        queryParams.push(filters.telecaller_id);
      }
    }

    if (filters.source && filters.source !== "All") {
      whereConditions.push("l.enquiry_source = ?");
      queryParams.push(filters.source);
    }

    if (filters.date_from) {
      whereConditions.push("l.created_at >= ?");
      queryParams.push(`${filters.date_from} 00:00:00`);
    }

    if (filters.date_to) {
      whereConditions.push("l.created_at <= ?");
      queryParams.push(`${filters.date_to} 23:59:59`);
    }

    const whereClause = whereConditions.join(" AND ");

    const [countRows]: any = await p.query(
      `SELECT COUNT(*) as total FROM crm_leads l WHERE ${whereClause}`,
      queryParams
    );
    const total = countRows[0].total;

    const [leadRows]: any = await p.query(
      `SELECT l.*, u.name as assigned_telecaller_name 
       FROM crm_leads l 
       LEFT JOIN crm_users u ON l.assigned_telecaller_id = u.id 
       WHERE ${whereClause} 
       ORDER BY l.created_at DESC 
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return { leads: leadRows, total };
  }

  // Fallback
  const store = getFallbackStore();
  let results = [...store.leads];

  if (filters.search) {
    const s = filters.search.toLowerCase().trim();
    results = results.filter(
      (l) =>
        l.full_name.toLowerCase().includes(s) ||
        l.mobile_number.includes(s) ||
        (l.email && l.email.toLowerCase().includes(s)) ||
        l.lead_code.toLowerCase().includes(s)
    );
  }

  if (filters.status && filters.status !== "All") {
    results = results.filter((l) => l.status === filters.status);
  }

  if (filters.telecaller_id) {
    if (filters.telecaller_id === "unassigned") {
      results = results.filter((l) => l.assigned_telecaller_id === null);
    } else {
      results = results.filter((l) => l.assigned_telecaller_id === Number(filters.telecaller_id));
    }
  }

  const total = results.length;
  const paged = results.slice(offset, offset + limit).map((l) => {
    const t = store.users.find((u) => u.id === l.assigned_telecaller_id);
    return { ...l, assigned_telecaller_name: t?.name || null };
  });

  return { leads: paged, total };
}

export async function getLeadById(id: number): Promise<CrmLead | null> {
  const p = await getDbPool();
  if (p) {
    const [rows]: any = await p.query(
      `SELECT l.*, u.name as assigned_telecaller_name 
       FROM crm_leads l 
       LEFT JOIN crm_users u ON l.assigned_telecaller_id = u.id 
       WHERE l.id = ? LIMIT 1`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }
  const store = getFallbackStore();
  const l = store.leads.find((lead) => lead.id === id);
  if (!l) return null;
  const t = store.users.find((u) => u.id === l.assigned_telecaller_id);
  return { ...l, assigned_telecaller_name: t?.name || null };
}

export async function assignLead(leadId: number, telecallerId: number | null, assignedByUserId: number | null): Promise<boolean> {
  const p = await getDbPool();
  const telecallers = await getAllTelecallers();
  const telecaller = telecallers.find((t) => t.id === telecallerId);
  const newStatus: LeadStatus = telecallerId ? "Assigned" : "New";

  if (p) {
    await p.query(
      "UPDATE crm_leads SET assigned_telecaller_id = ?, status = CASE WHEN status = 'New' THEN ? ELSE status END WHERE id = ?",
      [telecallerId, newStatus, leadId]
    );
  } else {
    const store = getFallbackStore();
    const l = store.leads.find((lead) => lead.id === leadId);
    if (l) {
      l.assigned_telecaller_id = telecallerId;
      if (l.status === "New") l.status = newStatus;
      saveFallbackStore(store);
    }
  }

  await addActivityTimeline(
    leadId,
    assignedByUserId,
    "ASSIGNMENT",
    telecallerId ? "Lead Assigned" : "Lead Unassigned",
    telecallerId ? `Assigned to ${telecaller?.name || "Telecaller"}` : "Unassigned from telecaller"
  );

  return true;
}

export async function bulkAssignLeads(leadIds: number[], telecallerId: number, assignedByUserId: number): Promise<number> {
  let count = 0;
  for (const id of leadIds) {
    await assignLead(id, telecallerId, assignedByUserId);
    count++;
  }
  return count;
}

export async function updateLeadStatus(
  leadId: number,
  status: LeadStatus,
  userId: number | null,
  remarks?: string
): Promise<boolean> {
  const p = await getDbPool();
  if (p) {
    await p.query("UPDATE crm_leads SET status = ?, updated_at = NOW() WHERE id = ?", [status, leadId]);
  } else {
    const store = getFallbackStore();
    const l = store.leads.find((lead) => lead.id === leadId);
    if (l) {
      l.status = status;
      l.updated_at = new Date().toISOString();
      saveFallbackStore(store);
    }
  }

  await addActivityTimeline(
    leadId,
    userId,
    "STATUS_CHANGE",
    `Status updated to: ${status}`,
    remarks || `Lead status changed to ${status}`
  );

  return true;
}

export async function addCallLog(
  leadId: number,
  telecallerId: number,
  callStatus: string,
  remarks: string,
  durationSeconds: number = 0
): Promise<CrmCallLog> {
  const p = await getDbPool();
  const now = new Date();

  // Update lead last_contacted_at
  if (p) {
    const [res]: any = await p.query(
      "INSERT INTO crm_call_logs (lead_id, telecaller_id, call_status, remarks, duration_seconds) VALUES (?, ?, ?, ?, ?)",
      [leadId, telecallerId, callStatus, remarks, durationSeconds]
    );

    await p.query("UPDATE crm_leads SET last_contacted_at = NOW() WHERE id = ?", [leadId]);

    await addActivityTimeline(
      leadId,
      telecallerId,
      "CALL_LOGGED",
      `Call Attempt: ${callStatus}`,
      remarks
    );

    return {
      id: res.insertId,
      lead_id: leadId,
      telecaller_id: telecallerId,
      call_status: callStatus,
      remarks,
      duration_seconds: durationSeconds,
      created_at: now.toISOString(),
    };
  }

  const store = getFallbackStore();
  const newId = store.call_logs.length ? Math.max(...store.call_logs.map((c) => c.id)) + 1 : 1;
  const newLog: CrmCallLog = {
    id: newId,
    lead_id: leadId,
    telecaller_id: telecallerId,
    call_status: callStatus,
    remarks,
    duration_seconds: durationSeconds,
    created_at: now.toISOString(),
  };

  store.call_logs.unshift(newLog);
  const l = store.leads.find((lead) => lead.id === leadId);
  if (l) l.last_contacted_at = now.toISOString();

  saveFallbackStore(store);

  await addActivityTimeline(
    leadId,
    telecallerId,
    "CALL_LOGGED",
    `Call Attempt: ${callStatus}`,
    remarks
  );

  return newLog;
}

export async function getCallLogsByLead(leadId: number): Promise<CrmCallLog[]> {
  const p = await getDbPool();
  if (p) {
    const [rows]: any = await p.query(
      `SELECT c.*, u.name as telecaller_name 
       FROM crm_call_logs c 
       JOIN crm_users u ON c.telecaller_id = u.id 
       WHERE c.lead_id = ? 
       ORDER BY c.created_at DESC`,
      [leadId]
    );
    return rows;
  }
  const store = getFallbackStore();
  return store.call_logs
    .filter((c) => c.lead_id === leadId)
    .map((c) => ({
      ...c,
      telecaller_name: store.users.find((u) => u.id === c.telecaller_id)?.name || "Telecaller",
    }))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// -------------------------------------------------------------
// FOLLOW-UPS MANAGEMENT
// -------------------------------------------------------------

export async function scheduleFollowUp(
  leadId: number,
  telecallerId: number,
  scheduledAt: string,
  priority: FollowUpPriority = "Medium",
  remarks?: string
): Promise<CrmFollowUp> {
  const p = await getDbPool();

  if (p) {
    const [res]: any = await p.query(
      "INSERT INTO crm_follow_ups (lead_id, telecaller_id, scheduled_at, priority, status, remarks) VALUES (?, ?, ?, ?, 'Pending', ?)",
      [leadId, telecallerId, scheduledAt, priority, remarks || null]
    );

    await p.query("UPDATE crm_leads SET next_followup_at = ?, status = 'Follow-up Required' WHERE id = ?", [
      scheduledAt,
      leadId,
    ]);

    await addActivityTimeline(
      leadId,
      telecallerId,
      "FOLLOW_UP_SCHEDULED",
      `Follow-up Scheduled (${priority} Priority)`,
      `Scheduled for: ${new Date(scheduledAt).toLocaleString("en-IN")}. Notes: ${remarks || "None"}`
    );

    return {
      id: res.insertId,
      lead_id: leadId,
      telecaller_id: telecallerId,
      scheduled_at: scheduledAt,
      priority,
      status: "Pending",
      remarks: remarks || null,
      outcome_remarks: null,
      completed_at: null,
      created_at: new Date().toISOString(),
    };
  }

  const store = getFallbackStore();
  const newId = store.follow_ups.length ? Math.max(...store.follow_ups.map((f) => f.id)) + 1 : 1;
  const newFollow: CrmFollowUp = {
    id: newId,
    lead_id: leadId,
    telecaller_id: telecallerId,
    scheduled_at: scheduledAt,
    priority,
    status: "Pending",
    remarks: remarks || null,
    outcome_remarks: null,
    completed_at: null,
    created_at: new Date().toISOString(),
  };

  store.follow_ups.unshift(newFollow);
  const l = store.leads.find((lead) => lead.id === leadId);
  if (l) {
    l.next_followup_at = scheduledAt;
    l.status = "Follow-up Required";
  }
  saveFallbackStore(store);

  await addActivityTimeline(
    leadId,
    telecallerId,
    "FOLLOW_UP_SCHEDULED",
    `Follow-up Scheduled (${priority} Priority)`,
    `Scheduled for: ${new Date(scheduledAt).toLocaleString("en-IN")}. Notes: ${remarks || "None"}`
  );

  return newFollow;
}

export async function completeFollowUp(
  followUpId: number,
  userId: number,
  outcomeRemarks: string,
  newStatus?: LeadStatus,
  nextScheduledAt?: string
): Promise<boolean> {
  const p = await getDbPool();
  const now = new Date().toISOString();

  if (p) {
    await p.query(
      "UPDATE crm_follow_ups SET status = 'Completed', outcome_remarks = ?, completed_at = NOW() WHERE id = ?",
      [outcomeRemarks, followUpId]
    );

    const [rows]: any = await p.query("SELECT lead_id FROM crm_follow_ups WHERE id = ?", [followUpId]);
    if (rows.length > 0) {
      const leadId = rows[0].lead_id;
      if (newStatus) {
        await updateLeadStatus(leadId, newStatus, userId, `Follow-up completed: ${outcomeRemarks}`);
      }
      if (nextScheduledAt) {
        await scheduleFollowUp(leadId, userId, nextScheduledAt, "Medium", "Subsequent follow-up scheduled");
      } else {
        await p.query("UPDATE crm_leads SET next_followup_at = NULL WHERE id = ?", [leadId]);
      }
    }
    return true;
  }

  const store = getFallbackStore();
  const f = store.follow_ups.find((follow) => follow.id === followUpId);
  if (f) {
    f.status = "Completed";
    f.outcome_remarks = outcomeRemarks;
    f.completed_at = now;

    if (newStatus) {
      await updateLeadStatus(f.lead_id, newStatus, userId, `Follow-up completed: ${outcomeRemarks}`);
    }

    if (nextScheduledAt) {
      await scheduleFollowUp(f.lead_id, userId, nextScheduledAt, "Medium", "Subsequent follow-up scheduled");
    } else {
      const l = store.leads.find((lead) => lead.id === f.lead_id);
      if (l) l.next_followup_at = null;
    }

    saveFallbackStore(store);
    return true;
  }
  return false;
}

export async function getFollowUps(telecallerId?: number): Promise<{
  today: CrmFollowUp[];
  upcoming: CrmFollowUp[];
  overdue: CrmFollowUp[];
  completed: CrmFollowUp[];
}> {
  const p = await getDbPool();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  let allFollowUps: CrmFollowUp[] = [];

  if (p) {
    const params: any[] = [];
    let query = `
      SELECT f.*, l.full_name as lead_name, l.mobile_number as lead_phone, u.name as telecaller_name
      FROM crm_follow_ups f
      JOIN crm_leads l ON f.lead_id = l.id
      JOIN crm_users u ON f.telecaller_id = u.id
    `;
    if (telecallerId) {
      query += " WHERE f.telecaller_id = ?";
      params.push(telecallerId);
    }
    query += " ORDER BY f.scheduled_at ASC";

    const [rows]: any = await p.query(query, params);
    allFollowUps = rows;
  } else {
    const store = getFallbackStore();
    allFollowUps = store.follow_ups
      .filter((f) => (!telecallerId ? true : f.telecaller_id === telecallerId))
      .map((f) => {
        const lead = store.leads.find((l) => l.id === f.lead_id);
        const tele = store.users.find((u) => u.id === f.telecaller_id);
        return {
          ...f,
          lead_name: lead?.full_name || "Lead",
          lead_phone: lead?.mobile_number || "",
          telecaller_name: tele?.name || "Telecaller",
        };
      })
      .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
  }

  const today: CrmFollowUp[] = [];
  const upcoming: CrmFollowUp[] = [];
  const overdue: CrmFollowUp[] = [];
  const completed: CrmFollowUp[] = [];

  const now = new Date();

  for (const f of allFollowUps) {
    if (f.status === "Completed") {
      completed.push(f);
      continue;
    }
    const sched = new Date(f.scheduled_at);
    if (sched < todayStart) {
      overdue.push(f);
    } else if (sched >= todayStart && sched <= todayEnd) {
      today.push(f);
    } else {
      upcoming.push(f);
    }
  }

  return { today, upcoming, overdue, completed };
}

// -------------------------------------------------------------
// TIMELINE
// -------------------------------------------------------------

export async function addActivityTimeline(
  leadId: number,
  userId: number | null,
  actionType: string,
  title: string,
  details: string | null
): Promise<void> {
  const p = await getDbPool();
  if (p) {
    await p.query(
      "INSERT INTO crm_activity_timeline (lead_id, user_id, action_type, title, details) VALUES (?, ?, ?, ?, ?)",
      [leadId, userId, actionType, title, details]
    );
    return;
  }
  const store = getFallbackStore();
  const newId = store.timeline.length ? Math.max(...store.timeline.map((t) => t.id)) + 1 : 1;
  store.timeline.unshift({
    id: newId,
    lead_id: leadId,
    user_id: userId,
    user_name: store.users.find((u) => u.id === userId)?.name || null,
    action_type: actionType,
    title,
    details,
    created_at: new Date().toISOString(),
  });
  saveFallbackStore(store);
}

export async function getTimelineByLead(leadId: number): Promise<CrmActivityTimeline[]> {
  const p = await getDbPool();
  if (p) {
    const [rows]: any = await p.query(
      `SELECT t.*, u.name as user_name 
       FROM crm_activity_timeline t 
       LEFT JOIN crm_users u ON t.user_id = u.id 
       WHERE t.lead_id = ? 
       ORDER BY t.created_at DESC`,
      [leadId]
    );
    return rows;
  }
  const store = getFallbackStore();
  return store.timeline
    .filter((t) => t.lead_id === leadId)
    .map((t) => ({
      ...t,
      user_name: store.users.find((u) => u.id === t.user_id)?.name || null,
    }))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// -------------------------------------------------------------
// DASHBOARD & ANALYTICS
// -------------------------------------------------------------

export async function getDashboardMetrics(role: "ADMIN" | "TELECALLER", telecallerId?: number) {
  const { leads } = await getLeads({
    limit: 10000,
    telecaller_id: role === "TELECALLER" ? telecallerId : undefined,
  });

  const followups = await getFollowUps(role === "TELECALLER" ? telecallerId : undefined);

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayLeads = leads.filter((l) => l.created_at.slice(0, 10) === todayStr).length;

  const total = leads.length;
  const unassigned = leads.filter((l) => l.assigned_telecaller_id === null).length;
  const assigned = leads.filter((l) => l.assigned_telecaller_id !== null).length;
  const interested = leads.filter((l) => l.status === "Interested" || l.status === "Demo / Counselling Scheduled").length;
  const converted = leads.filter((l) => l.status === "Converted").length;
  const lost = leads.filter((l) => l.status === "Lost" || l.status === "Not Interested").length;

  const conversionRate = total > 0 ? Number(((converted / total) * 100).toFixed(1)) : 0;

  // Status breakdown
  const statusCounts: Record<string, number> = {};
  for (const l of leads) {
    statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;
  }

  // Trend (last 7 days)
  const last7Days: { date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().slice(0, 10);
    const c = leads.filter((l) => l.created_at.slice(0, 10) === dStr).length;
    last7Days.push({
      date: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      count: c,
    });
  }

  return {
    total,
    todayLeads,
    unassigned,
    assigned,
    todayFollowups: followups.today.length,
    overdueFollowups: followups.overdue.length,
    interested,
    converted,
    lost,
    conversionRate,
    statusCounts,
    last7Days,
  };
}

export async function getTelecallerPerformance(): Promise<TelecallerStats[]> {
  const telecallers = await getAllTelecallers();
  const { leads } = await getLeads({ limit: 10000 });
  const p = await getDbPool();

  const store = !p ? getFallbackStore() : null;

  const stats: TelecallerStats[] = [];

  for (const tele of telecallers) {
    const teleLeads = leads.filter((l) => l.assigned_telecaller_id === tele.id);
    const totalLeads = teleLeads.length;
    const interested = teleLeads.filter((l) => l.status === "Interested" || l.status === "Demo / Counselling Scheduled").length;
    const converted = teleLeads.filter((l) => l.status === "Converted").length;
    const lost = teleLeads.filter((l) => l.status === "Lost" || l.status === "Not Interested").length;

    let callsMade = 0;
    let pendingFollows = 0;
    let completedFollows = 0;

    if (p) {
      const [cRows]: any = await p.query("SELECT COUNT(*) as c FROM crm_call_logs WHERE telecaller_id = ?", [tele.id]);
      callsMade = cRows[0].c;

      const [fPend]: any = await p.query("SELECT COUNT(*) as c FROM crm_follow_ups WHERE telecaller_id = ? AND status = 'Pending'", [tele.id]);
      pendingFollows = fPend[0].c;

      const [fComp]: any = await p.query("SELECT COUNT(*) as c FROM crm_follow_ups WHERE telecaller_id = ? AND status = 'Completed'", [tele.id]);
      completedFollows = fComp[0].c;
    } else if (store) {
      callsMade = store.call_logs.filter((c) => c.telecaller_id === tele.id).length;
      pendingFollows = store.follow_ups.filter((f) => f.telecaller_id === tele.id && f.status === "Pending").length;
      completedFollows = store.follow_ups.filter((f) => f.telecaller_id === tele.id && f.status === "Completed").length;
    }

    const convRate = totalLeads > 0 ? Number(((converted / totalLeads) * 100).toFixed(1)) : 0;

    stats.push({
      telecaller_id: tele.id,
      name: tele.name,
      email: tele.email,
      total_leads: totalLeads,
      calls_made: callsMade,
      interested_leads: interested,
      followups_pending: pendingFollows,
      followups_completed: completedFollows,
      converted_leads: converted,
      lost_leads: lost,
      conversion_rate: convRate,
    });
  }

  return stats;
}
