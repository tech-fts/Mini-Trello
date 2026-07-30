// User types
export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

// Board types
export interface Board {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBoardPayload {
  title: string;
  description?: string;
}

export interface UpdateBoardPayload {
  title?: string;
  description?: string;
}

// Card types
export interface Card {
  id: string;
  title: string;
  description?: string;
  position: number;
  columnId: string;
  boardId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateCardPositionPayload {
  position: number;
  columnId?: string;
}

export interface CreateCardPayload {
  boardId: string;
  columnId: string;
  title: string;
  description?: string;
  position?: number;
}

export interface UpdateCardPayload {
  title?: string;
  description?: string;
}

// API Response types
export interface ApiError {
  message: string;
  status: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  status: number;
}
