import { useState } from "react";
import { useKanban } from "../../hooks/useKanban";
import Card from "./Card";
import { Card as CardType } from "../../types/index";

interface ColumnProps {
  columnId: string;
  title: string;
}

export function Column({ columnId, title }: ColumnProps) {
  const { cards, selectedBoard, moveCard } = useKanban();
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const columnCards = selectedBoard
    ? (cards[selectedBoard.id] || []).filter((c) => c.columnId === columnId)
    : [];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, cardId: string) => {
    setDraggedCardId(cardId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedCardId) {
      try {
        await moveCard(draggedCardId, columnCards.length, columnId);
      } catch (error) {
        console.error("Failed to move card:", error);
      }
      setDraggedCardId(null);
    }
  };

  const handleCardClick = (card: CardType) => {
    console.log("Card clicked:", card);
    // Open card modal/details here
  };

  return (
    <div
      className="column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <h3>{title}</h3>
        <span className="card-count">{columnCards.length}</span>
      </div>
      <div className="cards-list">
        {columnCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDragStart={handleDragStart}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
