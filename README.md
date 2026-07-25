# Mini-Trello

A lightweight, full-stack Trello-like project management application built with TypeScript, React, Express, and PostgreSQL.

## 📋 Overview

Mini-Trello is a task management and board organization tool that allows users to create boards, manage tasks, and collaborate in real-time. It features a responsive frontend interface and a robust backend API with real-time WebSocket support.

## ✨ Features

- **Board Management**: Create, update, and organize project boards
- **Task Management**: Add and manage tasks across different boards
- **Real-time Updates**: WebSocket integration for live collaboration (Socket.IO)
- **RESTful API**: Clean and well-structured REST API endpoints
- **Database Persistence**: PostgreSQL with Prisma ORM for reliable data storage
- **Type-Safe**: Fully typed with TypeScript on both frontend and backend
- **Responsive UI**: React-based user interface with Vite for fast development
- **Security**: Security headers and best practices implemented

## 🏗️ Project Structure

```
Mini-Trello/
├── backend/              # Express.js backend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── server.ts      # Express server setup and configuration
│   │   │   ├── routes.ts      # Route definitions
│   │   │   └── middlewares.ts # Express middlewares
│   │   └── ...                # Additional backend modules
│   ├── prisma/
│   │   └── schema.prisma      # Database schema definition
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── frontend/             # React.js frontend application
│   ├── src/
│   │   ├── App.tsx
│   │   └── ...            # React components and pages
│   ├── package.json
│   └── ...
├── docs/                 # Documentation files
├── LICENSE               # MIT License
└── README.md            # This file
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18
- **Language**: TypeScript 5.5
- **Database**: PostgreSQL
- **ORM**: Prisma 5.22
- **Real-time**: Socket.IO
- **Environment**: dotenv

### Frontend
- **Framework**: React 18.3
- **Build Tool**: Vite 5.4
- **Language**: TypeScript 5.6
- **HTTP Client**: Axios 1.7
- **Real-time**: Socket.IO Client 4.1

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

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
   
   Create a `.env` file in the `backend` directory:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/mini_trello"
   PORT=4000
   ```

   Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Development

**Backend Development**
```bash
cd backend
npm run dev
```
The backend server will run on `http://localhost:4000`

**Frontend Development**
```bash
cd frontend
npm run dev
```
The frontend development server will run on `http://localhost:5173`

### Build & Production

**Build Backend**
```bash
cd backend
npm run build
npm start
```

**Build Frontend**
```bash
cd frontend
npm run build
npm run preview
```

## 📊 Database Schema

### Board Model
- `id` (String): Unique identifier (CUID)
- `title` (String): Board title (max 100 characters)
- `description` (String, optional): Board description (max 500 characters)
- `createdAt` (DateTime): Creation timestamp
- `updatedAt` (DateTime): Last update timestamp

## 🔌 API Endpoints

### Boards
- `GET /api/boards` - Get all boards
- `GET /api/boards/:id` - Get a specific board
- `POST /api/boards` - Create a new board
- `PUT /api/boards/:id` - Update a board
- `DELETE /api/boards/:id` - Delete a board

*(Additional endpoints for tasks and other features)*

## 🔐 Security Features

- X-Content-Type-Options header (nosniff)
- X-Frame-Options header (DENY)
- Referrer-Policy header (no-referrer)
- JSON payload size limit (1MB)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Task/Card management system
- [ ] User authentication and authorization
- [ ] Drag and drop functionality
- [ ] Real-time collaboration features
- [ ] User profiles and workspaces
- [ ] Advanced filtering and search
- [ ] Export functionality

## 📧 Contact

For questions or suggestions, please reach out through GitHub Issues.

---

Made with ❤️ by [tech-fts](https://github.com/tech-fts)
