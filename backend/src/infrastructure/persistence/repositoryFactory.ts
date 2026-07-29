import { BoardRepository } from "../../domain/boards/repositories/boardRepository";
import { CardRepository } from "../../domain/cards/repositories/cardRepository";
import { UserRepository } from "../../domain/auth/repositories/userRepository";
import { PrismaBoardRepository } from "../persistence/postgres/boardRepository";
import { InMemoryBoardRepository } from "../persistence/inMemory/boardRepository";
import { InMemoryCardRepository } from "../persistence/inMemory/cardRepository";
import { InMemoryUserRepository } from "../persistence/inMemory/userRepository";

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
let boardRepo: BoardRepository | undefined;
let cardRepo: CardRepository | undefined;
let userRepo: UserRepository | undefined;

const DEFAULT_PG_URL = "postgresql://postgres:postgres@localhost:5432/mini_trello";

function usePostgres(): boolean {
  const url = process.env.DATABASE_URL;
  return !!(url && url.startsWith("postgres") && url !== DEFAULT_PG_URL);
}

export function getBoardRepository(): BoardRepository {
  if (!boardRepo) {
    boardRepo = usePostgres() ? new PrismaBoardRepository() : new InMemoryBoardRepository();
    if (!usePostgres()) {
      console.log("[repo-factory] Using InMemoryBoardRepository (no Postgres configured)");
    }
  }
  return boardRepo;
}

export function getCardRepository(): CardRepository {
  if (!cardRepo) {
    cardRepo = new InMemoryCardRepository();
  }
  return cardRepo;
}

export function getUserRepository(): UserRepository {
  if (!userRepo) {
    userRepo = new InMemoryUserRepository();
  }
  return userRepo;
}
