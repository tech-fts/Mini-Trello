/**
 * LoadingSpinner — DRY: one spinner for every loading state.
 * Used anywhere we await async data (board lists, card lists, auth).
 */
interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="spinner" />
      <span>{message}</span>
    </div>
  );
}

export default LoadingSpinner;
