//
// ETIMS Client
// Thin wrapper around etimsHttpRequest for ETIMS-specific endpoints.
//

import { etimsHttpRequest } from "./etims-http";
import { EtimsInvoicePayload, EtimsSubmissionResponse } from "./types";
import { ETIMS_ENDPOINTS } from "./constants";

export class EtimsClient {
  async submitInvoice(
    payload: EtimsInvoicePayload
  ): Promise<EtimsSubmissionResponse> {
    return etimsHttpRequest<EtimsSubmissionResponse>(
      ETIMS_ENDPOINTS.SUBMIT_INVOICE,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  async checkStatus(
    invoiceNumber: string
  ): Promise<EtimsSubmissionResponse> {
    return etimsHttpRequest<EtimsSubmissionResponse>(
      ETIMS_ENDPOINTS.CHECK_STATUS,
      {
        method: "POST",
        body: JSON.stringify({ invoiceNumber }),
      }
    );
  }
}