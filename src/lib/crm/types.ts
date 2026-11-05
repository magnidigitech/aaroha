export type UserRole = "ADMIN" | "TELECALLER";

export interface CrmUser {
  id: number;
  name: string;
  email: string;
  password_hash?: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export type LeadStatus =
  | "New"
  | "Assigned"
  | "Not Contacted"
  | "Call Not Answered"
  | "Switched Off"
  | "Busy"
  | "Interested"
  | "Not Interested"
  | "Follow-up Required"
  | "Demo / Counselling Scheduled"
  | "Converted"
  | "Lost";

export interface CrmLead {
  id: number;
  lead_code: string;
  full_name: string;
  email: string | null;
  mobile_number: string;
  year_of_passing?: string | null;
  candidate_type?: string | null; // "Fresher" | "Experienced"
  total_experience?: string | null;
  domain_change?: string | null; // "Yes" | "No"
  interested_domain?: string | null;
  target_program?: string | null;
  city?: string | null;
  enquiry_source: string;
  form_name: string;
  status: LeadStatus;
  assigned_telecaller_id: number | null;
  assigned_telecaller_name?: string | null;
  last_contacted_at: string | null;
  next_followup_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CrmCallLog {
  id: number;
  lead_id: number;
  telecaller_id: number;
  telecaller_name?: string;
  call_status: string;
  remarks: string;
  duration_seconds: number;
  created_at: string;
}

export type FollowUpPriority = "High" | "Medium" | "Low";
export type FollowUpStatus = "Pending" | "Completed" | "Missed" | "Rescheduled";

export interface CrmFollowUp {
  id: number;
  lead_id: number;
  lead_name?: string;
  lead_phone?: string;
  telecaller_id: number;
  telecaller_name?: string;
  scheduled_at: string;
  priority: FollowUpPriority;
  status: FollowUpStatus;
  remarks: string | null;
  outcome_remarks: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface CrmActivityTimeline {
  id: number;
  lead_id: number;
  user_id: number | null;
  user_name?: string | null;
  action_type: string;
  title: string;
  details: string | null;
  created_at: string;
}

export interface TelecallerStats {
  telecaller_id: number;
  name: string;
  email: string;
  total_leads: number;
  calls_made: number;
  interested_leads: number;
  followups_pending: number;
  followups_completed: number;
  converted_leads: number;
  lost_leads: number;
  conversion_rate: number;
}

