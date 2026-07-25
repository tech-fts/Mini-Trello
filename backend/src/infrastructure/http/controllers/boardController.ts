import { Request, Response } from "express";
import { createBoard } from "../../../domain/boards/use-cases/createBoard";
import { deleteBoard } from "../../../domain/boards/use-cases/deleteBoard";
import { getBoardById } from "../../../domain/boards/use-cases/getBoardById";
import { getBoards } from "../../../domain/boards/use-cases/getBoards";
import { updateBoard } from "../../../domain/boards/use-cases/updateBoard";
import { BoardRepository } from "../../../domain/boards/repositories/boardRepository";
import { CreateBoardInput, UpdateBoardInput } from "../../../domain/boards/entities/board";

export function createBoardController(boardRepository: BoardRepository) {
  return {
    listBoards: async (_req: Request, res: Response): Promise<void> => {
      try {
        const boards = await getBoards(boardRepository);
        res.json(boards);
      } catch (error) {
        sendError(res, error);
      }
    },

    getBoard: async (req: Request, res: Response): Promise<void> => {
      try {
        const id = sanitizeId(req.params.id);
        const board = await getBoardById(boardRepository, id);

        if (!board) {
          res.status(404).json({ error: "Board not found" });
          return;
        }

        res.json(board);
      } catch (error) {
        sendError(res, error);
      }
    },

    createBoardHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const input = parseCreateBoardInput(req.body);
        const board = await createBoard(boardRepository, input);
        res.status(201).json(board);
      } catch (error) {
        sendError(res, error);
      }
    },

    updateBoardHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const id = sanitizeId(req.params.id);
        const input = parseUpdateBoardInput(req.body);
        const board = await updateBoard(boardRepository, id, input);

        if (!board) {
          res.status(404).json({ error: "Board not found" });
          return;
        }

        res.json(board);
      } catch (error) {
        sendError(res, error);
      }
    },

    deleteBoardHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const id = sanitizeId(req.params.id);
        const deleted = await deleteBoard(boardRepository, id);

        if (!deleted) {
          res.status(404).json({ error: "Board not found" });
          return;
        }

        res.status(204).send();
      } catch (error) {
        sendError(res, error);
      }
    },
  };
}

function parseCreateBoardInput(body: unknown): CreateBoardInput {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be an object");
  }

  const data = body as Record<string, unknown>;
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description = typeof data.description === "string" ? data.description.trim() : undefined;

  if (!title) {
    throw new Error("Title is required");
  }

  if (title.length > 100) {
    throw new Error("Title must be 100 characters or less");
  }

  if (description && description.length > 500) {
    throw new Error("Description must be 500 characters or less");
  }

  return { title, description };
}

function parseUpdateBoardInput(body: unknown): UpdateBoardInput {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be an object");
  }

  const data = body as Record<string, unknown>;
  const title = typeof data.title === "string" ? data.title.trim() : undefined;
  const description = typeof data.description === "string" ? data.description.trim() : undefined;

  if (title !== undefined && !title) {
    throw new Error("Title cannot be empty");
  }

  if (title && title.length > 100) {
    throw new Error("Title must be 100 characters or less");
  }

  if (description && description.length > 500) {
    throw new Error("Description must be 500 characters or less");
  }

  return { title, description };
}

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 100);
}

function sendError(res: Response, error: unknown): void {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(500).json({ error: "Unexpected error" });
}
