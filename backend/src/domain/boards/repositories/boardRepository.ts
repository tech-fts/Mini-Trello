import { Board, CreateBoardInput, UpdateBoardInput } from "../entities/board";

export interface BoardRepository {
  list(): Promise<Board[]>;
  getById(id: string): Promise<Board | null>;
  create(input: CreateBoardInput): Promise<Board>;
  update(id: string, input: UpdateBoardInput): Promise<Board | null>;
  delete(id: string): Promise<boolean>;
}
