import { useState } from 'react';

export function useKanban(initialCards = []) {
  const [cards, setCards] = useState(initialCards);

  const addCard = (card) => setCards((prev) => [...prev, card]);

  return { cards, addCard };
}
