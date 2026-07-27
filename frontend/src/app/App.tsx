import { useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { SocketProvider } from "../contexts/SocketContext";
import "../assets/styles.css";

// Placeholder components
const LoginPage = () => (
  <div className="auth-container">
    <h1>Mini Trello - Login</h1>
    <p>Login implementation goes here...</p>
  </div>
);

const KanbanBoard = () => (
  <div className="kanban-container">
    <h1>Kanban Board</h1>
    <p>Kanban board implementation goes here...</p>
  </div>
);

export function App() {
  const [isAuthenticated] = useState(false);

  return (
    <AuthProvider>
      <SocketProvider>
        <div className="app">
          {isAuthenticated ? <KanbanBoard /> : <LoginPage />}
        </div>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
