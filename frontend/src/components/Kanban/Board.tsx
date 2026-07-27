import { useState } from "react";
import { useKanban } from "../../hooks/useKanban";
import { BoardList } from "./BoardList";
import { SelectedBoard } from "./SelectedBoard";
import { CreateBoardModal } from "./CreateBoardModal";

export function Board() {
  const { selectedBoard, boards, loadBoard, addBoard, removeBoard } =
    useKanban();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDeleteBoard = async (boardId: string) => {
    if (confirm("Are you sure you want to delete this board?")) {
      await removeBoard(boardId);
    }
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>My Boards</h1>
        <button onClick={() => setShowCreateModal(true)}>+ New Board</button>
      </div>

      <BoardList
        boards={boards}
        onOpen={loadBoard}
        onDelete={handleDeleteBoard}
      />

      <CreateBoardModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={addBoard}
      />

      {selectedBoard && <SelectedBoard board={selectedBoard} />}
    </div>
  );
}

export default Board;
