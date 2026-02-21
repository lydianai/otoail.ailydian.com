/**
 * @fileoverview Enterprise-grade API Type Definitions
 * @module types/api
 * @description Production-ready Result pattern and error handling types
 * @version 1.0.0
 */

/**
 * Success result type
 */
export interface Success<T> {
  readonly success: true;
  readonly data: T;
  readonly metadata?: {
    readonly timestamp: Date;
    readonly requestId?: string;
    readonly duration?: number;
  };
}

/**
 * Failure result type with detailed error information
 */
export interface Failure<E extends Error = Error> {
  readonly success: false;
  readonly error: E;
  readonly metadata?: {
    readonly timestamp: Date;
    readonly requestId?: string;
    readonly duration?: number;
  };
}

/**
 * Result type - represents either success or failure
 * Based on functional programming Result/Either pattern
 */
export type Result<T, E extends Error = Error> = Success<T> | Failure<E>;

/**
 * Base error class for all application errors
 */
export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  readonly timestamp: Date;
  readonly context?: Record<string, unknown>;

  constructor(message: string, context?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error - 400 Bad Request
 */
export class ValidationError extends AppError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;
  readonly errors: ReadonlyArray<{
    readonly field: string;
    readonly message: string;
    readonly code: string;
  }>;

  constructor(
    errors: ReadonlyArray<{ field: string; message: string; code: string }>,
    context?: Record<string, unknown>
  ) {
    super('Validation failed', context);
    this.errors = errors;
  }
}

/**
 * Authentication error - 401 Unauthorized
 */
export class AuthenticationError extends AppError {
  readonly code = 'AUTHENTICATION_ERROR';
  readonly statusCode = 401;

  constructor(message = 'Authentication required', context?: Record<string, unknown>) {
    super(message, context);
  }
}

/**
 * Authorization error - 403 Forbidden
 */
export class AuthorizationError extends AppError {
  readonly code = 'AUTHORIZATION_ERROR';
  readonly statusCode = 403;

  constructor(message = 'Insufficient permissions', context?: Record<string, unknown>) {
    super(message, context);
  }
}

/**
 * Not found error - 404 Not Found
 */
export class NotFoundError extends AppError {
  readonly code = 'NOT_FOUND';
  readonly statusCode = 404;
  readonly resource: string;

  constructor(resource: string, context?: Record<string, unknown>) {
    super(`${resource} not found`, context);
    this.resource = resource;
  }
}

/**
 * Conflict error - 409 Conflict
 */
export class ConflictError extends AppError {
  readonly code = 'CONFLICT';
  readonly statusCode = 409;

  constructor(message: string, context?: Record<string, unknown>) {
    super(message, context);
  }
}

/**
 * Rate limit error - 429 Too Many Requests
 */
export class RateLimitError extends AppError {
  readonly code = 'RATE_LIMIT_EXCEEDED';
  readonly statusCode = 429;
  readonly retryAfter?: number;

  constructor(retryAfter?: number, context?: Record<string, unknown>) {
    super('Rate limit exceeded', context);
    this.retryAfter = retryAfter;
  }
}

/**
 * Server error - 500 Internal Server Error
 */
export class ServerError extends AppError {
  readonly code = 'SERVER_ERROR';
  readonly statusCode = 500;

  constructor(message = 'Internal server error', context?: Record<string, unknown>) {
    super(message, context);
  }
}

/**
 * Network error - connection issues
 */
export class NetworkError extends AppError {
  readonly code = 'NETWORK_ERROR';
  readonly statusCode = 0;

  constructor(message = 'Network connection failed', context?: Record<string, unknown>) {
    super(message, context);
  }
}

/**
 * Timeout error
 */
export class TimeoutError extends AppError {
  readonly code = 'TIMEOUT_ERROR';
  readonly statusCode = 408;
  readonly timeoutMs: number;

  constructor(timeoutMs: number, context?: Record<string, unknown>) {
    super(`Request timeout after ${timeoutMs}ms`, context);
    this.timeoutMs = timeoutMs;
  }
}

/**
 * API request configuration
 */
export interface APIConfig {
  readonly baseURL?: string;
  readonly timeout?: number;
  readonly headers?: Record<string, string>;
  readonly retries?: number;
  readonly retryDelay?: number;
}

/**
 * Retry options for exponential backoff
 */
export interface RetryOptions {
  readonly maxRetries: number;
  readonly initialDelay: number;
  readonly maxDelay: number;
  readonly backoffMultiplier: number;
  readonly shouldRetry?: (error: Error, attempt: number) => boolean;
}

/**
 * Default retry options
 */
export const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  shouldRetry: (error: Error, attempt: number) => {
    // Retry on network errors and 5xx server errors
    if (error instanceof NetworkError) return true;
    if (error instanceof ServerError) return true;
    if (error instanceof TimeoutError) return true;
    // Don't retry on client errors (4xx)
    return false;
  },
};

/**
 * Helper to create success result
 */
export const success = <T>(data: T, metadata?: Success<T>['metadata']): Success<T> => ({
  success: true,
  data,
  metadata: metadata ?? { timestamp: new Date() },
});

/**
 * Helper to create failure result
 */
export const failure = <E extends Error>(
  error: E,
  metadata?: Failure<E>['metadata']
): Failure<E> => ({
  success: false,
  error,
  metadata: metadata ?? { timestamp: new Date() },
});

/**
 * Type guard for success result
 */
export const isSuccess = <T, E extends Error>(
  result: Result<T, E>
): result is Success<T> => result.success === true;

/**
 * Type guard for failure result
 */
export const isFailure = <T, E extends Error>(
  result: Result<T, E>
): result is Failure<E> => result.success === false;
