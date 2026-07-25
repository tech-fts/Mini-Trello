export interface Board {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

export interface CreateBoardInput {
  title: string;
  description?: string;
}

export interface UpdateBoardInput {
  title?: string;
  description?: string;
}
