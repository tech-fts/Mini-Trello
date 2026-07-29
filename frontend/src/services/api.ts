import { apiGet, apiPost, apiPut, apiDelete } from "./apiClient";
import type {
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

/**
 * All API paths use the /api prefix so they work through the Vite proxy
 * in development AND against a direct backend URL in production.
 */

// ============ AUTH ENDPOINTS ============

export function registerUser(
  payload: RegisterPayload,
): Promise<ApiResponse<AuthResponse>> {
  return apiPost<AuthResponse>("/api/auth/register", payload);
}

export function loginUser(
  payload: LoginPayload,
): Promise<ApiResponse<AuthResponse>> {
  return apiPost<AuthResponse>("/api/auth/login", payload);
}

// ============ BOARD ENDPOINTS ============

export function getBoards(): Promise<ApiResponse<Board[]>> {
  return apiGet<Board[]>("/api/boards");
}

export function createBoard(
  payload: CreateBoardPayload,
): Promise<ApiResponse<Board>> {
  return apiPost<Board>("/api/boards", payload);
}

export function getBoardById(id: string): Promise<ApiResponse<Board>> {
  return apiGet<Board>(`/api/boards/${id}`);
}

export function updateBoard(
  id: string,
  payload: UpdateBoardPayload,
): Promise<ApiResponse<Board>> {
  return apiPut<Board>(`/api/boards/${id}`, payload);
}

export function deleteBoard(id: string): Promise<ApiResponse<void>> {
  return apiDelete<void>(`/api/boards/${id}`);
}

// ============ CARD ENDPOINTS ============

export function getCardById(id: string): Promise<ApiResponse<Card>> {
  return apiGet<Card>(`/api/cards/${id}`);
}

export function updateCardPosition(
  id: string,
  payload: UpdateCardPositionPayload,
): Promise<ApiResponse<Card>> {
  return apiPut<Card>(`/api/cards/${id}/position`, payload);
}
