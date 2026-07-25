import { Board, CreateBoardInput, UpdateBoardInput } from "../../../domain/boards/entities/board";
import { BoardRepository } from "../../../domain/boards/repositories/boardRepository";
import prisma from "./connection";

export class PrismaBoardRepository implements BoardRepository {
  async list(): Promise<Board[]> {
    const boards = await prisma.board.findMany({
      orderBy: { createdAt: "desc" },
    });

    return boards.map(this.mapToDomainBoard);
  }

  async getById(id: string): Promise<Board | null> {
    const board = await prisma.board.findUnique({
      where: { id },
    });

    return board ? this.mapToDomainBoard(board) : null;
  }

  async create(input: CreateBoardInput): Promise<Board> {
    const board = await prisma.board.create({
      data: {
        title: input.title,
        description: input.description,
      },
    });

    return this.mapToDomainBoard(board);
  }

  async update(id: string, input: UpdateBoardInput): Promise<Board | null> {
    try {
      const board = await prisma.board.update({
        where: { id },
        data: {
          title: input.title,
          description: input.description,
        },
      });

      return this.mapToDomainBoard(board);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.board.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  private mapToDomainBoard(
    board: Awaited<ReturnType<typeof prisma.board.findUnique>>,
  ): Board {
    if (!board) {
      throw new Error("Board is null");
    }

    return {
      id: board.id,
      title: board.title,
      description: board.description ?? undefined,
      createdAt: board.createdAt.toISOString(),
    };
  }
}
