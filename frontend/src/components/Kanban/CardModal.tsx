import { useState } from "react";
import { Card as CardType } from "../../types/index";
import { Modal } from "../Common/Modal";

interface CardModalProps {
  card: CardType;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (card: CardType) => void;
}

export function CardModal({ card, isOpen, onClose, onSave }: CardModalProps) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");

  const handleSave = () => {
    if (onSave) {
      onSave({ ...card, title, description });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Card Details">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Card title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Card description"
        />
      </div>

      <div className="form-group">
        <label>Position</label>
        <input type="number" value={card.position} disabled />
      </div>

      <div className="form-group">
        <label>Column</label>
        <input type="text" value={card.columnId} disabled />
      </div>

      <div className="modal-footer">
        <button className="btn-save" onClick={handleSave}>
          Save
        </button>
        <button className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default CardModal;
