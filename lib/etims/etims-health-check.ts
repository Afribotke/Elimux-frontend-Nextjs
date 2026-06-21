//
// ETIMS Health Check Utility
// Allows the system to verify ETIMS connectivity and API readiness.
//

import { etimsHttpRequest } from "./etims-http";
import { ETIMS_ENDPOINTS } from "./constants";
import { etimsError, etimsInfo } from "./logger";

export interface EtimsHealthStatus {
  ok: boolean;
  message: string;
  timestamp: string;
  raw?: any;
}

export async function checkEtimsHealth(): Promise<EtimsHealthStatus> {
  try {
    etimsInfo("Performing ETIMS health check");

    const response = await etimsHttpRequest<any>(
      ETIMS_ENDPOINTS.CHECK_STATUS,
      {
        method: "POST",
        body: JSON.stringify({ invoiceNumber: "__health_check__" }),
      }
    );

    return {
      ok: true,
      message: "ETIMS is reachable",
      timestamp: new Date().toISOString(),
      raw: response,
    };
  } catch (err: any) {
    etimsError("ETIMS health check failed", { error: err.message });

    return {
      ok: false,
      message: "ETIMS is unreachable or returned an error",
      timestamp: new Date().toISOString(),
    };
  }
}



