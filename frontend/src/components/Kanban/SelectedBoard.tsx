import { Board as BoardType } from "../../types/index";
import Column from "./Column";

interface SelectedBoardProps {
  board: BoardType;
}

export function SelectedBoard({ board }: SelectedBoardProps) {
  return (
    <div className="selected-board">
      <h2>{board.title}</h2>
      <div className="columns-container">
        <Column columnId="todo" title="To Do" />
        <Column columnId="in-progress" title="In Progress" />
        <Column columnId="done" title="Done" />
      </div>
    </div>
  );
}
