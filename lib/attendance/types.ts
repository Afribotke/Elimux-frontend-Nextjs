//
// Attendance Module — Core Types
// Unified types for sessions, attendees, and check-ins.
//

export type AttendanceRole =
  | \"player\"
  | \"coach\"
  | \"official\"
  | \"staff\"
  | \"guest\";

export type AttendanceStatus =
  | \"present\"
  | \"absent\"
  | \"late\"
  | \"excused\";

export interface AttendanceSession {
  id: string;
  name: string;
  type: \"training\" | \"match\" | \"event\" | \"meeting\";
  startsAt: string;
  endsAt?: string;
  location?: string;
  teamId?: string;
  metadata?: Record<string, any>;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  personId: string;
  role: AttendanceRole;
  status: AttendanceStatus;
  checkedInAt?: string;
  notes?: string;
  metadata?: Record<string, any>;
}



