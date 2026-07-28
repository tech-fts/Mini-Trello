import type { FormEvent, ReactNode } from "react";

interface AuthFormLayoutProps {
  /** "Login" or "Register" */
  title: string;
  /** Error message to display (from context or local state) */
  error: string | null;
  /** Whether the submit action is in progress */
  isLoading: boolean;
  /** Submit button label when not loading */
  submitLabel: string;
  /** Submit button label while loading */
  loadingLabel: string;
  /** Form submit handler */
  onSubmit: (e: FormEvent) => void;
  /** Footer switch text, e.g. "Don't have an account?" */
  switchText: string;
  /** Footer switch link label, e.g. "Register" */
  switchLinkLabel: string;
  /** Callback when the switch link is clicked */
  onSwitch: () => void;
  children: ReactNode;
}

/**
 * DRY: shared layout shell for LoginPage and RegisterPage.
 * Extracts the duplicated auth-container → auth-card → title → error → form → footer pattern.
 *
 * SOLID:
 *   Single Responsibility — this component only handles layout; form fields come via children.
 *   Open/Closed       — new auth pages (e.g. ForgotPassword) can reuse without modifying this.
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

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={onSubmit}>
          {children}

          <button
            type="submit"
            className="btn-primary btn-block"
            disabled={isLoading}
          >
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
