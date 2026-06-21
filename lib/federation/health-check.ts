//
// Federation Module — Health Check
// Verifies connectivity to the federation backend or provider.
//

import { createFederationService } from "./service-factory";

export interface FederationHealthStatus {
  ok: boolean;
  message: string;
  timestamp: string;
  raw?: any;
}

export async function checkFederationHealth(): Promise<FederationHealthStatus> {
  const service = createFederationService();

  try {
    // Lightweight call — list federations
    const federations = await service.listFederations();

    return {
      ok: true,
      message: \"Federation service reachable\",
      timestamp: new Date().toISOString(),
      raw: { count: federations.length },
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err.message || \"Federation service unreachable\",
      timestamp: new Date().toISOString(),
    };
  }
}



