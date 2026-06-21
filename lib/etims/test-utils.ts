//
// ETIMS Test Utilities
// Provides mock clients and helpers for unit testing.
//

import {
  SAMPLE_ETIMS_PAYLOAD,
  SAMPLE_ETIMS_SUCCESS_RESPONSE,
  SAMPLE_ETIMS_FAILED_RESPONSE,
} from "./mock-data";
import { EtimsSubmissionResponse } from "./types";

export class MockEtimsClient {
  mode: "success" | "fail" | "pending" = "success";

  setSuccess() {
    this.mode = "success";
  }

  setFailure() {
    this.mode = "fail";
  }

  setPending() {
    this.mode = "pending";
  }

  async submitInvoice(): Promise<EtimsSubmissionResponse> {
    if (this.mode === "success") return SAMPLE_ETIMS_SUCCESS_RESPONSE;
    if (this.mode === "fail") return SAMPLE_ETIMS_FAILED_RESPONSE;

    return {
      status: "pending",
      etims_receipt_number: undefined,
      message: "Invoice is still being processed",
      timestamp: new Date().toISOString(),
      raw_response: { code: "102", description: "PENDING" },
    };
  }

  async checkStatus(): Promise<EtimsSubmissionResponse> {
    return this.submitInvoice();
  }
}

export const createMockPayload = () => SAMPLE_ETIMS_PAYLOAD;
