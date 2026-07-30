import { useState, useCallback, useEffect } from "react";
import type { Board } from "../types/index";
import {
  getBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
} from "../services/api";
import { asyncAction } from "../lib/asyncAction";

interface UseBoardsState {
  boards: Board[];
  selectedBoard: Board | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook responsible ONLY for board CRUD.
 * Single Responsibility: boards state + board API calls.
 */
export function useBoards(onBoardLoaded?: (boardId: string) => void) {
  const [state, setState] = useState<UseBoardsState>({
    boards: [],
    selectedBoard: null,
    isLoading: false,
    error: null,
  });

  const loadBoards = useCallback(() => {
    return asyncAction(setState, () => getBoards(), {
      onSuccess: (res) => ({
        boards: (res.data ?? []) as Board[],
      }),
    });
  }, []);

  const loadBoard = useCallback((boardId: string) => {
    return asyncAction(setState, () => getBoardById(boardId), {
      onSuccess: (res) => ({
        selectedBoard: (res.data ?? null) as Board | null,
      }),
    }).then(() => {
      // After board loads, trigger card loading
      onBoardLoaded?.(boardId);
    });
  }, [onBoardLoaded]);

  const addBoard = useCallback(
    (title: string, description?: string) => {
      return asyncAction(
        setState,
        () => createBoard({ title, description }),
        {
          onSuccess: (res, prev) => {
            const board = res.data as Board;
            return {
              boards: [...prev.boards, board],
            };
          },
        }
      );
    },
    []
  );

  const modifyBoard = useCallback(
    (boardId: string, title?: string, description?: string) => {
      return asyncAction(
        setState,
        () => updateBoard(boardId, { title, description }),
        {
          onSuccess: (res, prev) => {
            const updated = res.data as Board;
            return {
              boards: prev.boards.map((b) =>
                b.id === boardId ? updated : b
              ),
              selectedBoard:
                prev.selectedBoard?.id === boardId
                  ? updated
                  : prev.selectedBoard,
            };
          },
        }
      );
    },
    []
  );

  const removeBoard = useCallback((boardId: string) => {
    return asyncAction(setState, () => deleteBoard(boardId), {
      onSuccess: (_data, prev) => ({
        boards: prev.boards.filter((b) => b.id !== boardId),
        selectedBoard:
          prev.selectedBoard?.id === boardId ? null : prev.selectedBoard,
      }),
    });
  }, []);

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  return {
    ...state,
    loadBoards,
    loadBoard,
    addBoard,
    modifyBoard,
    removeBoard,
  };
}
