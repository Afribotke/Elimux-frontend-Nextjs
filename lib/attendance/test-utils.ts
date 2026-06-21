//
// Attendance Module — Test Utilities
// Provides a mock attendance provider for testing and local development.
//

import { AttendanceRecord, AttendanceSession, AttendanceStatus } from "./types";

export class MockAttendanceProvider {
  private sessions: AttendanceSession[] = [];
  private records: AttendanceRecord[] = [];

  createSession(session: AttendanceSession): AttendanceSession {
    this.sessions.push(session);
    return session;
  }

  listSessions(): AttendanceSession[] {
    return this.sessions;
  }

  getSession(sessionId: string): AttendanceSession | undefined {
    return this.sessions.find(s => s.id === sessionId);
  }

  createRecord(record: AttendanceRecord): AttendanceRecord {
    this.records.push(record);
    return record;
  }

  updateStatus(recordId: string, status: AttendanceStatus, notes?: string): AttendanceRecord | undefined {
    const record = this.records.find(r => r.id === recordId);
    if (!record) return undefined;

    record.status = status;
    if (notes) record.notes = notes;
    return record;
  }

  getSessionRecords(sessionId: string): AttendanceRecord[] {
    return this.records.filter(r => r.sessionId === sessionId);
  }
}

