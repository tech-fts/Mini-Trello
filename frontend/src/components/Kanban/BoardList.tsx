import { Board as BoardType } from "../../types/index";
import { TrashIcon } from "../Common/Icons";

interface BoardListProps {
  boards: BoardType[];
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BoardList({ boards, onOpen, onDelete }: BoardListProps) {
  if (boards.length === 0) return null;

  return (
    <div className="boards-grid">
      {boards.map((board) => (
        <div key={board.id} className="board-card" onClick={() => onOpen(board.id)}>
          <h3>{board.title}</h3>
          <p>{board.description || "No description"}</p>
          <div className="board-actions">
            <button
              className="btn btn-sm btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                onOpen(board.id);
              }}
            >
              Open
            </button>
            <button
              className="btn btn-sm btn-ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(board.id);
              }}
              aria-label={`Delete ${board.title}`}
            >
              <TrashIcon size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
