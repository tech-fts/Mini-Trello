import type { Dispatch, SetStateAction } from "react";

/**
 * DRY wrapper for async operations in stateful hooks.
 *
 * Eliminates the duplicated pattern found 6+ times across the codebase:
 *   setLoading(true); setError(null); try { ... } catch { setError(msg) } finally { setLoading(false) }
 *
 * `onSuccess` can be either:
 *   - a plain Partial<TState> (when the update doesn't depend on previous state)
 *   - a function (prev: TState) => Partial<TState> (when computing the update from previous state)
 *
 * Usage:
 *   // Simple
 *   await asyncAction(setState, () => apiCall(), {
 *     onSuccess: { boards: result.data },
 *   });
 *
 *   // Functional updater (needs prev state)
 *   await asyncAction(setState, () => apiCall(), {
 *     onSuccess: (data, prev) => ({ boards: [...prev.boards, data] }),
 *   });
 */
export async function asyncAction<TData, TState>(
  setState: Dispatch<SetStateAction<TState>>,
  action: () => Promise<TData | undefined>,
  callbacks: {
    onStart?: Partial<TState>;
    onSuccess:
      | Partial<TState>
      | ((data: TData, prev: TState) => Partial<TState>);
    onError?: (message: string) => Partial<TState>;
  }
): Promise<TData | undefined> {
  const startPatch = callbacks.onStart ?? {};
  setState((prev) => {
    const merged: TState = { ...prev, ...startPatch } as unknown as TState;
    return { ...merged, isLoading: true, error: null } as unknown as TState;
  });

  try {
    const data = await action();
    if (data !== undefined) {
      setState((prev) => {
        const patch =
          typeof callbacks.onSuccess === "function"
            ? (callbacks.onSuccess as (d: TData, p: TState) => Partial<TState>)(data, prev)
            : callbacks.onSuccess;
        return { ...prev, ...patch, isLoading: false } as unknown as TState;
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }) as unknown as TState);
    }
    return data;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Operation failed";
    setState((prev) => ({
      ...prev,
      ...(callbacks.onError?.(message) ?? { error: message }),
      isLoading: false,
    }) as unknown as TState);
    throw err;
  }
}
