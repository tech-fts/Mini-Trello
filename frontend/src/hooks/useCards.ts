import { useState, useCallback } from "react";
import type { Card } from "../types/index";
import {
  getCardsByBoard,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  updateCardPosition,
} from "../services/api";
import { asyncAction } from "../lib/asyncAction";

interface UseCardsState {
  /** Cards keyed by boardId. */
  cards: Record<string, Card[]>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook responsible ONLY for card operations.
 * Single Responsibility: cards state + card API calls.
 */
export function useCards() {
  const [state, setState] = useState<UseCardsState>({
    cards: {},
    isLoading: false,
    error: null,
  });

  /** Fetch cards for a specific board. */
  const loadCards = useCallback((boardId: string) => {
    return asyncAction(setState, () => getCardsByBoard(boardId), {
      onSuccess: (res, prev) => ({
        cards: {
          ...prev.cards,
          [boardId]: (res.data ?? []) as Card[],
        },
      }),
    });
  }, []);

  /** Set cards for a board directly (used when board is loaded with embedded cards). */
  const setBoardCards = useCallback(
    (boardId: string, cards: Card[]) => {
      setState((prev) => ({
        ...prev,
        cards: { ...prev.cards, [boardId]: cards },
      }));
    },
    []
  );

  const getCard = useCallback((cardId: string) => {
    return asyncAction(setState, () => getCardById(cardId), {
      onSuccess: () => ({}),
    });
  }, []);

  const addCard = useCallback(
    (payload: { boardId: string; columnId: string; title: string; description?: string; position?: number }) => {
      return asyncAction(
        setState,
        () => createCard(payload),
        {
          onSuccess: (res, prev) => {
            const card = res.data as Card;
            const boardCards = prev.cards[card.boardId] || [];
            return {
              cards: {
                ...prev.cards,
                [card.boardId]: [...boardCards, card],
              },
            };
          },
        }
      );
    },
    []
  );

  const modifyCard = useCallback(
    (cardId: string, payload: { title?: string; description?: string }) => {
      return asyncAction(
        setState,
        () => updateCard(cardId, payload),
        {
          onSuccess: (res, prev) => {
            const updated = res.data as Card;
            const boardCards = prev.cards[updated.boardId] || [];
            return {
              cards: {
                ...prev.cards,
                [updated.boardId]: boardCards.map((c) =>
                  c.id === cardId ? updated : c
                ),
              },
            };
          },
        }
      );
    },
    []
  );

  const removeCard = useCallback(
    (cardId: string, boardId: string) => {
      return asyncAction(setState, () => deleteCard(cardId), {
        onSuccess: (_data, prev) => ({
          cards: {
            ...prev.cards,
            [boardId]: (prev.cards[boardId] || []).filter((c) => c.id !== cardId),
          },
        }),
      });
    },
    []
  );

  const moveCard = useCallback(
    (cardId: string, position: number, columnId?: string) => {
      return asyncAction(
        setState,
        () => updateCardPosition(cardId, { position, columnId }),
        {
          onSuccess: (res, prev) => {
            const updated = res.data as Card;
            const boardCards = prev.cards[updated.boardId] || [];
            return {
              cards: {
                ...prev.cards,
                [updated.boardId]: boardCards.map((c) =>
                  c.id === cardId ? updated : c
                ),
              },
            };
          },
        }
      );
    },
    []
  );

  return {
    ...state,
    loadCards,
    setBoardCards,
    getCard,
    addCard,
    modifyCard,
    removeCard,
    moveCard,
  };
}
