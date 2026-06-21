import { EtimsInvoicePayload, EtimsSubmissionResponse, EtimsStatus } from "./types";

/**
 * mockSubmitInvoice
 * -----------------
 * Simulates ETIMS invoice submission.
 * Randomly returns success or failure.
 */
export async function mockSubmitInvoice(
  payload: EtimsInvoicePayload
): Promise<EtimsSubmissionResponse> {
  await delay(800); // simulate network latency

  const isSuccess = Math.random() > 0.2; // 80% success rate

  if (isSuccess) {
    return {
      status: "success",
      etims_receipt_number: \ETR-\\,
      message: "Invoice submitted successfully (mock)",
      timestamp: new Date().toISOString(),
      raw_response: payload,
    };
  }

  return {
    status: "failed",
    message: "Mock ETIMS error: Invalid buyer PIN",
    timestamp: new Date().toISOString(),
    raw_response: payload,
  };
}

/**
 * mockCheckStatus
 * ----------------
 * Simulates ETIMS status polling.
 */
export async function mockCheckStatus(
  invoiceNumber: string
): Promise<EtimsSubmissionResponse> {
  await delay(500);

  const statuses: EtimsStatus[] = ["pending", "success", "failed"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    status: randomStatus,
    etims_receipt_number:
      randomStatus === "success"
        ? \ETR-\\
        : undefined,
    message: \Mock ETIMS status for \\,
    timestamp: new Date().toISOString(),
    raw_response: { invoiceNumber, randomStatus },
  };
}

/**
 * Utility: delay
 */
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}