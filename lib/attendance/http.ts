//
// Attendance Module — HTTP Utility
// Centralized HTTP client for attendance-related operations.
//

import { loadAttendanceEnv } from "./env";

export interface AttendanceHttpOptions extends RequestInit {
  baseUrl?: string;
  timeoutMs?: number;
  retries?: number;
}

export async function attendanceHttpRequest<T>(
  endpoint: string,
  options: AttendanceHttpOptions = {}
): Promise<T> {
  const env = loadAttendanceEnv();
  const baseUrl = options.baseUrl || env.attendanceBaseUrl || "";
  const timeoutMs = options.timeoutMs ?? env.timeoutMs;
  const retries = options.retries ?? env.retries;

  if (!baseUrl) {
    throw new Error("Missing ATTENDANCE_BASE_URL for attendance HTTP request");
  }

  const url = \\\\;
  let attempts = 0;

  while (attempts <= retries) {
    attempts++;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(\Attendance request failed with status \: \\);
      }

      const data = await response.json();
      return data as T;
    } catch (err) {
      if (attempts > retries) {
        throw err;
      }
    }
  }

  throw new Error("Attendance request failed unexpectedly");
}



