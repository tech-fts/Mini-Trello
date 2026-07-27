import {
  LoginPayload,
  RegisterPayload,
  CreateBoardPayload,
  UpdateBoardPayload,
  UpdateCardPositionPayload,
  Board,
  Card,
  AuthResponse,
  ApiResponse,
} from "../types/index";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : "Unknown error",
        status: 0,
      },
      status: 0,
    };
  }
}

// Health check
export async function healthCheck(): Promise<ApiResponse<{ status: string }>> {
  return apiCall("/");
}

// ============ AUTH ENDPOINTS ============
export async function registerUser(
  payload: RegisterPayload
): Promise<ApiResponse<AuthResponse>> {
  return apiCall("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(
  payload: LoginPayload
): Promise<ApiResponse<AuthResponse>> {
  return apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ============ BOARD ENDPOINTS ============
export async function getBoards(): Promise<ApiResponse<Board[]>> {
  return apiCall("/boards");
}

export async function createBoard(
  payload: CreateBoardPayload
): Promise<ApiResponse<Board>> {
  return apiCall("/boards", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getBoardById(id: string): Promise<ApiResponse<Board>> {
  return apiCall(`/boards/${id}`);
}

export async function updateBoard(
  id: string,
  payload: UpdateBoardPayload
): Promise<ApiResponse<Board>> {
  return apiCall(`/boards/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteBoard(id: string): Promise<ApiResponse<void>> {
  return apiCall(`/boards/${id}`, {
    method: "DELETE",
  });
}

// ============ CARD ENDPOINTS ============
export async function getCardById(id: string): Promise<ApiResponse<Card>> {
  return apiCall(`/cards/${id}`);
}

export async function updateCardPosition(
  id: string,
  payload: UpdateCardPositionPayload
): Promise<ApiResponse<Card>> {
  return apiCall(`/cards/${id}/position`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
