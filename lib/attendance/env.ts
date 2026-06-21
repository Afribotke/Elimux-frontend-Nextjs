//
// Attendance Module — Environment Loader
// Centralizes and types attendance-related environment configuration.
//

export interface AttendanceEnvConfig {
  attendanceBaseUrl?: string;
  timeoutMs: number;
  retries: number;
}

function getEnv(name: string): string | undefined {
  return process.env[name];
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(\Missing required environment variable: \\);
  }
  return value;
}

/**
 * Loads attendance environment configuration.
 * strict=true will throw if required values are missing.
 */
export function loadAttendanceEnv(strict: boolean = false): AttendanceEnvConfig {
  const timeoutMs = Number(process.env.ATTENDANCE_TIMEOUT_MS || 10000);
  const retries = Number(process.env.ATTENDANCE_RETRIES || 1);

  const baseUrl = strict
    ? requireEnv("ATTENDANCE_BASE_URL")
    : getEnv("ATTENDANCE_BASE_URL");

  return {
    attendanceBaseUrl: baseUrl,
    timeoutMs,
    retries,
  };
}

