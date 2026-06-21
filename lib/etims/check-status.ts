import { EtimsClient } from "./client";
import { EtimsSubmissionResponse, EtimsStatus } from "./types";

/**
 * checkEtimsStatus
 * ----------------
 * Queries ETIMS for the current status of an invoice.
 * This is used for:
 * - Polling after submission
 * - Manual 'Check Status' actions
 * - Background reconciliation jobs
 */
export async function checkEtimsStatus(
  client: EtimsClient,
  invoiceNumber: string
): Promise<EtimsSubmissionResponse> {
  try {
    const response = await client.request<EtimsSubmissionResponse>(
      \/checkStatus?invoice_number=\\,
      { method: "GET" }
    );

    return {
      ...response,
      raw_response: response,
    };
  } catch (err: any) {
    return {
      status: "failed",
      message: err?.message || "Failed to check ETIMS status",
      timestamp: new Date().toISOString(),
      raw_response: err,
    };
  }
}

/**
 * isFinalEtimsStatus
 * ------------------
 * Helper to determine if ETIMS has reached a final state.
 */
export function isFinalEtimsStatus(status: EtimsStatus): boolean {
  return status === "success" || status === "failed";
}