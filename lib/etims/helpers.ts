//
// ETIMS Helper Utilities
// Small reusable functions used across the ETIMS module.
//

/**
 * Formats a timestamp into ISO string.
 */
export function formatTimestamp(date: Date | string): string {
  try {
    return new Date(date).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Safely parses JSON without throwing.
 */
export function safeJsonParse<T = any>(value: any): T | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * Deep clone utility for raw ETIMS responses.
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Returns true if ETIMS is running in mock mode.
 */
export function isMockMode(): boolean {
  return process.env.ETIMS_MOCK === "true";
}

/**
 * Generates a random ETIMS receipt number for mock mode.
 */
export function generateMockReceipt(): string {
  return `ETR-${Date.now()}`;
}
