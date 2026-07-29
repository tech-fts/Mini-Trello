interface ModalFooterProps {
  primaryLabel: string;
  onPrimary: () => void;
  onCancel: () => void;
  primaryDisabled?: boolean;
}

/**
 * DRY: reusable modal footer with primary action + Cancel button.
 */
export function ModalFooter({
  primaryLabel,
  onPrimary,
  onCancel,
  primaryDisabled = false,
}: ModalFooterProps) {
  return (
    <div className="modal-footer">
      <button
        className="btn btn-primary"
        onClick={onPrimary}
        disabled={primaryDisabled}
      >
        {primaryLabel}
      </button>
      <button className="btn btn-secondary" onClick={onCancel} type="button">
        Cancel
      </button>
    </div>
  );
}
