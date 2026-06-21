//
// ETIMS Environment Loader
// Ensures required ETIMS environment variables are present and typed.
//

export interface EtimsEnvConfig {
  baseUrl: string;
  apiKey?: string;
  mockMode: boolean;
  timeoutMs: number;
  retries: number;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(\Missing required environment variable: \\);
  }
  return value;
}

export function loadEtimsEnv(): EtimsEnvConfig {
  return {
    baseUrl: requireEnv("ETIMS_BASE_URL"),
    apiKey: process.env.ETIMS_API_KEY,
    mockMode: process.env.ETIMS_MOCK === "true",
    timeoutMs: Number(process.env.ETIMS_TIMEOUT_MS || 10000),
    retries: Number(process.env.ETIMS_RETRIES || 1),
  };
}

