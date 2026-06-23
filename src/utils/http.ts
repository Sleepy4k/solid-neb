import { API_CONFIG, logger } from '../config/api.config';

export interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const {
    timeout = API_CONFIG.timeout,
    retries = 0,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      return response;
    } catch (error: any) {
      lastError = error;

      if (error instanceof ApiError && error.statusCode && error.statusCode < 500) {
        throw error;
      }

      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408);
      }

      if (attempt < retries) {
        logger.warn(`Attempt ${attempt + 1} failed, retrying in ${retryDelay}ms...`);
        await sleep(retryDelay * (attempt + 1));
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw lastError || new ApiError('Unknown error occurred');
}

export async function get<T = any>(url: string, options?: FetchOptions): Promise<T> {
  const response = await fetchWithTimeout(url, {
    method: 'GET',
    ...options,
  });
  return response.json();
}

export async function post<T = any>(
  url: string,
  body?: any,
  options?: FetchOptions
): Promise<T> {
  const response = await fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: body instanceof FormData ? body : JSON.stringify(body),
    ...options,
  });
  return response.json();
}

export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  fallbackValue: T
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    logger.error('API call failed:', error);
    return fallbackValue;
  }
}

export default {
  fetchWithTimeout,
  get,
  post,
  safeApiCall,
  ApiError,
};
