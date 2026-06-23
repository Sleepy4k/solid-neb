const getApiBaseUrl = (): string => {
  return typeof window !== "undefined" ? (window.location.origin) : "http://localhost:3000";
};

export const API_ENDPOINTS = {
  BASE_URL: getApiBaseUrl(),
  FAQ: '/faq',
  SERVICES: '/service',
  CONTACT: '/contact',
  UPLOAD: '/seb',
} as const;

export const API_CONFIG = {
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

export const ENV = {
  isDevelopment: process.env.NODE_ENV !== "production",
  isProduction: process.env.NODE_ENV === "production",
  apiUrl: getApiBaseUrl(),
} as const;

export const logger = {
  log: (...args: any[]) => {
    if (ENV.isDevelopment) {
      console.log('[NEB]', ...args);
    }
  },
  error: (...args: any[]) => {
    if (ENV.isDevelopment) {
      console.error('[NEB ERROR]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (ENV.isDevelopment) {
      console.warn('[NEB WARNING]', ...args);
    }
  },
};

export default {
  API_ENDPOINTS,
  API_CONFIG,
  ENV,
  logger,
};
