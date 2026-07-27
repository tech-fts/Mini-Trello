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

// ============ AUTH ENDPOINTS ============

export function registerUser(
  payload: RegisterPayload
): Promise<ApiResponse<AuthResponse>> {
  return apiPost<AuthResponse>("/auth/register", payload);
}

export function loginUser(
  payload: LoginPayload
): Promise<ApiResponse<AuthResponse>> {
  return apiPost<AuthResponse>("/auth/login", payload);
}

// ============ BOARD ENDPOINTS ============

export function getBoards(): Promise<ApiResponse<Board[]>> {
  return apiGet<Board[]>("/boards");
}

export function createBoard(
  payload: CreateBoardPayload
): Promise<ApiResponse<Board>> {
  return apiPost<Board>("/boards", payload);
}

export function getBoardById(id: string): Promise<ApiResponse<Board>> {
  return apiGet<Board>(`/boards/${id}`);
}

export function updateBoard(
  id: string,
  payload: UpdateBoardPayload
): Promise<ApiResponse<Board>> {
  return apiPut<Board>(`/boards/${id}`, payload);
}

export function deleteBoard(id: string): Promise<ApiResponse<void>> {
  return apiDelete<void>(`/boards/${id}`);
}

// ============ CARD ENDPOINTS ============

export function getCardById(id: string): Promise<ApiResponse<Card>> {
  return apiGet<Card>(`/cards/${id}`);
}

export function updateCardPosition(
  id: string,
  payload: UpdateCardPositionPayload
): Promise<ApiResponse<Card>> {
  return apiPut<Card>(`/cards/${id}/position`, payload);
}
