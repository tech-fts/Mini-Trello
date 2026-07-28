import { useState } from "react";
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

  return view === "login" ? (
    <LoginPage onSwitchToRegister={() => setView("register")} />
  ) : (
    <RegisterPage onSwitchToLogin={() => setView("login")} />
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
  return user ? <KanbanShell /> : <AuthShell />;
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
