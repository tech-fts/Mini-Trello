import { useState } from "react";
import { useKanban } from "../../hooks/useKanban";
import CardComponent from "./Card";

interface ColumnProps {
  columnId: string;
  title: string;
}

/** Default column definitions — can be moved to config/constants later (OCP). */
export const COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
] as const;

export function Column({ columnId, title }: ColumnProps) {
  const { cards, selectedBoard, moveCard } = useKanban();
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const columnCards = selectedBoard
    ? (cards[selectedBoard.id] || []).filter((c) => c.columnId === columnId)
    : [];

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    cardId: string,
  ) => {
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
      } catch (err) {
        console.error("Failed to move card:", err);
      }
      setDraggedCardId(null);
    }
  };

  return (
    <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="column-header">
        <h3>{title}</h3>
        <span className="card-count">{columnCards.length}</span>
      </div>
      <div className="cards-list">
        {columnCards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
