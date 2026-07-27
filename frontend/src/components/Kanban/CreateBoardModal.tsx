import { useState } from "react";
import { Modal } from "../Common/Modal";
import { FormField } from "../Common/FormField";

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, description?: string) => Promise<unknown>;
}

export function CreateBoardModal({
  isOpen,
  onClose,
  onCreate,
}: CreateBoardModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (title.trim()) {
      await onCreate(title, description || undefined);
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Board">
      <FormField
        label="Title"
        value={title}
        onChange={setTitle}
        placeholder="Board title"
      />
      <FormField
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Optional description"
        multiline
      />
      <div className="modal-footer">
        <button className="btn-primary" onClick={handleCreate}>
          Create
        </button>
        <button className="btn-secondary" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
