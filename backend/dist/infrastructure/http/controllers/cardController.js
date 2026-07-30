"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCardController = createCardController;
const updateCardPosition_1 = require("../../../domain/cards/use-cases/updateCardPosition");
const getCardById_1 = require("../../../domain/cards/use-cases/getCardById");
const createCard_1 = require("../../../domain/cards/use-cases/createCard");
const updateCard_1 = require("../../../domain/cards/use-cases/updateCard");
const deleteCard_1 = require("../../../domain/cards/use-cases/deleteCard");
const listCardsByBoard_1 = require("../../../domain/cards/use-cases/listCardsByBoard");
const http_1 = require("../../../shared/utils/http");
function createCardController(cardRepository) {
    return {
        /** GET /api/cards?boardId=... — list cards for a board */
        listCards: async (req, res) => {
            try {
                const boardId = (0, http_1.sanitizeId)(String(req.query.boardId ?? ""));
                if (!boardId) {
                    res.status(400).json({ error: "boardId query parameter is required" });
                    return;
                }
                const cards = await (0, listCardsByBoard_1.listCardsByBoard)(cardRepository, boardId);
                res.json(cards);
            }
            catch (error) {
                (0, http_1.sendError)(res, error);
            }
        },
        /** GET /api/cards/:id */
        getCard: async (req, res) => {
            try {
                const cardId = (0, http_1.sanitizeId)(req.params.id);
                const card = await (0, getCardById_1.getCardById)(cardRepository, cardId);
                if (!card) {
                    res.status(404).json({ error: "Card not found" });
                    return;
                }
                res.json(card);
            }
            catch (error) {
                (0, http_1.sendError)(res, error);
            }
        },
        /** POST /api/cards */
        createCardHandler: async (req, res) => {
            try {
                const input = parseCreateCardInput(req.body);
                const card = await (0, createCard_1.createCard)(cardRepository, input);
                res.status(201).json(card);
            }
            catch (error) {
                (0, http_1.sendError)(res, error);
            }
        },
        /** PUT /api/cards/:id */
        updateCardHandler: async (req, res) => {
            try {
                const cardId = (0, http_1.sanitizeId)(req.params.id);
                const input = parseUpdateCardInput(req.body);
                const card = await (0, updateCard_1.updateCard)(cardRepository, cardId, input);
                if (!card) {
                    res.status(404).json({ error: "Card not found" });
                    return;
                }
                res.json(card);
            }
            catch (error) {
                (0, http_1.sendError)(res, error);
            }
        },
        /** DELETE /api/cards/:id */
        deleteCardHandler: async (req, res) => {
            try {
                const cardId = (0, http_1.sanitizeId)(req.params.id);
                const deleted = await (0, deleteCard_1.deleteCard)(cardRepository, cardId);
                if (!deleted) {
                    res.status(404).json({ error: "Card not found" });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                (0, http_1.sendError)(res, error);
            }
        },
        /** PUT /api/cards/:id/position */
        updateCardPositionHandler: async (req, res) => {
            try {
                const cardId = (0, http_1.sanitizeId)(req.params.id);
                const input = parseUpdateCardPositionInput(req.body);
                const card = await (0, updateCardPosition_1.updateCardPosition)(cardRepository, cardId, input);
                if (!card) {
                    res.status(404).json({ error: "Card not found" });
                    return;
                }
                res.json(card);
            }
            catch (error) {
                (0, http_1.sendError)(res, error);
            }
        },
    };
}
function parseCreateCardInput(body) {
    if (!body || typeof body !== "object") {
        throw new http_1.DomainError("Request body must be an object");
    }
    const data = body;
    const boardId = typeof data.boardId === "string" ? data.boardId.trim() : "";
    const columnId = typeof data.columnId === "string" ? data.columnId.trim() : "";
    const title = typeof data.title === "string" ? data.title.trim() : "";
    const description = typeof data.description === "string" ? data.description.trim() : undefined;
    const position = typeof data.position === "number" && Number.isFinite(data.position) ? data.position : 0;
    if (!boardId) {
        throw new http_1.DomainError("boardId is required");
    }
    if (!columnId) {
        throw new http_1.DomainError("columnId is required");
    }
    if (!title) {
        throw new http_1.DomainError("Title is required");
    }
    if (title.length > 200) {
        throw new http_1.DomainError("Title must be 200 characters or less");
    }
    return { boardId, columnId, title, description, position };
}
function parseUpdateCardInput(body) {
    if (!body || typeof body !== "object") {
        throw new http_1.DomainError("Request body must be an object");
    }
    const data = body;
    const title = typeof data.title === "string" ? data.title.trim() : undefined;
    const description = typeof data.description === "string" ? data.description.trim() : undefined;
    if (title !== undefined && !title) {
        throw new http_1.DomainError("Title cannot be empty");
    }
    if (title && title.length > 200) {
        throw new http_1.DomainError("Title must be 200 characters or less");
    }
    return { title, description };
}
function parseUpdateCardPositionInput(body) {
    if (!body || typeof body !== "object") {
        throw new http_1.DomainError("Request body must be an object");
    }
    const data = body;
    const position = typeof data.position === "number" ? data.position : NaN;
    const columnId = typeof data.columnId === "string" ? data.columnId.trim() : undefined;
    if (!Number.isFinite(position)) {
        throw new http_1.DomainError("Position must be a number");
    }
    if (position < 0) {
        throw new http_1.DomainError("Position must be a non-negative number");
    }
    return { position, columnId };
}
