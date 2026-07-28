import { useState, type FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AuthFormLayout } from "../Common/AuthFormLayout";
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
    <AuthFormLayout
      title="Login"
      error={error}
      isLoading={isLoading}
      submitLabel="Login"
      loadingLabel="Logging in..."
      onSubmit={handleSubmit}
      switchText="Don't have an account?"
      switchLinkLabel="Register"
      onSwitch={handleSwitch}
    >
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
    </AuthFormLayout>
  );
}
