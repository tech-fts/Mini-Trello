import { Board, CreateBoardInput, UpdateBoardInput } from "../../../domain/boards/entities/board";
import { BoardRepository } from "../../../domain/boards/repositories/boardRepository";

export class InMemoryBoardRepository implements BoardRepository {
  private boards: Board[] = [];

  async list(): Promise<Board[]> {
    return this.boards;
  }

  async getById(id: string): Promise<Board | null> {
    return this.boards.find((board) => board.id === id) ?? null;
  }

  async create(input: CreateBoardInput): Promise<Board> {
    const board: Board = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      createdAt: new Date().toISOString(),
    };

    this.boards.push(board);
    return board;
  }

  async update(id: string, input: UpdateBoardInput): Promise<Board | null> {
    const index = this.boards.findIndex((board) => board.id === id);

    if (index === -1) {
      return null;
    }

    this.boards[index] = {
      ...this.boards[index],
      ...input,
    };

    return this.boards[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.boards.length;
    this.boards = this.boards.filter((board) => board.id !== id);
    return this.boards.length < initialLength;
  }
}
