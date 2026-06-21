//
// Attendance Module — Service Factory
// Creates an AttendanceService instance with environment-based configuration.
//

import { AttendanceService } from "./service";
import { loadAttendanceEnv } from "./env";

export function createAttendanceService(): AttendanceService {
  const env = loadAttendanceEnv();

  // Base path can be overridden by environment if needed
  const basePath = env.attendanceBaseUrl
    ? \"\"
    : \"/attendance\";

  return new AttendanceService(basePath);
}
