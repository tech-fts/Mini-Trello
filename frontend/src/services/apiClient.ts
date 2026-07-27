import axios from "axios";
import type { ApiResponse } from "../types/index";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

/**
 * Singleton axios instance pre-configured for the Mini-Trello API.
 *
 * SOLID: Open/Closed — extend via interceptors without modifying callers.
 * DRY:     Auth token attachment happens once here, not in every call site.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ---- Request interceptor: attach auth token ----
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Response interceptor: normalize into ApiResponse<T> shape ----
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      // Transform axios error into our ApiResponse shape so callers
      // can handle errors uniformly without catching separately.
      return Promise.reject({
        data: undefined,
        error: {
          message: error.response.data?.message || error.message,
          status: error.response.status,
        },
        status: error.response.status,
      });
    }
    return Promise.reject(error);
  }
);

/**
 * Generic GET helper that returns ApiResponse<T>.
 */
export async function apiGet<T>(url: string): Promise<ApiResponse<T>> {
  const response = await apiClient.get<T>(url);
  return { data: response.data, status: response.status };
}

/**
 * Generic POST helper.
 */
export async function apiPost<T>(
  url: string,
  body?: unknown
): Promise<ApiResponse<T>> {
  const response = await apiClient.post<T>(url, body);
  return { data: response.data, status: response.status };
}

/**
 * Generic PUT helper.
 */
export async function apiPut<T>(
  url: string,
  body?: unknown
): Promise<ApiResponse<T>> {
  const response = await apiClient.put<T>(url, body);
  return { data: response.data, status: response.status };
}

/**
 * Generic DELETE helper.
 */
export async function apiDelete<T>(url: string): Promise<ApiResponse<T>> {
  const response = await apiClient.delete<T>(url);
  return { data: response.data, status: response.status };
}
