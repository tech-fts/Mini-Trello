"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoardController = createBoardController;
const createBoard_1 = require("../../../domain/boards/use-cases/createBoard");
const deleteBoard_1 = require("../../../domain/boards/use-cases/deleteBoard");
const getBoardById_1 = require("../../../domain/boards/use-cases/getBoardById");
const getBoards_1 = require("../../../domain/boards/use-cases/getBoards");
const updateBoard_1 = require("../../../domain/boards/use-cases/updateBoard");
function createBoardController(boardRepository) {
    return {
        listBoards: async (_req, res) => {
            try {
                const boards = await (0, getBoards_1.getBoards)(boardRepository);
                res.json(boards);
            }
            catch (error) {
                sendError(res, error);
            }
        },
        getBoard: async (req, res) => {
            try {
                const id = sanitizeId(req.params.id);
                const board = await (0, getBoardById_1.getBoardById)(boardRepository, id);
                if (!board) {
                    res.status(404).json({ error: "Board not found" });
                    return;
                }
                res.json(board);
            }
            catch (error) {
                sendError(res, error);
            }
        },
        createBoardHandler: async (req, res) => {
            try {
                const input = parseCreateBoardInput(req.body);
                const board = await (0, createBoard_1.createBoard)(boardRepository, input);
                res.status(201).json(board);
            }
            catch (error) {
                sendError(res, error);
            }
        },
        updateBoardHandler: async (req, res) => {
            try {
                const id = sanitizeId(req.params.id);
                const input = parseUpdateBoardInput(req.body);
                const board = await (0, updateBoard_1.updateBoard)(boardRepository, id, input);
                if (!board) {
                    res.status(404).json({ error: "Board not found" });
                    return;
                }
                res.json(board);
            }
            catch (error) {
                sendError(res, error);
            }
        },
        deleteBoardHandler: async (req, res) => {
            try {
                const id = sanitizeId(req.params.id);
                const deleted = await (0, deleteBoard_1.deleteBoard)(boardRepository, id);
                if (!deleted) {
                    res.status(404).json({ error: "Board not found" });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                sendError(res, error);
            }
        },
    };
}
function parseCreateBoardInput(body) {
    if (!body || typeof body !== "object") {
        throw new Error("Request body must be an object");
    }
    const data = body;
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
function parseUpdateBoardInput(body) {
    if (!body || typeof body !== "object") {
        throw new Error("Request body must be an object");
    }
    const data = body;
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
function sanitizeId(id) {
    return id.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 100);
}
function sendError(res, error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
    }
    res.status(500).json({ error: "Unexpected error" });
}
