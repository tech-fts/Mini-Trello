import { Board as BoardType } from "../../types/index";

interface BoardListProps {
  boards: BoardType[];
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BoardList({ boards, onOpen, onDelete }: BoardListProps) {
  return (
    <div className="boards-grid">
      {boards.map((board) => (
        <div key={board.id} className="board-card">
          <h3>{board.title}</h3>
          <p>{board.description}</p>
          <div className="board-actions">
            <button onClick={() => onOpen(board.id)}>Open</button>
            <button onClick={() => onDelete(board.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
