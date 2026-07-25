"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryBoardRepository = void 0;
class InMemoryBoardRepository {
    constructor() {
        this.boards = [];
    }
    async list() {
        return this.boards;
    }
    async getById(id) {
        return this.boards.find((board) => board.id === id) ?? null;
    }
    async create(input) {
        const board = {
            id: crypto.randomUUID(),
            title: input.title,
            description: input.description,
            createdAt: new Date().toISOString(),
        };
        this.boards.push(board);
        return board;
    }
    async update(id, input) {
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
    async delete(id) {
        const initialLength = this.boards.length;
        this.boards = this.boards.filter((board) => board.id !== id);
        return this.boards.length < initialLength;
    }
}
exports.InMemoryBoardRepository = InMemoryBoardRepository;
