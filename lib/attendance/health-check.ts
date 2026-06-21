//
// Attendance Module — Health Check
// Verifies connectivity to the attendance backend or provider.
//

import { createAttendanceService } from "./service-factory";

export interface AttendanceHealthStatus {
  ok: boolean;
  message: string;
  timestamp: string;
  raw?: any;
}

export async function checkAttendanceHealth(): Promise<AttendanceHealthStatus> {
  const service = createAttendanceService();

  try {
    // Attempt a lightweight call — list sessions
    const sessions = await service.listSessions();

    return {
      ok: true,
      message: \"Attendance service reachable\",
      timestamp: new Date().toISOString(),
      raw: { count: sessions.length },
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err.message || \"Attendance service unreachable\",
      timestamp: new Date().toISOString(),
    };
  }
}