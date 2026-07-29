import type { FormEvent, ReactNode } from "react";

interface AuthFormLayoutProps {
  title: string;
  error: string | null;
  isLoading: boolean;
  submitLabel: string;
  loadingLabel: string;
  onSubmit: (e: FormEvent) => void;
  switchText: string;
  switchLinkLabel: string;
  onSwitch: () => void;
  children: ReactNode;
}

/**
 * DRY: shared layout shell for LoginPage and RegisterPage.
 * SRP: Only handles layout — form fields come via children.
 * OCP: New auth pages (ForgotPassword) reuse without modifying this.
 */
export function AuthFormLayout({
  title,
  error,
  isLoading,
  submitLabel,
  loadingLabel,
  onSubmit,
  switchText,
  switchLinkLabel,
  onSwitch,
  children,
}: AuthFormLayoutProps) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Mini Trello</h1>
        <h2>{title}</h2>

        {error && <div className="alert alert-error" role="alert">{error}</div>}

        <form onSubmit={onSubmit}>
          {children}

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={isLoading}
          >
            {isLoading && <span className="spinner" />}
            {isLoading ? loadingLabel : submitLabel}
          </button>
        </form>

        <p className="auth-switch">
          {switchText}{" "}
          <button className="btn-link" onClick={onSwitch} type="button">
            {switchLinkLabel}
          </button>
        </p>
      </div>
    </div>
  );
}
