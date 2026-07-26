import assert from "assert";
import { Board, CreateBoardInput, UpdateBoardInput } from "../src/domain/boards/entities/board";
import { BoardRepository } from "../src/domain/boards/repositories/boardRepository";
import { createBoard } from "../src/domain/boards/use-cases/createBoard";
import { deleteBoard } from "../src/domain/boards/use-cases/deleteBoard";
import { getBoardById } from "../src/domain/boards/use-cases/getBoardById";
import { getBoards } from "../src/domain/boards/use-cases/getBoards";
import { updateBoard } from "../src/domain/boards/use-cases/updateBoard";

class InMemoryBoardRepository implements BoardRepository {
  private boards: Board[] = [];

  async list(): Promise<Board[]> {
    return [...this.boards];
  }

  async getById(id: string): Promise<Board | null> {
    return this.boards.find((board) => board.id === id) ?? null;
  }

  async create(input: CreateBoardInput): Promise<Board> {
    const newBoard: Board = {
      id: `${this.boards.length + 1}`,
      title: input.title,
      description: input.description,
      createdAt: new Date().toISOString(),
    };

    this.boards.push(newBoard);
    return newBoard;
  }

  async update(id: string, input: UpdateBoardInput): Promise<Board | null> {
    const board = this.boards.find((item) => item.id === id);
    if (!board) {
      return null;
    }

    board.title = input.title ?? board.title;
    board.description = input.description ?? board.description;
    return board;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.boards.findIndex((board) => board.id === id);
    if (index === -1) {
      return false;
    }

    this.boards.splice(index, 1);
    return true;
  }
}

async function runBoardUseCaseTests() {
  const repository = new InMemoryBoardRepository();

  const createdBoard = await createBoard(repository, {
    title: "Sprint planning",
    description: "Create the initial planning board",
  });

  assert.strictEqual(createdBoard.title, "Sprint planning");
  assert.strictEqual(createdBoard.description, "Create the initial planning board");
  assert.ok(createdBoard.id.length > 0);
  assert.ok(createdBoard.createdAt.length > 0);

  const boards = await getBoards(repository);
  assert.strictEqual(boards.length, 1);
  assert.deepStrictEqual(boards[0], createdBoard);

  const fetchedBoard = await getBoardById(repository, createdBoard.id);
  assert.deepStrictEqual(fetchedBoard, createdBoard);

  const updatedBoard = await updateBoard(repository, createdBoard.id, {
    title: "Sprint planning updated",
  });
  assert.ok(updatedBoard);
  assert.strictEqual(updatedBoard?.title, "Sprint planning updated");

  const deleted = await deleteBoard(repository, createdBoard.id);
  assert.strictEqual(deleted, true);

  const missingBoard = await getBoardById(repository, createdBoard.id);
  assert.strictEqual(missingBoard, null);

  await assert.rejects(
    async () => {
      await createBoard(repository, { title: "  ", description: "No title" });
    },
    { message: "Title is required" },
  );

  await assert.rejects(
    async () => {
      await updateBoard(repository, "unknown-id", { title: "" });
    },
    { message: "Title cannot be empty" },
  );

  console.log("✅ All board use-case tests passed");
}

runBoardUseCaseTests().catch((error) => {
  console.error("❌ Board use-case tests failed");
  console.error(error);
  process.exit(1);
});
