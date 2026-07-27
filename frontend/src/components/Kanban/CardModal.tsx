import { useState } from "react";
import type { Card as CardType } from "../../types/index";
import { Modal } from "../Common/Modal";
import { FormField } from "../Common/FormField";

interface CardModalProps {
  card: CardType;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (card: CardType) => void;
}

export function CardModal({
  card,
  isOpen,
  onClose,
  onSave,
}: CardModalProps) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");

  const handleSave = () => {
    onSave?.({ ...card, title, description });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Card Details">
      <FormField
        label="Title"
        value={title}
        onChange={setTitle}
        placeholder="Card title"
      />
      <FormField
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Card description"
        multiline
      />
      <FormField
        label="Position"
        value={String(card.position)}
        onChange={() => {}}
        disabled
      />
      <FormField
        label="Column"
        value={card.columnId}
        onChange={() => {}}
        disabled
      />
      <div className="modal-footer">
        <button className="btn-primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default CardModal;
