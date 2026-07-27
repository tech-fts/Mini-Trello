import { useState, type FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FormField } from "../Common/FormField";

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const { register, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      await register({ email, password });
    } catch {
      // error is already set in context
    }
  };

  const handleSwitch = () => {
    clearError();
    setLocalError(null);
    onSwitchToLogin();
  };

  const displayError = localError || error;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Mini Trello</h1>
        <h2>Register</h2>

        {displayError && (
          <div className="alert alert-error">{displayError}</div>
        )}

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
            placeholder="Min 6 characters"
          />
          <FormField
            label="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type="password"
            placeholder="Re-enter password"
          />

          <button
            type="submit"
            className="btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <button className="btn-link" onClick={handleSwitch}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
