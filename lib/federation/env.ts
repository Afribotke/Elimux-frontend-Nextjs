//
// Federation Module — Environment Loader
// Centralizes and types federation-related environment configuration.
//

export interface FederationEnvConfig {
  federationBaseUrl?: string;
  timeoutMs: number;
  retries: number;
}

function getEnv(name: string): string | undefined {
  return process.env[name];
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(\Missing required environment variable: \\);
  }
  return value;
}

/**
 * Loads federation environment configuration.
 * strict=true will throw if required values are missing.
 */
export function loadFederationEnv(strict: boolean = false): FederationEnvConfig {
  const timeoutMs = Number(process.env.FEDERATION_TIMEOUT_MS || 10000);
  const retries = Number(process.env.FEDERATION_RETRIES || 1);

  const baseUrl = strict
    ? requireEnv("FEDERATION_BASE_URL")
    : getEnv("FEDERATION_BASE_URL");

  return {
    federationBaseUrl: baseUrl,
    timeoutMs,
    retries,
  };
}