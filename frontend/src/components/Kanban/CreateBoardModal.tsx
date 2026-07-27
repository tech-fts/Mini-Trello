import { useState } from "react";
import { Modal } from "../Common/Modal";

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => Promise<unknown>;
}

export function CreateBoardModal({ isOpen, onClose, onCreate }: CreateBoardModalProps) {
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    if (title.trim()) {
      await onCreate(title);
      setTitle("");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Board">
      <input
        type="text"
        placeholder="Board title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="modal-footer" style={{ marginTop: 16 }}>
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </Modal>
  );
}
