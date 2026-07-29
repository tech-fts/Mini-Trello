import { Card as CardType } from "../../types/index";

interface CardProps {
  card: CardType;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, cardId: string) => void;
  onClick?: (card: CardType) => void;
}

export function Card({ card, onDragStart, onClick }: CardProps) {
  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      onClick={() => onClick?.(card)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(card);
        }
      }}
    >
      <h4>{card.title}</h4>
      {card.description && <p>{card.description}</p>}
      <div className="card-meta">
        <span className="card-position">#{card.position + 1}</span>
      </div>
    </div>
  );
}

export default Card;
