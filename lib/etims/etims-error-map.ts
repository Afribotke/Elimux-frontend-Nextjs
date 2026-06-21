//
// ETIMS Error Mapping
// Converts ETIMS error codes into human-friendly messages and categories.
//

export interface EtimsErrorInfo {
  code: string;
  message: string;
  category: "validation" | "auth" | "network" | "server" | "unknown";
}

export const ETIMS_ERROR_MAP: Record<string, EtimsErrorInfo> = {
  // Validation errors
  "400": {
    code: "400",
    message: "Invalid ETIMS request payload",
    category: "validation",
  },
  "409": {
    code: "409",
    message: "Duplicate invoice detected",
    category: "validation",
  },

  // Authentication errors
  "401": {
    code: "401",
    message: "Unauthorized — invalid or missing API key",
    category: "auth",
  },
  "403": {
    code: "403",
    message: "Forbidden — access denied",
    category: "auth",
  },

  // Network/timeouts
  "408": {
    code: "408",
    message: "ETIMS request timed out",
    category: "network",
  },
  "503": {
    code: "503",
    message: "ETIMS service temporarily unavailable",
    category: "network",
  },

  // Server errors
  "500": {
    code: "500",
    message: "ETIMS internal server error",
    category: "server",
  },

  // Fallback
  DEFAULT: {
    code: "000",
    message: "Unknown ETIMS error",
    category: "unknown",
  },
};

/**
 * Maps an ETIMS error code to a friendly error object.
 */
export function mapEtimsError(code?: string): EtimsErrorInfo {
  if (!code) return ETIMS_ERROR_MAP.DEFAULT;
  return ETIMS_ERROR_MAP[code] || ETIMS_ERROR_MAP.DEFAULT;
}