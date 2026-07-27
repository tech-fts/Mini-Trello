import { useState, useCallback, useEffect } from "react";
import { Board, Card } from "../types/index";
import {
  getBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
  getCardById,
  updateCardPosition,
} from "../services/api";

interface UseKanbanState {
  boards: Board[];
  cards: Record<string, Card[]>;
  selectedBoard: Board | null;
  isLoading: boolean;
  error: string | null;
}

export function useKanban() {
  const [state, setState] = useState<UseKanbanState>({
    boards: [],
    cards: {},
    selectedBoard: null,
    isLoading: false,
    error: null,
  });

  // Load all boards
  const loadBoards = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await getBoards();
      if (response.data) {
        setState((prev) => ({
          ...prev,
          boards: response.data as Board[],
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Failed to load boards",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Load board details
  const loadBoard = useCallback(async (boardId: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await getBoardById(boardId);
      if (response.data) {
        setState((prev) => ({
          ...prev,
          selectedBoard: response.data as Board,
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Failed to load board",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Create new board
  const addBoard = useCallback(
    async (title: string, description?: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await createBoard({ title, description });
        if (response.data) {
          const newBoard = response.data as Board;
          setState((prev) => ({
            ...prev,
            boards: [...prev.boards, newBoard],
            cards: { ...prev.cards, [newBoard.id]: [] },
          }));
          return newBoard;
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : "Failed to create board",
        }));
        throw err;
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    []
  );

  // Update board
  const modifyBoard = useCallback(
    async (boardId: string, title?: string, description?: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await updateBoard(boardId, { title, description });
        if (response.data) {
          const updatedBoard = response.data as Board;
          setState((prev) => ({
            ...prev,
            boards: prev.boards.map((b) =>
              b.id === boardId ? updatedBoard : b
            ),
            selectedBoard:
              prev.selectedBoard?.id === boardId ? updatedBoard : prev.selectedBoard,
          }));
          return updatedBoard;
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : "Failed to update board",
        }));
        throw err;
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    []
  );

  // Delete board
  const removeBoard = useCallback(async (boardId: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await deleteBoard(boardId);
      setState((prev) => ({
        ...prev,
        boards: prev.boards.filter((b) => b.id !== boardId),
        selectedBoard:
          prev.selectedBoard?.id === boardId ? null : prev.selectedBoard,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Failed to delete board",
      }));
      throw err;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Get card by ID
  const getCard = useCallback(async (cardId: string) => {
    try {
      const response = await getCardById(cardId);
      if (response.data) {
        return response.data as Card;
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Failed to load card",
      }));
      throw err;
    }
  }, []);

  // Update card position
  const moveCard = useCallback(
    async (cardId: string, position: number, columnId?: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await updateCardPosition(cardId, {
          position,
          columnId,
        });
        if (response.data) {
          const updatedCard = response.data as Card;
          // Update card in state
          setState((prev) => ({
            ...prev,
            cards: {
              ...prev.cards,
              [updatedCard.boardId]: (prev.cards[updatedCard.boardId] || []).map(
                (c) => (c.id === cardId ? updatedCard : c)
              ),
            },
          }));
          return updatedCard;
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : "Failed to move card",
        }));
        throw err;
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    []
  );

  // Initialize on mount
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
    getCard,
    moveCard,
  };
}
