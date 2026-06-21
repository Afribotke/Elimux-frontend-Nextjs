//
// ETIMS Logger
// Centralized logging utility for ETIMS operations.
//

type LogLevel = "info" | "warn" | "error";

const isProduction = process.env.NODE_ENV === "production";

export function etimsLog(level: LogLevel, message: string, data?: any) {
  if (isProduction && level === "info") {
    // Avoid noisy logs in production
    return;
  }

  const logEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(data ? { data } : {}),
  };

  if (level === "error") {
    console.error("[ETIMS]", logEntry);
  } else if (level === "warn") {
    console.warn("[ETIMS]", logEntry);
  } else {
    console.log("[ETIMS]", logEntry);
  }
}

export const etimsInfo = (msg: string, data?: any) =>
  etimsLog("info", msg, data);

export const etimsWarn = (msg: string, data?: any) =>
  etimsLog("warn", msg, data);

export const etimsError = (msg: string, data?: any) =>
  etimsLog("error", msg, data);