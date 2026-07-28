import { Board as BoardType } from "../../types/index";
import Column, { COLUMNS } from "./Column";

interface SelectedBoardProps {
  board: BoardType;
}

export function SelectedBoard({ board }: SelectedBoardProps) {
  return (
    <div className="selected-board">
      <h2>{board.title}</h2>
      <div className="columns-container">
        {COLUMNS.map((col) => (
          <Column key={col.id} columnId={col.id} title={col.title} />
        ))}
      </div>
    </div>
  );
}
