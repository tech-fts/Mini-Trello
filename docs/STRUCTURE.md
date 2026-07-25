# Mini-Trello — Project Structure

This document describes the current, TypeScript-first folder layout for the Mini-Trello project. It focuses on high-level responsibilities so contributors can quickly find where to add features.

---

## Backend (TypeScript - Domain Driven)

backend/src/
├── app/
│   ├── server.ts               # Application entry point, HTTP + Socket boot
│   └── routes.ts               # Compose and mount HTTP routes
├── domain/                    # Pure domain layer (no infra details)
│   ├── auth/
│   │   ├── entities/           # Domain entities (e.g., `User`)
│   │   ├── use-cases/          # Business use cases (register, login)
│   │   └── repositories/       # Repository interfaces
│   ├── boards/
│   │   ├── entities/           # `Board`, `Column` domain models
│   │   ├── use-cases/          # Read/write board use-cases
│   │   └── repositories/       # Board repository interfaces
│   └── cards/
│       ├── entities/           # `Card` domain model
│       ├── use-cases/          # Positioning, move, create, delete
│       └── repositories/       # Card repository interfaces
├── infrastructure/            # Framework & infra adapters
│   ├── http/
│   │   ├── controllers/        # Express controllers that map HTTP ⇄ use-cases
│   │   ├── middleware/         # Auth, validation, error handling
│   │   └── routes/             # Express route definitions
│   ├── persistence/
│   │   └── postgres/           # Postgres adapters, queries, migrations
│   └── sockets/                # Socket.IO setup & event handlers
├── shared/                    # Cross-cutting utilities & types
│   ├── config/                 # env parsing, constants
│   ├── utils/                  # helpers (e.g., positioning logic)
│   ├── types/                  # shared TS types and interfaces
│   └── errors/                 # common error types (HttpError, etc.)

Notes:
- Domain folder should not import infrastructure directly; use repository interfaces.
- Infrastructure contains concrete adapters that implement repository interfaces.

---

## Frontend (TypeScript + React + Vite)

frontend/
├── src/
│   ├── app/                    # App entry & top-level wiring (providers, router)
│   │   ├── main.tsx
│   │   └── App.tsx
│   ├── assets/                 # static CSS, icons, images
│   ├── components/
│   │   ├── Kanban/             # `Board.tsx`, `Column.tsx`, `Card.tsx`, `CardModal.tsx`
│   │   └── Common/             # `Header.tsx`, `UserAvatar.tsx`, small UI parts
│   ├── contexts/               # `AuthContext`, `SocketContext`
│   ├── hooks/                  # `useKanban`, other custom hooks
│   ├── services/               # `api.ts` (HTTP client), `socket.ts` (client)
│   └── types/                  # frontend shared TS types

Notes:
- Keep components dumb; business logic lives in hooks and contexts.
- `services/api.ts` wraps HTTP requests; `services/socket.ts` wraps Socket.IO client.

---

## How to use this doc
- Add short README files under major folders when implementing (e.g., domain/boards/README.md).
- Keep this file updated as the architecture evolves.

---

Generated: 2026-07-25
