"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaBoardRepository = void 0;
const connection_1 = __importDefault(require("./connection"));
class PrismaBoardRepository {
    async list() {
        const boards = await connection_1.default.board.findMany({
            orderBy: { createdAt: "desc" },
        });
        return boards.map(this.mapToDomainBoard);
    }
    async getById(id) {
        const board = await connection_1.default.board.findUnique({
            where: { id },
        });
        return board ? this.mapToDomainBoard(board) : null;
    }
    async create(input) {
        const board = await connection_1.default.board.create({
            data: {
                title: input.title,
                description: input.description,
            },
        });
        return this.mapToDomainBoard(board);
    }
    async update(id, input) {
        try {
            const board = await connection_1.default.board.update({
                where: { id },
                data: {
                    title: input.title,
                    description: input.description,
                },
            });
            return this.mapToDomainBoard(board);
        }
        catch (error) {
            return null;
        }
    }
    async delete(id) {
        try {
            await connection_1.default.board.delete({
                where: { id },
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    mapToDomainBoard(board) {
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
exports.PrismaBoardRepository = PrismaBoardRepository;
