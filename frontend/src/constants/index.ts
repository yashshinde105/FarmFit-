/**
 * Application Constants
 * Centralized constants for the application
 */

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ACCOUNT_CREATED: "/account-created",
  LOGGED_OUT: "/logged-out",
  UPLOAD: "/upload",
  ABOUT: "/about",
  CONTACT: "/contact",
  DASHBOARD: "/dashboard",
  CROP_HEALTH: "/crop-health",
  LIVE_ALERTS: "/live-alerts",
  WEATHER: "/weather",
  ENVIRONMENTAL_CONDITIONS: "/EnvironmentalConditions",
} as const;

export const QUERY_STALE_TIMES = {
  SHORT: 1 * 60 * 1000, // 1 minute
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 10 * 60 * 1000, // 10 minutes
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;
