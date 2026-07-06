//server\src\utils\constants\env.ts

// src/utils/constants/env.ts
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
}

// Optional: validate numeric values
export function getEnvNumber(key: string, defaultValue?: number): number {
  const value = process.env[key];
  if (value === undefined && defaultValue !== undefined) return defaultValue;
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`❌ Environment variable ${key} must be a number`);
  }
  return num;
}

// Optional: validate boolean values
export function getEnvBoolean(key: string, defaultValue?: boolean): boolean {
  const value = process.env[key];
  if (value === undefined && defaultValue !== undefined) return defaultValue;
  return value === 'true' || value === '1';
}

// export const MONGO_URI = getEnv("MONGO_URI")
// export const PORT = getEnv("PORT","3000")
// export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET")
// export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET")
// export const ACCESS_TOKEN_EXPIRY_MIN = getEnv("ACCESS_TOKEN_EXPIRY_MIN")
// export const REFRESH_TOKEN_EXPIRY_DAY = Number(getEnv("REFRESH_TOKEN_EXPIRY_DAY"))
// export const EMAIL_USER = getEnv("EMAIL_USER")
// export const EMAIL_PASS = getEnv("EMAIL_PASS")
// export const APP_ORIGIN = getEnv("APP_ORIGIN")
// export const PASSWORD_SALT_ROUNDS = Number(getEnv("PASSWORD_SALT_ROUNDS", "10"))
// export const APP_NAME = getEnv("APP_NAME")
// export const REDIS_URL = getEnv("REDIS_URL")
