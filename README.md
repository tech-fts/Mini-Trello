# Mini-Trello

A lightweight, full-stack Trello-like project management application built with TypeScript, React, Express, and PostgreSQL — designed with a clean Domain-Driven Design architecture.

## Overview

Mini-Trello is a task management and board organization tool. Users can register, log in, create project boards with Kanban-style columns, and manage cards with drag-and-drop positioning. The backend follows Domain-Driven Design (DDD) principles with repository abstractions, allowing it to run with either an in-memory store (zero-config demo mode) or a PostgreSQL database.

## Features

- **User Authentication** — Register and login with email/password
- **Board Management** — Create, read, update, and delete project boards
- **Card Management** — Full CRUD for cards within boards and columns
- **Kanban Positioning** — Reorder cards across columns with position tracking
- **Real-time Updates** — Socket.IO integration for live board/card events
- **Dual Persistence** — Runs out-of-the-box with in-memory storage; switch to PostgreSQL via a `DATABASE_URL` env var
- **Dark/Light Theme** — Built-in theme toggle
- **Type-Safe** — Fully typed with TypeScript on both frontend and backend
- **Responsive UI** — React 18 with Vite for fast development and HMR
- **Security** — Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy), CORS, payload limits

## Project Structure

```
Mini-Trello/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma            # Database schema (PostgreSQL)
│   ├── src/
│   │   ├── app/
│   │   │   ├── server.ts            # Express app + HTTP server entry point
│   │   │   ├── routes.ts            # Top-level route registration
│   │   │   └── middlewares.ts       # Error handling, 404 middleware
│   │   ├── domain/                  # Pure domain layer (no framework deps)
│   │   │   ├── auth/
│   │   │   │   ├── entities/user.ts
│   │   │   │   ├── repositories/userRepository.ts
│   │   │   │   └── use-cases/       # registerUser, loginUser, authValidators
│   │   │   ├── boards/
│   │   │   │   ├── entities/board.ts
│   │   │   │   ├── repositories/boardRepository.ts
│   │   │   │   └── use-cases/       # createBoard, getBoards, getBoardById, updateBoard, deleteBoard
│   │   │   └── cards/
│   │   │       ├── entities/card.ts
│   │   │       ├── repositories/cardRepository.ts
│   │   │       └── use-cases/       # createCard, getCardById, listCardsByBoard,
│   │   │                             # updateCard, deleteCard, updateCardPosition, validateCardPosition
│   │   ├── infrastructure/
│   │   │   ├── http/
│   │   │   │   ├── controllers/     # authController, boardController, cardController
│   │   │   │   └── routes/          # authRoutes, boardRoutes, cardRoutes
│   │   │   ├── persistence/
│   │   │   │   ├── inMemory/        # In-memory repo implementations (zero-config fallback)
│   │   │   │   ├── postgres/        # Prisma-based PostgreSQL repository implementations
│   │   │   │   └── repositoryFactory.ts  # Switches between in-memory and Postgres at runtime
│   │   │   └── websocket/
│   │   │       └── socketServer.ts  # Socket.IO server setup
│   │   └── shared/
│   │       └── utils/               # http.ts (JSON helpers), password.ts (hashing)
│   ├── tests/
│   │   ├── boardUseCases.test.ts
│   │   └── cardUseCases.test.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx              # Root component with routing and providers
│   │   │   └── main.tsx             # React DOM entry point
│   │   ├── assets/
│   │   │   └── styles.css           # Global styles and theme variables
│   │   ├── components/
│   │   │   ├── Auth/                # LoginPage, RegisterPage
│   │   │   ├── Common/              # Header, UserAvatar, Modal, FormField, LoadingSpinner, EmptyState
│   │   │   └── Kanban/              # Board, BoardList, Column, Card, CardModal, CreateBoardModal, SelectedBoard
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx       # Authentication state and JWT token management
│   │   │   ├── SocketContext.tsx     # Socket.IO client connection
│   │   │   └── ThemeContext.tsx      # Dark/light theme toggle
│   │   ├── hooks/
│   │   │   ├── useBoards.ts         # Board CRUD operations
│   │   │   ├── useCards.ts          # Card CRUD + position operations
│   │   │   └── useKanban.ts         # Kanban board state orchestration
│   │   ├── services/
│   │   │   ├── api.ts               # Typed API functions (auth, boards, cards)
│   │   │   ├── apiClient.ts         # Axios instance with interceptors
│   │   │   └── socket.ts            # Socket.IO client singleton
│   │   ├── types/
│   │   │   └── index.ts             # Shared TypeScript interfaces
│   │   └── lib/
│   │       └── asyncAction.ts       # Async state helper
│   ├── index.html
│   ├── vite.config.ts               # Vite config with API/WebSocket proxy
│   ├── package.json
│   └── tsconfig.json
├── docs/
│   ├── BACKEND_ROUTES.md            # Detailed API route reference
│   └── STRUCTURE.md                 # Architecture overview
├── LICENSE                          # MIT License
└── README.md
```

## Tech Stack

### Backend
| Technology | Version |
|-----------|---------|
| Node.js | 20+ |
| Express.js | 4.18 |
| TypeScript | 5.5 |
| Socket.IO | 4.8 |
| Prisma (ORM) | 5.22 |
| pg (Postgres driver) | 8.22 |
| dotenv | 17.4 |

### Frontend
| Technology | Version |
|-----------|---------|
| React | 18.3 |
| Vite | 5.4 |
| TypeScript | 5.6 |
| Axios | 1.7 |
| Socket.IO Client | 4.1 |

## Architecture

Mini-Trello follows **Domain-Driven Design** with a clean separation of concerns:

- **Domain layer** — Pure business logic. Entities, use-cases, and repository interfaces defined without any framework dependencies. Use-cases are functions that take a repository interface and return results.
- **Infrastructure layer** — Concrete adapters. Express controllers map HTTP requests to use-cases. Repository implementations exist for both in-memory arrays and PostgreSQL via Prisma.
- **Repository Factory** — A single factory (`repositoryFactory.ts`) decides at startup whether to use in-memory or Postgres repositories. If `DATABASE_URL` is set to a non-default Postgres URL, Prisma is used; otherwise the app runs with zero-config in-memory storage.
- **Dependency Injection** — Routes create controllers by injecting the appropriate repository from the factory. No global state, no hidden coupling.

This design follows **SOLID** principles:
- **Single Responsibility** — Each use-case does one thing
- **Open/Closed** — New repository implementations can be added without changing controllers or routes
- **Liskov Substitution** — In-memory and Postgres repos are interchangeable via the repository interface
- **Interface Segregation** — Each domain has its own focused repository interface
- **Dependency Inversion** — Domain defines interfaces; infrastructure implements them

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm
- PostgreSQL (optional — the app works without it using in-memory storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tech-fts/Mini-Trello.git
   cd Mini-Trello
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

   (Optional) Create a `.env` file in the `backend` directory for PostgreSQL:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/mini_trello"
   PORT=4000
   ```

   If PostgreSQL is configured, run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

   > **No database?** The backend automatically falls back to in-memory storage when no valid `DATABASE_URL` is set. You can start developing immediately without any database setup.

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Development

**Backend**
```bash
cd backend
npm run dev
```
Runs on `http://localhost:4000` with auto-reload via `ts-node-dev`.

**Frontend**
```bash
cd frontend
npm run dev
```
Runs on `http://localhost:5173`. API and WebSocket requests are proxied to the backend via Vite's dev server — no CORS issues in development.

### Build & Production

**Backend**
```bash
cd backend
npm run build    # Compile TypeScript to dist/
npm start        # Run compiled JS from dist/app/server.js
```

**Frontend**
```bash
cd frontend
npm run build    # TypeScript check + Vite production build
npm run preview  # Preview the production build locally
```

### Running Tests

```bash
cd backend
npm test         # Runs board and card use-case tests
```

## Database Schema

### Board
| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Primary key |
| `title` | String (100) | Board title |
| `description` | String? (500) | Optional board description |
| `createdAt` | DateTime | Auto-generated creation timestamp |

### Card
| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `boardId` | String | Foreign key to board |
| `columnId` | String | Column identifier (e.g., "todo", "in-progress", "done") |
| `title` | String | Card title |
| `description` | String? | Optional card description |
| `position` | Number | Sort order within a column |
| `createdAt` | DateTime | Auto-generated creation timestamp |

### User
| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `email` | String | Unique user email |
| `passwordHash` | String | Hashed password (never stored in plaintext) |
| `createdAt` | DateTime | Auto-generated creation timestamp |

## API Endpoints

All endpoints are prefixed with `/api`.

### Health
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Health check |

### Auth
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Register a new user (`email`, `password`) |
| `POST` | `/api/auth/login` | Login and receive a token (`email`, `password`) |

### Boards
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/boards` | List all boards |
| `POST` | `/api/boards` | Create a board (`title`, `description?`) |
| `GET` | `/api/boards/:id` | Get a board by ID |
| `PUT` | `/api/boards/:id` | Update a board (`title?`, `description?`) |
| `DELETE` | `/api/boards/:id` | Delete a board |

### Cards
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/cards?boardId=...` | List cards for a board |
| `POST` | `/api/cards` | Create a card (`boardId`, `columnId`, `title`, `description?`, `position`) |
| `GET` | `/api/cards/:id` | Get a card by ID |
| `PUT` | `/api/cards/:id` | Update a card (`title?`, `description?`) |
| `DELETE` | `/api/cards/:id` | Delete a card |
| `PUT` | `/api/cards/:id/position` | Move a card (`position`, `columnId?`) |

See [docs/BACKEND_ROUTES.md](docs/BACKEND_ROUTES.md) for detailed request/response schemas.

## Security

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: no-referrer`
- `X-Powered-By` header removed
- JSON payload size limit: 1MB
- Passwords hashed (never stored in plaintext)
- CORS enabled with credentials support

## Roadmap

- [x] Task/Card management system
- [x] User authentication and authorization
- [x] Kanban board with column-based card organization
- [x] Card position tracking and reordering
- [x] Dark/Light theme
- [x] In-memory persistence fallback (zero-config demo mode)
- [ ] PostgreSQL card and user repository implementations (board repo exists)
- [ ] Drag and drop UI (position API is ready)
- [ ] Real-time collaboration via WebSocket (server infrastructure in place)
- [ ] User profiles and workspaces
- [ ] Advanced filtering and search
- [ ] Export functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [tech-fts](https://github.com/tech-fts)
