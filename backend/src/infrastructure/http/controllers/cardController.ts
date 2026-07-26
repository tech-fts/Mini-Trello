import { Request, Response } from "express";
import { CardRepository } from "../../../domain/cards/repositories/cardRepository";
import { updateCardPosition } from "../../../domain/cards/use-cases/updateCardPosition";
import { getCardById } from "../../../domain/cards/use-cases/getCardById";
import { UpdateCardPositionInput } from "../../../domain/cards/entities/card";
import { sanitizeId, sendError } from "../../../shared/utils/http";

export function createCardController(cardRepository: CardRepository) {
  return {
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

function parseUpdateCardPositionInput(body: unknown): UpdateCardPositionInput {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be an object");
  }

  const data = body as Record<string, unknown>;
  const position = typeof data.position === "number" ? data.position : NaN;
  const columnId = typeof data.columnId === "string" ? data.columnId.trim() : undefined;

  if (!Number.isFinite(position)) {
    throw new Error("Position must be a number");
  }

  if (position < 0) {
    throw new Error("Position must be a non-negative number");
  }

  return { position, columnId };
}

