import { Card, CreateCardInput, UpdateCardPositionInput } from "../entities/card";

export interface CardRepository {
  getById(id: string): Promise<Card | null>;
  listByBoard(boardId: string): Promise<Card[]>;
  create(input: CreateCardInput): Promise<Card>;
  update(id: string, input: { title?: string; description?: string }): Promise<Card | null>;
  delete(id: string): Promise<boolean>;
  updatePosition(id: string, input: UpdateCardPositionInput): Promise<Card | null>;
}
