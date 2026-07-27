import { useState, useCallback } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { SocketProvider } from "../contexts/SocketContext";
import { Header } from "../components/Common/Header";
import { Board } from "../components/Kanban/Board";
import { LoginPage } from "../components/Auth/LoginPage";
import { RegisterPage } from "../components/Auth/RegisterPage";
import "../assets/styles.css";

type AuthView = "login" | "register";

function AuthShell() {
  const [view, setView] = useState<AuthView>("login");

  const switchToRegister = useCallback(() => setView("register"), []);
  const switchToLogin = useCallback(() => setView("login"), []);

  return view === "login" ? (
    <LoginPage onSwitchToRegister={switchToRegister} />
  ) : (
    <RegisterPage onSwitchToLogin={switchToLogin} />
  );
}

function KanbanShell() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Board />
      </main>
    </div>
  );
}

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <AuthShell />;
  }

  return <KanbanShell />;
}

export function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppContent />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
