import { Card as CardType } from "../../types/index";

interface CardProps {
  card: CardType;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, cardId: string) => void;
  /** Optional: open card details modal (not yet wired — YAGNI) */
  onClick?: (card: CardType) => void;
}

export function Card({ card, onDragStart }: CardProps) {
  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
    >
      <h4>{card.title}</h4>
      <p>{card.description}</p>
      <div className="card-meta">
        <span className="card-position">Position: {card.position}</span>
      </div>
    </div>
  );
}

export default Card;
