/**
 * Application Configuration
 * Centralized configuration management for environment variables
 */

const getEnvVariable = (key: string, defaultValue: string = ""): string => {
  const value = import.meta.env[`VITE_${key}`];
  if (!value && !defaultValue) {
    console.warn(`Environment variable VITE_${key} is not set`);
  }
  return (value as string) || defaultValue;
};

export const config = {
  // API Configuration
  api: {
    baseURL: getEnvVariable("API_URL", "http://localhost:3000"),
    timeout: parseInt(getEnvVariable("API_TIMEOUT", "30000"), 10),
  },

  // Feature Flags
  features: {
    analyticsEnabled: getEnvVariable("ENABLE_ANALYTICS", "false") === "true",
    debugMode: getEnvVariable("ENABLE_DEBUG_MODE", "false") === "true",
  },

  // App Configuration
  app: {
    name: getEnvVariable("APP_NAME", "FarmFIT"),
    version: getEnvVariable("APP_VERSION", "1.0.0"),
  },

  // Environment
  env: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

export default config;
