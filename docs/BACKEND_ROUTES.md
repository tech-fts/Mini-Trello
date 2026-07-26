# Mini-Trello Backend Routes

This document describes the backend HTTP routes for the Mini-Trello project.

## Application root

- `GET /`
  - Health check endpoint.
  - Response: `{ status: "ok", message: "Mini Trello Backend is running" }`

## Boards routes

All board routes are mounted under `/boards`.

- `GET /boards`
  - List all boards.
  - Controller: `boardController.listBoards`
  - Persistence: `PrismaBoardRepository` by default.

- `POST /boards`
  - Create a new board.
  - Request body:
    - `title` (string, required)
    - `description` (string, optional)
  - Controller: `boardController.createBoardHandler`
  - Persistence: `PrismaBoardRepository` by default.

- `GET /boards/:id`
  - Get a single board by ID.
  - Controller: `boardController.getBoard`
  - Persistence: `PrismaBoardRepository` by default.

- `PUT /boards/:id`
  - Update a board by ID.
  - Request body may include:
    - `title` (string, optional)
    - `description` (string, optional)
  - Controller: `boardController.updateBoardHandler`
  - Persistence: `PrismaBoardRepository` by default.

- `DELETE /boards/:id`
  - Delete a board by ID.
  - Controller: `boardController.deleteBoardHandler`
  - Persistence: `PrismaBoardRepository` by default.

## Cards routes

All card routes are mounted under `/cards`.

- `GET /cards/:id`
  - Get a single card by ID.
  - Controller: `cardController.getCard`
  - Persistence: `InMemoryCardRepository` by default.

- `PUT /cards/:id/position`
  - Update a card's position and optional column.
  - Request body:
    - `position` (number, required)
    - `columnId` (string, optional)
  - Controller: `cardController.updateCardPositionHandler`
  - Persistence: `InMemoryCardRepository` by default.

## Auth routes

All auth routes are mounted under `/auth`.

- `POST /auth/register`
  - Register a new user.
  - Request body:
    - `email` (string, required)
    - `password` (string, required, minimum 8 characters)
  - Controller: `authController.registerHandler`
  - Persistence: `InMemoryUserRepository` by default.

- `POST /auth/login`
  - Login an existing user.
  - Request body:
    - `email` (string, required)
    - `password` (string, required)
  - Controller: `authController.loginHandler`
  - Persistence: `InMemoryUserRepository` by default.

## Notes

- Route registration is defined in `backend/src/app/routes.ts`.
- Board routes use `PrismaBoardRepository` by default, so they are intended for Postgres-backed persistence.
- Card and auth routes currently use in-memory repositories by default.
- The controller layer is responsible for request parsing, validation, and sending JSON responses.
- The domain layer contains use-cases and repository interfaces; controllers depend on those interfaces.
