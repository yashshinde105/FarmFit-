/**
 * Common Type Definitions
 * Shared types across the application
 */

// API Response types
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "farmer";
  createdAt: Date;
}

// Form submission state
export interface FormState {
  isSubmitting: boolean;
  error?: string;
  success?: boolean;
}

// Async operation state
export interface AsyncState<T = unknown> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

// Common component props
export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}
