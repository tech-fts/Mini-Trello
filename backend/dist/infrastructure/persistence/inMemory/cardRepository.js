"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCardRepository = void 0;
class InMemoryCardRepository {
    constructor() {
        this.cards = [];
    }
    seed(cards) {
        this.cards = [...cards];
    }
    async getById(id) {
        return this.cards.find((card) => card.id === id) ?? null;
    }
    async listByBoard(boardId) {
        return this.cards
            .filter((card) => card.boardId === boardId)
            .sort((a, b) => a.position - b.position);
    }
    async create(input) {
        const card = {
            id: crypto.randomUUID(),
            boardId: input.boardId,
            columnId: input.columnId,
            title: input.title,
            description: input.description,
            position: input.position,
            createdAt: new Date().toISOString(),
        };
        this.cards.push(card);
        return card;
    }
    async update(id, input) {
        const index = this.cards.findIndex((card) => card.id === id);
        if (index === -1)
            return null;
        this.cards[index] = { ...this.cards[index], ...input };
        return this.cards[index];
    }
    async delete(id) {
        const initialLength = this.cards.length;
        this.cards = this.cards.filter((card) => card.id !== id);
        return this.cards.length < initialLength;
    }
    async updatePosition(id, input) {
        const index = this.cards.findIndex((card) => card.id === id);
        if (index === -1) {
            return null;
        }
        const existingCard = this.cards[index];
        const updatedCard = {
            ...existingCard,
            position: input.position,
            columnId: input.columnId ?? existingCard.columnId,
        };
        this.cards[index] = updatedCard;
        return updatedCard;
    }
}
exports.InMemoryCardRepository = InMemoryCardRepository;
