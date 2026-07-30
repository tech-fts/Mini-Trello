import { useBoards } from "./useBoards";
import { useCards } from "./useCards";

/**
 * Composition facade over useBoards + useCards.
 *
 * SOLID: This is a thin orchestrator — each sub-hook owns one concern.
 * DRY:   No duplicated async patterns — delegated to asyncAction via sub-hooks.
 *
 * Existing components that import useKanban() continue to work unchanged.
 * New components can import useBoards() or useCards() directly for finer granularity.
 */
export function useKanban() {
  const cards = useCards();
  const boards = useBoards(cards.loadCards);

  return {
    boards: boards.boards,
    cards: cards.cards,
    selectedBoard: boards.selectedBoard,
    isLoading: boards.isLoading || cards.isLoading,
    error: boards.error || cards.error,
    loadBoards: boards.loadBoards,
    loadBoard: boards.loadBoard,
    addBoard: boards.addBoard,
    modifyBoard: boards.modifyBoard,
    removeBoard: boards.removeBoard,
    getCard: cards.getCard,
    addCard: cards.addCard,
    modifyCard: cards.modifyCard,
    removeCard: cards.removeCard,
    moveCard: cards.moveCard,
    setBoardCards: cards.setBoardCards,
  };
}
