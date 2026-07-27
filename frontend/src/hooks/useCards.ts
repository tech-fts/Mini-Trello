import { useState, useCallback } from "react";
import type { Card } from "../types/index";
import {
  getCardById,
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

  /** Set cards for a board (used when a board is loaded with its cards). */
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
      onSuccess: () => ({}), // no state mutation — caller uses return value
    });
  }, []);

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
    setBoardCards,
    getCard,
    moveCard,
  };
}
