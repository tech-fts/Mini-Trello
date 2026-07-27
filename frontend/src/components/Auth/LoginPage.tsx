import { useState, type FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FormField } from "../Common/FormField";

interface LoginPageProps {
  onSwitchToRegister: () => void;
}

export function LoginPage({ onSwitchToRegister }: LoginPageProps) {
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch {
      // error is already set in context
    }
  };

  const handleSwitch = () => {
    clearError();
    onSwitchToRegister();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Mini Trello</h1>
        <h2>Login</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <FormField
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="your@email.com"
          />
          <FormField
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            placeholder="Enter password"
          />

          <button
            type="submit"
            className="btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <button className="btn-link" onClick={handleSwitch}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
