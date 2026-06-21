//
// Payments Module — Health Check
// Verifies connectivity to the active payment provider.
//

import { createPaymentsService } from "./service-factory";
import { PaymentResponse } from "./types";

export interface PaymentsHealthStatus {
  ok: boolean;
  provider: string;
  message: string;
  timestamp: string;
  raw?: any;
}

export async function checkPaymentsHealth(): Promise<PaymentsHealthStatus> {
  const service = createPaymentsService();

  try {
    // We use a fake reference or minimal request depending on provider behavior
    const response: PaymentResponse = await service.status(\"__health_check__\");

    return {
      ok: response.status !== \"failed\",
      provider: response.provider,
      message: response.message || \"Payments provider reachable\",
      timestamp: new Date().toISOString(),
      raw: response.raw,
    };
  } catch (err: any) {
    return {
      ok: false,
      provider: \"unknown\",
      message: err.message || \"Payments provider unreachable\",
      timestamp: new Date().toISOString(),
    };
  }
}

