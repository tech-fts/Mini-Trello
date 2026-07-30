import { Request, Response } from "express";
import { CardRepository } from "../../../domain/cards/repositories/cardRepository";
import { updateCardPosition } from "../../../domain/cards/use-cases/updateCardPosition";
import { getCardById } from "../../../domain/cards/use-cases/getCardById";
import { createCard } from "../../../domain/cards/use-cases/createCard";
import { updateCard } from "../../../domain/cards/use-cases/updateCard";
import { deleteCard } from "../../../domain/cards/use-cases/deleteCard";
import { listCardsByBoard } from "../../../domain/cards/use-cases/listCardsByBoard";
import { CreateCardInput, UpdateCardPositionInput } from "../../../domain/cards/entities/card";
import { sanitizeId, sendError, DomainError } from "../../../shared/utils/http";

export function createCardController(cardRepository: CardRepository) {
  return {
    /** GET /api/cards?boardId=... — list cards for a board */
    listCards: async (req: Request, res: Response): Promise<void> => {
      try {
        const boardId = sanitizeId(String(req.query.boardId ?? ""));
        if (!boardId) {
          res.status(400).json({ error: "boardId query parameter is required" });
          return;
        }
        const cards = await listCardsByBoard(cardRepository, boardId);
        res.json(cards);
      } catch (error) {
        sendError(res, error);
      }
    },

    /** GET /api/cards/:id */
    getCard: async (req: Request, res: Response): Promise<void> => {
      try {
        const cardId = sanitizeId(req.params.id);
        const card = await getCardById(cardRepository, cardId);

        if (!card) {
          res.status(404).json({ error: "Card not found" });
          return;
        }

        res.json(card);
      } catch (error) {
        sendError(res, error);
      }
    },

    /** POST /api/cards */
    createCardHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const input = parseCreateCardInput(req.body);
        const card = await createCard(cardRepository, input);
        res.status(201).json(card);
      } catch (error) {
        sendError(res, error);
      }
    },

    /** PUT /api/cards/:id */
    updateCardHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const cardId = sanitizeId(req.params.id);
        const input = parseUpdateCardInput(req.body);
        const card = await updateCard(cardRepository, cardId, input);

        if (!card) {
          res.status(404).json({ error: "Card not found" });
          return;
        }

        res.json(card);
      } catch (error) {
        sendError(res, error);
      }
    },

    /** DELETE /api/cards/:id */
    deleteCardHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const cardId = sanitizeId(req.params.id);
        const deleted = await deleteCard(cardRepository, cardId);

        if (!deleted) {
          res.status(404).json({ error: "Card not found" });
          return;
        }

        res.status(204).send();
      } catch (error) {
        sendError(res, error);
      }
    },

    /** PUT /api/cards/:id/position */
    updateCardPositionHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const cardId = sanitizeId(req.params.id);
        const input = parseUpdateCardPositionInput(req.body);
        const card = await updateCardPosition(cardRepository, cardId, input);

        if (!card) {
          res.status(404).json({ error: "Card not found" });
          return;
        }

        res.json(card);
      } catch (error) {
        sendError(res, error);
      }
    },
  };
}

function parseCreateCardInput(body: unknown): CreateCardInput {
  if (!body || typeof body !== "object") {
    throw new DomainError("Request body must be an object");
  }

  const data = body as Record<string, unknown>;
  const boardId = typeof data.boardId === "string" ? data.boardId.trim() : "";
  const columnId = typeof data.columnId === "string" ? data.columnId.trim() : "";
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description = typeof data.description === "string" ? data.description.trim() : undefined;
  const position = typeof data.position === "number" && Number.isFinite(data.position) ? data.position : 0;

  if (!boardId) {
    throw new DomainError("boardId is required");
  }

  if (!columnId) {
    throw new DomainError("columnId is required");
  }

  if (!title) {
    throw new DomainError("Title is required");
  }

  if (title.length > 200) {
    throw new DomainError("Title must be 200 characters or less");
  }

  return { boardId, columnId, title, description, position };
}

function parseUpdateCardInput(body: unknown): { title?: string; description?: string } {
  if (!body || typeof body !== "object") {
    throw new DomainError("Request body must be an object");
  }

  const data = body as Record<string, unknown>;
  const title = typeof data.title === "string" ? data.title.trim() : undefined;
  const description = typeof data.description === "string" ? data.description.trim() : undefined;

  if (title !== undefined && !title) {
    throw new DomainError("Title cannot be empty");
  }

  if (title && title.length > 200) {
    throw new DomainError("Title must be 200 characters or less");
  }

  return { title, description };
}

function parseUpdateCardPositionInput(body: unknown): UpdateCardPositionInput {
  if (!body || typeof body !== "object") {
    throw new DomainError("Request body must be an object");
  }

  const data = body as Record<string, unknown>;
  const position = typeof data.position === "number" ? data.position : NaN;
  const columnId = typeof data.columnId === "string" ? data.columnId.trim() : undefined;

  if (!Number.isFinite(position)) {
    throw new DomainError("Position must be a number");
  }

  if (position < 0) {
    throw new DomainError("Position must be a non-negative number");
  }

  return { position, columnId };
}
