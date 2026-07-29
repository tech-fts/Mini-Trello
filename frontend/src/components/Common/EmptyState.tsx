/**
 * EmptyState — DRY: one component for all "nothing here yet" states.
 * Boards list, card columns, search results all use this.
 */
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon = "📋", title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div style={{ marginTop: "var(--space-lg)" }}>{action}</div>}
    </div>
  );
}

export default EmptyState;
