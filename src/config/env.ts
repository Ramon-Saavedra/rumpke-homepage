const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_API_URL',
] as const;

function validateEnv(): void {
  const missingVars: string[] = [];

  for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingVars.map(v => `  - ${v}`).join('\n')}\n\n` +
      'Please check your .env.local file and ensure all required variables are set.\n' +
      'See .env.example for reference.'
    );
  }
}

function parseEnvInt(value: string | undefined, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

function parseEnvBoolean(value: string | undefined): boolean {
  return value === 'true';
}

function parseEnvFloat(value: string | undefined, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

if (typeof window === 'undefined') {
  validateEnv();
}

export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  API_TIMEOUT: parseEnvInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 30000),
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_TEST: process.env.NODE_ENV === 'test',
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
  ENABLE_ANALYTICS: parseEnvBoolean(process.env.NEXT_PUBLIC_ENABLE_ANALYTICS),
  ENABLE_ERROR_TRACKING: parseEnvBoolean(process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING),
  MAP_CENTER_LAT: parseEnvFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LAT, 50.0),
  MAP_CENTER_LNG: parseEnvFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LNG, 8.0),
  MAP_ZOOM: parseEnvInt(process.env.NEXT_PUBLIC_MAP_ZOOM, 13),
  ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3000/admin',
} as const;

export type EnvConfig = typeof ENV;

export function requireFeature(
  flag: boolean,
  feature: string
): void {
  if (!flag) {
    throw new Error(
      `Feature '${feature}' is not enabled. Check your environment configuration.`
    );
  }
}

export const isBrowser = typeof window !== 'undefined';
export const isServer = !isBrowser;
