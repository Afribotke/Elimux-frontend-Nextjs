import { EtimsError } from "./types";

/**
 * A mapping of known ETIMS error codes to human-readable messages.
 * Extend this as you discover more ETIMS error patterns.
 */
export const ETIMS_ERROR_MAP: Record<string, string> = {
  \"400\": \"Invalid ETIMS request payload.\",
  \"401\": \"Unauthorized: Invalid or missing ETIMS API credentials.\",
  \"403\": \"Forbidden: Access to ETIMS endpoint denied.\",
  \"404\": \"ETIMS resource not found.\",
  \"408\": \"ETIMS request timed out.\",
  \"409\": \"Duplicate invoice submission detected.\",
  \"422\": \"Unprocessable ETIMS payload.\",
  \"500\": \"ETIMS internal server error.\",
  \"503\": \"ETIMS service temporarily unavailable.\",
};

/**
 * normalizeEtimsError
 * -------------------
 * Converts raw ETIMS errors into a consistent, UI-friendly structure.
 */
export function normalizeEtimsError(err: any): EtimsError {
  const code = String(err?.code || err?.status || \"unknown\");

  return {
    code,
    message: ETIMS_ERROR_MAP[code] || err?.message || \"Unknown ETIMS error.\",
    details: err?.details || err,
  };
}

/**
 * getEtimsUserMessage
 * -------------------
 * Returns a clean, user-facing message for UI notifications.
 */
export function getEtimsUserMessage(error: EtimsError): string {
  return ETIMS_ERROR_MAP[error.code] || error.message;
}

