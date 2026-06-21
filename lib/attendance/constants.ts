//
// Attendance Module — Constants
// Shared constants for attendance sessions and records.
//

export const ATTENDANCE_SESSION_TYPES = [
  \"training\",
  \"match\",
  \"event\",
  \"meeting\",
] as const;

export const ATTENDANCE_STATUSES = [
  \"present\",
  \"absent\",
  \"late\",
  \"excused\",
] as const;

export const ATTENDANCE_DEFAULTS = {
  AUTO_CREATE_RECORDS: true,
  ALLOW_LATE_CHECKIN: true,
  MAX_LATE_MINUTES: 15,
};
