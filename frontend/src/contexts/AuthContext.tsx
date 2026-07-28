import React, { createContext, useState, useCallback, ReactNode } from "react";
import type { User, LoginPayload, RegisterPayload, AuthResponse } from "../types/index";
import { loginUser, registerUser } from "../services/api";
import type { ApiResponse } from "../types/index";

// ---- Token persistence (SRP: storage concern separated from auth logic) ----
const TOKEN_KEY = "authToken";

const tokenStorage = {
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  set(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },
  remove(): void {
    localStorage.removeItem(TOKEN_KEY);
  },
};

// ---- State shape (single object — consistent with useBoards/useCards/asyncAction) ----
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// ---- Public context interface ----
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });

  /**
   * DRY: single authenticate method shared by login and register.
   * The only difference is which API function is called and the failure message.
   */
  const authenticate = useCallback(
    async (
      action: () => Promise<ApiResponse<AuthResponse>>,
      failureMessage: string,
    ) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await action();
        if (response.data?.user) {
          setState((prev) => ({ ...prev, user: response.data!.user }));
          if (response.data.token) {
            tokenStorage.set(response.data.token);
          }
        } else {
          throw new Error(failureMessage);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : failureMessage;
        setState((prev) => ({ ...prev, error: message }));
        throw err;
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [],
  );

  const login = useCallback(
    (payload: LoginPayload) =>
      authenticate(() => loginUser(payload), "Login failed"),
    [authenticate],
  );

  const register = useCallback(
    (payload: RegisterPayload) =>
      authenticate(() => registerUser(payload), "Registration failed"),
    [authenticate],
  );

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, user: null }));
    tokenStorage.remove();
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
