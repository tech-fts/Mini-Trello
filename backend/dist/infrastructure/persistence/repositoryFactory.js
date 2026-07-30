"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoardRepository = getBoardRepository;
exports.getCardRepository = getCardRepository;
exports.getUserRepository = getUserRepository;
const boardRepository_1 = require("../persistence/postgres/boardRepository");
const boardRepository_2 = require("../persistence/inMemory/boardRepository");
const cardRepository_1 = require("../persistence/inMemory/cardRepository");
const userRepository_1 = require("../persistence/inMemory/userRepository");
/**
 * Repository factory.
 *
 * DRY: single place to decide persistence strategy.
 * OCP: add new repository implementations without touching routes or controllers.
 *
 * Detection: when DATABASE_URL is a real non-default Postgres URL (not the
 * placeholder "postgresql://postgres:postgres@localhost:5432/mini_trello"),
 * we use Prisma. Otherwise we fall back to in-memory (demo / no-db mode).
 */
let boardRepo;
let cardRepo;
let userRepo;
const DEFAULT_PG_URL = "postgresql://postgres:postgres@localhost:5432/mini_trello";
function usePostgres() {
    const url = process.env.DATABASE_URL;
    return !!(url && url.startsWith("postgres") && url !== DEFAULT_PG_URL);
}
function getBoardRepository() {
    if (!boardRepo) {
        boardRepo = usePostgres() ? new boardRepository_1.PrismaBoardRepository() : new boardRepository_2.InMemoryBoardRepository();
        if (!usePostgres()) {
            console.log("[repo-factory] Using InMemoryBoardRepository (no Postgres configured)");
        }
    }
    return boardRepo;
}
function getCardRepository() {
    if (!cardRepo) {
        cardRepo = new cardRepository_1.InMemoryCardRepository();
    }
    return cardRepo;
}
function getUserRepository() {
    if (!userRepo) {
        userRepo = new userRepository_1.InMemoryUserRepository();
    }
    return userRepo;
}
