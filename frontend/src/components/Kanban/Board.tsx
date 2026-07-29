import { useState } from "react";
import { useKanban } from "../../hooks/useKanban";
import { BoardList } from "./BoardList";
import { SelectedBoard } from "./SelectedBoard";
import { CreateBoardModal } from "./CreateBoardModal";
import { EmptyState } from "../Common/EmptyState";
import { PlusIcon } from "../Common/Icons";

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
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <PlusIcon size={18} />
          New Board
        </button>
      </div>

      <BoardList
        boards={boards}
        onOpen={loadBoard}
        onDelete={handleDeleteBoard}
      />

      {boards.length === 0 && (
        <EmptyState
          icon="📋"
          title="No boards yet"
          description="Create your first board to start organizing tasks."
          action={
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              <PlusIcon size={18} />
              Create Board
            </button>
          }
        />
      )}

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
