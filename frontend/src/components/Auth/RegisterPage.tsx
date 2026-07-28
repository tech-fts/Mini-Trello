import { useState, type FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AuthFormLayout } from "../Common/AuthFormLayout";
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

  return (
    <AuthFormLayout
      title="Register"
      error={localError || error}
      isLoading={isLoading}
      submitLabel="Register"
      loadingLabel="Creating account..."
      onSubmit={handleSubmit}
      switchText="Already have an account?"
      switchLinkLabel="Login"
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
        placeholder="Min 6 characters"
      />
      <FormField
        label="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        type="password"
        placeholder="Re-enter password"
      />
    </AuthFormLayout>
  );
}
