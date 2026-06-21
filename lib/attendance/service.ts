//
// Attendance Module — AttendanceService
// High-level orchestrator for attendance sessions and records.
//

import { AttendanceRecord, AttendanceSession, AttendanceStatus } from "./types";
import { attendanceHttpRequest } from "./http";

export class AttendanceService {
  constructor(private basePath: string = \"/attendance\") {}

  async createSession(session: AttendanceSession): Promise<AttendanceSession> {
    return attendanceHttpRequest<AttendanceSession>(\\/sessions\, {
      method: \"POST\",
      body: JSON.stringify(session),
    });
  }

  async getSession(sessionId: string): Promise<AttendanceSession> {
    return attendanceHttpRequest<AttendanceSession>(\\/sessions/\\);
  }

  async listSessions(): Promise<AttendanceSession[]> {
    return attendanceHttpRequest<AttendanceSession[]>(\\/sessions\);
  }

  async createRecord(record: AttendanceRecord): Promise<AttendanceRecord> {
    return attendanceHttpRequest<AttendanceRecord>(\\/records\, {
      method: \"POST\",
      body: JSON.stringify(record),
    });
  }

  async updateStatus(
    recordId: string,
    status: AttendanceStatus,
    notes?: string
  ): Promise<AttendanceRecord> {
    return attendanceHttpRequest<AttendanceRecord>(\\/records/\\, {
      method: \"PATCH\",
      body: JSON.stringify({ status, notes }),
    });
  }

  async getSessionRecords(sessionId: string): Promise<AttendanceRecord[]> {
    return attendanceHttpRequest<AttendanceRecord[]>(
      \\/sessions/\/records\
    );
  }
}



