export interface Card {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  description?: string;
  position: number;
  createdAt: string;
}

export interface CreateCardInput {
  boardId: string;
  columnId: string;
  title: string;
  description?: string;
  position: number;
}

export interface UpdateCardPositionInput {
  position: number;
  columnId?: string;
}
