//
// ETIMS Configuration Layer
// -------------------------
// Centralizes all ETIMS environment variables and defaults.
//

export interface EtimsConfig {
  baseUrl: string;
  apiKey?: string;
  mock: boolean;
  timeoutMs: number;
  retries: number;
}

export function getEtimsConfig(): EtimsConfig {
  return {
    baseUrl: process.env.ETIMS_BASE_URL || \"https://mock-etims.local\",
    apiKey: process.env.ETIMS_API_KEY,
    mock: process.env.ETIMS_MOCK === \"true\",
    timeoutMs: Number(process.env.ETIMS_TIMEOUT_MS || 10000),
    retries: Number(process.env.ETIMS_RETRIES || 1),
  };
}
