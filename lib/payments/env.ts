//
// Payments Module — Environment Loader
// Ensures required payment environment variables are present and typed.
//

export interface PaymentsEnvConfig {
  mpesaBaseUrl?: string;
  mpesaConsumerKey?: string;
  mpesaConsumerSecret?: string;
  mpesaShortCode?: string;
  mpesaPasskey?: string;
  cardProviderBaseUrl?: string;
  cardProviderApiKey?: string;
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

export function loadPaymentsEnv(strict: boolean = false): PaymentsEnvConfig {
  const timeoutMs = Number(process.env.PAYMENTS_TIMEOUT_MS || 15000);
  const retries = Number(process.env.PAYMENTS_RETRIES || 1);

  return {
    mpesaBaseUrl: strict ? requireEnv("MPESA_BASE_URL") : getEnv("MPESA_BASE_URL"),
    mpesaConsumerKey: strict ? requireEnv("MPESA_CONSUMER_KEY") : getEnv("MPESA_CONSUMER_KEY"),
    mpesaConsumerSecret: strict ? requireEnv("MPESA_CONSUMER_SECRET") : getEnv("MPESA_CONSUMER_SECRET"),
    mpesaShortCode: getEnv("MPESA_SHORT_CODE"),
    mpesaPasskey: getEnv("MPESA_PASSKEY"),
    cardProviderBaseUrl: getEnv("CARD_PROVIDER_BASE_URL"),
    cardProviderApiKey: getEnv("CARD_PROVIDER_API_KEY"),
    timeoutMs,
    retries,
  };
}
