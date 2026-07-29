import axios from "axios";
import type { ApiResponse } from "../types/index";

/**
 * API base URL.
 *
 * In development (Vite proxy at /api → backend), use "" — relative to the page.
 * When VITE_API_URL is set, use it directly (production or custom backend).
 *
 * DRY: Auth token attachment, error normalization, and base URL live here once.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

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
      return Promise.reject({
        data: undefined,
        error: {
          message: error.response.data?.error || error.message,
          status: error.response.status,
        },
        status: error.response.status,
      });
    }
    return Promise.reject(error);
  },
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
  body?: unknown,
): Promise<ApiResponse<T>> {
  const response = await apiClient.post<T>(url, body);
  return { data: response.data, status: response.status };
}

/**
 * Generic PUT helper.
 */
export async function apiPut<T>(
  url: string,
  body?: unknown,
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
